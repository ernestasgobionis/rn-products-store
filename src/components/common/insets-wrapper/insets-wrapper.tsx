import React from 'react';
import { initialWindowMetrics } from 'react-native-safe-area-context';

export interface InsetsWrapperProps {
    insets: {
        top: number;
        bottom: number;
    };
}

function InsetsWrapper<T>(WrappedComponent: React.ComponentClass<T> | any): any {
    const insets = initialWindowMetrics?.insets;

    return (props: T) => (
        <WrappedComponent {...props} insets={{ top: insets?.top || 0, bottom: insets?.bottom || 0 }} />
    );
}

export default InsetsWrapper;
