import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function Results () {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  React.useEffect(() => { if (!token) { navigate('/login') } })
  const params = useParams()
  return (
    <h1>Results of {params.session}</h1>
  );
}

export default Results
