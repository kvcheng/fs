const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginUser, createBlog } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/reset')
        await page.goto('http://localhost:5173')
        await request.post('http://localhost:3003/api/users', {
            data: {
                username: 'Username123',
                name: 'Test User',
                password: 'testing'
            }
        })
        await request.post('http://localhost:3003/api/users', {
            data: {
                username: 'AnotherUser123',
                name: 'Test User 2',
                password: 'testing'
            }
        })
    })

    describe('Testing login functionality', () => {
        test('Login form is visible', async ({ page }) => {
            await expect(page.getByLabel('Username')).toBeVisible()
            await expect(page.getByLabel('Password')).toBeVisible()
            await expect(page.getByRole('button', { name: 'Login' })).toBeVisible()
        })

        test('Successful login', async ({ page }) => {
            await loginUser(page, 'Username123', 'testing')
            await expect(page.getByText('Welcome')).toBeVisible()
        })

        test('Unsuccessful login', async ({ page }) => {
            await loginUser(page, 'Username123', 'wrongpassword')
            await expect(page.getByText('Welcome')).not.toBeVisible()
        })

        describe('Once a user is logged in', () => {
            beforeEach(async ({ page }) => {
                await loginUser(page, 'Username123', 'testing')
            })

            test('User can create a new blog post', async ({ page }) => {
                // Note: by default, the create new blog form is hidden behind a button
                await expect(page.getByLabel('Title')).not.toBeVisible()
                await expect(page.getByLabel('Author')).not.toBeVisible()
                await expect(page.getByLabel('URL')).not.toBeVisible()

                await createBlog(page, 'My First Blog Post', 'John Doe', 'https://testing.com', true)
                await expect(page.getByText('My First Blog Post by John Doe')).toBeVisible()
            })

            describe('Once a post has been made', () => {
                beforeEach(async ({ page }) => {
                    await createBlog(page, 'My First Blog Post', 'John Doe', 'https://testing.com', true)
                })

                test('Check whether user can like a post', async({ page}) => {
                    await page.getByRole('button', { name: 'Show Details' }).first().click()
                    
                    await expect(page.getByText('0 likes')).toBeVisible()
                    await page.getByRole('button', { name: 'Like' }).click()
                    await expect(page.getByText('1 likes')).toBeVisible()
                })

                test('Whether a user who created the blog CAN delete the blog', async({ page }) => {
                    await page.getByRole('button', { name: 'Show Details' }).first().click()
                    
                    // Set up dialog handler BEFORE clicking Remove
                    page.once('dialog', async dialog => {
                        expect(dialog.message()).toContain('Are you sure you want to remove the blog My First Blog Post by John Doe?')
                        await dialog.accept()
                    })
                    
                    await page.getByRole('button', { name: 'Remove' }).click()
                    await expect(page.getByText('My First Blog Post by John Doe')).not.toBeVisible()
                })

                test(`Whether a user who didn't create the blog CANNOT see the delete button`, async({ page }) => {
                    await page.getByRole('button', { name: 'Logout' }).click()
                    await loginUser(page, 'AnotherUser123', 'testing')
                    await page.getByRole('button', { name: 'Show Details' }).first().click()
                    await expect(page.getByRole('button', { name: 'Remove' })).not.toBeVisible()
                })

                test(`Whether multiple blogs are sorted in decreasing order of number of likes`, async ({ page }) => {
                    // Original blog has zero likes, so create two blogs with two and one like. Order should be
                    // Third blog post -> second blog post -> first blog post
                    await createBlog(page, 'My Second Blog Post', 'Jane Doe', 'https://testing.com', false)
                    await page.getByRole('button', { name: 'Show Details' }).last().click()
                    await page.getByRole('button', { name: 'Like' }).last().click()

                    await createBlog(page, 'My Third Blog Post', 'Jane Doe', 'https://testing.com', false)
                    await page.getByRole('button', { name: 'Show Details' }).last().click()
                    await page.getByRole('button', { name: 'Like' }).last().click()
                    await page.getByRole('button', { name: 'Like' }).last().click()

                    const blogTitles = await page.locator('.blog').allTextContents()
                    // Uses capture group to extract number of likes
                    const sortedTitles = [...blogTitles].sort((a, b) => {
                        const aLikes = parseInt(a.match(/(\d+) likes/)[1])
                        const bLikes = parseInt(b.match(/(\d+) likes/)[1])
                        return bLikes - aLikes
                    })

                    expect(blogTitles).toEqual(sortedTitles)
                })
            })
        })
    })
})