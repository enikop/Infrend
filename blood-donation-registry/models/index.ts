export enum Gender {
  Female = 'nő',
  Male = 'férfi',
  Other = 'egyéb'
}
export interface DonationCenterDTO {
  id: number;
  institutionId: string;
  name: string;
  address: string;
  isActive: boolean;
  donations: null | DonationDTO[];
}

export interface DonorDTO {
  id: number;
  name: string;
  gender: Gender;
  citizenship: string;
  birthPlace: string;
  birthDate: string;
  address: string;
  socialSecurity: string;
  donations: null | DonationDTO[];
}

export interface BeneficiaryDTO {
  id: number;
  name: string;
  socialSecurity: string;
  donations: null | DonationDTO[];
}

export interface DonationDTO {
  id: number;
  place: null | DonationCenterDTO;
  donor: null | DonorDTO;
  date: string;
  eligible: boolean;
  reason: null | string;
  doctor: string;
  directed: boolean;
  beneficiary: null | BeneficiaryDTO;
}

export interface UserDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string | null;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AccessTokenDTO {
  accessToken: string;
}
