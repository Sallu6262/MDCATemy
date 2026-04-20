import React from 'react'
import { Link } from 'react-router-dom'
import ErrorComponent from '../components/ErrorComponent'

const NotFoundPage = () => {
    return (
        <ErrorComponent status={'Error 404'} error={'Page Not Found'} text={'The page you are looking for does not exist or has been moved. Head back to the home page to continue.'}/>
    )
}

export default NotFoundPage