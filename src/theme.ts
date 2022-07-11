import { Platform } from 'react-native';

import { ThemeSize, ThemeSpacing, ThemeText } from 'styled';

export const shadowStyles = {
    regular: {
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowRadius: 5,
        shadowOpacity: 0.25,
        elevation: 5,
    },
    bottomTabs: {
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 8,
        shadowOpacity: 0.15,
        elevation: 5,
    },
};

const SPACING: ThemeSpacing = {
    horizontalPadding: 8,
    listRowHorizontalPadding: 15,
};

const SIZES: ThemeSize = {
    hair: 2,
    micro: 6,
    tiny: 10,
    small: 16,
    medium: 20,
    large: 35,
    big: 50,
    huge: 70,
    massive: 100,

    listRowHeight: 43,
    largeListRowHeight: 60,

    text: {
        tiny: 11,
        small: 14,
        medium: 18,
        large: 22,
        huge: 30,
        massive: 50,
    },
};

const TEXT_ELEMENT_STYLES: ThemeText = {
    largeTitle: {},
    mediumTitle: {},
    smallTitle: {},
    listRowTitle: {
        fontSize: 17,
        letterSpacing: -0.41,
        fontWeight: 400,
    },
    listRowSubtitle: {
        fontSize: 15,
        letterSpacing: -0.24,
        fontWeight: 400,
    },
    tableHeader: {
        fontSize: 13,
        letterSpacing: -0.08,
        fontWeight: 400,
    },
    tableFooter: {
        fontSize: 13,
        letterSpacing: -0.08,
        fontWeight: 400,
    },
};

const COMMON = {
    font: {
        light: Platform.select({
            ios: 'Avenir-Light',
            android: 'AvenirLTStd-Light',
        }),
        normal: Platform.select({
            ios: 'Avenir-Book',
            android: 'AvenirLTStd-Book',
        }),
        bold: Platform.select({
            ios: 'Avenir-Heavy',
            android: 'AvenirLTStd-Heavy',
        }),
        black: Platform.select({
            ios: 'Avenir-Black',
            android: 'AvenirLTStd-Black',
        }),
    },
    size: SIZES,
    text: TEXT_ELEMENT_STYLES,
    spacing: SPACING,
};

const THEME: { [index: string]: any } = {
    light: {
        color: {
            primary: '#1c79ff',
            primaryLabel: '#1c79ff',
            textPrimary: '#515151',
            textSecondary: 'rgba(142,142,147,1)',
            textListSection: 'rgba(142,142,147,1)',
            background: '#fff',
            backgroundSecondary: '#fff',
            border: '#B2B2B2',
            success: '#2FB248',
            error: 'rgba(236, 107, 107, 1)',
            listSection: '#fff',
            listRow: '#fff',
            listHeaderRow: 'rgb(232, 232, 232)',
            listRowSeparator: '',
            sectionHeader: 'rgba(242,242,247, 1)',
            screenContainer: '#f1f1f1',
            searchBackground: '#fff',
            disclosureIndicator: 'rgb(80,80,80)',
            modalOverlay: 'rgba(255, 255, 255, 0.75)',
            raisedCard: '#fff',
            input: {
                background: 'rgba(0, 0, 0, 0.08)',
                border: '#bababa',
                placeholder: '#C1C1C1',
            },
            dateTimePicker: {
                background: 'rgba(0, 0, 0, 0.02)',
            },
            button: {
                background: '#C4C4C4',
                disabled: 'rgba(0, 0, 0, 0.08)',
                text: '#000',
                disabledText: '#fff',
                primaryText: '#fff',
                link: '#6f87ff',
            },
            shadow: {
                regular: 'rgb(127, 131, 145)',
            },
            message: {
                activityBackground: '#fff',
                activityText: '#515151',
                receivedBackground: '#E9E9E9',
                receivedText: '#515151',
                sentText: '#fff',
            },
        },
        navigation: {
            statusBar: {
                style: 'dark',
            },
            topBar: {
                background: {
                    color: '#fff',
                },
                title: {
                    color: 'rgb(62, 72, 118)',
                    fontFamily: COMMON.font.bold,
                },
                largeTitle: {
                    color: '#000',
                    fontFamily: COMMON.font.heavy,
                },
                leftButtonColor: 'rgb(62, 72, 118)',
                rightButtonColor: 'rgb(62, 72, 118)',
            },
            layout: {
                backgroundColor: '#fff',
                componentBackgroundColor: '#fff',
            },
            bottomTabs: {
                backgroundColor: '#fff',
                fontFamily: COMMON.font.normal,
            },
            bottomTab: {
                fontFamily: COMMON.font.normal,
            },
        },
        ...COMMON,
    },
    dark: {
        color: {
            primary: '#1c79ff',
            primaryLabel: '#fff',
            textPrimary: '#fff',
            textSecondary: 'rgba(142,142,147,1)',
            textListSection: '#6e6e72',
            background: '#000',
            backgroundSecondary: '#1c1c1e',
            border: '#38383A',
            success: '#2FB248',
            error: 'rgba(236, 107, 107, 1)',
            listSection: '#1c1c1e',
            sectionHeader: '#000',
            listRow: '#1c1c1e',
            listHeaderRow: 'rgb(25, 25, 25)',
            listRowSeparator: '',
            screenContainer: '#000',
            searchBackground: '#000',
            disclosureIndicator: 'rgba(203,203,205,1)',
            modalOverlay: 'rgba(0, 0, 0, 0.75)',
            raisedCard: 'rgb(25, 25, 25)',
            input: {
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'rgba(255, 255, 255, 0.4)',
                placeholder: 'rgba(255, 255, 255, 0.5)',
            },
            dateTimePicker: {
                background: 'rgba(255, 255, 255, 0.1)',
            },
            button: {
                background: '#C4C4C4',
                disabled: 'rgba(0, 0, 0, 0.5)',
                text: '#fff',
                disabledText: 'rgba(255, 255, 255, 0.75)',
                primaryText: '#fff',
                link: '#6f87ff',
            },
            shadow: {
                regular: 'rgb(65,67,73)',
            },
            message: {
                activityBackground: '#38383A',
                activityText: '#fff',
                receivedBackground: '#1c1c1e',
                receivedText: '#fff',
                sentText: '#fff',
            },
        },
        navigation: {
            statusBar: {
                style: 'light',
            },
            topBar: {
                background: {
                    color: 'rgb(25, 25, 25)',
                },
                title: {
                    color: '#fff',
                    fontFamily: COMMON.font.bold,
                },
                largeTitle: {
                    color: '#fff',
                    fontFamily: COMMON.font.heavy,
                },
                leftButtonColor: '#fff',
                rightButtonColor: '#fff',
            },
            layout: {
                backgroundColor: '#000',
                componentBackgroundColor: '#000',
            },
            bottomTabs: {
                backgroundColor: 'rgb(25, 25, 25)',
                fontFamily: COMMON.font.normal,
            },
            bottomTab: {
                fontFamily: COMMON.font.normal,
            },
        },
        ...COMMON,
    },
};

export default THEME;
