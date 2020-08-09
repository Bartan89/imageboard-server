const { Router } = require("express")
const { user } = require("../models")
const bcrypt = require("bcrypt")

const router = new Router()
router.get("/", (request, response, next) => {
  const limit = Math.min(request.query.limit || 25, 500)
  const offset = request.params.offset || 0

  user
    .findAll({
      limit,
      offset
    })
    .then(foundUser => response.send(foundUser))
    .catch(error => next(error))
})

router.post("/", async (request, response) => {
  try {
    console.log("test")
    const { email, password, fullName } = request.body

    if (!email || !password || !fullName) {
      return response.status(400).send("you did not provide all fields")
    }

    const hashedPassword = bcrypt.hashSync(password, 10)
    console.log(hashedPassword)
    const newUser = await user.create({
      email,
      password: hashedPassword,
      fullName
    })
    response.json(newUser)

    console.log(request.body.email)
  } catch (error) {
    console.log(error)
    response.status(400).send({ msg: "Can't created user" })
  }
})

module.exports = router
