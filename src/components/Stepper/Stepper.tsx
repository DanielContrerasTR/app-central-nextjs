import './Stepper.scss';

import { useMemo } from 'react';
import dynamic from "next/dynamic";

const SafAnchor = dynamic(
    () =>
        import("@saffron/core-components/react").then(module => module.SafAnchor),
    { ssr: false }
);

const SafIcon = dynamic(
    () =>
        import("@saffron/core-components/react").then(module => module.SafIcon),
    { ssr: false }
);

export interface StepperProps {
    steps: Array<[string, string]>;
    current: number;
    email?: string;
}

export function Stepper({ steps, current, email }: StepperProps) {
    const total = useMemo(() => steps.length, [steps]);

    return (
        <div className='d-flex gap-1 flex-column'>
            {
                total > 1 &&
                <strong className='fs-5'>Step {current} of {total}</strong>
            }
            <h1 className='fs-2 p-0 m-0'>{steps[current - 1][0] ?? ''}</h1>
            <p className='p-0 m-0'>{steps[current - 1][1] ?? ''}</p>

            {
                email &&
                <div className='d-flex gap-0 flex-column'>
                    <p className='m-0 pt-4 fs-6'>
                        <SafIcon
                            slot='start'
                            iconName='circle-check'
                            className='stepper-icon'
                            appearance='solid'
                            size={16} />
                        <strong> Signed as </strong>
                    </p>
                    <p className='m-0'>
                        {email} <SafAnchor href='#'>Sign in using a different account</SafAnchor>
                    </p>
                </div>
            }
        </div >
    );
};
