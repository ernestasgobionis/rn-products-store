import * as React from 'react';
import { ActivityIndicator, Animated, Dimensions, Easing, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { strings } from 'app/localization/strings';
import { GenericText } from 'app/components/ui/text';
import withProvider from './provider';
import { NavigationUtils } from 'app/utils/navigation';
import { IS_ANDROID } from 'app/utils/platform-utils';

const Container = styled.View`
    position: relative;
    flex: 1;
    justify-content: flex-end;
    background-color: transparent;
`;

const Backdrop = styled(Animated.View)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.View`
    height: 120px;
    padding: 15px 0 20px;
    background-color: ${({ theme }) => theme.color.listRow};
    border-top-left-radius: 22px;
    border-top-right-radius: 22px;
    align-items: center;
    justify-content: center;
`;

const ReloadingContainer = styled.View`
    flex-direction: row;
    margin-top: 5px;
    align-items: center;
`;

const Title = styled(GenericText)`
    font-size: ${({ theme }) => theme.size.text.large};
`;
const Subtitle = styled(GenericText)`
    font-size: ${({ theme }) => theme.size.text.medium};
    margin-right: 10px;
`;

interface ComponentProps extends ScreenProps {
    setModalClose: (f: () => void) => void;
}

class NoInternetModal extends React.Component<ComponentProps> {
    constructor(props: ComponentProps) {
        super(props);

        this.props?.setModalClose(this.handleClose);
    }

    backdropValue = new Animated.Value(0);

    componentDidMount() {
        this.handleOpen();
    }

    handleOpen = () => {
        Animated.timing(this.backdropValue, {
            toValue: 1,
            duration: 500,
            delay: 350,
            useNativeDriver: true,
            easing: Easing.bezier(0.16, 0.92, 0.66, 0.92),
        }).start();
    };

    handleClose = () => {
        Animated.timing(this.backdropValue, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
            easing: Easing.bezier(0.16, 0.92, 0.66, 0.92),
        }).start(() => {
            NavigationUtils.dismissModal(this.props.componentId, {
                animations: {
                    dismissModal: {
                        alpha: {
                            from: 1,
                            to: 0,
                            duration: 500,
                        },
                        y: {
                            from: Dimensions.get('window').height,
                            to: 0,
                            duration: 500,
                        },
                    },
                },
            });
        });
    };

    render() {
        return (
            <Container>
                <Backdrop style={{ opacity: this.backdropValue }} />
                <ModalContainer style={styles.modalContainer}>
                    <Title black>{strings.noInternetTitle}</Title>
                    <ReloadingContainer>
                        <Subtitle bold>{strings.reloading}</Subtitle>
                        <ActivityIndicator />
                    </ReloadingContainer>
                </ModalContainer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        shadowColor: IS_ANDROID ? undefined : 'rgba(0, 0, 0, 0.8)',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.2,
        shadowRadius: 13.97,
        elevation: 21,
    },
});

export default withProvider(NoInternetModal);
