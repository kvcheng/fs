    import { useState, useEffect } from 'react'
    import Blog from './components/Blog'
    import blogService from './services/blogsService'
    import loginService from './services/loginService'
    import Notification from './components/Notification'
    import BlogForm from './components/BlogForm'
    import Togglable from './components/Togglable'
    import LoginForm from './components/LoginForm'

    const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null) // Holds token of user when logged in
    const [notification, setNotification] = useState(null)

    const sortByLikesDesc = (list) => {
        return [...list].sort((a, b) => b.likes - a.likes)
    }

    useEffect(() => {
        blogService.getAll()
        .then(blogs => setBlogs(sortByLikesDesc(blogs)))
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

    const handleLogin = async(user) => {
        setUser(user)
    }

    const loginForm = () => {
        return (
            <Togglable buttonLabel="Login">
                <LoginForm onLogin={handleLogin} onNotification={handleNotification} />
            </Togglable>
        )
    }

    const updateBlog = (maybePromiseOrBlog) => {
        if (maybePromiseOrBlog && typeof maybePromiseOrBlog.then === 'function') {
            return maybePromiseOrBlog
                .then(updatedBlog => setBlogs(prev => sortByLikesDesc(prev.map(b => b.id === updatedBlog.id ? updatedBlog : b))))
                .catch(err => handleNotification('Failed to update blog: ' + (err.message || err)))
        }

        // plain blog object
        setBlogs(prev => sortByLikesDesc(prev.map(b => b.id === maybePromiseOrBlog.id ? maybePromiseOrBlog : b)))
        return Promise.resolve(maybePromiseOrBlog)
    }

    const addBlog = (maybePromiseOrBlog) => {
        if (maybePromiseOrBlog && typeof maybePromiseOrBlog.then === 'function') {
            return maybePromiseOrBlog
                .then(newBlog => setBlogs(prev => sortByLikesDesc(prev.concat(newBlog))))
                .catch(err => handleNotification('Failed to add blog: ' + (err.message || err)))
        }

        setBlogs(prev => sortByLikesDesc(prev.concat(maybePromiseOrBlog)))
        return Promise.resolve(maybePromiseOrBlog)
    }
    const blogForm = () => {
        return (
        <div>
            <h2>Blogs</h2>
            <p>Welcome {user.name}</p>
            <button onClick={handleLogout}>Logout</button>
            <Togglable buttonLabel = "Create new Blog">
                <BlogForm onCreate={addBlog} onNotification={handleNotification} />
            </Togglable>
            {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} onLikeUpdate={updateBlog} onNotification={handleNotification} />
            )}
        </div>
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