import axios from 'axios'
const baseUrl = '/api/login'

// let userToken = null

const setUserToken = token => {
    // userToken = token
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

const login = async credentials => {
    const res = await axios.post(baseUrl, credentials)
    setUserToken(res.data.token)
    return res.data
}

const createBlog = async(newBlog) => {
    const res = await axios.post('/api/blogs', newBlog)
    return res.data
}

export default { login, setUserToken, createBlog }