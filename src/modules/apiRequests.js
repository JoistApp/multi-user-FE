import axios from 'axios';

axios.defaults.withCredentials = true; 

export async function signUp({
  email, 
  password,
  confirmPassword,
}) {
  const response = await axios.post(
    'http://localhost:3000/api/v1/signup',
    {
      email,
      password,
      password_confirmation: confirmPassword,
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    }
  );
  return response.data;
}