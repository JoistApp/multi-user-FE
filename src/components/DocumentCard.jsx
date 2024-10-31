import {
  Button,
  CardActions,
  CardContent,
  Typography,
  Card,
} from '@mui/material';

const DocumentCard = ({
  name, 
  phone,
  email,
}) => {
  return (
  <>
    <Card variant="outlined" sx={{
      flexBasis: '33%',
      minWidth: 360,
      maxWidth: 350,
      padding: 1,
    }}>
      <CardContent>
        <Typography gutterBottom>
          {name}
        </Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
          {email}
        </Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
          {phone}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  </>
  );
}

export default DocumentCard;