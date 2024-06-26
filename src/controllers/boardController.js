/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError';
import { boardService } from '~/services/boardService';
const createNew = async (req, res, next) => {
  try {
    // console.log('req.body :', req.body);
    // console.log('req.query :', req.query);
    // console.log('req.params :', req.params);
    // console.log('req.files :', req.files);
    // console.log('req.cookies :', req.cookies);
    // console.log('req.jwtDecoded :', req.jwtDecoded);

    // Điều hướng dữ liệu sang tầng Service 
    const createBoard = await boardService.createNew(req.body)

    // Có kết quả thì trả về phía Client
    // throw new ApiError(StatusCodes.BAD_GATEWAY, 'Test error')
    res.status(StatusCodes.CREATED).json(createBoard)
  } catch (error) {
    next(error)
    // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    //   errors: error.message
    // })
  }
}

export const boardController = {
  createNew
}