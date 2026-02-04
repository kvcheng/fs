import { useState } from 'react'
import loginService from '../services/loginService'


const LoginForm = ({ onLogin, onNotification }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async(event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({ username, password })
            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
            loginService.setUserToken(user.token)
            onLogin(user)
            setUsername('')
            setPassword('')
        } catch {
            onNotification('Invalid username or password')
        }
    }
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

export default LoginForm