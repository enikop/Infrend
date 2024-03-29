export interface DonationCenterDTO {
  id: number;
  name: string;
  address: string;
  isActive: boolean;
  donations: null | DonationDTO[];
}

export interface DonorDTO {
  id: number;
  name: string;
  gender: 'nő' | 'férfi' | 'egyéb';
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
