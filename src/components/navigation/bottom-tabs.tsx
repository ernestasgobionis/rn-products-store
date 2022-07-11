import React, { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';

import { GenericText } from 'app/components/ui/text';
import { NavigationUtils } from 'app/utils/navigation';
import { AppStateProviderState } from 'app/provider/app-state/provider';
import ICONS from 'assets/icons';
import { SCREENS } from 'app/screens/screen-registry';
import { shadowStyles } from 'app/theme';
import { AppStateContext } from 'app/provider/app-state';
import InsetsWrapper, { InsetsWrapperProps } from 'app/components/common/insets-wrapper/insets-wrapper';

export const TAB_BAR_HEIGHT = 60;

export const TAB_BAR_BOTTOM_PADDING = 20;

export const FULL_TAB_BAR_HEIGHT = TAB_BAR_HEIGHT + TAB_BAR_BOTTOM_PADDING;

const Container = styled.View`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 20px 20px;
    z-index: 999;
`;

const BottomTabsContainer = styled.View`
    opacity: 0.95;
    background-color: ${({ theme }) => theme.color.backgroundSecondary};
    height: ${TAB_BAR_HEIGHT}px;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    border-width: ${StyleSheet.hairlineWidth}px;
    border-color: ${({ theme }) => theme.color.input.background};
    border-radius: 50px;
`;

const TabButtonWrapper = styled.View`
    margin: 0 3%;
    position: relative;
`;
const TabButton = styled.TouchableOpacity`
    align-items: center;
`;
const TabIcon = styled(FastImage)``;
const TabButtonBadge = Animated.createAnimatedComponent(styled.View`
    width: 24px;
    height: 24px;
    border-radius: 20px;
    background-color: ${({ theme }) => theme.color.textPrimary};
    border-width: 2px;
    border-color: ${({ theme }) => theme.color.background};
    position: absolute;
    right: -10px;
    top: -10px;
    align-items: center;
    justify-content: center;
`);
const TabButtonBadgeText = styled(GenericText)`
    font-size: 10px;
    line-height: 16px;
    color: ${({ theme }) => theme.color.background};
`;

interface ComponentProps extends InsetsWrapperProps {
    cartItems: number;
}

const BottomTabs = (props: ComponentProps) => {
    // Set icon scale depending on Payment (card) icon scale
    const { insets } = props;
    const TAB_ICON_WIDTH = 25;
    const [scaledHeight, setScaledHeight] = useState(TAB_ICON_WIDTH);
    const appState = useContext(AppStateContext).appState as AppStateProviderState;

    const BOTTOM_TABS: { icon: any; tabId?: string; tabIndex?: number; badgeCount?: number; onPress?: () => void }[] = [
        { icon: ICONS.TABS.HOME, tabId: `${SCREENS.TABS.HOME}Tab`, tabIndex: 0 },
        {
            icon: ICONS.TABS.SEARCH,
            onPress: () => null,
        },
        {
            icon: ICONS.TABS.HEART,
            tabIndex: 1,
            tabId: `${SCREENS.TABS.FAVORITES}Tab`,
        },
        { icon: ICONS.TABS.CART, tabIndex: 2, tabId: `${SCREENS.TABS.CART}Tab`, badgeCount: props.cartItems },
    ];

    useEffect(() => {
        return () => {
            const { width, height } = Image.resolveAssetSource(ICONS.TABS.HOME);

            setScaledHeight((height / width) * TAB_ICON_WIDTH);
        };
    }, []);

    const onTabButtonPress = (idx: number, rootId?: string) => {
        if (!appState.navigation.currentScreen) return;

        if (appState.navigation.currentTabIndex === idx && rootId) {
            NavigationUtils.popToRoot(rootId);
        } else {
            NavigationUtils.mergeOptions(`${SCREENS.TABS.HOME}Tab`, {
                bottomTabs: { currentTabIndex: idx },
            });
        }
        appState.navigation.setCurrentTabIndex(idx);
    };

    return (
        <Container style={{ paddingBottom: insets.bottom > 0 ? insets.bottom : TAB_BAR_BOTTOM_PADDING }}>
            <BottomTabsContainer style={shadowStyles.bottomTabs}>
                {BOTTOM_TABS.map((t, idx) => {
                    return (
                        <TabButtonWrapper key={`tab-${idx}`}>
                            <TabButton
                                onPress={() => {
                                    if (t.onPress) {
                                        t.onPress();
                                    } else {
                                        if (typeof t.tabIndex === 'number') onTabButtonPress(t.tabIndex, t.tabId);
                                    }
                                }}
                                hitSlop={{ top: 10, bottom: 10, left: 15, right: 15 }}
                            >
                                <TabIcon
                                    source={t.icon}
                                    resizeMode="contain"
                                    style={{ width: TAB_ICON_WIDTH, height: scaledHeight }}
                                    tintColor={
                                        appState.navigation.currentTabIndex === t.tabIndex
                                            ? appState.theme.color.primary
                                            : appState.theme.color.textPrimary
                                    }
                                />
                            </TabButton>
                            {!!t.badgeCount && t.badgeCount > 0 && (
                                <TabButtonBadge
                                    pointerEvents="none"
                                    entering={ZoomIn.springify().mass(1)}
                                    exiting={ZoomOut.springify().mass(0.3)}
                                >
                                    <TabButtonBadgeText bold small center inverse>
                                        {t.badgeCount > 9 ? '9+' : t.badgeCount}
                                    </TabButtonBadgeText>
                                </TabButtonBadge>
                            )}
                        </TabButtonWrapper>
                    );
                })}
            </BottomTabsContainer>
        </Container>
    );
};

export default InsetsWrapper(BottomTabs);
