import api from '../../services/axiosConfig';

export const PutUser = async (user) => {
  try {
    const token = localStorage.getItem('auth_token'); 
    const response = await api.put(`/users/${user.id}`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

console.log(response)
    return response.data;
  } catch (error) {
    console.log(error, 'login')
    const errorMessage = error.response?.data?.error;
    throw new Error(errorMessage);
  }
};