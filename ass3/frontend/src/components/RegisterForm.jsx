import React from 'react';
import PropTypes from 'prop-types'
import request from '../utils/fetchhelper'
import { Form, Button } from 'react-bootstrap'
import styles from '../styled/registerpage.module.css'
import { NavLink } from 'react-router-dom';

function RegisterForm ({ success }) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [conFirmPassword, setConFirmPassword] = React.useState('')
  const [name, setName] = React.useState('')
  const RegisterSubmit = async (body) => {
    const resDate = await request('POST', '/admin/auth/register', body)
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
          <Form.Control type="text" placeholder="username" onChange={e => setName(e.target.value)}/>
          <Form.Label htmlFor="floatingInput">Username</Form.Label>
      </Form.Floating>
      <Form.Floating>
          <Form.Control type="email" placeholder="name@example.com" onChange={e => setEmail(e.target.value)}/>
          <Form.Label htmlFor="floatingInput">Email address</Form.Label>
      </Form.Floating>
      <Form.Floating>
          <Form.Control type="password" placeholder="password" onChange={e => { setPassword(e.target.value) }} />
          <Form.Label htmlFor="floatingInput">Password</Form.Label>
      </Form.Floating>
      <Form.Floating>
          <Form.Control type="password" placeholder="confirmpassword" onChange={e => { setConFirmPassword(e.target.value); }} />
          <Form.Label htmlFor="floatingInput">ConfirmPassword</Form.Label>
      </Form.Floating>
      <div className={styles.gotologin}>
        <Passwordnote passw1={password} passw2={ conFirmPassword }/>
        <div>
          Go to &nbsp;<NavLink className={styles.gotologinbutton} to="/login"> Login</NavLink>
        </div>
      </div>
      <Button variant="primary" size="lg" className={styles.registerbutton} onClick={() => { if ((password === conFirmPassword) && (password !== '')) { RegisterSubmit({ email, password, name }) } else { alert('Passwords do not match') } }}>Register</Button>
    </Form>
  );
}
RegisterForm.propTypes = {
  success: PropTypes.func
}
export default RegisterForm;

function Passwordnote ({ passw1, passw2 }) {
  if ((passw1 === passw2) && (passw1 === '')) {
    return (
      <div className={styles.blankt} >0</div>
    );
  } else if (passw1 === passw2) {
    return (
      <div className={styles.match}>Passwords match</div>
    );
  } else {
    return (
      <div className={styles.dismatch}>Passwords not match</div>
    );
  }
}

Passwordnote.propTypes = {
  passw1: PropTypes.string,
  passw2: PropTypes.string
}
