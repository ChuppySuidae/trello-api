/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * 'A bit of fragrance clings to the hand that gives flowers!'
 */
import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
const createNew = async (req, res, next) => {
  /**
   * Note: Mặc định chúng ta không cần phải custom message ở phía BE làm gì vì để cho Front-end tự validate và custom mesage phí FE cho đẹp.
   * Back-end chỉ cần validate Đảm Bảo Dữ lIệu Chuẩn Xác, và trả về mesage mặc định từ thư viện là được.
   * Quan trọng: Việc Validate dữ liệu BẮT BUỘC phải có ở phía Back-end vfi đây là điểm cuối để lưu trữ dữ liệu và Database.
   * Và thông thường trong thực tế, điều tốt nhất cho hệ thống là hãy luôn validate dữ liệu ở cả Back-end và Front-end.
   */
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().message({
      'any.required': 'Title is required',
      'string.empty': 'Title is not allowed to be empty',
      'string.min':'Title length must be at least 3 chaacters long',
      'string.max': 'Title length must be less than or equal to 50 characters long',
      'String.trim': 'Title must not have leading or trailing whitespace'
    }),
    description: Joi.string().required().min(3).max(256).trim().strict(),
  })

  try {
    // abortEarly: gặp error có dừng sớm hay không
    // set abortEarly: false để trường hợp có nhiều lỗi validation thì trả về tất cả lỗi
    await correctCondition.validateAsync(req.body, {abortEarly: false})
    // Validate dữ liệu xong xuôi, hợp lệ thì cho request đi tiếp sang Controller
    next()
  } catch (error) {
    console.log(error)
    //console.log(new Error(error))
    // Mã này dùng cho validation dữ liệu 422 Unprocessable_entity
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message
    })
  }
  
}
export const boardValidation = {
  createNew
}