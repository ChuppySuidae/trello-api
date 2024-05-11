/* eslint-disable no-unused-vars */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { StatusCodes } from 'http-status-codes'
import { env } from '~/config/environment'
// Middleware xử lý lỗi tập trung trong ứng dụng Back-end NodeJS (ExpressJS)
export const errorHandlingMiddleware = (err, req, res, next) => {

  // Nếu dev không cẩn thận thiếu statusCode thì mặc định sẽ để code 500 INTERNAL_SERVER_ERROR
  if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR

  // Tạo ra một biến responseError để kiểm soát những gì muốn trả về
  const responseError = {
    statusCode: err.statusCode,
    message: err.message || StatusCodes[err.statusCode], // Nếu lỗi mà không có message thì lấy ReasonPhrases chuẩn theo mã Status Code
    // bắt được lỗi ở đâu
    stack: err.stack
  }

  // console.error(responseError)
  // Chỉ khi môi trường DEV thì mới trả về Stack Trace để debug dễ dàng hơn, còn không thì xóa đi.
  if (env.BUILD_MODE !== 'dev') delete responseError.stack

  // Có thể mở rộng về sau như ghi Error log vào file, bắng thông báo lỗi vào group Slack, telegram, email... Hoặc có thể viết riêng code ra một file Middleware khác tùy dự án

  res.status(responseError.statusCode).json(responseError)
}