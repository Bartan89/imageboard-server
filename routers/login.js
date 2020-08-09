const { Router, response } = require("express")
const { toJWT, toData } = require("../auth/jwt")
const { user } = require("../models")

const router = new Router()

router.post("/", async (rq, rs, next) => {
  // Here goes the login logic.
  const { email, password } = rq.body

  const foundUser = await user.findOne({ where: { email } })

  if (email && password) {
    return rs.send({
      jwt: toJWT({
        userId: foundUser.dataValues.id
      })
    })
  }

  rs.status(400).send("Please provide a valid email and password")
})

module.exports = router
