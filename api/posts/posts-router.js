// implement your posts router here
const express = require(express)
const {find,
  findById,
  insert,
  update,
  remove} = require('./posts-model')
const router = express.Router()

router.get('/api/posts', async (req, res) => {
const posts = await posts.find()
})