const loginUser = async (page, username, password) => {
    await page.getByLabel('Username').fill(username)
    await page.getByLabel('Password').fill(password)
    await page.getByRole('button', { name: 'Login' }).click()
}

const createBlog = async (page, title, author, url, isFirst) => {
    if (isFirst) {
        await page.getByRole('button', { name: 'Create new Blog' }).click()
    }
    await page.getByLabel('Title').fill(title)
    await page.getByLabel('Author').fill(author)
    await page.getByLabel('URL').fill(url)
    await page.getByRole('button', { name: 'Create' }).click()
}

const logout = async (page) => {
    await page.getByRole('button', { name: 'Logout' }).click()
}

export {
    loginUser,
    createBlog,
    logout
}