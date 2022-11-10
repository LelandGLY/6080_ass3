import React from 'react';
import styles from '../styled/quizlist.module.css'
import PropTypes from 'prop-types'
import QuizInfo from './QuizInfo';
import { Accordion } from 'react-bootstrap'

function Quizlist ({ listContent, deleteSuccess }) {
  if (listContent.length === 0) {
    return (
    <div className={styles.listContainer}>
      <div className={styles.listTitle} >Quiz List</div>
      <div className={styles.noQuiz}>No Quiz? Click the Add button in the left corner and add new one!</div>
    </div>
    );
  } else {
    const sortList = []
    for (let i = 0; i < listContent.length; i++) {
      const jposttime = listContent[i].createdAt
      const cleantime = jposttime.toLocaleString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      const timetype = new Date(Date.parse(cleantime));
      sortList.push([listContent[i], cleantime, timetype])
    }
    for (let it = 0; it < sortList.length - 1; it++) {
      for (let jt = 0; jt < sortList.length - 1 - it; jt++) {
        if (sortList[jt][2] < sortList[jt + 1][2]) {
          const temp = sortList[jt]
          sortList[jt] = sortList[jt + 1]
          sortList[jt + 1] = temp
        }
      }
    }
    const sortid = []
    for (let j = 0; j < sortList.length; j++) {
      sortid.push(sortList[j][0])
    }
    return (
      <div className={styles.listContainer}>
        <div className={styles.listTitle} >Quiz List</div>
        <Accordion defaultActiveKey="0">
          { React.Children.toArray(
            sortid.map((quiz, index) => {
              return (
                <>
                <QuizInfo eventk={index.toString()} info={quiz} deleteSuccess={deleteSuccess} />
                </>
              )
            })
          )
          }
        </Accordion>
      </div>
    );
  }
}

export default Quizlist;

Quizlist.propTypes = {
  listContent: PropTypes.array,
  deleteSuccess: PropTypes.func
}
