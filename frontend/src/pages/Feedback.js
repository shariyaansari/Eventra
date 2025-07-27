import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Box,
  TextField,
  Button,
  Rating,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

const Feedback = () => {
  const { eventId } = useParams();
  const [formData, setFormData] = useState({
    overallRating: 0,
    contentRating: 0,
    organizationRating: 0,
    venueRating: 0,
    comments: '',
    wouldRecommend: '',
    improvements: '',
    favoriteAspect: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field) => (event, newValue) => {
    const value = newValue !== undefined ? newValue : event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Submit feedback to API
    console.log('Feedback submitted:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Container maxWidth="md">
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom color="primary">
            Thank You!
          </Typography>
          <Typography variant="body1">
            Your feedback has been submitted successfully. We appreciate your input!
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Event Feedback
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Event ID: {eventId}
      </Typography>

      <Paper sx={{ p: 4 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Rate Your Experience
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography component="legend" gutterBottom>
              Overall Experience
            </Typography>
            <Rating
              value={formData.overallRating}
              onChange={handleChange('overallRating')}
              size="large"
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography component="legend" gutterBottom>
              Content Quality
            </Typography>
            <Rating
              value={formData.contentRating}
              onChange={handleChange('contentRating')}
              size="large"
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography component="legend" gutterBottom>
              Organization
            </Typography>
            <Rating
              value={formData.organizationRating}
              onChange={handleChange('organizationRating')}
              size="large"
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography component="legend" gutterBottom>
              Venue
            </Typography>
            <Rating
              value={formData.venueRating}
              onChange={handleChange('venueRating')}
              size="large"
            />
          </Box>

          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Additional Feedback
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Comments"
            value={formData.comments}
            onChange={handleChange('comments')}
            sx={{ mb: 3 }}
          />

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Would you recommend this event?</InputLabel>
            <Select
              value={formData.wouldRecommend}
              label="Would you recommend this event?"
              onChange={handleChange('wouldRecommend')}
            >
              <MenuItem value="definitely">Definitely</MenuItem>
              <MenuItem value="probably">Probably</MenuItem>
              <MenuItem value="not-sure">Not Sure</MenuItem>
              <MenuItem value="probably-not">Probably Not</MenuItem>
              <MenuItem value="definitely-not">Definitely Not</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            multiline
            rows={3}
            label="What was your favorite aspect of the event?"
            value={formData.favoriteAspect}
            onChange={handleChange('favoriteAspect')}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            multiline
            rows={3}
            label="What could be improved?"
            value={formData.improvements}
            onChange={handleChange('improvements')}
            sx={{ mb: 3 }}
          />

          <Box display="flex" justifyContent="flex-end">
            <Button
              type="submit"
              variant="contained"
              size="large"
            >
              Submit Feedback
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Feedback;
