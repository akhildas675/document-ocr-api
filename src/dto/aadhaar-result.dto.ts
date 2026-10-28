export interface AadhaarResultDto {
  frontImage: FrontImageDetails;
  backImage: BackImageDetails;
  validation: AadhaarValidationResultDto;
}

export interface FrontImageDetails {
  name: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  aadhaarNumber: string | null;
}

export interface BackImageDetails {
  address: string | null;
  pinCode: string | null;
}

export interface AadhaarValidationResultDto {
  isValid: boolean;
  errors: string[];
}