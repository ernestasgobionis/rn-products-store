import 'styled-components/native';

declare interface ThemeColor {
    primary: string;
    primaryLabel: string;
    activeText: string;
    activeIcon: string;
    textPrimary: string;
    textSecondary: string;
    textListSection: string;
    background: string;
    backgroundSecondary: string;
    border: string;
    success: string;
    error: string;
    listSection: string;
    listRow: string;
    listHeaderRow: string;
    listRowSeparator: string;
    sectionHeader: string;
    screenContainer: string;
    searchBackground: string;
    disclosureIndicator: string;
    modalOverlay: string;
    raisedCard: string;
    input: {
        background: string;
        border: string;
        placeholder: string;
    };
    dateTimePicker: {
        background: string;
    };
    button: {
        background: string;
        disabled: string;
        primaryText: string;
        disabledText: string;
        text: string;
        link: string;
    };
    shadow: {
        regular: string;
    };
    message: {
        receivedBackground: string;
        activityBackground: string;
        receivedText: string;
        sentText: string;
        activityText: string;
    }
}

declare interface ThemeFont {
    light: string;
    normal: string;
    bold: string;
    black: string;
}

declare interface ThemeFontSize {
    tiny: number;
    small: number;
    medium: number;
    large: number;
    huge: number;
    massive: number;
}

declare interface ThemeSize {
    hair: number;
    micro: number;
    tiny: number;
    small: number;
    medium: number;
    large: number;
    big: number;
    huge: number;
    massive: number;
    listRowHeight: number;
    largeListRowHeight: number;
    text: ThemeFontSize;
}

declare interface ThemeTextStyle {
    fontSize: number;
    letterSpacing: number;
    fontWeight: number;
}

declare interface ThemeText {
    largeTitle: SimpleObject;
    mediumTitle: SimpleObject;
    smallTitle: SimpleObject;
    listRowTitle: TextStyle;
    listRowSubtitle: TextStyle;
    tableHeader: TextStyle;
    tableFooter: TextStyle;
}

declare interface ThemeSpacing {
    horizontalPadding: number;
    listRowHorizontalPadding: number;
}

declare interface ThemeNavigation {
    statusBar: {
        style: 'light' | 'dark'
    },
    topBar: {
        background: {
            color: string;
        };
        title: {
            color: string;
        };
        largeTitle: {
            color: string;
        };
        leftButtonColor: string;
        rightButtonColor: string;
    };
    bottomTabs: {
        backgroundColor: string;
    };
}

declare interface ThemeInterface {
    font: ThemeFont;
    size: ThemeSize;
    text: ThemeText;
    color: ThemeColor;
    spacing: ThemeSpacing;
    navigation: ThemeNavigation;
}

declare module 'styled-components' {
    export interface DefaultTheme extends ThemeInterface {}
}
