import React from 'react';
import styles from '../styled/QuestionContent.module.css'
import { Form } from 'react-bootstrap'
import PropTypes from 'prop-types'
import YoutubeEmbed from './YoutubeShow';
import TrueFalse from './TrueFalse';

function QuestionContent ({ instruction, quizInfo, callbackfunc, question }) {
  if (instruction) {
    return (
      <div className={styles.bigContainer}>
        <div className={styles.instruction}>
          Click Question Panel<br />Select Question or<br />Add&nbsp; A&nbsp; New&nbsp; One
        </div>
      </div>
    );
  } else if (!quizInfo.length) {
    return (<></>)
  } else {
    const questionList = quizInfo[0].questionlist
    let currentQuestionState = { id: 1 }
    let listlocation = 0
    let match = false
    for (let i = 0; i < questionList.length; i++) {
      if (parseInt(question) === parseInt(questionList[i].id)) {
        currentQuestionState = questionList[i]
        match = true
        listlocation = i
      }
    }
    const updateQuestionState = (data, updatetype) => {
      if (updatetype === 'content') {
        currentQuestionState.content = data
      } else if (updatetype === 'truth') {
        if (currentQuestionState.type === 1) {
          if (data[1] === 1) {
            for (let i = 0; i < 6; i++) {
              if (i !== data[0]) {
                currentQuestionState.option.info[i].truth = 'F'
              } else {
                currentQuestionState.option.info[i].truth = 'T'
              }
            }
          } else if (data[1] === 0) {
            currentQuestionState.option.info[data[0]].truth = 'F'
          }
        } else if (currentQuestionState.type === 2) {
          if (data[1] === 1) {
            currentQuestionState.option.info[data[0]].truth = 'T'
          } else if (data[1] === 0) {
            currentQuestionState.option.info[data[0]].truth = 'F'
          }
        }
      } else if (updatetype === 'guess') {
        currentQuestionState.option.info[data[0]].guess = data[1]
      }
      const newQuizInfo = [...quizInfo]
      newQuizInfo[0].questionlist[listlocation] = currentQuestionState
      callbackfunc(newQuizInfo)
    }
    if (match) {
      const content = currentQuestionState.content
      const type = currentQuestionState.type
      const mediatype = currentQuestionState.media.type
      const mediaurl = currentQuestionState.media.url
      const mediaimage = currentQuestionState.media.image
      const number = currentQuestionState.option.number
      const optionInfo = currentQuestionState.option.info

      return (
        <div className={styles.bigContainer}>
          <Form.Control className={styles.questionContentContainer} as="textarea" value={content} rows={2} onChange={ (e) => { updateQuestionState(e.target.value, 'content') }}/>
          <MediaContainer type={parseInt(mediatype)} image={mediaimage} url={mediaurl}/>
          <OptionContainer type={type} number={number} optionlist={optionInfo} updateFunc={updateQuestionState}/>
        </div>
      );
    } else {
      return (
        <div className={styles.bigContainer}>
          <div className={styles.note}>
            Page not Exist or has been Deleted.<br />Please Select Question or&nbsp; Add&nbsp; A&nbsp; New&nbsp; One
          </div>
        </div>
      );
    }
  }
}

export default QuestionContent;

QuestionContent.propTypes = {
  quizInfo: PropTypes.array,
  callbackfunc: PropTypes.func,
  question: PropTypes.string
}

const MediaContainer = ({ type, image, url }) => {
  if (type === 1) {
    return (
      <div className={styles.imageContainer}>
        <img className={styles.image} src={ image } />
      </div>
    );
  } else if (type === 2) {
    return (
      <YoutubeEmbed videoClass={styles.imageContainer} embedId={url} width={'400'} height={'220'} />
    );
  }
}

MediaContainer.propTypes = {
  type: PropTypes.number,
  image: PropTypes.string,
  url: PropTypes.string
}

const OptionContainer = ({ number, optionlist, updateFunc }) => {
  const validOptionList = optionlist.slice(0, number)
  return (
    <div className={styles.optionControl}>
      {
        validOptionList.map((option, index) => {
          return (
            <div className={styles.optionContainer} key={`div${index}`}>
            <Form.Control className={styles.answer} key={`Text${index}`} as="textarea" rows={1} value={option.guess} onChange = {(e) => { updateFunc([index, e.target.value], 'guess') }}/>
            <TrueFalse key={`Check${index}`} index={index} option={option} callbackfunc={updateFunc} />
            </div>
          );
        })
      }
    </div>
  );
}

OptionContainer.propTypes = {
  number: PropTypes.number,
  optionlist: PropTypes.array,
  updateFunc: PropTypes.func
}
