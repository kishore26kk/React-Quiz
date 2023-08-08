import React, { useEffect } from 'react'
import { useQuiz } from '../context/QuizContext';

function Timer() {
    
    const { secondsRemaining, dispatch } = useQuiz();
    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;
    useEffect(() => {
        const id = setInterval(() => {
            dispatch({ type: 'timer' })
        }, 1000);

        return () => clearInterval(id)
    }, [dispatch]);
    return (
        <div className='timer'>
            {minutes < 10 && "0"}
            {minutes}:
            {seconds < 10 && "0"}
            {seconds}
        </div>
    )
}

export default Timer