import api from '../../services/axiosConfig';

export const ToDoList = async (credentials) => {
  try {
    const response = await api.post('/auths/signin', credentials); 
    return response.data; 
  } catch (error) {
    console.log(error,'login')
    const errorMessage = error.response?.data?.error;
    throw new Error(errorMessage);
  }
};