import Cookies from 'js-cookie';
import { jwtDecode }  from 'jwt-decode'; // Certifique-se de que você está importando corretamente

// Verifica se o usuário está autenticado
export const isAuthenticated = () => {
/*   console.log('cheguei ao auths');
  console.log('cookie', document.cookie);
  const token =  Cookies.get('auth_token');
  console.log(token); */
const token = localStorage.getItem('auth_token');

console.log('token', token)

  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);
    const isExpired = decodedToken.exp * 1000 < Date.now(); // Comparando a expiração do token com o tempo atual
    console.log(!isExpired,'isExpired')
    return !isExpired; // Retorna true se o token não estiver expirado
  } catch (error) {
    console.error('Erro ao decodificar o token:', error);
    return false; // Retorna false se houver um erro na decodificação
  }
};