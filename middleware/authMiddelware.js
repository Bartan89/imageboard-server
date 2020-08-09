const { Router } = require("express")
const { toData } = require("../auth/jwt")

router = new Router()

router.get("/", (req, res, next) => {
  console.log("what is?", req.headers.authorization)

  const test = toData(req.headers.authorization)

  console.log(test)
  next()
})

module.exports = router
