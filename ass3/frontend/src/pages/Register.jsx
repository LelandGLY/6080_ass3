import React from 'react';
import RegisterForm from '../components/RegisterForm'
import { useNavigate } from 'react-router-dom';
import { NavigationBar } from '../components/NavigationBar'
import styles from '../styled/registerpage.module.css'
import registerimage from '../imgs/QuizTime.png';

function Register () {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  React.useEffect(() => { if (token) { navigate('/quiz') } })
  return (
    <>
    <NavigationBar state={'LR'} logoutlink={() => { navigate('/login') }}/>
    <div className={styles.registerpage}>
      <h1 className={styles.hellowords}>Join Us and Enjoy Your Quiz Time !</h1>
      <div className={styles.formimage}>
        <div className={styles.mediacontrol}>
          <img src={registerimage} className={styles.joinimage} />
        </div>
        <div className={styles.pleaseform} >
          <div className={styles.pleasecontainer}>
            <div className={styles.pleasewords}>Please Register:</div>
          </div>
          <div className={styles.registerform}>
            <RegisterForm success={() => { navigate('/quiz') }} />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Register
