import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUserData } from '../features/selectors/userSelector';
import { fetchData, postData } from "../modules/apiRequests";
import DocumentCard from '../components/DocumentCard';
import useModal from '../hooks/useModal';
import {
  Button,
  Modal,
  Box,
  TextField,
} from '@mui/material';
import sharedStyles from '../styles/shared';
import useProtectAccess from "../hooks/useProtectAccess";

export default function Estimates() {
  const { hasEditAccess, hasViewAccess} = useProtectAccess('Estimates');

  if (!hasViewAccess) {
    <></>
  }

  const [estimates, setEstimates] = useState([]);
  const userRequestData = useSelector(selectUserData);
  const { isOpen, handleOpen, handleClose } = useModal();
  const getEstimates = async () => {
    const response = await fetchData(userRequestData, 'estimates');
    setEstimates(response.data.estimates);
  }

  useEffect(() => {
    getEstimates();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      estimate: {
        email: e.target.email.value,
        name: e.target.name.value,
        phone: e.target.phone.value,
      }
    }

    try {
      const response = await postData(userRequestData, payload, 'estimates');
      setEstimates([...estimates, response.data.estimate]);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1>Estimates</h1>
      {hasEditAccess && <Button variant="contained" onClick={handleOpen} color="primary">Create Estimate</Button>}
      <Box sx={sharedStyles.documentCardContainerStyles}>
        {estimates.map(estimate => (
          <DocumentCard {...estimate} key={estimate.id} isEditable={hasEditAccess}/>
        ))}
      </Box>

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
            <h2 id="child-modal-title">Add an Estimate</h2>
            <TextField fullWidth id="name" label="Estimate Name" variant="standard" />
            <TextField fullWidth id="email" label="Email" variant="standard" />
            <TextField fullWidth id="phone" label="Phone" variant="standard" />
            <Button sx={{ marginTop: 5}} type="submit" variant="contained" color="primary" fullWidth>Create Estimate</Button>
          </form> 
        </Box>
      </Modal>
    </div>
  );
}