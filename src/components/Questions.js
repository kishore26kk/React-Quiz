import React from 'react'
import Options from './Options'
function Questions({ questions, dispatch, answer }) {
    console.log(questions)
    return (
        <div>
            <h4>{questions.question}</h4>
            <Options question={questions} dispatch={dispatch} answer={answer} />
        </div>
    )
}

export default Questions