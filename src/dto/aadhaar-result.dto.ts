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

export interface AadhaarResultDto {
  frontImage: FrontImageDetailsDto;
  backImage: BackImageDetailsDto;
}