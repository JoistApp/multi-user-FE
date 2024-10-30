import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import sharedStyles from '../styles/shared';

export default function Signup() {
  return (
  <Box
    sx={sharedStyles.formPage}
  >
    <h1>We're Excited for your to Join us!</h1>
    <p>But first!</p>
    <TextField id="email" label="Email" variant="standard" />
    <TextField id="password" label="Password" variant="standard" />
    <TextField id="confirm-password" label="Confirm Password" variant="standard" />
    <Button variant="contained">I'm Ready to Join!</Button>
  </Box>
  );
};