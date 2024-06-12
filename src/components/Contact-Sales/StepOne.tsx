import { type Customer } from '../../types/Customer';
import { CardApp } from '../shared/CardApp';
import dynamic from "next/dynamic";

const SafAnchor = dynamic(
    () =>
        import("@saffron/core-components/react").then(module => module.SafAnchor),
    { ssr: false }
);
const SafTextfield = dynamic(
    () => import("@saffron/core-components/react").then(module => module.SafTextfield),
    { ssr: false }
);

export interface StepOneProps {
    icon: string;
    title: string;
    description: string;
    slug: string;
    customer: Customer;
    setCustomer: (customer: Customer) => void;
};

export const header = {
    title: 'Enter Your email. You\'ll use it to access the app.',
    subtitle: 'We\'ll create an account if you\'re new, or ask you to sign in.'
};

export function StepOne(props: StepOneProps) {
    const { icon, title, description, customer, slug, setCustomer } = props;
    return (
        <section className='w-100 d-flex flex-column gap-5'>
            <CardApp
                icon={icon}
                title={title}
                description={description}
                iconSize={56}
                slug={slug}
                readonly
            />
            <div>
                <SafTextfield
                    className='form-full'
                    label='Email Address*'
                    required
                    type='email'
                    inputMode='email'
                    aria-label='Email Address'
                    aria-required
                    value={customer.email}
                    onChange={e => {
                        setCustomer({
                            ...customer,
                            email: e.target?.value
                        });
                    }}

                />
                <p>By clicking &#39;Continue&#39;, you agree that Thomson Reuters can keep you informed by sending
                    personalized emails about products and services. Visit our
                    <SafAnchor href='https://www.thomsonreuters.com/en/privacy-statement.html'>Privacy Policy</SafAnchor>
                    page for details or to opt-out at any time.
                </p>
            </div>
        </section>
    );
}
