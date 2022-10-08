import React, { useMemo, useState } from 'react'

function decodeEntity(inputStr) {
  let textarea = document.createElement("textarea");
  textarea.innerHTML = inputStr;
  return textarea.value;
}

export default function QuestionTemplate(props) {
  const [isShowAnswer, changeShowAnswer] = useState(false)
  useMemo(() => {
    if (localStorage.getItem('showAnswers') === 'true') {
      changeShowAnswer(true)
    }
  }, [localStorage.getItem('showAnswers')])

  let choosenStyle = {
    backgroundColor: '#D6DBF5',
    color: 'white',
    borderColor: 'white'
  }

  let standardStyle = {
    backgroundColor: 'white',
    color: 'black',
    borderColor: 'black'
  }

  let correctStyle = {
    backgroundColor: '#94D7A2',
    color: 'black',
    borderColor: 'transparent'
  }

  let falseStyle = {
    backgroundColor: '#F8BCBC',
    color: '#293264',
    borderColor: 'transparent'
  }
  const [choosedAnswer, changeAnswer] = useState('')

  function chooseOption(env) {
      localStorage.setItem(props.id, env.target.value === props.correct_answer ? '1' : '0')
      changeAnswer(env.target.value)
  }

  const mapAnswers = props.shuffle_answers.map(index => {
    return (
      <button
        key={index} value={index} className='choice' onClick={isShowAnswer ? undefined : chooseOption}
        style={
          isShowAnswer ? 
            index === choosedAnswer ?
              choosedAnswer === props.correct_answer ? 
                correctStyle : 
                falseStyle : 
            index === props.correct_answer ?
              correctStyle :
              standardStyle :
          index === choosedAnswer ? 
            choosenStyle : 
            standardStyle}>
        {decodeEntity(index)}
      </button>
    )
  })


  return (
    <div className='py-5 px-2 relative z-10 text-slate-700 m-auto sm:px-6'>
      <h1
        className='font-karla font-bold text-base mb-5'>
        {decodeEntity(props.question)}
      </h1>
      <div
        className='grid grid-cols-2 gap-3 md:grid-cols-4 max-w-3xl '
        id='gridQuestion'>
        {mapAnswers}
      </div>
      <div className='mt-5'>
        <hr />
      </div>
    </div>
  )
}
