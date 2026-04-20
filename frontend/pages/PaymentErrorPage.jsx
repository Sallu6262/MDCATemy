import React, { useEffect } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import ErrorComponent from '../components/ErrorComponent';

const PaymentErrorPage = () => {
    const {student} = useOutletContext();
    const navigate = useNavigate();

    useEffect(() => {
        if(!student){
            navigate('/');
            return;
        }

        if(student.payment_status === 'VERIFIED'){
            navigate('/dashboard');
            return;
        }
    },[]);

    return (
        <ErrorComponent status={'Pending'} error={'Payment In Pending'} text={'Your payment is not yet verified. Please wait while it is in process.'}/>
    )
}

export default PaymentErrorPage