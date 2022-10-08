import React, { useMemo, useRef, useState } from 'react'
import QuestionTemplate from './QuestionTemplate'

export default function QuestionLanding() {

    const [quizData, changeQuizData] = useState(false)
    useMemo(() => {
        let count = 0
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then(res => res.json())
            .then(data => {
                const updatedData = data.results.map(index =>
                ({
                    ...index,
                    id: count += 1,
                    shuffle_answers: [...index.incorrect_answers, index.correct_answer].sort(() => Math.random() - 0.5)
                }))
                changeQuizData(updatedData)
            })
    }, [])

    let allQuestions

    if (quizData) {
        allQuestions = quizData.map(index => (<QuestionTemplate {...index} key={index.id} />))
    }
    const [isShowAnswer, changeShowAnswer] = useState(false)
    
    const[score, changeScore] = useState(0)

    function showAnswer() {
        if(!isShowAnswer){
            localStorage.setItem('showAnswers', 'true')
        for(let index in quizData) {
            if(localStorage.getItem(quizData[index].id) === '1') {
                changeScore(prevState=>prevState+=1)
            }
        }
        changeShowAnswer(prevState => !prevState)
        }
    }

    return (
        <div className='h-full'>
            {!quizData && <div className='flex justify-center items-center h-full'><h1>Loading!!!</h1></div>}
            {quizData &&
                <div className='max-w-6xl m-auto py-10'>
                    {allQuestions}
                    <div className='flex justify-center mt-5 items-center flex-wrap gap-2'>
                        {isShowAnswer && <div className='font-inter font-bold text-base'>You scored {score}/5 correct answers</div>}
                        <button
                            onClick={showAnswer}
                            id='checkAnswersButton'
                            className='bg-slate-500 rounded-3xl text-lg font-medium font-inter text-white py-3'>
                            {!isShowAnswer ? 'Check answers' : 'Play again'}
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}
