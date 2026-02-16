import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
};

const updateBlog = (blog, blogId) => {
    const req = axios.put(`${baseUrl}/${blogId}`, blog);
    return req.then((response) => response.data);
};

const removeBlog = (blogId) => {
    const req = axios.delete(`${baseUrl}/${blogId}`);
    return req.then((response) => response.data);
};

const createBlog = async (newBlog) => {
    const res = await axios.post("/api/blogs", newBlog);
    return res.data;
};
export default { getAll, updateBlog, removeBlog, createBlog };
