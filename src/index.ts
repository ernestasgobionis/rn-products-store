import 'react-native-gesture-handler';
import { LogBox, Platform, UIManager } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Buffer } from 'buffer';

import { ContainerBuilder } from 'app/root/container-builder';
import { HttpMiddlewareRegistrator } from 'app/root/http-middleware-registrator';
import THEME from 'app/theme';
import { NavigationUtils } from 'app/utils/navigation';
import { parameters } from 'app/constants/parameters';
import AppStateStore from './store/app-state';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

global.Buffer = Buffer;

ContainerBuilder.build();
HttpMiddlewareRegistrator.register();

if (parameters.app.env === 'test') {
    LogBox.ignoreAllLogs(true);
}

Navigation.events().registerAppLaunchedListener(async () => {
    const currentTheme = AppStateStore.getInstance().getCurrentTheme();

    NavigationUtils.setDefaultOptions(THEME[currentTheme].navigation);
    await NavigationUtils.setRootHome();
});
