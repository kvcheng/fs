const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
// const User = require('../models/user')
// const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)
})

blogsRouter.post('/', userExtractor, async(request, response) => {
    const user = request.user
    if (!user) return response.status(400).json({ error: 'missing or invalid user ID' })

    const blog = new Blog({
        ...request.body,
        user: user._id
    })

    const uploadedBlog = await blog.save()
    user.blogs = user.blogs.concat(uploadedBlog._id)
    await user.save()

    const populatedBlog = await Blog.findById(uploadedBlog._id).populate('user', { username: 1, name: 1, id: 1 })
    response.status(201).json(populatedBlog)
})

blogsRouter.delete('/:id', userExtractor, async(request, response) => {
    const user = request.user
    if (!user) return response.status(400).json({ error: 'missing or invalid user ID' })

    const blog = await Blog.findById(request.params.id)
    if (!blog) return response.status(404).json({ error: 'Blog not found' })

    if (blog.user.toString() === user.id.toString()) {
        await Blog.findByIdAndDelete(blog.id)
        response.status(204).end()
    } else {
        response.status(403).json({ error: 'User not authorized to delete this blog' })
    }
})

blogsRouter.put('/:id', async(request, response) => {
    const { title, author, url, likes } = request.body

    const blogToUpdate = await Blog.findById(request.params.id)
    if (!blogToUpdate) {
        return response.status(404).end()
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        { title, author, url, likes },
        { new: true }
    )

    // return the updated blog with populated user so frontend can compare user ids
    const populatedUpdated = await Blog.findById(updatedBlog._id).populate('user', { username: 1, name: 1, id: 1 })
    response.json(populatedUpdated)
})

blogsRouter.post('/:id/comments', async(request, response) => {
    const { id } = request.params
    const { content } = request.body

    const blog = await Blog.findById(id)
    if (!blog) {
        return response.status(404).json({ error: 'Blog not found' })
    }

    blog.comments = blog.comments.concat({ content })
    await blog.save()

    response.status(201).json(blog)
})

module.exports = blogsRouter