import { useCallback } from 'react';

export function useValidation() {
  const validateName = useCallback((name: string): string => {
    if (!name.trim()) return '❌ Please enter your full name.';
    if (name.trim().length < 3) return '❌ Name must contain at least 3 characters.';
    return '';
  }, []);

  const validateEmail = useCallback((email: string): string => {
    if (!email.trim()) return '❌ Please enter a valid email address.';
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email.trim())) return '❌ Please enter a valid email address.';
    return '';
  }, []);

  const validateDob = useCallback((dob: string): string => {
    if (!dob.trim()) return '❌ Please enter date of birth (DD/MM/YYYY).';
    if (dob.trim().length < 10) return '❌ Please enter date of birth in DD/MM/YYYY format.';
    return '';
  }, []);

  const validatePhone = useCallback((phone: string): string => {
    const clean = phone.replace(/[^0-9]/g, '');
    if (clean.length !== 10) return '❌ Please enter a valid 10-digit number.';
    return '';
  }, []);

  const validateHeight = useCallback((height: string): string => {
    const h = parseFloat(height);
    if (isNaN(h) || h <= 0) return '❌ Height must be a positive number.';
    if (h < 50 || h > 250) return '❌ Please enter a valid height (50 - 250 cm).';
    return '';
  }, []);

  const validateWeight = useCallback((weight: string): string => {
    const w = parseFloat(weight);
    if (isNaN(w) || w <= 0) return '❌ Weight must be a positive number.';
    if (w < 20 || w > 300) return '❌ Please enter a valid weight (20 - 300 kg).';
    return '';
  }, []);

  const validateBedtime = useCallback((time: string): string => {
    if (!time.trim()) return '❌ Please enter a bedtime (HH:MM).';
    return '';
  }, []);

  const validateWakeupTime = useCallback((time: string): string => {
    if (!time.trim()) return '❌ Please enter a wake-up time (HH:MM).';
    return '';
  }, []);

  return {
    validateName,
    validateEmail,
    validateDob,
    validatePhone,
    validateHeight,
    validateWeight,
    validateBedtime,
    validateWakeupTime,
  };
}
