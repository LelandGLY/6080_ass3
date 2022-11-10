import BackEndPortConfig from '../config.json'

const request = async (type, url, content) => {
  try {
    const res = await fetch(`http://localhost:${BackEndPortConfig.BACKEND_PORT}${url}`, {
      method: type,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify(content)
    })
    if (res.status === 200) {
      const resDate = await res.json()
      return [1, resDate]
    } else {
      const resDate = await res.json()
      return [0, resDate]
    }
  } catch (err) {
    alert('Network connection is failed!')
  }
}

export default request

// const RegisterSubmit = async () => {
//   try {
//     const res = await fetch(`http://localhost:${BackEndPortConfig.BACKEND_PORT}/admin/auth/register`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         email,
//         password,
//         name
//       })
//     })
//     if (res.status === 200) {
//       const resDate = await res.json()
//       console.log(resDate)
//       localStorage.setItem('token', resDate.token)
//       success()
//     } else {
//       const resDate = await res.json()
//       alert(resDate.error)
//     }
//   } catch (err) {
//     alert('Network connection is failed!')
//   }
// }
