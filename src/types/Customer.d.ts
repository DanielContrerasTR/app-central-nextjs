import type { Person } from './Person';

export interface Customer extends Person {
    country: string;
    zipCode: string;
    jobTitle?: string;
    company?: string;
    organizationType: string;
}
