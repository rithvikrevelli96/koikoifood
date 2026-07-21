export interface Country {
  code: string;
  dialCode: string;
  flag: string;
  name: string;
  minLength: number;
  maxLength: number;
  validationPattern?: RegExp;
}

export const COUNTRIES: Country[] = [
  { code: 'IN', dialCode: '+91', flag: '🇮🇳', name: 'India', minLength: 10, maxLength: 10 },
  { code: 'US', dialCode: '+1', flag: '🇺🇸', name: 'United States', minLength: 10, maxLength: 10 },
  { code: 'GB', dialCode: '+44', flag: '🇬🇧', name: 'United Kingdom', minLength: 10, maxLength: 10 },
  { code: 'AE', dialCode: '+971', flag: '🇦🇪', name: 'United Arab Emirates', minLength: 9, maxLength: 9 },
  { code: 'AU', dialCode: '+61', flag: '🇦🇺', name: 'Australia', minLength: 9, maxLength: 9 },
];
