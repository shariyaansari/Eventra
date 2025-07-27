import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Grid,
  Alert,
  CircularProgress
} from '@mui/material';
import { QrCodeScanner, Upload } from '@mui/icons-material';

const CheckIn = () => {
  const { eventId } = useParams();
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);

  const handleStartScan = () => {
    setScanning(true);
    // TODO: Implement QR code scanning
    setTimeout(() => {
      setScanning(false);
      setResult({
        success: true,
        attendee: 'John Doe',
        message: 'Check-in successful!'
      });
    }, 2000);
  };

  const handleManualCheckIn = () => {
    // TODO: Implement manual check-in
    console.log('Manual check-in for event:', eventId);
  };

  const handleBulkUpload = () => {
    // TODO: Implement bulk upload
    console.log('Bulk upload for event:', eventId);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Event Check-in
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Event ID: {eventId}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <QrCodeScanner sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              QR Code Scanner
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Scan attendee QR codes for quick check-in
            </Typography>
            {scanning ? (
              <Box>
                <CircularProgress sx={{ mb: 2 }} />
                <Typography variant="body2">Scanning...</Typography>
              </Box>
            ) : (
              <Button 
                variant="contained" 
                onClick={handleStartScan}
                disabled={scanning}
              >
                Start Scanning
              </Button>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Upload sx={{ fontSize: 60, color: 'secondary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Manual Check-in
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Search and check-in attendees manually
            </Typography>
            <Button 
              variant="outlined" 
              onClick={handleManualCheckIn}
              sx={{ mb: 2, display: 'block', width: '100%' }}
            >
              Manual Check-in
            </Button>
            <Button 
              variant="outlined" 
              onClick={handleBulkUpload}
              sx={{ width: '100%' }}
            >
              Bulk Upload
            </Button>
          </Paper>
        </Grid>

        {result && (
          <Grid item xs={12}>
            <Alert 
              severity={result.success ? 'success' : 'error'}
              sx={{ mt: 2 }}
            >
              {result.success && (
                <strong>{result.attendee}</strong>
              )}
              {' '}
              {result.message}
            </Alert>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default CheckIn;
