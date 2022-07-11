import React from 'react';

import Context from './context';

export default function<T>(WrappedComponent: React.ComponentClass<T>): any {
    return (props: T) => (
        <Context.Consumer>{(connectData) => <WrappedComponent {...props} {...connectData} />}</Context.Consumer>
    );
}
