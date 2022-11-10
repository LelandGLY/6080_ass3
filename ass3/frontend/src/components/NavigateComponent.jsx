import React from 'react';
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button';
import styles from '../styled/navigationbar.module.css'

import {
  NavLink,
  useNavigate,
} from 'react-router-dom';

export function NavigateLink ({ to, text }) {
  return (
    <NavLink className={`nav-link ${styles.linkstyle}`} to={to}>{text}</NavLink>
  );
}

NavigateLink.propTypes = {
  LinkClass: PropTypes.string,
  to: PropTypes.string,
  text: PropTypes.string,
};

export function NavigateButton ({ to, text }) {
  const navigate = useNavigate()
  return (
    <Button variant="primary" onClick = {() => navigate(to)}> {text} </Button>
  );
}

NavigateButton.propTypes = {
  to: PropTypes.string,
  text: PropTypes.string,
};
