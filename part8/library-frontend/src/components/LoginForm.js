import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../graphql/queries'

const LoginForm = ({ show, setToken, setPage, setFavouriteGenre }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN)

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      const favouriteGenre = result.data.login.favouriteGenre
      setToken(token)
      setFavouriteGenre(favouriteGenre)
      window.localStorage.setItem('token', token)
    }
  }, [result.data, setFavouriteGenre, setToken])

  if (!show) { return null }

  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
    setUsername('')
    setPassword('')
    setPage('authors')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm