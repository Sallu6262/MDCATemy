import React from 'react'
import ErrorComponent from '../components/ErrorComponent'

const ComingSoonPage = () => {
    return (
        <ErrorComponent 
            status={'Coming Soon'} 
            error={'Service Coming Soon'}
            text={'This service will be available soon. Thank you for your patience.'}
        />
    )
}

export default ComingSoonPage