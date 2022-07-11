import React, { Component } from 'react';
import { observer, Provider } from 'mobx-react';
import { Navigation } from 'react-native-navigation';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import createStore from 'app/store';
import { SCREENS } from 'app/screens/screen-registry';
// Screens
import TempTransitionScreen from 'app/screens/temp-transition';
// Home root
import HomeScreen from 'app/screens/home';
import CartScreen from 'app/screens/cart';
import FavoritesScreen from 'app/screens/favorites';
// Modals
import NoInternetModal from 'app/screens/modal/network';
import StatusModal from 'app/screens/modal/status-modal';
// Common

export const routes = {
    [SCREENS.TEMP_TRANSITION]: TempTransitionScreen,
    [SCREENS.TABS.HOME]: HomeScreen,
    [SCREENS.TABS.FAVORITES]: FavoritesScreen,
    [SCREENS.TABS.CART]: CartScreen,
    [SCREENS.MODALS.NETWORK]: NoInternetModal,
    [SCREENS.MODALS.STATUS]: StatusModal,
};

/**
 * This is needed for Mobx stores to work
 * All Screens are wrapped with Store Provider
 */
function sceneCreator(sceneComp: any, store: SimpleObject) {
    @observer
    class SceneWrapper extends Component {
        static options(passProps: SimpleObject) {
            return sceneComp.options ? sceneComp.options(passProps) : {};
        }

        render() {
            return <Provider {...store}>{React.createElement(sceneComp, this.props)}</Provider>;
        }
    }

    return SceneWrapper;
}

export default () => {
    const stores = createStore();

    for (const r in routes) {
        Navigation.registerComponent(r, () => sceneCreator(gestureHandlerRootHOC(routes[r]), stores));
    }
};
