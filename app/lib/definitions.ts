export type CompanyType = "Sole Proprietorship" |
    "General Partnership (GP)" |
    "Limited Partnership (LP)" |
    "Limited Liability Partnership (LLP)" |
    "Limited Liability Company (LLC)" |
    "C Corporation (C Corp)" |
    "S Corporation (S Corp)" |
    "Nonprofit Organization" |
    "Cooperative (Co-op)" |
    "Professional Corporation (PC)" |
    "Professional Limited Liability Company (PLLC)" | '';

export interface Address {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zip: string;
}

export interface Contact {
    firstName: string;
    lastName: string;
    email: string;
    phoneCode: string;
    phone: string;
}

export interface CompanyFormData {
    name: string;
    type: CompanyType | '';
    address: Address;
    contact: Contact;
}

export interface State {
    name: string;
    abbreviation: string;
}

export interface Country {
    name: string;
    phone_code: string;
    flag_url: string;
}

export type SubmitStatus = 'idle' | 'In Progress' | 'Success' | 'Error';

export type Step = 1 | 2 | 3;

export interface FormState {
    current: Step;
    status: SubmitStatus;
    data: FormAllData;
}

export interface FormAllData {
    businessName: string;
    businessType: CompanyType;
    address: Address;
    contact: Contact;
}
