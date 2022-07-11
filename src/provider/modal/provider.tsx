import React, { useState } from 'react';
import { ViewStyle } from 'react-native';
import Animated, {
    Extrapolation,
    interpolate,
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import styled from 'styled-components/native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';

import Context from './context';
import ICONS from 'assets/icons';
import { DEVICE_HEIGHT } from 'app/constants/constants';
import { withAppState } from 'app/provider/app-state';
import { AppStateProviderState } from 'app/provider/app-state/provider';

Animated.addWhitelistedNativeProps({ blurRadius: true });

export const MODAL_FULL_HEIGHT = DEVICE_HEIGHT * 1.25;

export const MAX_TOP_OFFSET = DEVICE_HEIGHT * 0.25;

export const MODAL_HEIGHT = 300;

export const MODAL_PADDING = 0;

export const MODAL_SNAPPED_OFFSET = MODAL_PADDING;

export const MODAL_SNAPPED_TRANSLATION_Y =
    MODAL_FULL_HEIGHT < 1000 ? MODAL_FULL_HEIGHT * 0.45 : MODAL_FULL_HEIGHT * 0.55;

const ModalBackdrop = styled(Animated.View)`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
`;
const ModalBackdropTouchable = Animated.createAnimatedComponent(styled.TouchableOpacity`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: transparent;
    z-index: 1001;
`);
const ModalContainer = styled(Animated.View)`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: ${MODAL_HEIGHT};
    z-index: 1100;
    shadow-opacity: 0.5;
    shadow-radius: 10px;
    shadow-color: rgba(0, 0, 0, 0.25);
    shadow-offset: -10px -15px;
`;

const ModalContent = Animated.createAnimatedComponent(styled.View`
    flex: 1;
    position: relative;
    overflow: hidden;
    background-color: ${({ theme }) => theme.color.backgroundSecondary};
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
`);

const CloseButtonContainer = Animated.createAnimatedComponent(styled.View`
    position: absolute;
    right: 20px;
    top: 0px;
    width: 30px;
    height: 30px;
    z-index: 1000;
`);

const CloseButton = styled.TouchableOpacity`
    width: 30px;
    height: 30px;
    background-color: ${({ theme }) => theme.color.background};
    border-radius: 50px;
`;

const CloseImage = styled(FastImage)`
    width: 30px;
    height: 30px;
    border-radius: 50px;
    justify-content: center;
    align-items: center;
`;

interface ComponentProps {
    children: React.ReactNode;
    appState: AppStateProviderState;
}

export interface ModalProviderState {
    toggleModal: (params?: ToggleModalParams) => void;
}

interface ToggleModalParams {
    content?: JSX.Element;
    modalContentStyle?: ViewStyle | ViewStyle[];
    show: boolean;
    openFull?: boolean;
    disableBackdrop?: boolean;
    disableTranslation?: boolean;
    disableGesture?: boolean;
}

const ModalProvider = (props: ComponentProps) => {
    const { children } = props;
    const modalPanOffsetY = useSharedValue(MODAL_HEIGHT);
    const modalPanActive = useSharedValue(false);
    const showModal = useSharedValue(false);
    const translationEnabled = useSharedValue(true);
    const gestureEnabled = useSharedValue(true);
    const [modalContent, setModalContent] = useState<JSX.Element | undefined>(undefined);
    const [modalContentStyle, setModalContentStyle] = useState<ViewStyle | ViewStyle[] | undefined>(undefined);
    const [disableBackdrop, setDisableBackdrop] = useState(false);
    const [pointerEvents, setPointerEvents] = useState<'box-none' | 'none' | 'box-only' | 'auto'>(
        showModal.value ? 'auto' : 'none',
    );
    const toggleModal = (params: ToggleModalParams) => {
        showModal.value = params.show;
        const newOffset = params.openFull ? MODAL_HEIGHT * -2 : MODAL_PADDING;

        if (params.show) {
            setModalContent(params?.content);
            setPointerEvents('auto');
            setModalContentStyle(params.modalContentStyle);
            if (typeof params.disableTranslation === 'boolean') translationEnabled.value = !params.disableTranslation;
            if (typeof params.disableGesture === 'boolean') gestureEnabled.value = !params.disableTranslation;
            modalPanOffsetY.value = withSpring(newOffset, { stiffness: 110, damping: 17, mass: 1 });
            setDisableBackdrop(Boolean(params?.disableBackdrop));
        } else {
            setPointerEvents('none');
            setDisableBackdrop(false);
            modalPanOffsetY.value = withSpring(
                MODAL_HEIGHT,
                {
                    stiffness: 110,
                    damping: 17,
                    mass: 1,
                    restSpeedThreshold: 5,
                    overshootClamping: true,
                },
                () => {
                    runOnJS(setModalContent)(undefined);
                    runOnJS(setModalContentStyle)(undefined);
                    translationEnabled.value = true;
                    gestureEnabled.value = true;
                },
            );
        }
    };

    const backdropStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                modalPanOffsetY.value,
                [MODAL_SNAPPED_OFFSET, MODAL_HEIGHT],
                [1, 0],
                Extrapolation.CLAMP,
            ),
        };
    });

    const modalStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: translationEnabled.value
                        ? interpolate(
                              modalPanOffsetY.value,
                              [-MODAL_HEIGHT * 2, MODAL_SNAPPED_OFFSET, MODAL_HEIGHT],
                              [MAX_TOP_OFFSET, MODAL_SNAPPED_TRANSLATION_Y, MODAL_FULL_HEIGHT],
                          )
                        : MAX_TOP_OFFSET,
                },
            ],
            shadowOpacity: interpolate(modalPanOffsetY.value, [MODAL_SNAPPED_OFFSET, MODAL_HEIGHT], [0.5, 0]),
            height: MODAL_FULL_HEIGHT,
            opacity: translationEnabled.value
                ? interpolate(modalPanOffsetY.value, [MODAL_HEIGHT / 2, MODAL_HEIGHT], [1, 0], Extrapolation.CLAMP)
                : interpolate(modalPanOffsetY.value, [-MODAL_HEIGHT * 2, MODAL_HEIGHT], [1, 0], Extrapolation.CLAMP),
        };
    });

    const contentStyle = useAnimatedStyle(() => {
        return {
            borderTopLeftRadius: interpolate(
                modalPanOffsetY.value,
                [MODAL_HEIGHT * -2, MODAL_SNAPPED_OFFSET, MODAL_HEIGHT],
                [1, 10, 50],
                Extrapolation.CLAMP,
            ),
            borderTopRightRadius: interpolate(
                modalPanOffsetY.value,
                [MODAL_HEIGHT * -2, MODAL_SNAPPED_OFFSET, MODAL_HEIGHT],
                [1, 10, 50],
                Extrapolation.CLAMP,
            ),
        };
    });

    const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { y: number }>({
        onStart: (_values, ctx) => {
            ctx.y = modalPanOffsetY.value;
        },
        onActive: ({ translationY }, ctx) => {
            modalPanOffsetY.value = translationY * 0.5 + ctx.y;
        },
        onFinish: ({ velocityY }) => {
            let offsetValue = MODAL_SNAPPED_OFFSET;

            if (modalPanOffsetY.value <= -150) {
                offsetValue = MODAL_HEIGHT * -2;
            }
            if (velocityY <= -750) {
                offsetValue = MODAL_HEIGHT * -2;
            }
            if (modalPanOffsetY.value <= -250 && velocityY >= 500) {
                offsetValue = MODAL_SNAPPED_OFFSET;

                if (velocityY > 5000) {
                    offsetValue = MODAL_HEIGHT;

                    return (modalPanOffsetY.value = withSpring(
                        offsetValue,
                        { velocity: velocityY, damping: 18, stiffness: 110, mass: 1, overshootClamping: true },
                        () => {
                            runOnJS(toggleModal)({ show: false });
                        },
                    ));
                }

                return (modalPanOffsetY.value = withSpring(
                    offsetValue,
                    { velocity: velocityY, damping: 18, stiffness: 110, mass: 1, overshootClamping: true },
                    () => {
                        modalPanActive.value = false;
                    },
                ));
            }
            if (modalPanOffsetY.value >= 100 && velocityY >= 300) {
                return runOnJS(toggleModal)({ show: false });
            }

            if (modalPanOffsetY.value === offsetValue) return;
            modalPanOffsetY.value = withSpring(
                offsetValue,
                { velocity: velocityY, damping: 18, stiffness: 110, mass: 1, overshootClamping: true },
                () => {
                    modalPanActive.value = false;
                },
            );
        },
    });

    const closeButtonProps = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                modalPanOffsetY.value,
                [-MODAL_HEIGHT * 2.25, -MODAL_HEIGHT * 2, -MODAL_HEIGHT, -MODAL_HEIGHT * 2],
                [0, 1, 1, 1],
                {
                    extrapolateLeft: Extrapolation.CLAMP,
                },
            ),
            transform: [
                {
                    translateY: translationEnabled.value
                        ? interpolate(
                              modalPanOffsetY.value,
                              [-MODAL_HEIGHT, MODAL_PADDING],
                              [40, 20],
                              Extrapolation.EXTEND,
                          )
                        : 40,
                },
            ],
        };
    });

    return (
        <Context.Provider value={{ modalState: { toggleModal } }}>
            <ModalBackdrop style={backdropStyle} pointerEvents={pointerEvents}>
                <ModalBackdropTouchable
                    disabled={disableBackdrop}
                    onPress={() => {
                        toggleModal({ show: false });
                    }}
                />
            </ModalBackdrop>
            <PanGestureHandler onGestureEvent={onGestureEvent} enabled={gestureEnabled.value}>
                <ModalContainer style={modalStyle} pointerEvents={pointerEvents}>
                    <ModalContent style={[contentStyle, modalContentStyle]}>
                        <CloseButtonContainer style={closeButtonProps}>
                            <CloseButton
                                onPress={() => {
                                    toggleModal({ show: false });
                                }}
                            >
                                <CloseImage source={ICONS.CLOSE} tintColor={props.appState.theme.color.textPrimary} />
                            </CloseButton>
                        </CloseButtonContainer>
                        {modalContent && React.cloneElement(modalContent, { modalPanOffsetY })}
                    </ModalContent>
                </ModalContainer>
            </PanGestureHandler>
            {children}
        </Context.Provider>
    );
};

export default withAppState(ModalProvider);
