import { useDispatch, useSelector } from 'react-redux';
import { selectUserData } from '../features/user/userSelector';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { loginUser } from '../features/user/userSlice';
import sharedStyles from '../styles/shared';

export default function LogIn() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserData);
  const navigate = useNavigate();

  if (user) {
    navigate('/');
  }

  const handleSubmit = e => {
    e.preventDefault();
    const { email, password } = e.target;
    const userData = {
      user: {
        email: email.value,
        password: password.value,
      }
    };  
    dispatch(loginUser(userData));
  }

  return (
  <form onSubmit={handleSubmit}>
    <Box
      sx={sharedStyles.formPage}
    > 
      <h1>We're Excited for your to Join us!</h1>
      <p>But first!</p>
        <TextField id="email" label="Email" variant="standard" />
        <TextField id="password" label="Password" variant="standard" />
        <Button type="submit" variant="contained">I'm Ready to Join!</Button>
    </Box>
  </form>
  );
};