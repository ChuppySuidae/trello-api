/* eslint-disable no-console */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import { CONNECT_DB, GET_DB } from '~/config/mongodb'

const START_SERVER = () => {
  const app = express()

  const hostname = 'localhost'
  const port = 8017

  app.get('/', async (req, res) => {
    console.log(await GET_DB().listCollections().toArray())
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`3. Hello Trung Quan Dev, Back-end Server is running successfully at Host http://${hostname}:${port}/`)
  })
}
// Chỉ khi Kết nối đến Database thành công thì mới Start Server Back-end lên.
// Immediately Invoked / Anonymous Async functions IIFE
(async () => {
  try {
    console.log('1. Connecting to MongoDB Cloud Atlas...')
    await CONNECT_DB()
    console.log('2. Connected to MongoDB Cloud Atlas!')
    // Khởi động Server Backend sau khi Connect Database thành công
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()
// Chỉ khi Kết nối đến Database thành công thì mới Start Server Back-end lên.
// console.log('1. Connecting to MongoDB Cloud Atlas...');
// CONNECT_DB()
//   .then(() => console.log('2. Connected to MongoDB Cloud Atlas!'))
//   .then(() => START_SERVER())
//   .catch(error => {
//     console.error(error)
//     process.exit(0)
//   })
