import React, { useContext } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';

import { AppStateContext } from 'app/provider/app-state';
import { AppStateProviderState } from 'app/provider/app-state/provider';
import { GenericText } from 'app/components/ui/text';
import ICONS from 'assets/icons';
import { NavigationUtils } from 'app/utils/navigation';
import InsetsWrapper, { InsetsWrapperProps } from 'app/components/common/insets-wrapper/insets-wrapper';
import { strings } from 'app/localization/strings';

const HEADER_HEIGHT = 50;

const HeaderContainer = styled.View`
    padding-bottom: 10px;
    padding-left: 20px;
    padding-right: 20px;
    width: 100%;
    height: ${HEADER_HEIGHT}px;
    background-color: ${({ theme }) => theme.color.background};
    border-bottom-width: ${StyleSheet.hairlineWidth}px;
    border-bottom-color: ${({ theme }) => theme.color.border};
`;

const HeaderContent = styled.View`
    width: 100%;
    height: 100%;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
`;

const ProfileButton = styled.TouchableOpacity``;

const ProfileIcon = styled(FastImage)`
    width: 30px;
    height: 30px;
    border-radius: 40px;
`;
const MenuButton = styled.TouchableOpacity`
    margin-right: 10px;
`;

const ButtonIcon = styled(FastImage)`
    width: 20px;
    height: 20px;
`;

const TitleContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;

export interface LayoutHeaderProps extends InsetsWrapperProps {
    componentId?: string;
    headerStyle?: ViewStyle | ViewStyle[];
    showBack?: boolean;
    headerTitle?: string;
}

const Header = ({ headerStyle, showBack, componentId, headerTitle, insets }: LayoutHeaderProps) => {
    const appState = useContext(AppStateContext).appState as AppStateProviderState;

    return (
        <HeaderContainer style={[headerStyle, { height: HEADER_HEIGHT + insets.top }]}>
            <HeaderContent>
                <TitleContainer>
                    <MenuButton
                        onPress={() => {
                            if (showBack && componentId) {
                                NavigationUtils.pop(componentId);
                            }
                        }}
                    >
                        {showBack ? (
                            <ButtonIcon
                                source={ICONS.SYSTEM.CHEVRON_LEFT}
                                tintColor={appState.theme.color.textPrimary}
                            />
                        ) : (
                            <ButtonIcon source={ICONS.MENU} tintColor={appState.theme.color.textPrimary} />
                        )}
                    </MenuButton>
                    <GenericText black>{headerTitle || strings.headerTitle}</GenericText>
                </TitleContainer>
                <ProfileButton onPress={() => null}>
                    <ProfileIcon
                        source={{ uri: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200' }}
                    />
                </ProfileButton>
            </HeaderContent>
        </HeaderContainer>
    );
};

export default InsetsWrapper(Header);
