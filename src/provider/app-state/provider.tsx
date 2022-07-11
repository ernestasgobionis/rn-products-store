import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { inject, observer } from 'mobx-react';
import { ComponentDidAppearEvent } from 'react-native-navigation';

import Context from './context';
import THEME from 'app/theme';
import AppStateStore, { Themes } from 'app/store/app-state';
import { ThemeInterface } from '../../../styled';

export interface AppStateProviderState {
    setTheme: (theme: string) => void;
    selectedTheme: string;
    nativeTheme: string;
    activeTheme: 'light' | 'dark';
    theme: ThemeInterface;
    navigation: {
        currentScreen?: ComponentDidAppearEvent;
        currentTabIndex: number;
        setCurrentTabIndex: (index: number) => void;
    };
    setPreventInactive: (state: boolean) => void;
}

interface ComponentProps {
    appStateStore: AppStateStore;
    children: React.ReactNode;
}

@inject('appStateStore')
@observer
class AppStateProvider extends Component<ComponentProps> {
    static defaultProps = {
        appStateStore: {},
    };

    setTheme = async (theme: Themes) => {
        const { appStateStore } = this.props;

        await appStateStore.setTheme(theme);
    };

    render() {
        const { children, appStateStore } = this.props;
        const theme =
            appStateStore.state.selectedTheme === Themes.default
                ? THEME[appStateStore.state.nativeTheme]
                : THEME[appStateStore.state.selectedTheme];

        const activeTheme =
            appStateStore.state.selectedTheme === Themes.default
                ? appStateStore.state.nativeTheme
                : appStateStore.state.selectedTheme;

        return (
            <Context.Provider
                value={{
                    appState: {
                        setTheme: this.setTheme,
                        selectedTheme: appStateStore.state.selectedTheme,
                        nativeTheme: appStateStore.state.nativeTheme,
                        activeTheme,
                        navigation: {
                            currentScreen: appStateStore.state.currentScreen,
                            currentTabIndex: appStateStore.state.currentTabIndex,
                            setCurrentTabIndex: appStateStore.setCurrentTabIndex,
                        },
                        theme,
                        setPreventInactive: appStateStore.setPreventInactive,
                    },
                }}
            >
                <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </Context.Provider>
        );
    }
}

export default AppStateProvider;
