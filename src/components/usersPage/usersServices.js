import api from '../../services/axiosConfig';

export const Users = async (page) => {
  try {
    const token = localStorage.getItem('auth_token'); 

    const response = await api.get(
      `/users/all?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        }
      }
    );
    console.log('total', response )
    const totalCount = response.headers['x-total-count'];
    const users = response.data
    return {users, totalCount};
  } catch (error) {
    console.log(error)
    const errorMessage = error.response?.data?.error;
    throw new Error(errorMessage);
  }
};