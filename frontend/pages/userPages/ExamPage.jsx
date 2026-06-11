import React, { useEffect, useState } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import ExamTakingScreen from '../../components/userComponents/ExamTakingScreen';

const ExamPage = () => {
    const {isExamHappening, setIsExamHappening} = useOutletContext();
    const [exam, setExam] = useState(null);
    const navigate = useNavigate();
    const {examType} = useParams();

    useEffect(() => {
        const getExam = JSON.parse(localStorage.getItem("exam"));
        const reload = localStorage.getItem("reload");

        if(!getExam){
            setIsExamHappening(false);
            navigate(`/dashboard/${examType}`);
            return;
        }

        setExam(JSON.parse(localStorage.getItem("exam")));
    }, []); 

    return (
        exam && 
        <ExamTakingScreen 
            isQuiz={exam?.isQuiz} 
            exam={exam} 
            isExamHappening={true} 
            isExamHappeningParent={isExamHappening} 
            setIsExamHappeningParent={setIsExamHappening}
        />
    )
}

export default ExamPage