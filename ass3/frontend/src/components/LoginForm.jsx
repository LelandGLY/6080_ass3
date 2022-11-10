import React from 'react';
import request from '../utils/fetchhelper'
import PropTypes from 'prop-types'
import styles from '../styled/loginpage.module.css'
import { Form, Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';

function LoginForm ({ success }) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const LoginSubmit = async () => {
    const resDate = await request('POST', '/admin/auth/login', { email, password })
    if (resDate[0]) {
      localStorage.setItem('token', resDate[1].token)
      success()
    } else {
      alert(resDate[1].error)
    }
  }
  return (
      <Form>
          <Form.Floating>
              <Form.Control type="email" placeholder="name@example.com" onChange={e => setEmail(e.target.value)}/>
              <Form.Label htmlFor="floatingInput">Email address</Form.Label>
          </Form.Floating>
          <Form.Floating>
              <Form.Control type="password" placeholder="password" onChange={e => setPassword(e.target.value)}/>
              <Form.Label htmlFor="floatingInput">Password</Form.Label>
          </Form.Floating>
          <div className={styles.gotoregister}>
          Go to &nbsp;<NavLink className={styles.gotoregisterbutton} to="/register"> Register</NavLink>
          </div>
          <Button variant="primary" size="lg" className={styles.loginbutton} onClick={ LoginSubmit }>Login</Button>
      </Form>
  );
}
LoginForm.propTypes = {
  success: PropTypes.func
}
export default LoginForm;
