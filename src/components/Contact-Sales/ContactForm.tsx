import './ContactForm.scss';

import { type PropsWithChildren } from 'react';
import {
    type SafButtonProps,
} from '@saffron/core-components/react';
import dynamic from "next/dynamic";

import { type Customer } from '../../types/Customer';

//import { useContactForm } from './useContactForm';
import { countries } from 'app/shared/data/supported-countries';
import { coorporations } from 'app/shared/data/coorporation-types';

const SafAnchor = dynamic(
    () =>
        import("@saffron/core-components/react").then(module => module.SafAnchor),
    { ssr: false }
);
const SafButton = dynamic(
    () => import("@saffron/core-components/react").then(module => module.SafButton),
    { ssr: false }
);
const SafCheckbox = dynamic(
    () =>
        import("@saffron/core-components/react").then(module => module.SafCheckbox),
    { ssr: false }
);
const SafDivider = dynamic(
    () => import("@saffron/core-components/react").then(module => module.SafDivider),
    { ssr: false }
);
const SafListboxOption = dynamic(
    () =>
        import("@saffron/core-components/react").then(module => module.SafListboxOption),
    { ssr: false }
);
const SafSelect = dynamic(
    () => import("@saffron/core-components/react").then(module => module.SafSelect),
    { ssr: false }
);
const SafTextfield = dynamic(
    () =>
        import("@saffron/core-components/react").then(module => module.SafTextfield),
    { ssr: false }
);


interface FormProps {
    headline: string,
    bodyText: string,
    showSubmitButton?: boolean,
    isEmailReadOnly?: boolean,
    submitButtonProps?: SafButtonProps,
    acknowledgeMessage: string,
    formName?: string;
}

export type NonRequiredFields = keyof Pick<Customer, 'jobTitle' | 'organizationType' | 'zipCode'>;

export function ContactForm(props: PropsWithChildren<FormProps>) {
    const {
        headline,
        bodyText,
        showSubmitButton,
        isEmailReadOnly,
        children,
        submitButtonProps,
        acknowledgeMessage,
        formName
    } = props;

    //const { customer: formState, onFormChange: onChange, formatValue, hasEmptyRequiredFields, setAcknowledgeValue } = useContactForm();

    return <section className='section-form'>
        <p className='section-body-small'>{bodyText}</p>
        <h2 className='section-header-title'>{headline}</h2>
        <form className='form' name={formName}>
            <SafTextfield
                label='First name*'
                aria-label='First name'
                aria-required
                required
                type='text'
                inputMode='text'
                name='firstName'
            // value={formState.firstName}
            // onChange={onChange}

            />
            <SafTextfield
                label='Last name*'
                ariaLabel='Last name'
                aria-required
                required
                type='text'
                inputMode='text'
                name='lastName'
            // value={formState.lastName}
            // onChange={onChange}

            />
            <SafTextfield
                className='form-full'
                label='Email address*'
                aria-label='Email address'
                aria-required
                inputMode='email'
                required
                type='email'
                readOnly={isEmailReadOnly}
                name='email'
            // value={formState.email}
            // onChange={onChange}
            />
            <SafSelect
                label='Country/Region*'
                required
                aria-required
                aria-label='Country or Region'
                name='country'
            // value={formState.country}
            // onChange={onChange}
            >
                {countries.map((country, index) => <SafListboxOption
                    value={country.value}
                    // eslint-disable-next-line react/no-array-index-key
                    key={`option-country-${country.value}-${index}`}
                >
                    {country.name}
                </SafListboxOption>)}
            </SafSelect>
            <SafTextfield
                label='Zip or postal code'
                aria-required='false'
                aria-label='Zip or postal code'
                type='text'
                inputMode='text'
                name='zipCode'
            // value={formState.zipCode}
            // onChange={onChange}

            />
            <SafTextfield
                label='Phone number* (numerals only; no dashes)'
                aria-label='Phone number (numerals only; no dashes)'
                aria-required
                required
                type='tel'
                inputMode='tel'
                name='phoneNumber'
            // value={formState.phoneNumber}
            // onKeyDown={(e) => { formatValue('phoneNumber', e); }}
            // onChange={onChange}

            />
            <SafTextfield
                label='Job title'
                aria-label='Job Title'
                aria-required='false'
                type='text'
                inputMode='text'
                name='jobTitle'
            // value={formState.jobTitle}
            // onChange={onChange}
            />
            <SafTextfield
                label='Company*'
                aria-label='Company name'
                aria-required
                required
                type='text'
                inputMode='text'
                name='company'
            // value={formState.company}
            // onChange={onChange}

            />
            <SafSelect
                label='Organization type'
                aria-label='Your organization type'
                aria-required='false'
                name='organizationType'
            // value={formState.organizationType}
            // onChange={onChange}
            >
                {coorporations.map((organizationOption, index) => <SafListboxOption
                    value={organizationOption.value}
                    // eslint-disable-next-line react/no-array-index-key
                    key={`option-organization-${organizationOption.value}-${index}`}
                >
                    {organizationOption.name}
                </SafListboxOption>)}
            </SafSelect>
            <div className='form-full children pt-3 pb-4'>
                {
                    children
                }
            </div>
            <div className='form-full'>
                <div className='w-100 pt-4 pb-4'>
                    <SafDivider />
                </div>
                <SafCheckbox
                    aria-label='Receive communication messages?'
                    invalid={false}
                // onChange={event => { setAcknowledgeValue(event.target.checked); }}
                >
                    {acknowledgeMessage}
                </SafCheckbox>
            </div>
            <div className='form-full'>
                <p>By submitting this form, you acknowledge that you&#39;ve read and agree to our
                    <SafAnchor href='https://www.thomsonreuters.com/en/privacy-statement.html'>Privacy Statement</SafAnchor>.</p>
            </div>
            {
                showSubmitButton &&
                <div className='form-full form-type-button d-flex'>
                    <SafButton type='button'
                        aria-label='Submit'
                        {...submitButtonProps}
                    // disabled={hasEmptyRequiredFields}
                    >
                        Submit
                    </SafButton>
                </div>
            }
        </form>
    </section>;
}
