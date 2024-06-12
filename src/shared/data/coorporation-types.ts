export type CoorporationType = Record<'value' | 'name', string>

export const coorporations: CoorporationType[] = [
    {
        value: 'Corporation or Business ($0-$500M annual revenue)',
        name: 'Corporation or Business ($0-$500M annual revenue)'
    },
    {
        value: 'Corporation or Business ($500M+ annual revenue)',
        name: 'Corporation or Business ($500M+ annual revenue)'
    },
    {
        value: 'Corporate - Non-Legal/Investigative',
        name: 'Financial institution'
    },
    {
        value: 'Government - Federal',
        name: 'Government - Federal'
    },
    {
        value: 'Government - State & Local',
        name: 'Government - State & Local'
    },
    {
        value: 'Law Firm (1-6 attorneys)',
        name: 'Law Firm (1-6 attorneys)'
    },
    {
        value: 'Law Firm (7-10 attorneys)',
        name: 'Law Firm (7-10 attorneys)'
    },
    {
        value: 'Law Firm (11-29 attorneys)',
        name: 'Law Firm (11-29 attorneys)'
    },
    {
        value: 'Law Firm (30 or more attorneys)',
        name: 'Law Firm (30 or more attorneys)'
    },
    {
        value: 'Law School Faculty',
        name: 'Law School Faculty'
    },
    {
        value: 'Law Students',
        name: 'Law Students'
    }
];
