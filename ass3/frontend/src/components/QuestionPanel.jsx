import React from 'react';
import styles from '../styled/questionpanel.module.css'
import { Offcanvas, Button, Card, Form } from 'react-bootstrap'
import question from '../imgs/question.png'
import defaultquestionimg from '../imgs/QuizTime.png'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';
import YoutubeEmbed from './YoutubeShow';
import { fileToDataUrl } from '../utils/imagereader'

localStorage.setItem('questionListLowerBound', 0)

function QuestionPanel ({ quizInfo, callbackfunc }) {
  if (!quizInfo.length) {
    return (<></>)
  } else {
    const navigate = useNavigate()
    const [show, setShow] = React.useState(true);
    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);
    const [questionList, setQuestionList] = React.useState(quizInfo[0].questionlist)
    const addQ = () => {
      const newquestionList = [...questionList];
      const base = parseInt(localStorage.getItem('questionListLowerBound'))
      const newid = base + 1
      newquestionList.push({ id: newid, content: 'Please type Question', type: 1, time: 1, point: 1, media: { type: 1, image: defaultquestionimg, url: '', imageN: 'QuizTime.png' }, option: { number: 4, info: [{ guess: '', truth: 'T' }, { guess: '', truth: 'F' }, { guess: '', truth: 'F' }, { guess: '', truth: 'F' }, { guess: '', truth: '' }, { guess: '', truth: '' }] } })
      localStorage.setItem('questionListLowerBound', newid)
      setQuestionList(newquestionList)
      callbackfunc([{ id: quizInfo[0].id, name: quizInfo[0].name, questionlist: newquestionList, thumbnail: quizInfo[0].thumbnail }])
    }
    const deleteQ = (deleteqid) => {
      const newquestionList = [];
      for (let i = 0; i < questionList.length; i++) {
        if (questionList[i].id !== deleteqid) {
          newquestionList.push(questionList[i])
        }
      }
      setQuestionList(newquestionList)
      callbackfunc([{ id: quizInfo[0].id, name: quizInfo[0].name, questionlist: newquestionList, thumbnail: quizInfo[0].thumbnail }])
    }
    const changeName = (nameText) => {
      const newQuizInfo = [...quizInfo]
      newQuizInfo[0].name = nameText
      callbackfunc(newQuizInfo)
    }
    const changeThumbnail = (thumbnail) => {
      const newQuizInfo = [...quizInfo]
      newQuizInfo[0].thumbnail = thumbnail
      callbackfunc(newQuizInfo)
    }
    React.useEffect(() => {
      if (questionList.length === 0) {
        localStorage.setItem('questionListLowerBound', 0)
      } else {
        localStorage.setItem('questionListLowerBound', questionList[questionList.length - 1].id)
      }
    }, [quizInfo, callbackfunc])
    const imgfunc = (picture) => {
      try {
        const urldata = fileToDataUrl(picture)
        urldata.then((data) => {
          if (data.error) {
            alert(data.error)
          } else {
            changeThumbnail(data)
          }
        }).catch(e => {
          alert('Network connection is failed!')
        });
      } catch (e) {
        alert('provided file is not a png, jpg or jpeg image.')
      }
    }
    return (
      <>
        <img src={question} className={styles.panelButton} onClick={toggleShow}/>
        <Offcanvas className={styles.panel} show={show} onHide={handleClose} scroll={true} backdrop={false}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <div className={styles.questionpanelheader}>
                <div className={styles.nameTitle}>Name:</div>
                <Form.Control className={styles.quizName} as="textarea" value={quizInfo[0].name} rows={1} onChange={ (e) => { changeName(e.target.value) }}/>
              </div>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <div className={styles.secondheader} >
            <div className={styles.thumbnailHeader} >Thumbnail:</div>
            <Form.Control className={styles.headerfile} type="file" onChange = {(e) => { imgfunc(e.target.files[0]) }}/>
          </div>
          <div className={styles.line} >line</div>
          <Offcanvas.Body>
          <Button className={styles.hearderButton} onClick={addQ} >Add Question</Button>
            { React.Children.toArray(
              questionList.map((question, index) => {
                if (question.media.type === 1) {
                  return (
                    <div key={index} className={styles.oneQuestion} >
                      <Card.Header className={styles.oneQuestionHeader} onClick={() => { navigate(`/edit/${quizInfo[0].id}/${question.id}`) }} >Question {index + 1}
                      <Button variant="danger" className={styles.deleteButton} onClick={(e) => { e.stopPropagation(); deleteQ(question.id) }} >Delete</Button>
                      </Card.Header>
                      <Card.Body className={styles.oneQuestionBody} onClick={() => { navigate(`/edit/${quizInfo[0].id}/${question.id}`) }}>
                        <Card.Img src={question.media.image} className={styles.questionthumbnail} />
                      </Card.Body>
                    </div>
                  )
                } else {
                  return (
                    <div key={index} className={styles.oneQuestion} >
                      <Card.Header className={styles.oneQuestionHeader} onClick={() => { navigate(`/edit/${quizInfo[0].id}/${question.id}`) }} >Question {index + 1}
                      <Button variant="danger" className={styles.deleteButton} onClick={(e) => { e.stopPropagation(); deleteQ(question.id) }} >Delete</Button>
                      </Card.Header>
                      <Card.Body className={styles.oneQuestionBody} onClick={() => { navigate(`/edit/${quizInfo[0].id}/${question.id}`) }}>
                        <YoutubeEmbed videoClass={styles.videoResponsive} embedId={question.media.url} width={'300'} height={'130'} />
                      </Card.Body>
                    </div>
                  )
                }
              })
            )
            }
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  }
}

export default QuestionPanel;

QuestionPanel.propTypes = {
  quizInfo: PropTypes.array,
  callbackfunc: PropTypes.func
}
