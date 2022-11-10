import React from 'react';
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import styles from '../styled/QuestionContent.module.css'

function TrueFalse ({ index, option, callbackfunc }) {
  if (option.truth === 'T') {
    return (
      <div className={styles.truth} key={`0${index}`}>
        <Button className={styles.tfButton} key={`1${index}`} variant={'success'} onClick={() => { callbackfunc([index, 1], 'truth') }}>True</Button>
        <Button className={styles.tfButton} key={`2${index}`} variant={'outline-danger'} onClick={() => { callbackfunc([index, 0], 'truth') }}>False</Button>
      </div>
    );
  } else {
    return (
      <div className={styles.truth} key={`0${index}`}>
        <Button className={styles.tfButton} key={`1${index}`} variant={'outline-success'} onClick={() => { callbackfunc([index, 1], 'truth') }}>True</Button>
        <Button className={styles.tfButton} key={`2${index}`} variant={'danger'} onClick={() => { callbackfunc([index, 0], 'truth') }}>False</Button>
      </div>
    );
  }
}

export default TrueFalse

TrueFalse.propTypes = {
  index: PropTypes.number,
  callbackfunc: PropTypes.func,
  option: PropTypes.object,
  type: PropTypes.number
}
