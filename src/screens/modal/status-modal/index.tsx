import React, { Component } from 'react';
import styled from 'styled-components/native';

import withProvider from 'app/screens/modal/status-modal/provider';
import { NavigationUtils } from 'app/utils/navigation';
import DefaultLayout from 'app/components/layout/default-layout';
import { GenericText } from 'app/components/ui/text';
import { withAppState } from 'app/provider/app-state';
import { strings } from 'app/localization/strings';
import { AppStateProviderState } from 'app/provider/app-state/provider';

const StatusText = styled(GenericText)<{ type: string }>`
    color: ${({ theme }) => theme.color.textPrimary};
    font-family: ${({ theme }) => theme.font.bold};
    font-size: ${({ theme }) => theme.size.text.medium};
`;

export enum StatusModalTypes {
    info = 'info',
    success = 'success',
    error = 'error',
}

interface ComponentProps extends ScreenProps {
    type: StatusModalTypes;
    message: string;
    title?: string;
    titleColor?: string;
    appState: AppStateProviderState;
}

@withAppState
class StatusModal extends Component<ComponentProps> {
    constructor(props: ComponentProps) {
        super(props);
        const { componentId, type, appState, title, titleColor } = props;
        const { theme } = appState;
        let topBarTitle = {
            text: title,
            color: titleColor || theme.navigation.topBar.title.color,
        };

        switch (type) {
            case StatusModalTypes.success:
                topBarTitle = {
                    text: title || strings.successModalTitle,
                    color: titleColor || theme.color.success,
                };
                break;
            case StatusModalTypes.error:
                topBarTitle = {
                    text: title || strings.errorModalTitle,
                    color: titleColor || theme.color.error,
                };
                break;
            default:
                break;
        }

        NavigationUtils.bindComponent(this);
        NavigationUtils.mergeOptions(componentId, {
            topBar: {
                title: topBarTitle,
            },
        });
    }

    async navigationButtonPressed({ buttonId }: { buttonId: string }) {
        const { componentId } = this.props;

        if (buttonId === 'closeModal') {
            NavigationUtils.dismissModal(componentId);
        }
    }

    render() {
        const { message, type } = this.props;

        return (
            <DefaultLayout scrollable>
                <StatusText type={type}>{message}</StatusText>
            </DefaultLayout>
        );
    }
}

export default withProvider(StatusModal);
