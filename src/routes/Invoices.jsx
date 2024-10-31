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

export default function Invoices() {
  const { hasEditAccess, hasViewAccess} = useProtectAccess('Invoices');

  if (!hasViewAccess) {
    <></>
  }

  const [invoices, setInvoices] = useState([]);
  const userRequestData = useSelector(selectUserData);
  const { isOpen, handleOpen, handleClose } = useModal();
  const getInvoices = async () => {
    const response = await fetchData(userRequestData, 'invoices');
    setInvoices(response.data.invoices);
  }

  useEffect(() => {
    getInvoices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      invoice: {
        email: e.target.email.value,
        name: e.target.name.value,
        phone: e.target.phone.value,
      }
    }

    try {
      const response = await postData(userRequestData, payload, 'invoices');
      setInvoices([...invoices, response.data.invoice]);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1>Invoices</h1>
      {hasEditAccess && <Button variant="contained" onClick={handleOpen} color="primary">Create Invoice</Button>}
      <Box sx={sharedStyles.documentCardContainerStyles}>
        {invoices.map(invoice => (
          <DocumentCard {...invoice} key={invoice.id} />
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
            <h2 id="child-modal-title">Add an Invoice</h2>
            <TextField fullWidth id="name" label="Invoice Name" variant="standard" />
            <TextField fullWidth id="email" label="Email" variant="standard" />
            <TextField fullWidth id="phone" label="Phone" variant="standard" />
            <Button sx={{ marginTop: 5}} type="submit" variant="contained" color="primary" fullWidth>Create Invoice</Button>
          </form> 
        </Box>
      </Modal>
    </div>
  );
}