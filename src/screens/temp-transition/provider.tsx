import React, { Component, ComponentType } from 'react';

import { AppStateProvider } from 'app/provider/app-state';

export default (WrapperComponent: ComponentType<any>) => {
    return class extends Component {
        static option() {
            return {
                topBar: {
                    visible: false,
                },
            };
        }

        render() {
            return (
                <AppStateProvider {...this.props}>
                    <WrapperComponent {...this.props} />
                </AppStateProvider>
            );
        }
    };
};
