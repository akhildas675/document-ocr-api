
export class AadhaarValidationService {
 
  validateAadhaarNumber(value: string | null): boolean {
    if (!value) {
      return false;
    }

    const normalizedValue = value.replace(/[\s-]/g, "");

    return /^\d{12}$/.test(normalizedValue);
  }

  validateDateOfBirth(value: string | null): boolean {
    if (!value) {
      return false;
    }

    const normalizedValue = value.trim();

    const match = normalizedValue.match(
      /^(\d{2})[/. -](\d{2})[/. -](\d{4})$|^(\d{4})[/. -](\d{2})[/. -](\d{2})$/
    );

    if (!match) {
      return false;
    }

    let day: number;
    let month: number;
    let year: number;

    if (match[1] && match[2] && match[3]) {
      day = Number(match[1]);
      month = Number(match[2]);
      year = Number(match[3]);
    } else {
      year = Number(match[4]);
      month = Number(match[5]);
      day = Number(match[6]);
    }

    const date = new Date(year, month - 1, day);
    const today = new Date();

    const isValidCalendarDate =
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day;

    const isValidYear = year >= 1900 && year <= today.getFullYear();

    return isValidCalendarDate && isValidYear && date <= today;
  }


  validateGender(value: string | null): boolean {
    if (!value) {
      return false;
    }

    const normalizedValue = value.trim().toLowerCase();

    return ["male", "female", "transgender"].includes(normalizedValue);
  }

  
  validatePinCode(value: string | null): boolean {
    if (!value) {
      return false;
    }

    return /^[1-9]\d{5}$/.test(value.trim());
  }


  validateName(value: string | null): boolean {
    if (!value) {
      return false;
    }

    const normalizedValue = value.trim();

    return (
      normalizedValue.length >= 2 &&
      normalizedValue.length <= 100 &&
      /^[a-zA-Z\s.'-]+$/.test(normalizedValue)
    );
  }

  validateAddress(value: string | null): boolean {
    if (!value) {
      return false;
    }

    const normalizedValue = value.trim();

    return normalizedValue.length >= 5 && normalizedValue.length <= 500;
  }
}
