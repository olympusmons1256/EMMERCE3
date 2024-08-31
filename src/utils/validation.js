export const validateUserData = (userData) => {
  const errors = {};

  if (userData.email && typeof userData.email !== 'string') {
    errors.email = "Email must be a string";
  }

  if (userData.organizations && !Array.isArray(userData.organizations)) {
    errors.organizations = "Organizations must be an array";
  }

  if (userData.settings) {
    if (userData.settings.isDarkMode !== undefined && typeof userData.settings.isDarkMode !== 'boolean') {
      errors['settings.isDarkMode'] = "isDarkMode must be a boolean";
    }
    if (userData.settings.isDyslexicFont !== undefined && typeof userData.settings.isDyslexicFont !== 'boolean') {
      errors['settings.isDyslexicFont'] = "isDyslexicFont must be a boolean";
    }
    if (userData.settings.colorblindMode !== undefined && typeof userData.settings.colorblindMode !== 'string') {
      errors['settings.colorblindMode'] = "colorblindMode must be a string";
    }
  }

  return Object.keys(errors).length > 0 ? errors : null;
};

export const validateOrganization = (org) => {
  const errors = {};

  if (!org.name || typeof org.name !== 'string') {
    errors.name = "Organization name is required and must be a string";
  }

  if (!org.id || typeof org.id !== 'string') {
    errors.id = "Organization ID is required and must be a string";
  }

  return Object.keys(errors).length > 0 ? errors : null;
};

export const validateSOWData = (sowData) => {
  const errors = {};

  if (!sowData.projectName || typeof sowData.projectName !== 'string' || !sowData.projectName.trim()) {
    errors.projectName = "Project name is required and must be a non-empty string";
  }

  if (!sowData.clientName || typeof sowData.clientName !== 'string' || !sowData.clientName.trim()) {
    errors.clientName = "Client name is required and must be a non-empty string";
  }

  if (!sowData.effectiveDate || !(sowData.effectiveDate instanceof Date)) {
    errors.effectiveDate = "Effective date is required and must be a valid date";
  }

  if (!sowData.totalAmount || typeof sowData.totalAmount !== 'string' || !/^\$\d+(\.\d{2})?$/.test(sowData.totalAmount)) {
    errors.totalAmount = "Total amount is required and must be a valid currency string (e.g., '$1000.00')";
  }

  if (!sowData.description || typeof sowData.description !== 'string' || sowData.description.trim().length < 10) {
    errors.description = "Description is required and must be at least 10 characters long";
  }

  if (!sowData.clientInfo || typeof sowData.clientInfo !== 'object') {
    errors.clientInfo = "Client information is required and must be an object";
  } else {
    if (!sowData.clientInfo.contactName || typeof sowData.clientInfo.contactName !== 'string') {
      errors['clientInfo.contactName'] = "Contact name is required and must be a string";
    }
    if (!sowData.clientInfo.email || typeof sowData.clientInfo.email !== 'string' || !/\S+@\S+\.\S+/.test(sowData.clientInfo.email)) {
      errors['clientInfo.email'] = "Valid email is required";
    }
    if (!sowData.clientInfo.phone || typeof sowData.clientInfo.phone !== 'string' || !/^\+?[\d\s-]{10,}$/.test(sowData.clientInfo.phone)) {
      errors['clientInfo.phone'] = "Valid phone number is required";
    }
  }

  if (!sowData.termStart || !(sowData.termStart instanceof Date)) {
    errors.termStart = "Term start date is required and must be a valid date";
  }

  if (!sowData.termEnd || !(sowData.termEnd instanceof Date)) {
    errors.termEnd = "Term end date is required and must be a valid date";
  }

  if (sowData.termStart && sowData.termEnd && sowData.termStart >= sowData.termEnd) {
    errors.termDates = "Term end date must be after term start date";
  }

  if (!Array.isArray(sowData.timeline) || sowData.timeline.length === 0) {
    errors.timeline = "Timeline must be a non-empty array";
  } else {
    sowData.timeline.forEach((item, index) => {
      if (!item.task || typeof item.task !== 'string') {
        errors[`timeline[${index}].task`] = "Timeline task is required and must be a string";
      }
      if (!item.start || !(item.start instanceof Date)) {
        errors[`timeline[${index}].start`] = "Timeline start date is required and must be a valid date";
      }
      if (!item.end || !(item.end instanceof Date)) {
        errors[`timeline[${index}].end`] = "Timeline end date is required and must be a valid date";
      }
      if (item.start && item.end && item.start >= item.end) {
        errors[`timeline[${index}].dates`] = "Timeline end date must be after start date";
      }
    });
  }

  if (!Array.isArray(sowData.engineeringTypes) || sowData.engineeringTypes.length === 0) {
    errors.engineeringTypes = "At least one engineering type is required";
  }

  if (!Array.isArray(sowData.roles) || sowData.roles.length === 0) {
    errors.roles = "At least one project role is required";
  }

  if (!Array.isArray(sowData.knowledgeBase) || sowData.knowledgeBase.length === 0) {
    errors.knowledgeBase = "At least one knowledge base item is required";
  }

  if (!sowData.deliveryTerms || typeof sowData.deliveryTerms !== 'string' || sowData.deliveryTerms.trim().length < 10) {
    errors.deliveryTerms = "Delivery terms are required and must be at least 10 characters long";
  }

  if (!sowData.paymentTerms || typeof sowData.paymentTerms !== 'string' || sowData.paymentTerms.trim().length < 10) {
    errors.paymentTerms = "Payment terms are required and must be at least 10 characters long";
  }

  return Object.keys(errors).length > 0 ? errors : null;
};