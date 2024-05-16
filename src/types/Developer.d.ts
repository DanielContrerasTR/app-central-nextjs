import { type WithId } from './WithId';

export interface Developer extends WithId<string> {
    website: string;
    address: string;
    email: string;
    privacyPolicyUrl: string;
}