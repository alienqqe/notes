import React from 'react'
import AuthForm from '../components/AuthForm'
import Image from 'next/image'
import '../styles/Auth.scss'

const page = () => {
  return (
    <div className='main-container'>
      <Image
        className='ms-5'
        src='/images/logo.png'
        width={300}
        height={300}
        alt='Logo'
      />
      <AuthForm />
    </div>
  )
}

export default page
