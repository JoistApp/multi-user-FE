import axios from 'axios';

axios.defaults.withCredentials = true; 
const base_url = 'http://localhost:3000';

export async function fetchData(userData, target) {
  const { id, company_id, auth_token } = userData;
  const response = await axios.get(
    `${base_url}/api/v1/${id}/companies/${company_id}/${target}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Api-Authorization': `Joist-Token ${auth_token}`,
      },
    }, 
    { withCredentials: true }
  );

  return response.data;
}

export async function postData(userData, payload, target) {
  const { id, company_id, auth_token } = userData;
  const response = await axios.post(
    `${base_url}/api/v1/${id}/companies/${company_id}/${target}`, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Api-Authorization': `Joist-Token ${auth_token}`,
      },
    }, 
    { withCredentials: true }
  );

  return response.data;
}

export async function registerUser(userData) {
  const response = await axios.post(
    `${base_url}/api/v1/sign_up`,
    userData, 
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }, 
    { withCredentials: true }
  );

  return response.data;
}

export async function signUp(userData) {
  debugger;
  const user = await registerUser(userData);
  const { tabs } = await fetchData(user, 'tabs');
  return {
    data: {
      user,
      tabs,
    }
  };
}

export async function login(userData) {
  const response = await axios.post(
    `${base_url}/api/v1/sign_in`, userData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    }, 
    { withCredentials: true }
  );

  const { tabs } = await fetchData(response.data, 'tabs');
  
  return {
    data: {
      user: response.data,
      tabs,
    }
  };
}



