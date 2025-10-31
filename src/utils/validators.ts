/**
 * Input Validation Utilities
 */

/**
 * Validate email format
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Validate password strength
 * At least 8 characters
 */
export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

/**
 * Validate password with strong requirements
 * At least 8 chars, 1 uppercase, 1 lowercase, 1 number
 */
export const validateStrongPassword = (password: string): boolean => {
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return strongPasswordRegex.test(password);
};

/**
 * Validate phone number
 * Accepts 10-15 digits
 */
export const validatePhone = (phone: string): boolean => {
  const cleanPhone = phone.replace(/\D/g, '');
  return cleanPhone.length >= 10 && cleanPhone.length <= 15;
};

/**
 * Validate required field (not empty)
 */
export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

/**
 * Validate name (alphabets and spaces only)
 */
export const validateName = (name: string): boolean => {
  const nameRegex = /^[a-zA-Z\s]+$/;
  return nameRegex.test(name.trim()) && name.trim().length >= 2;
};

/**
 * Get validation error message
 */
export const getValidationError = (field: string, value: string): string | null => {
  if (!validateRequired(value)) {
    return `${field} is required`;
  }
  
  if (field.toLowerCase() === 'email' && !validateEmail(value)) {
    return 'Invalid email format';
  }
  
  if (field.toLowerCase() === 'password' && !validatePassword(value)) {
    return 'Password must be at least 8 characters';
  }
  
  if (field.toLowerCase() === 'phone' && !validatePhone(value)) {
    return 'Invalid phone number';
  }
  
  if ((field.toLowerCase() === 'name' || field.toLowerCase().includes('name')) && !validateName(value)) {
    return 'Name must contain only letters';
  }
  
  return null;
};

/**
 * Validate all form fields
 */
export const validateForm = (fields: Record<string, string>): { valid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  
  Object.entries(fields).forEach(([key, value]) => {
    const error = getValidationError(key, value);
    if (error) {
      errors[key] = error;
    }
  });
  
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

