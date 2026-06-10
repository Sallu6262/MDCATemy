import React, { useEffect, useRef, useState } from 'react'
import SignUpForm from '../components/SignUpForm'
import PaymentForm from '../components/PaymentForm'
import { useNavigate, useOutletContext } from 'react-router-dom';

const SignUpPage = () => {
    const [step, setStep] = useState(2);
    const sectionRef = useRef(null);

    const {student, admin} = useOutletContext();
    const navigate = useNavigate();

    useEffect(() => {
        if(student?.upgrade_status === "VERIFIED" || student?.payment_status === 'VERIFIED'){
            navigate('/dashboard');
            return;
        }

        if(admin){
            navigate('/admin');
            return;
        }
    },[]);

    return (
        <section ref={sectionRef} className="flex flex-1 flex-col justify-start order-1 lg:order-2" onClick={sectionRef?.current?.scrollIntoView()}>
            {step == 1 ? <SignUpForm setStep={setStep} /> : ''}
            {step == 2 ? <PaymentForm/> : ''}
        </section>
    )
}

export default SignUpPage