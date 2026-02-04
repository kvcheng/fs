import { useState } from 'react'
import loginService from '../services/loginService'

const BlogForm = ({
    onCreate,
    onNotification
}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleNewBlog = async (event) => {
        event.preventDefault()
        const blogObject = {
            title: event.target.title.value,
            author: event.target.author.value,
            url: event.target.url.value
        }
        try {
            const newBlog = await loginService.createBlog(blogObject)
            onCreate(newBlog)
            onNotification(`New blog ${title} created successfully`)
            setTitle('')
            setAuthor('')
            setUrl('')
        } catch {
            onNotification('Failed to create new blog')
        }

    }

    return (
        <form onSubmit={handleNewBlog}>
            Title: <input type="text" name="title" placeholder="Title" value={title} onChange={({ target }) => setTitle(target.value)} /><br />
            Author: <input type="text" name="author" placeholder="Author" value={author} onChange={({ target }) => setAuthor(target.value)} /><br />
            URL: <input type="text" name="url" placeholder="URL" value={url} onChange={({ target }) => setUrl(target.value)} /><br />
            <button type="submit">Create</button>
        </form>
    )
}

export default BlogForm