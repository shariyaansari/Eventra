import React, { useState } from 'react';
import { API_ENDPOINTS, apiUtils } from '../../config/api';
import './EventCreation.css'; 

const EventCreation = () => {
  const [currentStep, setCurrentStep] = useState('form');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    startTime: '',
    endTime: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    location: {
      name: '',
      address: '',
      coordinates: { latitude: '', longitude: '' }
    },
    isVirtual: false,
    virtualLink: '',
    capacity: '',
    isPublic: true,
    requiresApproval: false,
    registrationStart: '',
    registrationEnd: '',
    tags: [],
    ticketTiers: [
      {
        name: 'General Admission',
        price: 0,
        capacity: '',
        description: 'Standard event access'
      }
    ],
    banner: null,
    bannerPreview: null
  });
  const [errors, setErrors] = useState({});
  const [newTag, setNewTag] = useState('');

  // Map frontend categories to backend categories from events.md
  const categories = [
    { label: 'Conference', value: 'CONFERENCE' },
    { label: 'Workshop', value: 'WORKSHOP' },
    { label: 'Meetup', value: 'MEETUP' },
    { label: 'Webinar', value: 'WEBINAR' },
    { label: 'Social', value: 'SOCIAL' },
    { label: 'Sports', value: 'SPORTS' },
    { label: 'Cultural', value: 'CULTURAL' },
    { label: 'Business', value: 'BUSINESS' },
    { label: 'Charity', value: 'CHARITY' },
    { label: 'Other', value: 'OTHER' }
  ];

  const todayString = new Date().toISOString().split('T')[0];

  const validateForm = () => {
    const newErrors = {};
    
    // Title validation (3-200 characters as per API docs)
    if (!formData.title.trim()) {
      newErrors.title = 'Event title is required';
    } else if (formData.title.length < 3 || formData.title.length > 200) {
      newErrors.title = 'Title must be between 3 and 200 characters';
    }
    
    if (!formData.description.trim()) newErrors.description = 'Event description is required';
    if (!formData.category) newErrors.category = 'Please select a category';
    
    // Date validation
    if (!formData.date) {
      newErrors.date = 'Event date is required';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) newErrors.date = 'Event date cannot be in the past';
    }
    
    if (!formData.startTime) newErrors.startTime = 'Start time is required';
    if (!formData.endTime) newErrors.endTime = 'End time is required';
    
    if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime) {
      newErrors.endTime = 'End time must be after start time';
    }
    
    // Location validation
    if (!formData.isVirtual && !formData.location.name.trim()) {
      newErrors.location = 'Location name is required for offline events';
    }
    
    if (formData.isVirtual && !formData.virtualLink.trim()) {
      newErrors.virtualLink = 'Virtual link is required for online events';
    }
    
    // Capacity validation (max 100,000 as per API docs)
    if (formData.capacity) {
      const capacity = Number(formData.capacity);
      if (!capacity || capacity <= 0) {
        newErrors.capacity = 'Please enter a valid number of attendees';
      } else if (capacity > 100000) {
        newErrors.capacity = 'Maximum capacity is 100,000 attendees';
      }
    }
    
    // Registration dates validation
    if (formData.registrationStart && formData.registrationEnd) {
      if (new Date(formData.registrationStart) >= new Date(formData.registrationEnd)) {
        newErrors.registrationEnd = 'Registration end must be after registration start';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('location.coordinates.')) {
      const coordField = name.split('.')[2];
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          coordinates: {
            ...prev.location.coordinates,
            [coordField]: value
          }
        }
      }));
    } else if (name.startsWith('location.')) {
      const locationField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          [locationField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleTicketTierChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      ticketTiers: prev.ticketTiers.map((tier, i) => 
        i === index ? { ...tier, [field]: value } : tier
      )
    }));
  };

  // Add and remove ticket tiers
  const addTicketTier = () => {
    setFormData(prev => ({
      ...prev,
      ticketTiers: [
        ...prev.ticketTiers,
        {
          name: '',
          price: 0,
          capacity: '',
          description: ''
        }
      ]
    }));
  };

  const removeTicketTier = (index) => {
    if (formData.ticketTiers.length > 1) {
      setFormData(prev => ({
        ...prev,
        ticketTiers: prev.ticketTiers.filter((_, i) => i !== index)
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, banner: 'Image size should be less than 5MB' }));
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          banner: file,
          bannerPreview: event.target.result
        }));
      };
      reader.readAsDataURL(file);
      if (errors.banner) {
        setErrors(prev => ({ ...prev, banner: '' }));
      }
    }
  };

  const addTag = () => {
    const trimmed = newTag.trim();
    if (trimmed && !formData.tags.some(tag => tag.toLowerCase() === trimmed.toLowerCase())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, trimmed]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setCurrentStep('preview');
    }
  };

  const createEvent = async () => {
    setLoading(true);
    try {
     
      let coordinates = null;
      if (formData.location.coordinates.latitude && formData.location.coordinates.longitude) {
        const lat = parseFloat(formData.location.coordinates.latitude);
        const lng = parseFloat(formData.location.coordinates.longitude);
        
        // Validate coordinate ranges
        if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
          coordinates = { latitude: lat, longitude: lng };
        }
      }

      
      const eventStartDate = new Date(`${formData.date}T${formData.startTime}`);
      const eventEndDate = new Date(`${formData.date}T${formData.endTime}`);
      
      // Check if dates are valid
      if (isNaN(eventStartDate.getTime()) || isNaN(eventEndDate.getTime())) {
        throw new Error('Invalid date or time format');
      }

      // Ensure end date is after start date
        const eventData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        startDate: eventStartDate.toISOString(),
        endDate: eventEndDate.toISOString(),
        timezone: formData.timezone,
        location: formData.isVirtual ? null : {
          name: formData.location.name.trim(),
          address: formData.location.address?.trim() || '',
          coordinates: coordinates
        },
        isVirtual: formData.isVirtual,
        virtualLink: formData.isVirtual ? formData.virtualLink.trim() : null,
        capacity: formData.capacity ? Number(formData.capacity) : null,
        isPublic: formData.isPublic,
        requiresApproval: formData.requiresApproval,
        registrationStart: formData.registrationStart ? new Date(formData.registrationStart).toISOString() : null,
        registrationEnd: formData.registrationEnd ? new Date(formData.registrationEnd).toISOString() : null,
        category: formData.category,
        tags: formData.tags.filter(tag => tag.trim()), // Filter empty tags
        ticketTiers: formData.ticketTiers
          .filter(tier => tier.name.trim()) // Only include tiers with names
          .map(tier => ({
            name: tier.name.trim(),
            price: Number(tier.price) || 0,
            capacity: tier.capacity ? Number(tier.capacity) : null,
            description: tier.description?.trim() || ''
          }))
      };

      // Validate ticket tiers
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('Authentication required. Please log in and try again.');
        setCurrentStep('form');
        return;
      }
      
      console.log('Sending event data:', eventData); 
      
      const response = await apiUtils.post(API_ENDPOINTS.EVENTS.CREATE, eventData, token);

      
      let result;
      try {
        result = await response.json();
      } catch (parseError) {
        console.error('Failed to parse response:', parseError);
        throw new Error('Invalid response from server');
      }

      console.log('Server response:', result); // Debug log

      if (response.ok && result.success) {
        alert('Event created successfully!');
        resetForm();
      } else {
        // Handle API errors
        if (result.errors && typeof result.errors === 'object') {
          setErrors(result.errors);
          setCurrentStep('form');
        } else {
          const errorMessage = result.message || result.error || `Server error: ${response.status}`;
          alert(`Error creating event: ${errorMessage}`);
        }
        setCurrentStep('form');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      
      // Handle different error types
      let errorMessage = 'Failed to create event. ';
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        errorMessage += 'Network error - please check your connection.';
      } else if (error.message.includes('Invalid date')) {
        errorMessage += 'Please check your date and time values.';
      } else {
        errorMessage += error.message || 'Please try again.';
      }
      
      alert(errorMessage);
      setCurrentStep('form');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      date: '',
      startTime: '',
      endTime: '',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      location: {
        name: '',
        address: '',
        coordinates: { latitude: '', longitude: '' }
      },
      isVirtual: false,
      virtualLink: '',
      capacity: '',
      isPublic: true,
      requiresApproval: false,
      registrationStart: '',
      registrationEnd: '',
      tags: [],
      ticketTiers: [
        {
          name: 'General Admission',
          price: 0,
          capacity: '',
          description: 'Standard event access'
        }
      ],
      banner: null,
      bannerPreview: null
    });
    setErrors({});
    setNewTag('');
    setCurrentStep('form');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="event-creation-container bg-gray-50 dark:bg-black">
      {currentStep === 'form' ? (
        <div className="event-form">
          <h1>Create Event</h1>
          
          <div className="form-group">
            <label htmlFor="title">Event Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter event title (3-200 characters)"
              className={errors.title ? 'error' : ''}
              maxLength="200"
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="banner">Event Banner</label>
            <input
              type="file"
              id="banner"
              accept="image/*"
              onChange={handleImageUpload}
              className={errors.banner ? 'error' : ''}
            />
            {errors.banner && <span className="error-message">{errors.banner}</span>}
            {formData.bannerPreview && (
              <div className="image-preview">
                <img src={formData.bannerPreview} alt="Banner preview" />
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your event"
              rows="4"
              className={errors.description ? 'error' : ''}
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={errors.category ? 'error' : ''}
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
            {errors.category && <span className="error-message">{errors.category}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Event Date *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                min={todayString}
                className={errors.date ? 'error' : ''}
              />
              {errors.date && <span className="error-message">{errors.date}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="startTime">Start Time *</label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
                className={errors.startTime ? 'error' : ''}
              />
              {errors.startTime && <span className="error-message">{errors.startTime}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="endTime">End Time *</label>
              <input
                type="time"
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
                className={errors.endTime ? 'error' : ''}
              />
              {errors.endTime && <span className="error-message">{errors.endTime}</span>}
            </div>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isVirtual"
                checked={formData.isVirtual}
                onChange={handleInputChange}
              />
              This is a virtual event
            </label>
          </div>

          {formData.isVirtual ? (
            <div className="form-group">
              <label htmlFor="virtualLink">Virtual Event Link *</label>
              <input
                type="url"
                id="virtualLink"
                name="virtualLink"
                value={formData.virtualLink}
                onChange={handleInputChange}
                placeholder="https://zoom.us/j/..."
                className={errors.virtualLink ? 'error' : ''}
              />
              {errors.virtualLink && <span className="error-message">{errors.virtualLink}</span>}
            </div>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="location.name">Location Name *</label>
                <input
                  type="text"
                  id="location.name"
                  name="location.name"
                  value={formData.location.name}
                  onChange={handleInputChange}
                  placeholder="Convention Center, Community Hall, etc."
                  className={errors.location ? 'error' : ''}
                />
                {errors.location && <span className="error-message">{errors.location}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="location.address">Address</label>
                <input
                  type="text"
                  id="location.address"
                  name="location.address"
                  value={formData.location.address}
                  onChange={handleInputChange}
                  placeholder="123 Main St, City, State ZIP"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="location.coordinates.latitude">Latitude (optional)</label>
                  <input
                    type="number"
                    id="location.coordinates.latitude"
                    name="location.coordinates.latitude"
                    value={formData.location.coordinates.latitude}
                    onChange={handleInputChange}
                    placeholder="40.7128"
                    step="any"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="location.coordinates.longitude">Longitude (optional)</label>
                  <input
                    type="number"
                    id="location.coordinates.longitude"
                    name="location.coordinates.longitude"
                    value={formData.location.coordinates.longitude}
                    onChange={handleInputChange}
                    placeholder="-74.0060"
                    step="any"
                  />
                </div>
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="capacity">Maximum Attendees</label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              value={formData.capacity}
              onChange={handleInputChange}
              placeholder="Leave empty for unlimited (max: 100,000)"
              min="1"
              max="100000"
              className={errors.capacity ? 'error' : ''}
            />
            {errors.capacity && <span className="error-message">{errors.capacity}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="registrationStart">Registration Start</label>
              <input
                type="datetime-local"
                id="registrationStart"
                name="registrationStart"
                value={formData.registrationStart}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="registrationEnd">Registration End</label>
              <input
                type="datetime-local"
                id="registrationEnd"
                name="registrationEnd"
                value={formData.registrationEnd}
                onChange={handleInputChange}
                className={errors.registrationEnd ? 'error' : ''}
              />
              {errors.registrationEnd && <span className="error-message">{errors.registrationEnd}</span>}
            </div>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isPublic"
                checked={formData.isPublic}
                onChange={handleInputChange}
              />
              Make this event public
            </label>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="requiresApproval"
                checked={formData.requiresApproval}
                onChange={handleInputChange}
              />
              Require approval for registration
            </label>
          </div>

          {/* Ticket Tiers Section */}
          <div className="form-group">
            <label>Ticket Tiers</label>
            {formData.ticketTiers.map((tier, index) => (
              <div key={index} className="ticket-tier">
                <div className="tier-header">
                  <h4>Tier {index + 1}</h4>
                  {formData.ticketTiers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTicketTier(index)}
                      className="remove-tier-btn"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="tier-fields">
                  <input
                    type="text"
                    placeholder="Tier name"
                    value={tier.name}
                    onChange={(e) => handleTicketTierChange(index, 'name', e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    min="0"
                    step="0.01"
                    value={tier.price}
                    onChange={(e) => handleTicketTierChange(index, 'price', e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Capacity (optional)"
                    min="1"
                    value={tier.capacity}
                    onChange={(e) => handleTicketTierChange(index, 'capacity', e.target.value)}
                  />
                  <textarea
                    placeholder="Description"
                    value={tier.description}
                    onChange={(e) => handleTicketTierChange(index, 'description', e.target.value)}
                    rows="2"
                  />
                </div>
              </div>
            ))}
            <button type="button" onClick={addTicketTier} className="add-tier-btn">
              Add Ticket Tier
            </button>
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <div className="tag-input-container">
              <input
                type="text"
                id="tags"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />
              <button type="button" onClick={addTag} className="add-tag-btn">
                Add Tag
              </button>
            </div>
            <div className="tags-container">
              {formData.tags.map((tag, index) => (
                <span key={index} className="tag">
                  #{tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="remove-tag-btn"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              onClick={handleSubmit} 
              className="preview-btn ">
              Preview Event
            </button>
          </div>
        </div>
      ) : (
        <div className="event-preview">
          <h1>Preview</h1>
          
          <div className="preview-content">
            {formData.bannerPreview && (
              <div className="preview-banner">
                <img src={formData.bannerPreview} alt="Event banner" />
              </div>
            )}
            
            <div className="preview-details">
              <h2>{formData.title}</h2>
              <p className="preview-description">{formData.description}</p>
              
              <div className="preview-info">
                <div className="info-item">
                  <strong>Category:</strong> {categories.find(cat => cat.value === formData.category)?.label}
                </div>
                <div className="info-item">
                  <strong>Date:</strong> {formatDate(formData.date)}
                </div>
                <div className="info-item">
                  <strong>Time:</strong> {formatTime(formData.startTime)} - {formatTime(formData.endTime)}
                </div>
                <div className="info-item">
                  <strong>Location:</strong> {formData.isVirtual ? 'Virtual Event' : formData.location.name}
                  {formData.location.address && !formData.isVirtual && (
                    <div className="location-address">{formData.location.address}</div>
                  )}
                </div>
                <div className="info-item">
                  <strong>Max Attendees:</strong> {formData.capacity === '' ? 'Unlimited' : formData.capacity}
                </div>
                <div className="info-item">
                  <strong>Event Type:</strong> {formData.isPublic ? 'Public' : 'Private'}
                </div>
                {formData.requiresApproval && (
                  <div className="info-item">
                    <strong>Registration:</strong> Requires Approval
                  </div>
                )}
              </div>

              {formData.ticketTiers.length > 0 && (
                <div className="preview-tickets">
                  <strong>Ticket Tiers:</strong>
                  {formData.ticketTiers.map((tier, index) => (
                    <div key={index} className="ticket-preview">
                      <span className="tier-name">{tier.name}</span>
                      <span className="tier-price">₹{Number(tier.price).toFixed(2)}</span>
                      {tier.capacity !== '' && tier.capacity !== null && tier.capacity !== undefined && (
                        <span className="tier-capacity">({tier.capacity} available)</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              {formData.tags.length > 0 && (
                <div className="preview-tags">
                  <strong>Tags:</strong>
                  <div className="tags-display">
                    {formData.tags.map((tag, index) => (
                      <span key={index} className="preview-tag">#{tag}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="preview-actions">
            <button onClick={() => setCurrentStep('form')} className="edit-btn" disabled={loading}>
              Edit Event
            </button>
            <button onClick={createEvent} className="publish-btn" disabled={loading}>
              {loading ? 'Creating Event...' : 'Create Event'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCreation;