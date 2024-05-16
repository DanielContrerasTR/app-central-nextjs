import { type AppStore } from '../../types/AppStore';
import { type CoveoSearchResponseV2, type Result } from '../../utils/StoreApi/CoveoSearch';

const getSafeValue = (value: string, defaultValue: string) => value || defaultValue;

const defaultValues = (result: Result) => ({
    description: getSafeValue(result.description, 'No description provided'),
    icon: getSafeValue(result.icon, 'Evelyn-icon.svg'),
    coverImage: getSafeValue(result.thumbnails, 'Evelyn-cover.svg')
});

export const coveoToAppStore = (response: CoveoSearchResponseV2): AppStore[] => {
    const apps: AppStore[] = response.results?.map((result: Result, index: number) => {
        
        const app: AppStore = {
            id: `${result.title}.${index}`,
            icon: result.icon,
            coverImage: result.thumbnails,
            title: result.uri.split('/').pop() ?? '', // TODO: Fix with the right title
            periodicity: '', 
            developerName: result.developer,
            worksWith: result.workswith.at(0) ?? '',
            carrousel: [],
            details: {
                categories: result.categories,
                capabilities: result.capabilities,
                supportedLanguages: result.language
            },
            setupSecurity: {
                setup: '',
                timeToLaunch: '',
                security: '',
                integrations: [],
                licenses: []
            },
            description: result.description,
            vendor: {
                website: '',
                email: '',
                address: '',
                phone: '',
                feedback: ''
            },
            policies: {
                returnPolicy: '',
                privacyPolicy: '',
                legalTermsOfUsePolicy: ''
            },
            plans: [],
            faqs: []
        };

        // TODO: When the values get indexed just return app
        return  {
            ...app,
            ...defaultValues(result)
        };
    });

    return apps;
};