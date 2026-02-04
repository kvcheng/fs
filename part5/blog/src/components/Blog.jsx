import { useState } from "react"
import blogsService from "../services/blogsService"

const Blog = ({ blog, onLikeUpdate, onNotification }) => {
    const [showDetails, setShowDetails] = useState(false)

    const addLike = (blog) => {
        const updatedBlog = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1
        }

        blogsService.updateBlog(updatedBlog, blog.id)
            .then(updated => onLikeUpdate(updated))
            .catch(err => onNotification('Error updating blog ' + err.message))
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
                </div>
            )}
    </div>
)}

export default Blog