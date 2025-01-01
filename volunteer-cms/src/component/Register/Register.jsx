import React from 'react'
import RegisterForm from './RegisterForm'
import Registerimage from './Registerimage'

function Register() {
  return (
    <div className="flex min-h-screen w-full">
        <RegisterForm />
        <Registerimage />
    </div>
  )
}

export default Register