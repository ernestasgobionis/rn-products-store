import { action, observable } from 'mobx';
import { ComponentDidAppearEvent, Navigation } from 'react-native-navigation';
import { Appearance, AppStateStatus } from 'react-native';

import THEME from 'app/theme';
import { NavigationUtils } from 'app/utils/navigation';
import { StorageService } from 'app/services/storage/storage-service';
import { HttpService } from 'app/services/http/service/http-service';

export enum Themes {
    light = 'light',
    dark = 'dark',
    default = 'default',
}

export interface ThemeOption {
    title: string;
    value: Themes;
}

export const ThemeOptions: { [index: string]: ThemeOption } = {
    light: { title: 'Light', value: Themes.light },
    dark: { title: 'Dark', value: Themes.dark },
    default: { title: 'System Default', value: Themes.default },
};

interface State {
    nativeTheme: string;
    selectedTheme: Themes;
    currentScreen?: ComponentDidAppearEvent;
    registeredScreens: Map<string, boolean>;
    currentTabIndex: number;
    preventInactive: boolean;
}

export const getCurrentTheme = Appearance.getColorScheme() || 'light';

class AppStateStore {
    private static instance: AppStateStore;

    private THEME_STORAGE_KEY = 'selectedTheme';

    storageService: StorageService;
    httpService: HttpService;

    @observable.shallow state: State = {
        nativeTheme: getCurrentTheme,
        selectedTheme: Themes.default,
        currentScreen: undefined,
        currentTabIndex: 0,
        registeredScreens: new Map(),
        preventInactive: false,
    };

    previousAppState?: AppStateStatus;

    // bottomTabPressedListener: EmitterSubscription;

    static init(storageService: StorageService, httpService: HttpService) {
        this.instance = new AppStateStore(storageService, httpService);

        return this.instance;
    }

    static getInstance() {
        return this.instance;
    }

    private onThemeChanged = (colorScheme: string) => {
        const themeOptions = {
            ...THEME[colorScheme].navigation,
            bottomTab: {
                ...THEME[colorScheme].navigation.bottomTab,
                iconColor: 'rgba(142,142,147,1)',
                textColor: 'rgba(142,142,147,1)',
                selectedIconColor: THEME[colorScheme].color.primaryLabel,
                selectedTextColor: THEME[colorScheme].color.primaryLabel,
            },
        };

        NavigationUtils.setDefaultOptions(themeOptions);
        Array.from(this.state.registeredScreens.keys()).forEach((screen) => {
            NavigationUtils.mergeOptions(screen, themeOptions);
        });
    };

    private initTheme = async () => {
        const selectedTheme = (await this.storageService.getItem(this.THEME_STORAGE_KEY)) as Themes;

        if (!selectedTheme) {
            await this.storageService.setItem(this.THEME_STORAGE_KEY, Themes.default);
            this.state.selectedTheme = Themes.default;
        } else {
            this.state.selectedTheme = selectedTheme;
        }

        this.onThemeChanged(this.getCurrentTheme());
    };

    @action.bound
    private setNativeTheme(value: string) {
        this.state.nativeTheme = value;
    }

    @action.bound
    private setCurrentScreen(currentScreen?: ComponentDidAppearEvent) {
        this.state.currentScreen = currentScreen;
    }

    @action.bound
    setPreventInactive(state: boolean) {
        this.state.preventInactive = state;
    }

    @action.bound
    setCurrentTabIndex(index: number) {
        this.state.currentTabIndex = index;
    }

    constructor(storageService: StorageService, httpService: HttpService) {
        this.storageService = storageService;
        this.httpService = httpService;
        this.initTheme();

        Navigation.events().registerComponentDidAppearListener((component) => {
            if (component.componentType !== 'Component') return;
            this.setCurrentScreen(component);
            this.state.registeredScreens.set(component.componentId, true);
        });
        Appearance.addChangeListener(({ colorScheme }) => {
            if (colorScheme) this.setNativeTheme(colorScheme);

            if (this.state.selectedTheme === Themes.default && colorScheme) {
                this.onThemeChanged(colorScheme);
            }
        });
    }

    getCurrentTheme = () => {
        const colorScheme = Appearance.getColorScheme();

        if (!colorScheme) {
            return this.state.nativeTheme;
        } else if (this.state.selectedTheme === Themes.default) {
            return colorScheme;
        } else {
            return this.state.selectedTheme;
        }
    };

    @action.bound
    async setTheme(value: Themes) {
        this.state.selectedTheme = value;
        this.onThemeChanged(value === Themes.default ? this.state.nativeTheme : value);
        await this.storageService.setItem(this.THEME_STORAGE_KEY, value);
    }
}

export default AppStateStore;
