import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigationBar } from '../components/NavigationBar'
import Quizlist from '../components/Quizlist'
import AddNewQuizModal from '../components/AddNewQuizModal'
import request from '../utils/fetchhelper'

function Dashboard () {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  React.useEffect(() => { if (!token) { navigate('/login') } })
  const [quizList, setQuizList] = React.useState([]);
  const [updateQuizList, setUpdateQuizList] = React.useState(1)
  React.useEffect(() => {
    const getQuizList = async () => {
      const resDate = await request('GET', '/admin/quiz')
      if (resDate[0]) {
        setQuizList(resDate[1].quizzes)
      } else {
        alert(resDate[1].error)
      }
    }
    getQuizList()
  }, [updateQuizList]);
  function success () {
    if (updateQuizList === 1) {
      setUpdateQuizList(0)
    } else {
      setUpdateQuizList(1)
    }
  }
  return (
    <>
    <NavigationBar state={'L'} logoutlink={() => { navigate('/login') }}/>
    <AddNewQuizModal addSuccess={ success }/>
    <Quizlist listContent={quizList} deleteSuccess={ success }/>
    </>
  );
}

export default Dashboard;
