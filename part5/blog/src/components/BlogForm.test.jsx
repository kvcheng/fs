import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import blogsService from '../services/blogsService'
import userEvent from '@testing-library/user-event'

vi.mock('../services/blogsService')
const mockCreateBlog = vi.mocked(blogsService.createBlog)

describe('Tests for BlogForm component', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        // Apparently okay to have a hardcoded mock return value as this simulates what is returned for a successful API response
        // 'Provides stable and predictable API behavior in tests'
        mockCreateBlog.mockResolvedValue({ title: 'Test Title', author: 'Test Author', url: 'https://test.url' })
    })

    test('Inputting form leads to blog creation', async () => {
        const createBlog = vi.fn()
        const dummyHandler = vi.fn()
        const user = userEvent.setup()

        render(<BlogForm onCreate={createBlog} onNotification={dummyHandler} />)

        const titleInput = screen.getByPlaceholderText('Title')
        const authorInput = screen.getByPlaceholderText('Author')
        const urlInput = screen.getByPlaceholderText('URL')
        const submitButton = screen.getByText('Create')

        await user.type(titleInput, 'Test Title')
        await user.type(authorInput, 'Test Author')
        await user.type(urlInput, 'https://test.url')
        screen.debug()
        await user.click(submitButton)
        console.log(createBlog.mock.calls)
        expect(createBlog).toHaveBeenCalledTimes(1)

        expect(createBlog).toHaveBeenCalledWith({
            title: 'Test Title',
            author: 'Test Author',
            url: 'https://test.url'
        })
    })

})