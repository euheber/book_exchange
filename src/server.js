import express, { json } from 'express'
import routes from "./routes/routes.js"
import errorHandlerMiddleware from './middleware/error_handler.js'
import notFound from './middleware/notFound.js'

const app = express()

app.use(json())
app.use("/api/v1", routes)
app.use(errorHandlerMiddleware)
app.use(notFound)

app.listen(3000, () => console.log(`Example app listening on port 3000!`))