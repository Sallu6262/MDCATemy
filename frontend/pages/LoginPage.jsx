import React from 'react'
import { Link } from 'react-router-dom'
import { LoginForm } from '../components/LoginForm'

const LoginPage = () => {
    return (
        <LoginForm role={'user'}/>
    )
}

export default LoginPage