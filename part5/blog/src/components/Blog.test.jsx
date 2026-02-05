import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import blogsService from '../services/blogsService'

// Require mocking the API calls to avoid making real HTTP requests during testing
vi.mock('../services/blogsService')
const mockUpdateBlog = vi.mocked(blogsService.updateBlog)

describe('Tests for Blog Component', () => {
    const blog = {
        id: '123',
        title: 'Test Blog',
        author: 'Test Author',
        url: 'https://test.com',
        likes: 0
    }

    const updatedBlog = {
        ...blog,
        likes: 1
    }

    beforeEach(() => {
        vi.clearAllMocks()
        mockUpdateBlog.mockResolvedValue(updatedBlog)
    })

    test('Renders title and author, but not URL or likes by default', () => {
        render(<Blog blog={blog} />)

        const titleElement = screen.getByText('Test Blog', { exact: false })
        const authorElement = screen.getByText('Test Author', { exact: false })
        const urlElement = screen.queryByText('https://test.com')
        const likesElement = screen.queryByText('0', { exact: false })

        expect(titleElement).toBeInTheDocument()
        expect(authorElement).toBeInTheDocument()
        expect(urlElement).not.toBeInTheDocument()
        expect(likesElement).not.toBeInTheDocument()
    })

    test('Checks that the URL and likes are rendered once Show Details button is clicked', async () => {
        render(<Blog blog={blog} />)

        const user = userEvent.setup()
        const button = screen.getByText('Show Details')
        await user.click(button)

        const urlElement = screen.getByText('https://test.com')
        const likesElement = screen.getByText('0', { exact: false })

        expect(urlElement).toBeInTheDocument()
        expect(likesElement).toBeInTheDocument()
    })

    test('Checks that the like button calls the event handler twice when clicked twice', async () => {
        const mockHandler = vi.fn()
        render(<Blog blog={blog} onLikeUpdate={mockHandler}/>)

        const user = userEvent.setup()

        const showDetailsButton = screen.getByText('Show Details')
        await user.click(showDetailsButton)

        const likeButton = screen.getByText('Like')
        await user.click(likeButton)
        await user.click(likeButton)

        expect(mockHandler).toHaveBeenCalledTimes(2)
    })
})