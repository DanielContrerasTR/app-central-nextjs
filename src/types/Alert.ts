import { type SafAlertProps } from '@saffron/core-components/react';

export interface Alert {
    message: string;
    level: SafAlertProps['appearance'];
}
