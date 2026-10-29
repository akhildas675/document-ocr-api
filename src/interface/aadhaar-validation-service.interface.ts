export interface IAadhaarValidationService {
  validateAadhaarNumber(value: string | null): boolean;
  validateDateOfBirth(value: string | null): boolean;
  validateGender(value: string | null): boolean;
  validatePinCode(value: string | null): boolean;
  validateName(value: string | null): boolean;
  validateAddress(value: string | null): boolean;
}