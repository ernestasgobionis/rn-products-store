import React, { Component } from 'react';

import { ScreenContainer } from 'app/components/ui/screen';
import { withAppState } from 'app/provider/app-state';
import withProvider from './provider';

@withAppState
class TempTransitionScreen extends Component {
    render() {
        return <ScreenContainer />;
    }
}

export default withProvider(TempTransitionScreen);
