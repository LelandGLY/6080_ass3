import React from 'react';
import styles from '../styled/quizinfo.module.css'
import { Accordion, Button, Modal, Image } from 'react-bootstrap'
import PropTypes from 'prop-types'
import request from '../utils/fetchhelper'
import { useNavigate } from 'react-router-dom';
import Play from '../imgs/play.png'
import Stop from '../imgs/stop.png'

function QuizInfo ({ eventk, info, deleteSuccess }) {
  const navigate = useNavigate()
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showPlay, setShowPlay] = React.useState(false);
  const handleClosePlay = () => setShowPlay(false);
  const handleShowPlay = () => setShowPlay(true);
  const [showStop, setShowStop] = React.useState(false);
  const handleCloseStop = () => setShowStop(false);
  const handleShowStop = () => setShowStop(true);
  const [oneQuizInfo, setOneQuizInfo] = React.useState(0)
  const [quizState, setQuizState] = React.useState(0)
  React.useEffect(() => {
    const oneQuiz = async (qid) => {
      const resDate = await request('GET', `/admin/quiz/${qid}`)
      if (resDate[0]) {
        console.log(resDate[1])
        setOneQuizInfo(resDate[1])
      } else {
        alert(resDate[1].error)
      }
    }
    oneQuiz(info.id)
  }, [info, quizState])

  if (oneQuizInfo === 0) {
    return (
      <></>
    );
  } else {
    let state = 'Inactive'
    let stateColor = styles.stateRed
    const cleantime = oneQuizInfo.createdAt.toLocaleString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    if (oneQuizInfo.active !== null) {
      state = oneQuizInfo.active
      stateColor = styles.stateGreen
    } else {
      stateColor = styles.stateRed
    }
    let duration = 0
    for (let i = 0; i < oneQuizInfo.questions.length; i++) {
      const onetime = parseInt(oneQuizInfo.questions[i].time)
      if (onetime === 1) {
        duration = duration + 10
      } else if (onetime === 2) {
        duration = duration + 30
      } else if (onetime === 3) {
        duration = duration + 60
      } else if (onetime === 4) {
        duration = duration + 120
      } else if (onetime === 5) {
        duration = duration + 300
      }
    }
    const hours = Math.floor(duration / 3600);
    duration = duration - hours * 3600;
    const minutes = Math.floor(duration / 60);
    const seconds = duration - minutes * 60;
    let playButtonCss = styles.Buttonshow
    let stopButtonCss = styles.Buttonunshow
    if (state !== 'Inactive') {
      playButtonCss = styles.Buttonunshow
      stopButtonCss = styles.Buttonshow
    } else {
      playButtonCss = styles.Buttonshow
      stopButtonCss = styles.Buttonunshow
    }
    const startStopCallBack = () => {
      if (quizState === 1) {
        setQuizState(0);
      } else {
        setQuizState(1);
      }
    }
    const updateQuizStateSuccess = () => {
      startStopCallBack();
    }
    return (
      <Accordion.Item eventKey={eventk}>
        <Accordion.Header className={styles.accordionH}>
          <div className={styles.titleContent}>
            <div className={styles.titleText}>
              <div className={styles.headerTitleContainer}>
                <span className={styles.headerTitle} >{oneQuizInfo.name}</span>
              </div>
              <div className={styles.headerState} >State:&nbsp;<span className={stateColor}>{state}</span></div>
              <div className={styles.headerQuestion} >Question:&nbsp;{oneQuizInfo.questions.length}</div>
              <div className={styles.headerDuration} >Duration:&nbsp;{hours}h&nbsp;{minutes}m&nbsp;{seconds}s</div>
            </div>
            <div className={styles.buttonContainer} >
              <Image as='div' src={Play} className={playButtonCss} onClick={(e) => { e.stopPropagation(); StartQuiz(info.id, updateQuizStateSuccess, handleShowPlay) }} />
              <Image as='div' src={Stop} className={stopButtonCss} onClick={(e) => { e.stopPropagation(); StopQuiz(info.id, updateQuizStateSuccess, handleShowStop) }} />
              <Button as='div' className={styles.editbutton} variant="primary" onClick={e => { e.stopPropagation(); navigate(`/edit/${info.id}`) }} >Edit</Button>
              <Button as='div' className={styles.deletebutton} variant="danger" onClick={e => { e.stopPropagation(); handleShow(); }} >Delete</Button>
              <Modal show={show} onHide={handleClose} centered>
                <Modal.Header>
                  <Modal.Title className={styles.modalTitle} >Delete Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Are you sure you want to delete this Quiz?
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={e => { e.stopPropagation(); handleClose(); }}>
                    Close
                  </Button>
                  <Button variant="danger" onClick={e => { e.stopPropagation(); handleClose(); DeleteQuizSubmit(info.id, deleteSuccess) }}>
                    Delete Quiz
                  </Button>
                </Modal.Footer>
              </Modal>
              <Modal show={showPlay} className={styles.modal} onHide={ handleClosePlay } centered>
                <Modal.Header>
                    <Modal.Title className={styles.title}>Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.playText} >
                  Quiz:&nbsp;{oneQuizInfo.name} starts. &nbsp;Your session ID is <span className={styles.fontWeight}>{oneQuizInfo.active}</span>.
                  <br /> Copy this <span className={styles.sessionLink} onClick={e => { navigate(`/play/${oneQuizInfo.active}`) }} >link</span> to your Quiz. <br />Session ID can also be found in the quiz information bar.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={e => { e.stopPropagation(); handleClosePlay() }}>
                    Close
                    </Button>
                </Modal.Footer>
              </Modal>
              <Modal show={showStop} className={styles.modal} onHide={handleCloseStop} centered>
                <Modal.Header>
                    <Modal.Title className={styles.title}>Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Would you like to view the results?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={e => { e.stopPropagation(); handleCloseStop(); navigate(`/results/${oneQuizInfo.oldSessions[0]}`) }}>
                      Results
                    </Button>
                    <Button variant="secondary" onClick={e => { e.stopPropagation(); handleCloseStop() }}>
                      Close
                    </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <div className={styles.bodyText}>
            <div className={styles.oneThird} >Name:&nbsp;&nbsp;{oneQuizInfo.name}</div>
            <div className={styles.oneThird}><span className={styles.fontWeight}>ID:&nbsp;&nbsp;{info.id}</span></div>
            <div className={styles.oneThird}>State:&nbsp;&nbsp;{state}</div>
          </div>
          <div className={styles.bodyText}>
            <div className={styles.oneThird}>Question Number:&nbsp;&nbsp;{oneQuizInfo.questions.length}</div>
            <div className={styles.oneThird}>Duration:&nbsp;&nbsp;{hours}h&nbsp;{minutes}m&nbsp;{seconds}s</div>
            <div className={styles.oneThird}>Creat Time:&nbsp;&nbsp;{cleantime}</div>
          </div>
          <div className={styles.thumbnail}>Thumbnail:
              <img className={styles.thumbnailImage} src={oneQuizInfo.thumbnail} />
          </div>
        </Accordion.Body>
      </Accordion.Item>
    )
  }
}

export default QuizInfo;

QuizInfo.propTypes = {
  eventk: PropTypes.string,
  info: PropTypes.object,
  deleteSuccess: PropTypes.func
}

const DeleteQuizSubmit = async (deleteid, successfunc) => {
  const resDate = await request('DELETE', `/admin/quiz/${deleteid}`)
  if (resDate[0]) {
    successfunc()
  } else {
    alert(resDate[1].error)
  }
}

const StartQuiz = async (startid, successfunc, showPlay) => {
  const resDate = await request('POST', `/admin/quiz/${startid}/start`)
  if (resDate[0]) {
    successfunc();
    showPlay();
  } else {
    alert(resDate[1].error)
  }
}

const StopQuiz = async (stopid, successfunc, showStop) => {
  const resDate = await request('POST', `/admin/quiz/${stopid}/end`)
  if (resDate[0]) {
    successfunc()
    showStop()
  } else {
    alert(resDate[1].error)
  }
}
