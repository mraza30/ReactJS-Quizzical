import React from 'react'

export default function Landing(props) {
    return (
        <div className='flex justify-center bg-transparent h-full'>
            <div className='self-center text-center'>
                <h1 className='text-slate-700  font-karla font-bold text-4xl'>
                    Quizzical
                </h1>
                <p className='text-slate-700 text-lg my-3 font-inter'>
                    Click Button To Start The Quiz
                </p>
                <button
                    onClick={props.startQuiz}
                    className='bg-slate-500 w-4/5 rounded-3xl text-lg font-medium font-inter text-white py-2'>
                    Start Quiz
                </button>
            </div>
        </div>
    )
}
