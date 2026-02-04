    import { useState, useEffect } from 'react'
    import Blog from './components/Blog'
    import blogService from './services/blogs'
    import loginService from './services/loginService'
    import Notification from './components/Notification'

    const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null) // Holds token of user when logged in
    const [notification, setNotification] = useState(null)

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    useEffect(() => {
        blogService.getAll().then(blogs =>
        setBlogs( blogs )
        )  
    }, [])

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUser) {
        const user = JSON.parse(loggedUser)
        setUser(user)
        loginService.setUserToken(user.token)
        }
    }, [])

    const handleNotification = (message) => {
        setNotification(message)
        setTimeout(() => {
            setNotification(null)
        }, 5000)
    }
    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
        loginService.setUserToken(null)
    }

    const handleLogin = async(event) => {
        event.preventDefault()

        try {
        const user = await loginService.login({ username, password })
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
        loginService.setUserToken(user.token)
        setUser(user)
        setUsername('')
        setPassword('')
        } catch {
        handleNotification('Invalid username or password')
        }
    }

    const handleNewBlog = async (event) => {
        event.preventDefault()
        const blogObject = {
            title: event.target.title.value,
            author: event.target.author.value,
            url: event.target.url.value
        }
        try {
            const newBlog = await loginService.createBlog(blogObject)
            setBlogs(blogs.concat(newBlog))
            handleNotification(`New blog ${title} created successfully`)
            setTitle('')
            setAuthor('')
            setUrl('')
        } catch {
            handleNotification('Failed to create new blog')
        }

    }

    const loginForm = () => {
        return (
        <div>
            <h2>Login:</h2>
            <form onSubmit={handleLogin}>
            <div>
                <label>
                Username:
                <input
                    type='text'
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                />
                </label>
            </div>
            <div>
                <label>
                Password:
                <input
                    type='password'
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                />
                </label>
            </div>
            <button type='submit'>Login</button>
            </form>
        </div>
        )
    }

    const blogForm = () => {
        return (
        <div>
            <h2>Blogs</h2>
            <p>Welcome {user.name}</p>
            <button onClick={handleLogout}>Logout</button>
            {newBlogForm()}
            {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
            )}
        </div>
        )
    }

    const newBlogForm = () => {
        return (
            <form onSubmit={handleNewBlog}>
                <input type="text" name="title" placeholder="Title" value={title} onChange={({ target }) => setTitle(target.value)} /><br />
                <input type="text" name="author" placeholder="Author" value={author} onChange={({ target }) => setAuthor(target.value)} /><br />
                <input type="text" name="url" placeholder="URL" value={url} onChange={({ target }) => setUrl(target.value)} /><br />
                <button type="submit">Create</button>
            </form>
        )
    }
    return (
        <div>
        <Notification message={notification} />
        {user ? blogForm() : loginForm()}
        </div>
    )
    }
    export default App