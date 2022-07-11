import React, { Component, ComponentType } from 'react';

import RootProvider from 'app/provider/root-provider';

export default (WrapperComponent: ComponentType<any>) => {
    return class extends Component {
        static options() {
            return {
                topBar: {
                    visible: false,
                    title: {
                        text: 'Home',
                    },
                },
            };
        }

        render() {
            return (
                <RootProvider>
                    <WrapperComponent {...this.props} />
                </RootProvider>
            );
        }
    };
};
