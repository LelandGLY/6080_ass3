import React from 'react';
import styles from '../styled/setpanel.module.css'
import { Offcanvas, Form, Button } from 'react-bootstrap'
import settingbutton from '../imgs/settings.png'
import PropTypes from 'prop-types'
import { fileToDataUrl } from '../utils/imagereader'

function SetlPanel ({ quizInfo, callbackfunc, question }) {
  if (!quizInfo.length) {
    return (<></>)
  } else {
    const questionList = quizInfo[0].questionlist
    let currentQuestionState = { id: 1 }
    let listlocation = 0
    let match = false
    for (let i = 0; i < questionList.length; i++) {
      if (questionList[i].id === parseInt(question)) {
        currentQuestionState = questionList[i]
        listlocation = i
        match = true
      }
    }
    if (match) {
      const updateQuestionState = (data, updatetype) => {
        if (updatetype === 'content') {
          currentQuestionState.content = data
        } else if (updatetype === 'type') {
          currentQuestionState.type = data
        } else if (updatetype === 'time') {
          currentQuestionState.time = data
        } else if (updatetype === 'point') {
          currentQuestionState.point = data
        } else if (updatetype === 'image') {
          currentQuestionState.media.image = data[0]
          currentQuestionState.media.imageN = data[1]
        } else if (updatetype === 'url') {
          currentQuestionState.media.url = data
        } else if (updatetype === 'mediatype') {
          currentQuestionState.media.type = data
        } else if (updatetype === 'number') {
          currentQuestionState.option.number = data
        }
        const newQuizInfo = [...quizInfo]
        newQuizInfo[0].questionlist[listlocation] = currentQuestionState
        callbackfunc(newQuizInfo)
      }
      const content = currentQuestionState.content
      const type = currentQuestionState.type
      const time = currentQuestionState.time
      const point = currentQuestionState.point
      const number = currentQuestionState.option.number
      const mediatype = currentQuestionState.media.type
      const url = currentQuestionState.media.url
      const imagename = currentQuestionState.media.imageN
      let imageInputCss = styles.unshow
      let urlInputCss = styles.unshow
      if (parseInt(mediatype) === 1) {
        imageInputCss = styles.show
        urlInputCss = styles.unshow
      } else if (parseInt(mediatype) === 2) {
        imageInputCss = styles.unshow
        urlInputCss = styles.show
      }
      const [show, setShow] = React.useState(true);
      const handleClose = () => setShow(false);
      const toggleShow = () => setShow((s) => !s);
      const imgfunc = (picture) => {
        try {
          const imageN = picture.name
          const urldata = fileToDataUrl(picture)
          urldata.then((data) => {
            if (data.error) {
              alert(data.error)
            } else {
              updateQuestionState([data, imageN], 'image')
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
          <img src={settingbutton} className={styles.panelButton} onClick={toggleShow}/>
          <Offcanvas className={styles.panel} show={show} onHide={handleClose} scroll={true} placement='end' backdrop={false}>
            <Offcanvas.Header closeButton>
              <div className={styles.setpanelheader}>
                <Offcanvas.Title className={styles.fontWeight}>Question Settings</Offcanvas.Title>
                {/* <Button variant="success" className={styles.hearderButton}>Save</Button> */}
              </div>
            </Offcanvas.Header>
            <div className={styles.line} >line</div>
            <Offcanvas.Body>
            <Form onSubmit={e => { e.preventDefault(); }} >
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Text:</Form.Label>
                <Form.Control value={content} as="textarea" placeholder='Please input your Question' rows={1} onChange={ (e) => { updateQuestionState(e.target.value, 'content') }}/>
              </Form.Group>
              <br />
              <Form.Group>
                <div className={styles.filegroup}>
                  <Form.Label>File:</Form.Label>
                  <Form.Group className={styles.twoCheck} onChange={ (e) => { updateQuestionState(parseInt(e.target.value), 'mediatype') }}>
                    <Form.Check checked={mediatype === 1} name="test" value='1' type={'radio'} label={'Image'} onChange = {() => {}} />
                    <Form.Check checked={mediatype === 2} name="test" value='2' type={'radio'} label={'Url'} onChange = {() => {}} />
                  </Form.Group>
                </div>
                <div className={styles.buttonContainer}>
                  <MyComponent name={imagename} controlcss={imageInputCss} onChangeFunc={(e) => { imgfunc(e.target.files[0]) }}/>
                  <Form.Control placeholder="URL Link" className={urlInputCss} value={url} onChange = { (e) => { updateQuestionState(e.target.value, 'url') } } type='text'/>
                </div>
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Label>Type:</Form.Label>
                <Form.Select value={type} onChange={ (e) => { updateQuestionState(parseInt(e.target.value), 'type') }} aria-label="Default select example">
                  <option value="1">Single choice</option>
                  <option value="2">Multiple choice</option>
                </Form.Select>
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Label>Question number:</Form.Label>
                <Form.Select value={number} onChange={ (e) => { updateQuestionState(parseInt(e.target.value), 'number') }} aria-label="Default select example">
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </Form.Select>
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Label>Time limit:</Form.Label>
                <Form.Select value={time} onChange={ (e) => { updateQuestionState(parseInt(e.target.value), 'time') }} aria-label="Default select example">
                  <option value="1">10 seconds</option>
                  <option value="2">30 seconds</option>
                  <option value="3">1 minute</option>
                  <option value="4">2 minutes</option>
                  <option value="5">5 minutes</option>
                </Form.Select>
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Label>Points:</Form.Label>
                <Form.Select value={point} onChange={ (e) => { updateQuestionState(parseInt(e.target.value), 'point') }} aria-label="Default select example">
                  <option value="1">Standard</option>
                  <option value="2">Double points</option>
                </Form.Select>
              </Form.Group>
            </Form>
            </Offcanvas.Body>
          </Offcanvas>
        </>
      );
    } else {
      return (<></>)
    }
  }
}

export default SetlPanel;

SetlPanel.propTypes = {
  quizInfo: PropTypes.array,
  callbackfunc: PropTypes.func,
  question: PropTypes.string
}

const MyComponent = ({ controlcss, onChangeFunc, name }) => {
  const myRefname = React.useRef(null);
  const handleClick = () => {
    myRefname.current.click();
  }
  return (
    <div className={controlcss}>
    <div className={styles.imageInfo}>
      <Button onClick = {handleClick}>
        <div>Upload</div>
        <input className={styles.unshow} ref = {myRefname} type="file" onChange = { onChangeFunc }/>
      </Button>
      <div className={styles.imageName}>{name}</div>
    </div>
    </div>
  );
}

MyComponent.propTypes = {
  controlcss: PropTypes.string,
  onChangeFunc: PropTypes.func,
  name: PropTypes.string
}
