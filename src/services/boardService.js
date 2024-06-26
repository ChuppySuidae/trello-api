/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatters'
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
const createNew = async (reqBody) => {
  try {
    // Xử lý logic dữ liệu tùy đặc thù dự án
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    // Gọi tới Model để xử lý lưu bản ghi newBoard vào trong Database.
    //... 
    // Làm thêm các xử lý logic khác với các Collection khác tùy đặc thù dự án...
    // Bắn email, notification về cho admin khi có 1 cái board mới được tạo...

    // Trả kết quả về trong service luôn phải có return 
    return newBoard
  } catch (error) {
    throw error
  }
}
export const boardService = {
  createNew
}