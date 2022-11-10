import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import styles from '../styled/play.module.css'

function Play () {
  const params = useParams()
  return (
    <div className={styles.bigcontainer}>
      <div className={styles.container}>
        <div>Please type in your Session ID</div>
        <Form.Control placeholder={params.session} type='text'/>
        <Button>Join</Button>
      </div>
    </div>
  );
}

export default Play
