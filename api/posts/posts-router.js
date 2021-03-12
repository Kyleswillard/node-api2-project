// implement your posts router here
const express = require(express)
const {
  find,
  findById,
  insert,
  update,
  remove,
  findPostComments,
  findCommentById,
  insertComment
} = require('./posts-model')


const router = express.Router()


// GET All posts (regardless of ID).
router.get('/', async (req, res) => {
  try {
    const posts = await find()
    res.send(posts)
  } catch (err) {
    res.status(500).json({ message: "The posts information could not be retrieved" })
  }
})
// GET by single post by ID.
router.get('/:id', async (req, res) => {
  const {id} = req.body
  try {
    const post = await findById(id)
    if(!post) {
      res.status(404).json({ message: "The post with the specified ID does not exist" })
    }
    res.send(post)
  } catch (err) {
res.status(500).json({ message: "The post information could not be retrieved" })
  }
})
// POST new Post.
router.post('/', async (req,res) => {
  const data = req.body
  try {
    if(!data.title || !data.content) {
      express.status(400).json({ message: "Please provide title and contents for the post" })
    }
    const post = await insert()
    res.status(201).json(post)
  } catch (err) {
    res.status(500).json({ message: "There was an error while saving the post to the database" })
  }
})
// PUT - Update Post.
router.put('/:id', async (req, res) => {
  const post = req.body
  if(!post.title || !post.content) {
    res.status(400).json({ message: "Please provide title and contents for the post" })
  }
  try {
    const updatedPost = await update(post.id, post.post)
    if(!updatedPost) {
      res.status(404).json({ message: "The post with the specified ID does not exist" })
    }
  } catch (err) {
    res.status(500).json({ message: "The post information could not be modified" })

  }
})
// Delete Post by ID
router.delete('/:id', async (req, res) => {
  const {id} = req.body
  try {
    const deletePost = await remove(id)
    if(!deletePost) {
      res.status(404).json({ message: "The post with the specified ID does not exist" })
    }
    res.status().json()
  } catch (err) {
    res.status(500).json({ message: "The post could not be removed" })
  }
})

// GET comments for post by post ID.
router.get('/:id/comments', async (req, res) => {
const {id} = req.body
if(!id) {
  res.status(400).json({message: "Please provide an ID"})
}
try {
  const comments = await findPostComments(id)
  if(!comments) {
    res.status(404).json({ message: "The post with the specified ID does not exist" })
  }
  res.json(comments)

} catch (err) {
res.status(500).json({ message: "The comments information could not be retrieved" })
}
})

module.exports = router