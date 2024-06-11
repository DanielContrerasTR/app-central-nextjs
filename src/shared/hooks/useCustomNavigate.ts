'use client'

import { useRouter } from 'next/navigation';

import { useCurrentEnvironment } from './useLocalDevelopment';
import { HOST_PREFIX } from '../constants';


export const useCustomNavigate = () => {
    const navigateBase = useRouter();
    
    const { isAppStoreMfe } = useCurrentEnvironment();

    const navigate = (path: string) => {
        if (isAppStoreMfe) {
            navigateBase.push(path);
        } else {
            navigateBase.push(`${HOST_PREFIX}${path}`);
        }
    };

    return {
        navigate,
        navigateBase 
    };
};