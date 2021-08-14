import React from 'react'
import Answer from './Answer.jsx'

const Question = (props) => {
  return (
    <div className="Questions">
      <li>Q: {props.question}</li>
      <ul>{Object.keys(props.answer).map((keyNames, index) =>
        <Answer answerbody={props.answer[keyNames].body} key={index}/>
      )}</ul>
    </div>
  )
}
export default Question;