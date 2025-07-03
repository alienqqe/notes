'use client'
import React, { useState } from 'react'
import ToggleButton from './ToggleButton'

const AuthForm = () => {
  const [registerMode, setRegister] = useState(false)

  const handleToggle = () => setRegister((prev) => !prev)

  return (
    <div className='position-absolute end-0 me-5 ms-5'>
      {registerMode ? (
        <div className='p-5 pb-3 border rounded shadow-sm bg-light '>
          <h2 className='text-center'>Register</h2>
          <form action='' className='d-flex flex-column '>
            <input
              className='my-2 form-control'
              type='text'
              placeholder='Login'
              required
            />
            <input
              className='my-2 form-control'
              type='text'
              placeholder='Email'
              required
            />
            <input
              className='my-2 form-control'
              type='password'
              placeholder='Password'
              required
            />

            <button className='btn btn-primary my-2' type='submit'>
              Register
            </button>
          </form>
          <div className='d-flex align-items-center justify-content-center mt-3'>
            <ToggleButton isToggled={registerMode} toggle={handleToggle} />
          </div>
        </div>
      ) : (
        <div className='p-5 border rounded shadow-sm bg-light '>
          <h2 className='text-center'>Login</h2>
          <form action='' className='d-flex flex-column '>
            <input
              className='my-2 form-control'
              type='text'
              placeholder='Login'
              required
            />
            <input
              className='my-2 form-control'
              type='password'
              placeholder='Password'
              required
            />

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
