import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const updateBlog = (blog, blogId) => {
  const req = axios.put(`${baseUrl}/${blogId}`, blog)
  return req.then(response => response.data)
}
export default { getAll, updateBlog }