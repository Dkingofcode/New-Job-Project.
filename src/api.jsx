// api.js

const BASE_URL = 'http://52.74.166.134:3000';

export const authenticateUser = async (email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      const data = await response.json();
      console.log(data);
      const loginToken = data.message.loginToken;
       return loginToken;
    } catch (error) {
      throw new Error('Login failed');
    }
  };
  
export const fetchGPSData = async (loginToken) => {
  try {
    const response = await fetch(`${BASE_URL}/api`, {
      headers: {
        Authorization: `Bearer ${loginToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch GPS data');
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    throw new Error('Failed to fetch GPS data');
  }
};
