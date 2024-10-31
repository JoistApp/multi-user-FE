import axios from 'axios';

axios.defaults.withCredentials = true; 

export async function signUp({
  email, 
  password,
  confirmPassword,
}) {
  const response = await axios.post(
    'http://localhost:3000/api/sign_up',
    {
      user: {
        email,
        password,
        password_confirmation: confirmPassword,
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    }, 
    { withCredentials: true }
  );
  return response;
}

export async function signIn({
  email, 
  password,
}) {
  const response = await axios.post(
    'http://localhost:3000/api/sign_in',
    {
      user: {
        email,
        password,
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    }, 
    { withCredentials: true }
  )

  return response;
}