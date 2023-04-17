import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import jwt from 'jwt-decode';


const LOGIN = gql`
mutation authenticate($email: String!, $password: String!){
  authenticate(email: $email, password: $password){
    _id
    token
  }
}
`;

const UserLogin = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, { error, data }]
    = useMutation(LOGIN);

  if (error) {
    return `Login Failed! ${error.message}`

  };
  if (data) {
    const decoded = jwt(data.authenticate.token);
    console.log(decoded);
    localStorage.setItem('userCategory', decoded.userCategory);
    localStorage.setItem('name', decoded.name);
    if (decoded.userCategory === 'patient') {
      history.push(`/patient`);
    }
    else {
      history.push(`/nurse`);
    }
  }
  return (
    <div className="login">
      {/* Input box to input email */}
      Email Id : &nbsp;&nbsp;&nbsp;
      <input
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      {/* Input box to input password */}
      <br /><br />
      Password :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <input
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      {/* Button to log in */}
      <br />
      <Button variant='primary' type='submit'
        onClick={
          () => login({ variables: { email, password } })
        }
      >
        Log in
      </Button>
    </div>
  );
}
export default UserLogin;