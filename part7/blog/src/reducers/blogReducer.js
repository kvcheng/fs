import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogsService";

const sortBlogs = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes);
};
const blogSlice = createSlice({
    name: "blogs",
    initialState: [],
    reducers: {
        addBlog: (state, action) => {
            state.push(action.payload);
            sortBlogs(state);
        },
        setBlogs: (state, action) => {
            return sortBlogs(action.payload);
        },
        deleteBlog: (state, action) => {
            const deleted = state.filter(
                (blog) => blog.id !== action.payload.id,
            );
            return sortBlogs(deleted);
        },
        changeBlog: (state, action) => {
            const updated = state.map((blog) =>
                blog.id === action.payload.id ? action.payload : blog,
            );
            return sortBlogs(updated);
        }
    },
});

const { addBlog, setBlogs, deleteBlog, changeBlog } = blogSlice.actions;

export const initialiseBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogsService.getAll();
        dispatch(setBlogs(blogs));
    };
};
export const createBlog = (blog) => {
    return async (dispatch) => {
        const newBlog = await blogsService.createBlog(blog);
        dispatch(addBlog(newBlog));
    };
};

export const removeBlog = (blog) => {
    return async (dispatch) => {
        await blogsService.removeBlog(blog.id);
        dispatch(deleteBlog(blog));
    };
};

export const updateBlog = (blog) => {
    return async (dispatch) => {
        const updatedBlog = await blogsService.updateBlog(blog, blog.id);
        dispatch(changeBlog(updatedBlog));
    };
};

export const updateComment = (blogId, comment) => {
    return async (dispatch) => {
        const updatedBlog = await blogsService.addComment(blogId, comment);
        dispatch(changeBlog(updatedBlog));
    };
};

export default blogSlice.reducer;
