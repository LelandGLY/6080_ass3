import { React } from 'react';
import { NavigateLink } from './NavigateComponent';
import logoimage from '../imgs/work.png';
import styles from '../styled/navigationbar.module.css';
import PropTypes from 'prop-types'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom';
import request from '../utils/fetchhelper'

export function NavigationBar ({ state, logoutlink, canSave, saveFunc, showWarning }) {
  const navigate = useNavigate()
  let registerDisplay = styles.show
  let loginDisplay = styles.show
  let logoutDisplay = styles.unshow
  let backDisplay = styles.unshow
  let saveDisplay = styles.unshow
  let checkDisplay = styles.unshow
  let disable = false
  if (state === 'L') {
    registerDisplay = styles.unshow
    loginDisplay = styles.unshow
    logoutDisplay = styles.show
    backDisplay = styles.unshow
  } else if (state === 'LR') {
    registerDisplay = styles.show
    loginDisplay = styles.show
    logoutDisplay = styles.unshow
    backDisplay = styles.unshow
  } else {
    backDisplay = styles.show
    logoutDisplay = styles.show
    registerDisplay = styles.unshow
    loginDisplay = styles.unshow
    if (canSave.length === 0) {
      saveDisplay = styles.show
      disable = false
      checkDisplay = styles.unshow
    } else {
      saveDisplay = styles.show
      disable = true
      checkDisplay = styles.show
    }
  }
  const LogoutSubmit = async () => {
    const token = localStorage.getItem('token')
    const resDate = await request('POST', '/admin/auth/logout', { token })
    if (resDate[0]) {
      localStorage.removeItem('token');
      logoutlink()
    } else {
      alert(resDate[1].error)
    }
  }
  return (
    <Navbar className={styles.navigationbar} collapseOnSelect expand="lg" >
      <div className={styles.barcontainer}>
        <div className={styles.barstaticpart}>
        <img src={logoimage} className={styles.logo} alt="logo" width="42" height="42" />
        <NavLink className={styles.logolink} to="/login">BigBrain</NavLink>
        </div>
        <div>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <div className={styles.placeholder}>.</div>
            <div className={loginDisplay}>
              <NavigateLink to="/login" text='Login'/>
            </div>
            <div className={registerDisplay}>
              <NavigateLink to="/register" text='Register'/>
            </div>
            <div className={checkDisplay}>
              <Button className={styles.saveCheckButton} variant={'warning'} onClick={() => { showWarning() }}>Check</Button>
            </div>
            <div className={saveDisplay}>
              <Button className={styles.saveCheckButton} variant={'success'} disabled={disable} onClick={() => { saveFunc() }}>Save</Button>
            </div>
            <div className={backDisplay}>
              <a className={`nav-link ${styles.linkstyle}`} onClick={() => { navigate('/quiz') } }>Back</a>
            </div>
            <div className={logoutDisplay}>
              <a className={`nav-link ${styles.linkstyle}`} onClick={ LogoutSubmit }>Logout</a>
            </div>
          </Nav>
          </Navbar.Collapse>
        </div>
      </div>
    </Navbar>
  );
}

NavigationBar.propTypes = {
  state: PropTypes.string,
  logoutlink: PropTypes.func,
  canSave: PropTypes.array,
  saveFunc: PropTypes.func,
  showWarning: PropTypes.func
};
