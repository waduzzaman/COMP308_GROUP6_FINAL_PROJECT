import { useHistory } from "react-router-dom";



const UserLogout = () => {
  const history = useHistory();
  localStorage.removeItem('userCategory');
  localStorage.removeItem('name');
  history.push('/login');
  return "User Logged out successfully";
}
export default UserLogout;