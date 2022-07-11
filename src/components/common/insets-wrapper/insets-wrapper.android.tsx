import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function InsetsWrapper<T>(WrappedComponent: React.ComponentClass<T> | any): any {
    return (props: T) => WrapperComp<T>(props, WrappedComponent);
}

function WrapperComp<T>(props: T, WrappedComponent: React.ComponentClass<T> | any) {
    const insets = useSafeAreaInsets();

    return <WrappedComponent {...props} insets={{ top: insets.top, bottom: insets.bottom }} />;
};

export default InsetsWrapper;
