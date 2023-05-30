/* Import Deps*/
import express from "express"
import cors from "cors"

import cookieParser from 'cookie-parser';

/* Import Middlewares*/
import rateLimit from "./middlewares/rateLimit.js"
import registerLimit from "./middlewares/registerLimit.js"
import error from "./middlewares/error.js"

/* Import Routes*/
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

/* Routes */


app.use(error)
/* Export App */
export default app