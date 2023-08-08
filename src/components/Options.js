import React from 'react'
import { useQuiz } from '../context/QuizContext'

function Options({ question }) {
    console.log(question)
    const { answer, dispatch } = useQuiz();

    const hasAnswered = answer !== null
    return (
        <div className="options">
            {question.options.map((options, index) => (
                <button className={`btn btn-option ${index === answer ? "answer" : ""} 

                ${hasAnswered ? index === question.correctOption ? "correct" : "wrong" : ""}`}
                    key={options}
                    disabled={hasAnswered}
                    onClick={() => dispatch({ type: "newAnswer", payload: index })}
                >{options}
                </button>))
            }
        </div>
    )
}

export default Options  