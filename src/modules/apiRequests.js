import axios from 'axios';

axios.defaults.withCredentials = true; 
const base_url = 'http://localhost:3000';

export async function fetchTabs({
  id, company_id, auth_token
}) {
  const response = await axios.get(
    `${base_url}/api/v1/${id}/companies/${company_id}/tabs`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Api-Authorization': `Joist-Token ${auth_token}`,
      },
    }, 
    { withCredentials: true }
  );
  return response;
}

export async function signUp(userData) {
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

  const tabs = await fetchTabs(response.data);
  return {
    data: {
      user: response.data,
      tabs: tabs.data,
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

  const tabs = await fetchTabs(response.data);

  return {
    data: {
      user: response.data,
      tabs: tabs.data.tabs,
    }
  };
}