'use client'

import './ContactUsPage.scss';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { StepOne, header as stepOneHeader } from 'app/components/Contact-Sales/StepOne';
import { StepTwo, header as stepTwoHeader } from 'app/components/Contact-Sales/StepTwo';
import { AppStore } from 'app/types/AppStore';
import { useAppDetailsOnLoad } from 'app/shared/hooks/useFetchAppDetails';
import { useParams } from 'next/navigation';
import { StepperWithButtons } from 'app/components/Stepper/StepperWithButtons';


type CommonStepProps = Pick<AppStore, 'icon' | 'title' | 'description'>;

const emptyCustomer = {
    firstName: '',
    lastName: '',
    country: '',
    zipCode: '',
    phoneNumber: '',
    email: '',
    organizationType: '',
    jobTitle: '',
    company: ''
};

// TODO: We currently receive a link with one of these words if the request
// was successful. So, in order to correctly redirect the app, we test for that scenario.
const successResponse = /international-offices|thank-you/;

export default function Page() {
    const { app: slug } = useParams();
    const [step, setStep] = useState<number>(1);
    const [steps, setSteps] = useState<any>([]);
    // const { navigate } = useCustomNavigate();
    const [customer] = useState(emptyCustomer);
    //const { isAuthPurchaseRequired } = useEnvConfig();

    // const {
    //     purchaseWizardState: {
    //         appToBuy: app,
    //         selectedPlan,
    //         customer,
    //         customer: { email },
    //         contactDataResponse,
    //         checkedOptions
    //     },
    //     nonRequiredKeys,
    //     setAppToBuy,
    //     setSelectedPlan,
    //     setCustomer,
    //     sendContactData,
    //     setCheckedOptions
    // } = usePurchaseWizard();

    // useEffect(() => {
    //     // TODO: Pending halding of not happy paths
    //     if (contactDataResponse !== undefined && successResponse.test(contactDataResponse)) {
    //         navigate(`${ROUTE_PATHS.appsPage}/${slug}/contact-sales/thank-you`);
    //     }
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [contactDataResponse]);

    // const onPlanChangeHandler: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    //     setSelectedPlan(e.target.value);
    // }, [setSelectedPlan]);

    // const onDemoChangeHandler: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    //     setCheckedOptions({
    //         ...checkedOptions,
    //         demo: e.target.checked
    //     });
    // }, [setCheckedOptions, checkedOptions]);

    const { app: appDetails } = useAppDetailsOnLoad(slug as string);

    useEffect(() => {
        if (appDetails) {
            const { icon, description, title, plans } = appDetails;
            const commonStepProps: CommonStepProps = {
                icon,
                description,
                title
            };
            // setAppToBuy(appDetails);
            const nextSteps = [
                {
                    ...stepTwoHeader,
                    component: <StepTwo
                        {...commonStepProps}
                        onDemoChangeHandler={() => { }}
                        // onDemoChangeHandler={onDemoChangeHandler}
                        plans={plans}
                        selectedPlan={'Advance'}
                        onPlanChangeHandler={() => { }}
                        // onPlanChangeHandler={onPlanChangeHandler}
                        isEmailReadOnly={false}
                        // isEmailReadOnly={isAuthPurchaseRequired}
                        slug={slug as string}
                    />
                }
            ];
            // if (!isAuthPurchaseRequired) {
            //     nextSteps.shift();
            // }
            setSteps(nextSteps);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [appDetails]);

    const onOkClickHandler = useCallback(() => {
        setStep(currentStep => (currentStep < steps.length ? currentStep + 1 : currentStep));
        if (step === steps.length) {
            //sendContactData();
        }
    }, [setStep, steps, step]);
    const onCancelClickHandler = useCallback(() => { setStep(currentStep => (currentStep > 1 ? currentStep - 1 : currentStep)); }, [setStep]);

    // TODO: Implement a better form validation mechanism,
    // maybe consider a third party library such as react-hook-form or similar
    // for form handling.
    // const disableOkButton = useCallback(() => {
    //     if (!isAuthPurchaseRequired || step === 2) {
    //         return (
    //             Object
    //                 .entries(customer)
    //                 .filter(([key, value]) => !nonRequiredKeys.includes(key as NonRequiredFields) && value === '').length > 0 ||
    //             selectedPlan === ''
    //         );
    //     }
    //     return (step === 1 && customer.email === '');

    // }, [customer, selectedPlan, step, nonRequiredKeys, isAuthPurchaseRequired]);

    const okButtonTitle = useMemo(() => steps.length ? 'Submit form' : 'Continue', [steps]);

    if (steps.length === 0) {
        return null;
    }

    return (
        <div className='d-flex justify-content-center'>
            <div className='gap-1 d-flex flex-column contact-us-page px-4 w-66'>
                <StepperWithButtons
                    steps={steps}
                    currentStep={step}
                    email={''}
                    cancelButtonProps={{
                        title: 'Back',
                        appearance: 'secondary',
                        onClick: onCancelClickHandler,
                        disabled: step === 1,
                        ariaLabel: 'Back'
                    }}
                    okButtonProps={{
                        onClick: onOkClickHandler,
                        title: okButtonTitle,
                        //disabled: disableOkButton(),
                        ariaLabel: okButtonTitle
                    }}
                />
            </div>
        </div>
    );
};
