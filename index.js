const express = require("express")

const jsonParser = express.json()

const imageRouter = require("./routers/imageRouter")
const login = require("./routers/login")
const signup = require("./routers/signup")
const authMiddelware = require("./middleware/authMiddelware")

const app = express()

app.use(jsonParser)

app.use("/images", authMiddelware, imageRouter)
app.use("/login", login)
app.use("/signup", signup)

const PORT = 4000

app.listen(PORT, () => console.log(`📸 imageboard listening on port: ${PORT}`))
