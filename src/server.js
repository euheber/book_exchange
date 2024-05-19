import errorHandlerMiddleware from './middleware/error_handler.js'
import notFoundMiddleware from './middleware/notFound.js'
import express, { json } from 'express'
import routes from "./routes/routes.js"

const app = express()

app.use(json())
app.use("/api/v1", routes)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

app.listen(3000, () => console.log(`Example app listening on port 3000!`))