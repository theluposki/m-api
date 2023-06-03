/* Import Deps*/
import express from "express"
import cors from "cors"

import cookieParser from 'cookie-parser';

/* Import Middlewares*/
import rateLimit from "./middlewares/rateLimit.js"
import registerLimit from "./middlewares/registerLimit.js"
import error from "./middlewares/error.js"

/* Import Routes*/

import AuthRouter from './routes/auth/auth.js'
import RegisterRouter from "./routes/auth/register.js"
import UsersRouter from "./routes/users/profile.js"

/* App */
const app = express()
const v1 = "/api/v1"

/* Middlewares */
// app.use(rateLimit)
app.use(cors({
  origin: 'https://localhost:5173',
  credentials: true
}))

app.use(cookieParser());
app.use(express.json())
app.use("/", express.static("src/public"))
app.use("/uploads", express.static("src/uploads"))

/* Routes */
app.use(`${v1}/auth`, AuthRouter)
app.use(`${v1}/register`, RegisterRouter)
app.use(`${v1}/users`, UsersRouter)

app.use(error)
/* Export App */
export default app
