import { type ChangeEventHandler } from 'react';
import { type Plan } from '../../types/AppStore';
import { CardApp } from '../shared/CardApp';
import { AppCardPlansAndPricings } from '../Details/AppCardContent/AppCardPricesAndPlans/AppCardPlansAndPricings';
import { AppCardCustomPlan } from '../Details/AppCardContent/AppCardCustomPlan/AppCardCustomPlan';
import { ContactForm } from './ContactForm';

//import { HiddenFields } from './HiddenFields';

import dynamic from "next/dynamic";

const SafCheckbox = dynamic(
  () =>
    import("@saffron/core-components/react").then(module => module.SafCheckbox),
  { ssr: false }
);
const SafDivider = dynamic(
  () => import("@saffron/core-components/react").then(module => module.SafDivider),
  { ssr: false }
);

interface StepTwoProps {
    icon: string;
    title: string;
    description: string;
    slug: string;
    plans: Plan[];
    selectedPlan: string;
    onPlanChangeHandler: ChangeEventHandler;
    isEmailReadOnly?: boolean;
    onDemoChangeHandler: ChangeEventHandler;
}

const acknowledgeMessage = 'Receive communications about Thomson Reuters resources, events, products, or services.';

const descriptionLength = 95;

export const header = {
    title: 'Send us your information.',
    subtitle: 'Fill out this form and we\'ll contact you to discuss your business needs and answer any questions you might have.'
};

export const formName = 'E_PartnerAppLeads_01112024';

export function StepTwo(props: StepTwoProps) {

    const {
        icon,
        title,
        description,
        plans,
        selectedPlan,
        slug,
        isEmailReadOnly,
        onPlanChangeHandler,
        onDemoChangeHandler
    } = props;

    return (
        <>
            <CardApp
                icon={icon}
                title={title}
                description={`${description.substring(0, descriptionLength)}...`}
                iconSize={56}
                readonly
                slug={slug}
            />
            <div className='w-100 pt-2'>
                <SafDivider />
            </div>
            <ContactForm
                headline='Confirm your contact and job details'
                bodyText='* Indicates required field'
                acknowledgeMessage={acknowledgeMessage}
                isEmailReadOnly={isEmailReadOnly}
                formName={formName}
            >
                <div className='gap-2 d-flex flex-column py-4'>
                    <strong id='book-a-demo-label'>Would you like to book a demo?</strong>
                    <SafCheckbox
                        name='demo'
                        aria-labelledby='book-a-demo-label'
                        aria-required='false'
                        onChange={onDemoChangeHandler}
                    >
                        <span>Yes, I&#39;d like an app demo.</span>
                    </SafCheckbox>
                </div>
                <div className='gap-5 d-flex flex-column'>
                    <div className='w-100 pt-2'>
                        <SafDivider />
                    </div>
                    <AppCardPlansAndPricings
                        title={'Select the plan you\'re interested in'}
                        subtitle=''
                        plans={plans}
                        withRadioButton
                        checkedCard={selectedPlan}
                        onChangeHandler={onPlanChangeHandler}
                        alert={{
                            level: 'informational',
                            message: 'Selecting a plan help us better prepare and align with your preferences'
                        }}
                    />
                    <AppCardCustomPlan
                        withRadioButton
                        onChangeHandler={onPlanChangeHandler}
                        isChecked={selectedPlan === 'Custom Plan'}
                    />
                </div>
            </ContactForm>
        </>
    );
}
