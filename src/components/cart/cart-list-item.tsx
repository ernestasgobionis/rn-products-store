import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import Animated, { CurvedTransition, FadeInUp, FadeOutUp } from 'react-native-reanimated';

import { GenericText } from 'app/components/ui/text';
import ICONS from 'assets/icons';
import { MoneyUtils } from 'app/utils/money-utils';
import { AppStateContext } from 'app/provider/app-state';
import { AppStateProviderState } from 'app/provider/app-state/provider';
import { strings } from "app/localization/strings";

const ProductContainer = Animated.createAnimatedComponent(styled.View`
    width: 100%;
    margin-bottom: 15px;
    padding: 10px;
    min-height: 140px;
    background-color: ${({ theme }) => theme.color.listRow};
    border-radius: 4px;
    flex-direction: row;
    justify-content: space-between;
`);
const ProductImageContainer = styled.View`
    flex: 0.3;
`;
const ProductTitleContainer = styled.View`
    flex: 0.65;
    justify-content: space-between;
`;
const ProductTotal = styled.View``;
const ProductQuantityContainer = styled.View`
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`;
const ProductQuantityButton = styled.TouchableOpacity`
    width: 30px;
    height: 30px;
    background-color: ${({ theme }) => theme.color.textPrimary};
    border-radius: 4px;
    justify-content: center;
    align-items: center;
`;

const DeleteProductButton = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0;
    top: 0;
`;
const DeleteProductIcon = styled(FastImage)`
    width: 25px;
    height: 25px;
`;
const ProductQuantityButtonText = styled(GenericText)`
    color: ${({ theme }) => theme.color.background};
`;
const ProductQuantityLabel = styled(GenericText)`
    width: 30px;
    height: 30px;
    line-height: 30px;
`;
const ProductTitle = styled(GenericText)``;
const ProductImage = styled(FastImage)`
    width: 100%;
    height: 100px;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 10px;
`;

interface ComponentProps {
    onCartItemPress: (cartItem: CartItem) => void;
    onUpdateCartItem: (cartItem: CartItem, quantity: number) => void;
    onRemoveCartItem: (cartItem: CartItem) => void;
    item: CartItem;
}

const CartListItem = ({ item, ...props }: ComponentProps) => {
    const appState = useContext(AppStateContext).appState as AppStateProviderState;

    const onCartItemPress = () => {
        props.onCartItemPress(item);
    };
    const onUpdateCartItem = (add: boolean) => () => {
        let quantity = item.quantity;

        if (add) {
            quantity++;
        } else {
            quantity--;
        }
        props.onUpdateCartItem(item, Math.max(0, quantity));
    };
    const onRemoveCartItem = () => {
        props.onRemoveCartItem(item);
    };

    return (
        <ProductContainer
            entering={FadeInUp.duration(250)}
            exiting={FadeOutUp.duration(250)}
            layout={CurvedTransition.duration(200).delay(200)}
        >
            <ProductImageContainer>
                <TouchableOpacity onPress={onCartItemPress}>
                    <ProductImage source={{ uri: item.image }} resizeMode="cover" />
                </TouchableOpacity>
                <ProductQuantityContainer>
                    <ProductQuantityButton onPress={onUpdateCartItem(false)}>
                        <ProductQuantityButtonText>-</ProductQuantityButtonText>
                    </ProductQuantityButton>
                    <ProductQuantityLabel black center>
                        {item.quantity}
                    </ProductQuantityLabel>
                    <ProductQuantityButton onPress={onUpdateCartItem(true)}>
                        <ProductQuantityButtonText>+</ProductQuantityButtonText>
                    </ProductQuantityButton>
                </ProductQuantityContainer>
            </ProductImageContainer>
            <ProductTitleContainer>
                <ProductTitle bold>{item.name}</ProductTitle>
                <ProductTotal>
                    <GenericText>{strings.total}</GenericText>
                    <GenericText black>{MoneyUtils.formatWithCurrency(item.price * item.quantity)}</GenericText>
                </ProductTotal>
                <DeleteProductButton onPress={onRemoveCartItem}>
                    <DeleteProductIcon source={ICONS.TRASH} tintColor={appState.theme.color.error} />
                </DeleteProductButton>
            </ProductTitleContainer>
        </ProductContainer>
    );
};

export default CartListItem;
