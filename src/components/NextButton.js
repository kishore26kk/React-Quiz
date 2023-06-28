import React from 'react'

function NextButton({ dispatch, answer, index, length }) {
    if (answer === null) return null;
    if (index < length - 1)
        return (
            <button className="btn btn-ui" onClick={() => dispatch({ type: 'nextQuestion' })}>Next</button>
        );

    if (index === length - 1)
        return (
            <button className="btn btn-ui" onClick={() => dispatch({ type: 'finish' })}>Finish</button>
        );
}

export default NextButton