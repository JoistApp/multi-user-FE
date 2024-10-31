import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { fetchData, registerUser } from "../modules/apiRequests"
import useModal from "../hooks/useModal";
import sharedStyles from '../styles/shared';
import {
  Box,
  Button,
  Modal,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { selectUserRequestData } from "../features/selectors/userSelector";

const Users = () => {
  const userRequestData = useSelector(selectUserRequestData);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const { isOpen, handleOpen, handleClose } = useModal();

  const handleDropdownChange = (e) => {
    setSelectedRole(e.target.value);
  }

  const getUsers = async () => {
    const response = await fetchData(userRequestData, 'users');
    setUsers(response.data.users);
  }

  useEffect(() => {

    const getRoles = async () => {
      const response = await fetchData(userRequestData, 'roles');
      setRoles(response.data.roles);
    }

    getRoles();
    getUsers();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      user: {
        email: e.target.email.value,
        password: e.target.password.value,
        password_confirmation: e.target.confirmPassword.value,
        role_id: selectedRole,
        company_id: userRequestData.company_id,
      }
    }

    try {
      await registerUser(payload);
      await getUsers();
      
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1>Employees</h1>
      <Button variant="contained" color="primary" onClick={handleOpen}>Add Employee</Button>
      {users.map(user => (
        <ul key={user.id}>
          <li>{user.email} - {user.role}</li>
        </ul>
      ))}
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{
          ...sharedStyles.modalStyles,
          width: 450,
        }}>
          <form onSubmit={handleSubmit}>
            <h2 id="child-modal-title">Register Employee</h2>
            <TextField fullWidth id="email" label="Email" variant="standard" />
            <TextField fullWidth id="password" label="Password" variant="standard" />
            <TextField fullWidth id="confirmPassword" label="Confirm Password" variant="standard" />
            <FormControl fullWidth sx={{ marginTop: 2 }}>
              <InputLabel id="demo-simple-select-helper-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  label="Role"
                  value={selectedRole}
                  onChange={handleDropdownChange}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200, 
                        overflow: 'auto',
                      },
                    },
                  }}
                >
                  {roles.map(role => <MenuItem value={role.id}>{role.name}</MenuItem>)}
                </Select>
              </FormControl>
            <Button sx={{ marginTop: 5}} type="submit" variant="contained" color="primary" fullWidth>Add an Employee</Button>
          </form> 
        </Box>
      </Modal>
    </div>
  );
};

export default Users;