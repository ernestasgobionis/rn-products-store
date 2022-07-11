import React, { Component, ComponentType } from 'react';

import RootProvider from 'app/provider/root-provider';

export default (WrapperComponent: ComponentType<any>) => {
    return class extends Component {
        static options() {
            return {
                topBar: {
                    visible: false,
                    drawBehind: false,
                },
            };
        }

        render() {
            return (
                <RootProvider {...this.props}>
                    <WrapperComponent {...this.props} />
                </RootProvider>
            );
        }
    };
};