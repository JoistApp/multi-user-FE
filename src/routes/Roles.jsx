import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useModal from "../hooks/useModal";
import { addRole } from "../features/slices/rolesSlice";
import { selectRolesList } from "../features/selectors/rolesSelector";
import useProtectAccess from "../hooks/useProtectAccess";
import { fetchRoles } from "../features/slices/userSlice";
import sharedStyles from '../styles/shared';
import StyledTableCell from "../components/StyledTableCell";
import StyledTableRow from "../components/StyledTableRow";
import {
  Box,
  Button,
  Modal,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const Roles = () => {
  const { hasEditAccess, hasViewAccess} = useProtectAccess('Roles');

  if (!hasViewAccess) {
    return <></>
  }

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
  const [roleName, setRoleName] = useState('');
  const [roleDescription, setRoleDescription] = useState('');
  const { isOpen, handleClose, handleOpen } = useModal();
  const [checkboxes, setCheckboxes] = useState(initialStateCheckbox);
  const roles = useSelector(selectRolesList);

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

  console.log(roles);
  return (
    <Box>
      <h1>Roles</h1>
      {hasEditAccess && <Button variant="contained" color="primary" onClick={handleOpen}>Add Role</Button>}
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
      <TableContainer component={Paper} sx={{
        minWidth: 375,
        maxWidth: 1000,
        margin: '0 auto',
      }}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">View Roles</StyledTableCell>
              <StyledTableCell align="center">Write Roles</StyledTableCell>
              <StyledTableCell align="center">View Users</StyledTableCell>
              <StyledTableCell align="center">Write Users</StyledTableCell>
              <StyledTableCell align="center">Write Estimates</StyledTableCell>
              <StyledTableCell align="center">Write Invoices</StyledTableCell>
              <StyledTableCell align="center">View Settings</StyledTableCell>
              <StyledTableCell align="center">Write Settings</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles?.map((role) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell align="center">{role.name}</StyledTableCell>
                <StyledTableCell align="center"><Checkbox disabled checked={role.roles_visible} /></StyledTableCell>
                <StyledTableCell align="center"><Checkbox disabled checked={role.roles_enabled} /></StyledTableCell>
                <StyledTableCell align="center"><Checkbox disabled checked={role.users_visible} /></StyledTableCell>
                <StyledTableCell align="center"><Checkbox disabled checked={role.users_enabled} /></StyledTableCell>
                <StyledTableCell align="center"><Checkbox disabled checked={role.estimates_enabled} /></StyledTableCell>
                <StyledTableCell align="center"><Checkbox disabled checked={role.invoices_enabled} /></StyledTableCell>
                <StyledTableCell align="center"><Checkbox disabled checked={role.settings_visible} /></StyledTableCell>
                <StyledTableCell align="center"><Checkbox disabled checked={role.settings_enabled} /></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Roles;