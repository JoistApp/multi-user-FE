import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { login } from '../modules/apiRequests';
import sharedStyles from '../styles/shared';

export default function LogIn() {
  const handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = e.target;
    const response = await login({
      user: {
        email: email.value,
        password: password.value,
      }
    });

    console.log(response);
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