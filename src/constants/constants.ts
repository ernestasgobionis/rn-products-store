import { Dimensions } from 'react-native';

export const THEMES = {
    DARK: 'dark',
    LIGHT: 'light',
    AUTOMATIC: 'AUTOMATIC',
};

export const STORAGE_KEYS = {
    SELECTED_THEME_TYPE: 'SELECTED_THEME_TYPE',
    SELECTED_THEME: 'SELECTED_THEME',
};

export const DEVICE_WIDTH = Dimensions.get('window').width;

export const DEVICE_HEIGHT = Dimensions.get('window').height;
