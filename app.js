const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

const { customMiddleware } = require('./src/middlewares/custom.middleware')

// Routes
const userRoutes = require('./src/routes/user.route')
const postRoutes = require('./src/routes/post.route')
const commentRoutes = require('./src/routes/comment.route')
const replyRoutes = require('./src/routes/reply.route')

dotenv.config()

const app = express()

// Middlewares
app.use(cors())
app.use(express.json()) // Permit to read JSON
app.use(express.urlencoded({ extended: true })) // Permit to read URL encoded data

app.use(customMiddleware)

// Set application routes
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/replies', replyRoutes)

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
