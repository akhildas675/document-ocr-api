export interface FrontImageDetailsDto {
  name: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  aadhaarNumber: string | null;
}

export interface BackImageDetailsDto {
  address: string | null;
  pinCode: string | null;
}

export interface AadhaarValidationDto {
  name: boolean;
  dateOfBirth: boolean;
  gender: boolean;
  aadhaarNumber: boolean;
  address: boolean;
  pinCode: boolean;
}

export interface AadhaarResultDto {
  frontImage: FrontImageDetailsDto;
  backImage: BackImageDetailsDto;
  validation: AadhaarValidationDto;
}
