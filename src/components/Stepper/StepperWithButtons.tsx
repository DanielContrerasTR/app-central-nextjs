import { type JSX } from 'react';
import { type SafButtonProps } from '@saffron/core-components/react';

import { Stepper } from './Stepper';

import dynamic from "next/dynamic";

const SafButton = dynamic(
    () =>
        import("@saffron/core-components/react").then(module => module.SafButton),
    { ssr: false }
);

export interface StepperWithButtonsProps {
    currentStep: number;
    steps: Step[];
    email?: string;
    cancelButtonProps: SafButtonProps;
    okButtonProps: SafButtonProps;
}

export interface Step {
    title: string;
    subtitle: string;
    component: JSX.Element
}

export function StepperWithButtons(props: StepperWithButtonsProps) {
    const {
        currentStep,
        steps,
        email,
        cancelButtonProps,
        okButtonProps
    } = props;

    return (<div className='purchase-container p-4 gap-5 d-flex flex-column'>
        <section>
            <Stepper
                current={currentStep}
                steps={steps.map(step => [step.title, step.subtitle] )}
                email={email}
            />
        </section>
        { steps[currentStep - 1].component ?? null }
        <div className='gap-2 d-flex'>
            <SafButton {...cancelButtonProps}>
                {cancelButtonProps.title}
            </SafButton>
            <SafButton {...okButtonProps}>
                {okButtonProps.title}
            </SafButton>
        </div>
    </div>);
}
