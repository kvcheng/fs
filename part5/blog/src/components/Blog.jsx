import { useState } from 'react'
import blogsService from '../services/blogsService'

const Blog = ({ blog, onLikeUpdate, onNotification, onDeleteUpdate }) => {
    const [showDetails, setShowDetails] = useState(false)

    const addLike = async (blog) => {
        const updatedBlog = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1
        }
        try {
            const updated = await blogsService.updateBlog(updatedBlog, blog.id)
            onLikeUpdate(updated)
        } catch (err) {
            onNotification('Error updating blog ' + err.message)
        }

    }

    const removeBlog = async(blog) => {
        if (window.confirm(`Are you sure you want to remove the blog ${blog.title} by ${blog.author}?`)) {
            try {
                await blogsService.removeBlog(blog.id)
                onDeleteUpdate(blog)
                onNotification(`Blog ${blog.title} removed successfully`)
            } catch (err) {
                onNotification('Error removing blog ' + err.message)
            }
        }
    }
    return (
        <div>
            <p>{blog.title} by {blog.author}</p>
            <button onClick={() => setShowDetails(!showDetails)}>
                {showDetails ? 'Hide' : 'Show'} Details
            </button>
            {showDetails && (
                <div>
                    <p>{blog.url}</p>
                    <p>{blog.likes} likes</p>
                    <button onClick={() => addLike(blog)}>Like</button>
                    <button onClick={() => removeBlog(blog)}>Remove</button>
                </div>
            )}
        </div>
    )}

export default Blog