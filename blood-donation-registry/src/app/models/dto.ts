export type GenderType = 'nő' | 'férfi' | 'egyéb';
export const GENDER_OPTIONS: GenderType[] = ['nő', 'férfi', 'egyéb'];
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
  gender: GenderType;
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
