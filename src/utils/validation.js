export const YEAR_OPTIONS = ['1st year', '2nd year', '3rd year', '4th year', 'Postgraduate', 'Other']
export const BRANCH_OPTIONS = ['CSE', 'IT', 'ECE', 'ICE', 'MAE', 'BBA', 'Other']

export function validateRegistration(values) {
  const errors = {}

  const name = (values.name ?? '').trim()
  if (!name) {
    errors.name = 'Please enter your full name.'
  } else if (name.length < 2) {
    errors.name = 'Name should be at least 2 characters.'
  } else if (!/^[\p{L}][\p{L} .'-]*$/u.test(name)) {
    errors.name = 'Use letters, spaces, hyphens or apostrophes only.'
  }

  const email = (values.email ?? '').trim()
  if (!email) {
    errors.email = 'Please enter your email address.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'That does not look like a valid email address.'
  }

  const phone = (values.phone ?? '').replace(/\D/g, '')
  if (!phone) {
    errors.phone = 'Please enter your phone number.'
  } else if (!/^[6-9]\d{9}$/.test(phone)) {
    errors.phone = 'Enter a 10-digit Indian mobile number starting 6–9.'
  }

  if (!values.year) {
    errors.year = 'Select your year of study.'
  }

  if (!values.branch) {
    errors.branch = 'Select your branch.'
  }

  return errors
}

export function validateField(field, values) {
  return validateRegistration({ ...values, [field]: values[field] })[field]
}
