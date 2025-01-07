import axios from 'axios'
import React from 'react'

const App = () => {
  const registerUser  = async() => {
    const data = await axios.post('http://localhost:3000/user/register',{email : "harsh"});
    if (data.status === 404) {
      console.error('Endpoint not found');
    } else {
      console.log('User registered successfully', data);
    }
  }
  registerUser()
  return (
    <div>App</div>
  )
}

export default App