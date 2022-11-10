import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { NavigationBar } from '../components/NavigationBar'
import QuestionPanel from '../components/QuestionPanel'
import SetPanel from '../components/SetPanel'
import QuestionContent from '../components/QuestionContent'
import request from '../utils/fetchhelper'
import { Button, Modal } from 'react-bootstrap'
import styles from '../styled/addnewquizmodal.module.css'

function Edit () {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  React.useEffect(() => { if (!token) { navigate('/login') } })
  const params = useParams()
  if (!params.id) {
    React.useEffect(() => { navigate('/quiz') })
    return (<></>)
  } else if (!params.question) {
    const quizId = params.id
    const [quizInfo, setQuizInfo] = React.useState([])
    const callbackfunc = (updateInfo) => {
      setQuizInfo(updateInfo)
    }
    const [afterSave, setAfterSave] = React.useState(1)
    React.useEffect(() => {
      const QuizInfo = async (qid) => {
        const resDate = await request('GET', `/admin/quiz/${qid}`)
        if (resDate[0]) {
          const name = resDate[1].name
          const questionlist = resDate[1].questions
          const thumbnail = resDate[1].thumbnail
          const information = [{ id: qid, name: name, questionlist: questionlist, thumbnail: thumbnail }]
          setQuizInfo(information)
        } else {
          alert(resDate[1].error)
        }
      }
      QuizInfo(quizId)
    }, [afterSave])
    const isValidQuizInfo = (testQuizInfo) => {
      if (!testQuizInfo.length) {
        return ([])
      } else {
        const warninglist = []
        const isValidQuestionList = testQuizInfo[0].questionlist
        for (let i = 0; i < isValidQuestionList.length; i++) {
          if (isValidQuestionList[i].type === 1) {
            let truenumber = 0
            for (let j = 0; j < isValidQuestionList[i].option.info.length; j++) {
              if (isValidQuestionList[i].option.info[j].truth === 'T') {
                truenumber = truenumber + 1
              }
            }
            if (truenumber === 0) {
              warninglist.push(`Question ${i + 1} needs a correct option`)
            } else if (truenumber > 1) {
              warninglist.push(`Question ${i + 1} is a single choice but has more than one correct option`)
            }
          } else if (isValidQuestionList[i].type === 2) {
            let truenumber = 0
            for (let j = 0; j < isValidQuestionList[i].option.info.length; j++) {
              if (isValidQuestionList[i].option.info[j].truth === 'T') {
                truenumber = truenumber + 1
              }
            }
            if (truenumber === 0) {
              warninglist.push(`Question ${i + 1} needs a correct option`)
            }
          }
        }
        return warninglist
      }
    }
    const canSave = isValidQuizInfo(quizInfo)
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => { setShow(true) }
    const saveQuiz = async (quizUpdateInfo) => {
      const body = { questions: quizUpdateInfo[0].questionlist, name: quizUpdateInfo[0].name, thumbnail: quizUpdateInfo[0].thumbnail }
      const resDate = await request('PUT', `/admin/quiz/${quizUpdateInfo[0].id}`, body)
      if (resDate[0]) {
        if (afterSave === 1) {
          setAfterSave(0)
        } else {
          setAfterSave(1)
        }
      } else {
        alert(resDate[1].error)
      }
    }

    return (
      <>
      <Modal show={show} className={styles.modal} onHide={handleClose} centered>
      <Modal.Header closeButton>
          <Modal.Title className={styles.title}>Warning</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { React.Children.toArray(
          canSave.map((one, index) => {
            return (
              <div key={index.toString()}>{one}</div>
            )
          })
        )
        }
      </Modal.Body>
      <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
          Close
          </Button>
      </Modal.Footer>
      </Modal>
      <NavigationBar state={'LB'} logoutlink={() => { navigate('/login') } } canSave={canSave} saveFunc={() => { saveQuiz(quizInfo) }} showWarning={() => { handleShow() }}/>
      <QuestionPanel quizInfo={quizInfo} callbackfunc = {callbackfunc}/>
      <QuestionContent instruction={true} />
      </>
    );
  } else {
    const quizId = params.id
    const [quizInfo, setQuizInfo] = React.useState([])
    const callbackfunc = (updateInfo) => {
      setQuizInfo(updateInfo)
    }
    const [afterSave, setAfterSave] = React.useState(1)
    React.useEffect(() => {
      const QuizInfo = async (qid) => {
        const resDate = await request('GET', `/admin/quiz/${qid}`)
        if (resDate[0]) {
          const name = resDate[1].name
          const questionlist = resDate[1].questions
          const thumbnail = resDate[1].thumbnail
          const information = [{ id: qid, name: name, questionlist: questionlist, thumbnail: thumbnail }]
          setQuizInfo(information)
        } else {
          alert(resDate[1].error)
        }
      }
      QuizInfo(quizId)
    }, [afterSave])
    const isValidQuizInfo = (testQuizInfo) => {
      if (!testQuizInfo.length) {
        return ([])
      } else {
        const warninglist = []
        const isValidQuestionList = testQuizInfo[0].questionlist
        for (let i = 0; i < isValidQuestionList.length; i++) {
          if (isValidQuestionList[i].type === 1) {
            let truenumber = 0
            for (let j = 0; j < isValidQuestionList[i].option.info.length; j++) {
              if (isValidQuestionList[i].option.info[j].truth === 'T') {
                truenumber = truenumber + 1
              }
            }
            if (truenumber === 0) {
              warninglist.push(`Question ${i + 1} needs a correct option`)
            } else if (truenumber > 1) {
              warninglist.push(`Question ${i + 1} is a single choice but has more than one correct option`)
            }
          } else if (isValidQuestionList[i].type === 2) {
            let truenumber = 0
            for (let j = 0; j < isValidQuestionList[i].option.info.length; j++) {
              if (isValidQuestionList[i].option.info[j].truth === 'T') {
                truenumber = truenumber + 1
              }
            }
            if (truenumber === 0) {
              warninglist.push(`Question ${i + 1} needs a correct option`)
            }
          }
        }
        return warninglist
      }
    }
    const canSave = isValidQuizInfo(quizInfo)
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => { setShow(true) }
    const saveQuiz = async (quizUpdateInfo) => {
      const body = { name: quizUpdateInfo[0].name, questions: quizUpdateInfo[0].questionlist, thumbnail: quizUpdateInfo[0].thumbnail }
      const resDate = await request('PUT', `/admin/quiz/${quizUpdateInfo[0].id}`, body)
      if (resDate[0]) {
        if (afterSave === 1) {
          setAfterSave(0)
        } else {
          setAfterSave(1)
        }
      } else {
        alert(resDate[1].error)
      }
    }
    return (
      <>
      <Modal show={show} className={styles.modal} onHide={handleClose} centered>
      <Modal.Header closeButton>
          <Modal.Title className={styles.title}>Warning</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { React.Children.toArray(
          canSave.map((one, index) => {
            return (
              <div key={index.toString()}>{one}</div>
            )
          })
        )
        }
      </Modal.Body>
      <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
          Close
          </Button>
      </Modal.Footer>
      </Modal>
      <NavigationBar state={'LB'} logoutlink={() => { navigate('/login') }} canSave={canSave} saveFunc={ () => { saveQuiz(quizInfo) } } showWarning={() => { handleShow() }}/>
      <QuestionPanel quizInfo={quizInfo} callbackfunc = {callbackfunc}/>
      <QuestionContent instruction={false} quizInfo={quizInfo} callbackfunc = {callbackfunc} question={params.question}/>
      <SetPanel quizInfo={quizInfo} callbackfunc = {callbackfunc} question={params.question}/>
      </>
    );
  }
}

export default Edit
