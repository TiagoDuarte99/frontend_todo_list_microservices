import axios from 'axios';

// Função para fazer o login
export const login = async (credentials) => {
  try {
    const response = await axios.post('http://localhost:3000/auths/signin', credentials); 
    return response.data; 
  } catch (error) {
    console.log(error,'login')
    const errorMessage = error.response?.data?.error;
    throw new Error(errorMessage);
  }
};