export const validateField = (field: string, val: string): string => {
  switch (field) {
    case 'name':
      if (!val.trim()) return '❌ Please enter your full name.';
      if (val.trim().length < 3) return '❌ Name must contain at least 3 characters.';
      return '';
    case 'email':
      if (!val.trim()) return '❌ Please enter a valid email address.';
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(val.trim())) return '❌ Please enter a valid email address.';
      return '';
    case 'dob':
      if (!val.trim()) return '❌ Please enter date of birth (DD/MM/YYYY).';
      if (val.trim().length < 10) return '❌ Please enter date of birth in DD/MM/YYYY format.';
      return '';
    case 'addressDetails':
      if (!val.trim()) return '❌ Please enter address details (house/floor number).';
      return '';
    case 'recName':
      if (!val.trim()) return "❌ Please enter receiver's name.";
      if (val.trim().length < 3) return "❌ Name must contain at least 3 characters.";
      return '';
    case 'recPhone':
      const cleanPhone = val.replace(/[^0-9]/g, '');
      if (cleanPhone.length !== 10) return "❌ Please enter a valid 10-digit number.";
      return '';
    case 'height':
      const h = parseFloat(val);
      if (isNaN(h) || h <= 0) return '❌ Height must be a positive number.';
      if (h < 50 || h > 250) return '❌ Please enter a valid height (50 - 250 cm).';
      return '';
    case 'weight':
      const w = parseFloat(val);
      if (isNaN(w) || w <= 0) return '❌ Weight must be a positive number.';
      if (w < 20 || w > 300) return '❌ Please enter a valid weight (20 - 300 kg).';
      return '';
    case 'goalWeight':
      const gw = parseFloat(val);
      if (isNaN(gw) || gw <= 0) return '❌ Goal weight must be a positive number.';
      if (gw < 20 || gw > 300) return '❌ Please enter a valid goal weight (20 - 300 kg).';
      return '';
    case 'bedtime':
      if (!val.trim()) return '❌ Please enter a bedtime (HH:MM).';
      return '';
    case 'wakeupTime':
      if (!val.trim()) return '❌ Please enter a wake-up time (HH:MM).';
      return '';
    case 'customWater':
      if (!val.trim()) return '❌ Please enter custom water goal.';
      return '';
    default:
      return '';
  }
};
