const { Router } = require("express")
const { image } = require("../models")

const router = new Router()

router.get("/", async (request, response) => {
  try {
    const images = await image.findAll()
    response.send(images)
  } catch (error) {
    console.log(error)
  }
})

router.post("/", async (request, response) => {
  try {
    const createdimage = await image.create(request.body)
    response.send(createdimage)
  } catch (error) {
    console.log(error)
  }
})

router.get("/:imageId", async (request, response) => {
  try {
    const oneImage = await image.findByPk(parseInt(request.params.imageId))
    if (oneImage) {
      response.send(oneImage)
    } else {
      response.status(404).send("picture not found")
    }
  } catch (error) {
    console.log("test")
    console.log(error)
    response.send("image does not exist")
  }
})

module.exports = router
