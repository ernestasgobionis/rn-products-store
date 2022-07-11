import React, { Component, ReactElement } from 'react';
import {
    ActivityIndicator,
    TextStyle,
    TouchableOpacity,
    TouchableOpacityProps,
    ViewProps,
    ViewStyle,
} from 'react-native';
import { RectButton, RectButtonProperties } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import { GenericText } from 'app/components/ui/text';
import { withAppState } from 'app/provider/app-state';
import { AppStateProviderState } from 'app/provider/app-state/provider';
import { IS_ANDROID } from 'app/utils/platform-utils';

export enum GenericButtonType {
    danger = 'danger',
    primary = 'primary',
    raised = 'raised',
    outlined = 'outlined',
}

interface GenericButtonProps {
    enabled?: boolean;
    danger?: boolean;
    primary?: boolean;
    raised?: boolean;
    inverse?: boolean;
    outlined?: boolean;
    square?: boolean;
    fullWidth?: boolean;
    fixedWidth?: boolean;
    round?: boolean;
    small?: boolean;
    wide?: boolean;
}

interface FormButtonComponentProps extends TouchableOpacityProps {
    onPress: any;
    title?: string;
    id?: string;
}

interface ButtonComponentProps extends RectButtonProperties {
    onPress: any;
    title?: string;
    loading?: boolean;
    primary?: boolean;
    danger?: boolean;
    outlined?: boolean;
    square?: boolean;
    fullWidth?: boolean;
    fixedWidth?: boolean;
    round?: boolean;
    buttonStyle?: ViewStyle | ViewStyle[];
    textStyle?: TextStyle | TextStyle[];
    buttonComponent?: ButtonComponentType;
    titleComponent?: ReactElement;
}

export enum ButtonComponentType {
    rect = 'RectButton',
    touchable = 'TouchableOpacity',
}

type ButtonProps = ButtonComponentProps &
    FormButtonComponentProps &
    GenericButtonProps &
    RectButtonProperties &
    ViewProps & { appState?: AppStateProviderState };

type TextButtonProps = {
    underline?: boolean;
    danger?: boolean;
};

const GenericButton = styled(RectButton)<GenericButtonProps>`
    height: ${({ small }) => {
        if (small) {
            return '26px';
        }

        return '40px';
    }};
    width: ${({ fullWidth, fixedWidth }) => {
        if (fullWidth) {
            return '100%';
        }

        if (fixedWidth) {
            return '150px';
        }

        return 'auto';
    }};
    min-width: ${({ wide }) => {
        if (wide) {
            return '150px';
        }

        return 'auto';
    }};
    padding: 0 25px;
    border-radius: ${({ small, square, round }) => {
        if (square) {
            return '6px';
        }
        if (small) {
            return '13px';
        }
        if (round) {
            return '21px';
        }

        return '15px';
    }};
    border-width: 1px;
    background-color: ${({ theme, primary, inverse, outlined, danger }) => {
        if (inverse) {
            return theme.color.background;
        }
        if (outlined) {
            return 'transparent';
        }
        if (danger) {
            return theme.color.error;
        }
        if (primary) {
            return theme.color.primary;
        }

        return theme.color.button.background;
    }};
    border-color: ${({ outlined, danger, theme }) => {
        if (outlined) {
            return danger ? theme.color.error : theme.color.primaryLabel;
        }

        return 'transparent';
    }};
    opacity: ${(props) => (props.enabled ? 1 : 0.5)};
    justify-content: center;
    align-items: center;
`;

const GenericButtonTouchable = styled.TouchableOpacity<GenericButtonProps>`
    height: ${({ small }) => {
        if (small) {
            return '26px';
        }

        return '40px';
    }};
    width: ${({ fullWidth, fixedWidth }) => {
        if (fullWidth) {
            return '100%';
        }

        if (fixedWidth) {
            return '150px';
        }

        return 'auto';
    }};
    min-width: ${({ wide }) => {
        if (wide) {
            return '150px';
        }

        return 'auto';
    }};
    padding: 0 25px;
    border-radius: ${({ small, square, round }) => {
        if (square) {
            return '6px';
        }
        if (small) {
            return '13px';
        }
        if (round) {
            return '21px';
        }

        return '15px';
    }};
    border-width: 1px;
    background-color: ${({ theme, primary, inverse, outlined, danger }) => {
        if (inverse) {
            return theme.color.background;
        }
        if (outlined) {
            return 'transparent';
        }
        if (danger) {
            return theme.color.error;
        }
        if (primary) {
            return theme.color.primary;
        }

        return theme.color.button.background;
    }};
    border-color: ${({ outlined, danger, theme }) => {
        if (outlined) {
            return danger ? theme.color.error : theme.color.primaryLabel;
        }

        return 'transparent';
    }};
    opacity: ${(props) => (props.enabled ? 1 : 0.5)};
    justify-content: center;
    align-items: center;
`;

const ButtonTitle = styled(GenericText)<GenericButtonProps>`
    width: 100%;
    font-size: ${({ small }) => (small ? '12px' : '14px')};
    font-weight: 700;
    text-align: center;
    color: ${({ theme, primary, inverse, danger, outlined, ...rest }) => {
        if (inverse) {
            if (primary) {
                return theme.color.primaryLabel;
            }
            if (danger) {
                return theme.color.error;
            }

            return theme.color.button.text;
        }

        if (outlined) {
            return danger ? theme.color.error : theme.color.primaryLabel;
        }

        return rest.enabled ? theme.color.button.primaryText : theme.color.button.disabledText;
    }};
`;

@withAppState
class Button extends Component<ButtonProps> {
    static defaultProps = {
        loading: false,
        fixedWidth: true,
        enabled: true,
        danger: false,
        primary: false,
        raised: false,
        inverse: false,
        outlined: false,
        square: false,
        fullWidth: false,
        round: false,
        small: false,
        wide: false,
        id: undefined,
        buttonStyle: undefined,
        textStyle: undefined,
        buttonComponent: undefined,
        titleComponent: undefined,
        title: undefined,
        appState: {},
    };

    render() {
        const {
            title,
            loading,
            id,
            buttonStyle,
            textStyle,
            danger,
            enabled,
            primary,
            raised,
            outlined,
            fullWidth,
            fixedWidth,
            small,
            inverse,
            buttonComponent,
            titleComponent,
            round,
            appState,
            ...rest
        } = this.props;

        const commonProps = {
            danger,
            enabled: enabled && !loading,
            primary,
            raised,
            outlined,
            fullWidth,
            fixedWidth,
            small,
            inverse,
            round,
        };
        const defaultStyles = {
            shadowColor: IS_ANDROID ? undefined : outlined ? 'transparent' : 'rgba(127, 131, 145, 0.24)',
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 1,
            shadowRadius: 7,
            elevation: 10,
        };
        let ButtonComponent: any = GenericButton;

        if (buttonComponent === ButtonComponentType.touchable) {
            ButtonComponent = GenericButtonTouchable;
        }

        return (
            <ButtonComponent style={[defaultStyles, buttonStyle]} testID={id} {...commonProps} {...rest}>
                {loading ? (
                    <ActivityIndicator color={outlined ? appState?.theme.color.primary : '#fff'} size={12} />
                ) : (
                    titleComponent || (
                        <ButtonTitle style={textStyle} {...commonProps}>
                            {title}
                        </ButtonTitle>
                    )
                )}
            </ButtonComponent>
        );
    }
}

const TextButton = styled(TouchableOpacity)`
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 22px;
`;
const TextButtonTitle = styled(GenericText)<TextButtonProps>`
    font-size: 16px;
    text-align: center;
    color: ${({ theme, danger }) => (danger ? theme.color.error : theme.color.textPrimary)};
    text-decoration: ${({ underline }) => (underline ? 'underline' : 'none')};
    text-decoration-color: ${({ theme, danger }) => (danger ? theme.color.error : theme.color.textPrimary)};
`;

export const BaseTextButton = ({
    title,
    testID,
    underline,
    danger,
    textStyle,
    loading,
    ...rest
}: ButtonProps & TextButtonProps) => (
    <TextButton {...rest} testID={testID}>
        {loading ? (
            <ActivityIndicator size={12} />
        ) : (
            <TextButtonTitle underline={underline} danger={danger} style={textStyle}>
                {title}
            </TextButtonTitle>
        )}
    </TextButton>
);

BaseTextButton.defaultProps = {
    loading: false,
    fixedWidth: true,
    enabled: true,
    danger: false,
    primary: false,
    raised: false,
    inverse: false,
    outlined: false,
    square: false,
    fullWidth: false,
    round: false,
    small: false,
    wide: false,
    id: undefined,
    buttonStyle: undefined,
    textStyle: undefined,
    buttonComponent: undefined,
    titleComponent: undefined,
    title: undefined,
    appState: {},

    underline: false,
};

export { Button };
