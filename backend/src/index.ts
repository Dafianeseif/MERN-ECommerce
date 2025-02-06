import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
import { productRouter } from './Routers/productRouter'
import mongoose from 'mongoose'
import seedRouter from './Routers/seedRouter'
import { userRouter } from './Routers/userRouter'
dotenv.config()

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/tsmernamazonadb'
mongoose.set('strictQuery', true)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to mongodb')
  })
  .catch(() => {
    console.log('error mongodb')
  })
const app = express()
app.use(
    cors({
        credentials:true,
        origin:['http://localhost:5173'],
    })
)

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api/products',productRouter)
app.use('/api/seed',seedRouter)
app.use('/api/users', userRouter)

const PORT=4000
app.listen(PORT,()=> {
    console.log(`server started at http://localhost:${PORT}`)
})