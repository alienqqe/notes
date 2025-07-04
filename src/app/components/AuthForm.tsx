'use client'
import React, { useEffect, useState } from 'react'
import ToggleButton from './ToggleButton'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

const AuthForm = () => {
  const router = useRouter()
  const [registerMode, setRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const registerMutation = useMutation({
    mutationKey: ['register'],
    mutationFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/register`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ username: login, email, password }),
        }
      )
      let data
      try {
        data = await res.json()
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        console.log(err)
        throw new Error('Invalid JSON response from server')
      }

      if (!res.ok || data.success === false) {
        throw new Error(data?.message || 'Unknown error')
      }

      return data
    },
    onSuccess: () => {
      setError('')
      setSuccessMessage('Registration sucessfull!')
    },
    onError: (err: Error) => setError(err.message),
  })

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ username: login, password }),
        }
      )
      let data
      try {
        data = await res.json()
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        console.log(err)
        throw new Error('Invalid JSON response from server')
      }

      if (!res.ok || data.success === false) {
        throw new Error(data?.message || 'Unknown error')
      }

      console.log(data)

      return data
    },
    onSuccess: () => router.push('/'),
    onError: (err: Error) => setError(err.message),
  })

  // hydration mismatch fix
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => {
    setHasMounted(true)
  }, [])
  if (!hasMounted) return null

  const handleToggle = () => {
    setRegister((prev) => !prev)
    setError('')
    setSuccessMessage('')
    setEmail('')
    setPassword('')
    setLogin('')
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    registerMutation.mutate()
  }
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    loginMutation.mutate()
  }

  return (
    <div className='position-absolute end-0 me-5 ms-5'>
      {registerMode ? (
        <div className='p-5 pb-3 border rounded shadow-sm bg-light rounded-4 '>
          <h2 className='text-center'>Register</h2>
          <form
            action=''
            onSubmit={handleRegister}
            className='d-flex flex-column '
          >
            <input
              className='my-2 form-control'
              type='text'
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder='Login'
              required
            />
            <input
              className='my-2 form-control'
              type='text'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className='my-2 form-control'
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error ? (
              <p className='mt-2 mb-2 text-center text-danger'>{error}</p>
            ) : (
              ''
            )}
            {successMessage ? (
              <p className='mt-2 mb-2 text-center text-success'>
                {successMessage}
              </p>
            ) : (
              ''
            )}
            <button className='btn btn-primary my-2' type='submit'>
              Register
            </button>
          </form>
          <div className='d-flex align-items-center justify-content-center mt-3'>
            <ToggleButton isToggled={registerMode} toggle={handleToggle} />
          </div>
        </div>
      ) : (
        <div className='p-5 border rounded shadow-sm bg-light rounded-4  '>
          <h2 className='text-center'>Login</h2>
          <form
            action=''
            onSubmit={handleLogin}
            className='d-flex flex-column '
          >
            <input
              className='my-2 form-control'
              type='text'
              placeholder='Login'
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
            <input
              className='my-2 form-control'
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error ? (
              <p className='mt-2 mb-2 text-center text-danger'>{error}</p>
            ) : (
              ''
            )}

            <button className='btn btn-primary my-2' type='submit'>
              Login
            </button>
          </form>
          <div className='d-flex align-items-center justify-content-center mt-3'>
            <ToggleButton isToggled={registerMode} toggle={handleToggle} />
          </div>
        </div>
      )}
    </div>
  )
}

export default AuthForm
