import React, { createContext, useContext, useEffect, useReducer } from 'react'

const QuizContext = createContext();

const initialState = {
    questions: [],
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
    highScore: 0,
    secondsRemaining: 10,
}

const Seconds_per_question = 30;

function reducer(state, action) {
    switch (action.type) {
        case "dataReceived":
            return {
                ...state,
                questions: action.payload,
                status: "ready"
            }
        case "dataFailed":
            return {
                ...state,
                status: "error"
            }
        case "start":
            return {
                ...state,
                status: "active",
                secondsRemaining: state.secondsRemaining * Seconds_per_question,
            }
        case 'newAnswer':
            const question = state.questions.at(state.index)
            return {
                ...state,
                answer: action.payload,
                points: action.payload === question.correctOption ? state.points + question.points : state.points
            }
        case 'nextQuestion':
            return {
                ...state,
                index: state.index + 1,
                answer: null,
            }
        case 'finish':
            return {
                ...state,
                status: 'finished',
                highScore: state.points > state.highScore ? state.points : state.highScore
            }
        case 'restart':
            return {
                ...initialState,
                questions: state.questions,
                status: 'ready',
                secondsRemaining: 10,
            };
        case 'timer':
            return {
                ...state,
                secondsRemaining: state.secondsRemaining - 1,
                status: state.secondsRemaining === 0 ? 'finished' : state.status,
            }
        default:
            throw new Error('Action unknown')
    }
}

const QuizProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { questions, status, index, answer, points, highScore, secondsRemaining } = state
    const questionsLength = questions.length

    const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0)


    useEffect(() => {
        fetch('http://localhost:3500/questions')
            .then((response) => response.json())
            .then(data => dispatch({ type: "dataReceived", payload: data }))
            .catch(err => dispatch({ type: "dataFailed" }))
    }, [])

    return (
        <QuizContext.Provider
            value={{
                questions,
                status,
                index,
                answer,
                points,
                highScore,
                secondsRemaining,
                questionsLength,
                maxPoints,
                dispatch,
            }}>
            {children}
        </QuizContext.Provider>
    )
}

const useQuiz = () => {
    const quiz = useContext(QuizContext);
    if (quiz === undefined) throw new Error('Context consume was used outside the context provider')
    return quiz;
}

export { QuizProvider, useQuiz }