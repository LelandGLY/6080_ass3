import React from 'react';
import LoginForm from '../components/LoginForm'
import { useNavigate } from 'react-router-dom';
import { NavigationBar } from '../components/NavigationBar'
import styles from '../styled/loginpage.module.css'
import write from '../imgs/loginimage.jpg';
import { Image } from 'react-bootstrap'

function Login () {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  React.useEffect(() => { if (token) { navigate('/quiz') } })
  return (
    <>
    <NavigationBar state={'LR'} logoutlink={() => { navigate('/login') }}/>
    <div className={styles.loginpage}>
      <h1 className={styles.hellowords}>Welcome to BigBrain!</h1>
      <Image fluid={true} src={write} className={styles.wirteimage} />
      <div className={styles.pleasecontainer}>
        <div className={styles.pleasewords}>Please Login:</div>
      </div>
      <div className={styles.loginform}>
        <LoginForm success={() => { navigate('/quiz') }} />
      </div>
    </div>
    </>
  );
}

export default Login
