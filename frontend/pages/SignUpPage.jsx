import React, { useRef, useState } from 'react'
import SignUpForm from '../components/SignUpForm'
import PaymentForm from '../components/PaymentForm'
import { useOutletContext } from 'react-router-dom';

const SignUpPage = () => {
    const [step, setStep] = useState(1);
    const sectionRef = useRef(null);

    const {student} = useOutletContext();

    const paymentType = {
        'QUIZ_ONLY' : 3000,
        'TEST_ONLY' : 2000,
        'DUAL_ACCESS' : 5000,
        'TRIBE_MEMBER' : 25000
    }

    return (
        <section ref={sectionRef} className="flex flex-1 flex-col justify-start" onClick={sectionRef?.current?.scrollIntoView()}>
            {step == 1 ? <SignUpForm setStep={setStep} /> : ''}
            {step == 2 ? <PaymentForm paymentType={paymentType[student?.role]}/> : ''}
        </section>
    )
}

export default SignUpPage