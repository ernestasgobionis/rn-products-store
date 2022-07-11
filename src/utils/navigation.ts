import React from 'react';
import { Dimensions, Platform } from 'react-native';
import { Layout, Navigation, Options } from 'react-native-navigation';
import { LayoutStackChildren } from 'react-native-navigation/lib/src/interfaces/Layout';
import { OptionsBottomTab } from 'react-native-navigation/lib/src/interfaces/Options';
import _ from 'lodash';

import { SCREENS } from 'app/screens/screen-registry';
import THEME from 'app/theme';
import ICONS from 'assets/icons';
import AppStateStore, { Themes } from 'app/store/app-state';
import { StatusModalTypes } from 'app/screens/modal/status-modal';

interface StatusModalProps {
    message: string | string[];
    type: StatusModalTypes;
    title?: string;
    titleColor?: string;
}

const platformAnimations = Platform.select({
    android: {
        push: {
            waitForRender: true,
            content: {
                translationX: {
                    from: Dimensions.get('window').width,
                    to: 0,
                    interpolation: { type: 'accelerate' },
                },
            },
        },
        pop: {
            content: {
                translationX: {
                    from: 0,
                    to: Dimensions.get('window').width,
                    interpolation: { type: 'accelerate' },
                },
            },
        },
    },
    ios: {
        push: {
            waitForRender: true,
        },
    },
});

const currentTheme = AppStateStore.getInstance().getCurrentTheme();

export class NavigationUtils {
    static lastPressedTime = 0;

    static defaultNavigationOptions = {
        animations: {
            setRoot: {
                alpha: {
                    from: 0,
                    to: 1,
                    duration: 350,
                    interpolation: { type: 'accelerate' },
                    waitForRender: true,
                },
                waitForRender: true,
            },
            ...platformAnimations,
        },
        bottomTabs: {
            hideShadow: true,
            elevation: 0,
            titleDisplayMode: 'alwaysShow',
        },
        statusBar: {
            drawBehind: false,
            style: THEME[currentTheme].navigation.statusBar.style,
            backgroundColor: THEME[currentTheme].color.background,
            background: {
                color: THEME[currentTheme].color.primary,
            },
            blur: false,
        },
        popGesture: true,
    };

    static bindComponent(component: React.Component, componentId?: string) {
        return Navigation.events().bindComponent(component, componentId);
    }

    static canNavigate() {
        const now = Date.now();

        if (!this.lastPressedTime || this.lastPressedTime + 750 < now) {
            this.lastPressedTime = now;

            return true;
        }

        return false;
    }

    static push(componentId: string, screen: string, props?: SimpleObject, options?: Options) {
        if (this.canNavigate()) {
            return Navigation.push(componentId, {
                component: {
                    id: screen,
                    name: screen,
                    passProps: {
                        ...props,
                    },
                    options,
                },
            });
        }
    }

    static pop(componentId: string) {
        if (this.canNavigate()) {
            return Navigation.pop(componentId);
        }
    }

    static popTo(componentId: string) {
        Navigation.popTo(componentId);
    }

    static popToRoot(componentId: string) {
        Navigation.popToRoot(componentId);
    }

    static showModal(screen: string, id?: string, props?: SimpleObject, options?: Options) {
        Navigation.showModal({
            stack: {
                children: [
                    {
                        component: {
                            id: id || screen,
                            name: screen,
                            passProps: {
                                ...props,
                            },
                            options: {
                                ...options,
                                topBar: {
                                    ...options?.topBar,
                                    rightButtons: options?.topBar?.rightButtons || [
                                        {
                                            id: 'closeModal',
                                            text: 'Close',
                                            icon: ICONS.CLOSE,
                                        },
                                    ],
                                },
                            },
                        },
                    },
                ],
            },
        });
    }

    static showStatusModal(props: StatusModalProps & SimpleObject, options?: Options) {
        Navigation.showModal({
            stack: {
                children: [
                    {
                        component: {
                            name: SCREENS.MODALS.STATUS,
                            passProps: {
                                ...props,
                            },
                            options: {
                                ...options,
                                topBar: {
                                    ...options?.topBar,
                                    rightButtons: options?.topBar?.rightButtons || [
                                        {
                                            id: 'closeModal',
                                            text: 'Close',
                                            icon: ICONS.CLOSE,
                                        },
                                    ],
                                },
                            },
                        },
                    },
                ],
            },
        });
    }

    static showOverlay(screen: string, id?: string, props?: SimpleObject, options?: Options) {
        Navigation.showOverlay({
            component: {
                name: screen,
                id,
                passProps: {
                    ...props,
                },
                options: {
                    ...options,
                },
            },
        });
    }

    static async dismissModal(componentId: string, options?: Options) {
        await Navigation.dismissModal(componentId, options);
    }

    static async dismissOverlay(componentId: string) {
        Navigation.dismissOverlay(componentId);
    }

    static dismissAllModals(options?: SimpleObject) {
        Navigation.dismissAllModals(options);
    }

    static dismissAllOverlays() {
        Navigation.dismissAllOverlays();
    }

    static mergeOptions(componentId: string, options: Options) {
        const merged = _.merge({}, this.defaultNavigationOptions, options);

        Navigation.mergeOptions(componentId, merged);
    }

    static setDefaultOptions(options: Options) {
        const merged = _.merge({}, this.defaultNavigationOptions, options);

        Navigation.setDefaultOptions(merged);
    }

    static setStackRoot = (componentId: string, screen: string, props?: SimpleObject, options?: Options) => {
        Navigation.setStackRoot(componentId, {
            component: {
                id: screen,
                name: screen,
                passProps: {
                    ...props,
                },
                options: {
                    animations: {
                        push: {
                            waitForRender: true,
                        },
                    },
                    ...options,
                },
            },
        });
    };

    static async setRoot(root: Layout) {
        return Navigation.setRoot({
            root: {
                ...root,
            },
        });
    }

    static async setRootHome(
        options?: Options,
        stackChildren?: {
            home?: LayoutStackChildren[];
            favorites?: LayoutStackChildren[];
            cart?: LayoutStackChildren[];
        },
    ) {
        const appStateInstance = AppStateStore.getInstance();
        const selectedTheme =
            appStateInstance.state.selectedTheme === Themes.default
                ? appStateInstance.state.nativeTheme
                : appStateInstance.state.selectedTheme;
        const theme = THEME[selectedTheme];

        const bottomTabDefaults = {
            iconColor: 'rgba(142,142,147,1)',
            textColor: 'rgba(142,142,147,1)',
            selectedIconColor: theme.color.primaryLabel,
            selectedTextColor: theme.color.primaryLabel,
        };
        const homeTabDefaults = {
            ...bottomTabDefaults,
            text: 'Home',
            icon: ICONS.SEARCH,
        };
        const favoritesTabDefaults = {
            ...bottomTabDefaults,
            text: 'Search',
            icon: ICONS.CLOSE,
        };
        const cartTabDefaults = {
            ...bottomTabDefaults,
            text: 'Search',
            icon: ICONS.CLOSE,
        };

        const homeTabChildren = this.addTabChildren(
            [
                {
                    component: {
                        name: SCREENS.TABS.HOME,
                        id: `${SCREENS.TABS.HOME}Tab`,
                        options: {
                            bottomTab: homeTabDefaults,
                        },
                    },
                },
            ],
            'home',
            homeTabDefaults,
            stackChildren?.home,
        );

        const favoritesTabChildren = this.addTabChildren(
            [
                {
                    component: {
                        name: SCREENS.TABS.FAVORITES,
                        id: `${SCREENS.TABS.FAVORITES}Tab`,
                        options: {
                            bottomTab: favoritesTabDefaults,
                        },
                    },
                },
            ],
            'favorites',
            favoritesTabDefaults,
            stackChildren?.favorites,
        );

        const cartTabChildren = this.addTabChildren(
            [
                {
                    component: {
                        name: SCREENS.TABS.CART,
                        id: `${SCREENS.TABS.CART}Tab`,
                        options: {
                            bottomTab: cartTabDefaults,
                        },
                    },
                },
            ],
            'cart',
            cartTabDefaults,
            stackChildren?.cart,
        );

        // Temp transition to avoid unbinding root tab navigation screens from screen lifecycle events
        await this.setRoot({ component: { name: SCREENS.TEMP_TRANSITION } });

        return this.setRoot({
            bottomTabs: {
                id: 'bottomTabs',
                options: {
                    ...(options || {}),
                    bottomTabs: { tabsAttachMode: 'together', visible: false },
                    animations: {
                        push: {
                            waitForRender: true,
                        },
                    },
                },
                children: [
                    {
                        stack: {
                            children: homeTabChildren,
                        },
                    },
                    {
                        stack: {
                            children: favoritesTabChildren,
                        },
                    },
                    {
                        stack: {
                            children: cartTabChildren,
                        },
                    },
                ],
            },
        });
    }

    private static addTabChildren(
        initial: LayoutStackChildren[],
        name?: string,
        bottomTabDefaults?: OptionsBottomTab,
        extra?: LayoutStackChildren[],
    ): LayoutStackChildren[] {
        return [
            ...initial,
            ...(extra
                ? extra.map((child, idx) => ({
                      ...child,
                      component: {
                          ...child.component,
                          name: child.component?.name || `${name}-TabChild-${idx}`,
                          options: {
                              ...child.component?.options,
                              bottomTab: {
                                  ...child.component?.options?.bottomTab,
                                  ...bottomTabDefaults,
                              },
                          },
                      },
                  }))
                : []),
        ];
    }
}
