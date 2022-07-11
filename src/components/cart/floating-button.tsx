import React from 'react';
import styled from 'styled-components/native';
import Animated, { CurvedTransition, FadeIn, FadeOutDown } from 'react-native-reanimated';

import { strings } from 'app/localization/strings';
import { FULL_TAB_BAR_HEIGHT } from 'app/components/navigation/bottom-tabs';
import { Button } from 'app/components/ui/button';
import InsetsWrapper, { InsetsWrapperProps } from 'app/components/common/insets-wrapper/insets-wrapper';

const FloatingButtonContainer = Animated.createAnimatedComponent(styled.View`
    position: absolute;
    z-index: 1000;
    left: 25%;
    right: 25%;
    flex-direction: row;
    justify-content: center;
    border-radius: 50px;
    overflow: hidden;
`);

const PurchaseButton = styled(Button)`
    width: 100%;
    height: 40px;
`;
const FloatingButton = ({ insets }: InsetsWrapperProps) => {
    return (
        <FloatingButtonContainer
            style={{
                bottom: insets.bottom > 0 ? insets.bottom + FULL_TAB_BAR_HEIGHT : FULL_TAB_BAR_HEIGHT + 10,
            }}
            entering={FadeIn.springify().mass(0.3)}
            exiting={FadeOutDown.springify().mass(0.3)}
            layout={CurvedTransition.duration(250).delay(250)}
        >
            <PurchaseButton title={strings.proceedToPurchase} fullWidth onPress={() => null} primary />
        </FloatingButtonContainer>
    );
};

export default InsetsWrapper(FloatingButton);
