import React from 'react'
import { useQuiz } from '../context/QuizContext'

function Progress() {
    const { questionsLength, index, answer, points, maxPoints } = useQuiz();
    return (
        <header className="progress">
            <progress max={questionsLength} value={index + Number(answer !== null)} />
            <p>Question <strong>{index + 1}</strong>/{questionsLength}</p>
            <p>{points}/{maxPoints} points</p>
        </header>
    )
}

export default Progress