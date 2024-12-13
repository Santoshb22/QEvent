export const addEventFormValidation = (formData) => {
    let errors = {};
      if (!formData.name.trim()) {
      errors.name = "Event name is required.";
    }
  
    if (!formData.location.trim()) {
      errors.location = "Event location is required.";
    }
  
    if (!formData.artist.trim()) {
      errors.artist = "Event artist is required.";
    }
  
    if (!formData.date) {
      errors.date = "Event date is required.";
    } else if (new Date(formData.date) < new Date()) {
      errors.date = "Event date must be in the future.";
    }
  
    if (!formData.time) {
      errors.time = "Event time is required.";
    }
  
    if (!formData.price) {
      errors.price = "Event price is required.";
    } else if (Number(formData.price) <= 0) {
      errors.price = "Price must be a positive number.";
    }
  
    if (formData.tags.length === 0) {
      errors.tags = "At least one tag is required.";
    }
  
    return errors;
  };
  