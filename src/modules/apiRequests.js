import axios from 'axios';

axios.defaults.withCredentials = true; 

export async function signUp(userData) {
  console.log(userData);
  const response = await axios.post(
    'http://localhost:3000/api/v1/sign_up',
    userData, 
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }, 
    { withCredentials: true }
  );
  return response;
}

export async function login(userData) {
  const response = await axios.post(
    'http://localhost:3000/api/v1/sign_in', userData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    }, 
    { withCredentials: true }
  );

  const { id, company_id, auth_token } = response.data;

  const roles = await axios.get(
    `http://localhost:3000/api/v1/${id}/companies/${company_id}/roles`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Api-Authorization': auth_token,
      },
    }, 
    { withCredentials: true }
  );

  console.log(roles);
  return response;
}

