import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRole } from "../features/slices/rolesSlice";
import { selectRolesList } from "../features/selectors/rolesSelector";
import { fetchRoles } from "../features/slices/userSlice";
import {
  Box,
  Button,
  Modal,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const Roles = () => {
  const initialStateCheckbox = {
    roles_visible: false,
    roles_enabled: false,
    users_visble: false,
    users_enabled: false,
    estimates_enabled: false,
    invoices_enabled: false,
    settings_visible: false,
    settings_enabled: false,
  }
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [roleName, setRoleName] = useState('');
  const [roleDescription, setRoleDescription] = useState('');
  const [checkboxes, setCheckboxes] = useState(initialStateCheckbox);
  const roles = useSelector(selectRolesList);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleCheckboxChange = e => {
    const { name, checked } = e.target;
    setCheckboxes(prevState => ({
      ...prevState,
      [name]: checked
    }));
  }

  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      role: {
        name: roleName,
        description: roleDescription,
        ...checkboxes
      }
    }
    dispatch(addRole(data));

    setIsOpen(false);
    setRoleName('');
    setRoleDescription('');
    setCheckboxes(initialStateCheckbox);

  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };  
  const checkboxContainerStyles = {
    display: 'flex',
    '> *': {
      flexGrow: 1
    }
  }

  const fields = [
    {
      label: 'Roles', 
      fields: [
        {name: 'roles_visible', label: 'Read'},
        {name: 'roles_enabled', label: 'Write'},
      ],
    },
    {
      label: 'Users',
      fields: [
        {name: 'users_visible', label: 'Read'},
        {name: 'users_enabled', label: 'Write'},
      ],
    },
    {
      label: 'Documents',
      fields: [
        {name: 'estimates_enabled', label: 'Estimates'},
        {name: 'invoices_enabled', label: 'Invoices'},
      ],
    },
    {
      label: 'Settings',
      fields: [
        {name: 'settings_visible', label: 'Read'},
        {name: 'settings_enabled', label: 'Write'},
      ],
    },
  ]

  useEffect(() => {
    dispatch(fetchRoles());
  }, []);
  return (
    <Box sx={{
      marginLeft: '150px',
    }}>
      <h1>Roles</h1>
      <Button variant="contained" color="primary" onClick={handleOpen}>Add Role</Button>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{
          ...style,
          width: 450,
        }}>
          <form onSubmit={handleSubmit}>
            <h2 id="child-modal-title">Create a new role</h2>
            <TextField
              sx={{ marginBottom: 2 }}
              id="roleName"
              fullWidth
              label="Role Name"
              variant="standard"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            />
            <TextField
              id="description"
              fullWidth
              label="Role Description"
              variant="standard"
              value={roleDescription}
              onChange={(e) => setRoleDescription(e.target.value)}
            />
            <h3>Privilages</h3>
            {fields.map(({label, fields}) => (
              <FormGroup key={label}>
                <h4>{label}</h4>
                <Box sx={checkboxContainerStyles}>
                  {fields.map(({name, label}) => (
                    <FormControlLabel key={name} control={
                      <Checkbox
                        onChange={handleCheckboxChange}
                        checked={checkboxes[name]}
                        name={name}/>}
                        label={label}
                      />
                  ))}
                </Box>
              </FormGroup>
            ))}
            <Button sx={{ marginTop: 5}} type="submit" variant="contained" color="primary" fullWidth>Create Role</Button>
          </form> 
        </Box>
      </Modal>
      <ul>
        {roles?.map(({name, id}) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </Box>
  );
}

export default Roles;