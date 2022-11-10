import React from 'react';
import styles from '../styled/addnewquizmodal.module.css'
import { Modal, Form, Button } from 'react-bootstrap'
import gearbutton from '../imgs/addbutton.png'
import BackEndPortConfig from '../config.json'
import PropTypes from 'prop-types'

function AddNewQuizModal ({ addSuccess }) {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [quizName, setQuizName] = React.useState('')

  return (
    <>
      <img src={gearbutton} className={styles.addButton} onClick={handleShow}/>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className={styles.title} >Add A New Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={e => { e.preventDefault(); }} >
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Quiz Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="name"
                autoFocus
                onChange={e => { setQuizName(e.target.value) }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => { handleClose(); NewQuizSubmit(quizName, addSuccess) }}>
            Add Quiz
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddNewQuizModal;

const NewQuizSubmit = async (name, successfunc) => {
  const res = await fetch(`http://localhost:${BackEndPortConfig.BACKEND_PORT}/admin/quiz/new`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}`, },
    body: JSON.stringify({
      name: name
    }),
  })
  if (res.status === 200) {
    successfunc()
  } else {
    const resDate = await res.json()
    alert(resDate.error)
  }
}

AddNewQuizModal.propTypes = {
  addSuccess: PropTypes.func
}
