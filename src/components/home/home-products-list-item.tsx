import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';

import { GenericText } from 'app/components/ui/text';
import { Button } from 'app/components/ui/button';
import { ProductProviderState } from 'app/provider/product/provider';
import { shadowStyles } from 'app/theme';
import { withAppState } from 'app/provider/app-state';
import { AppStateProviderState } from 'app/provider/app-state/provider';
import { withProduct } from 'app/provider/product';
import ICONS from 'assets/icons';
import { MoneyUtils } from 'app/utils/money-utils';
import { strings } from 'app/localization/strings';

const ProductContainer = styled.TouchableOpacity<{ index: number }>`
    position: relative;
    width: 48%;
    background-color: ${({ theme }) => theme.color.listRow};
    border-width: ${StyleSheet.hairlineWidth};
    border-color: ${({ theme }) => theme.color.border};
    margin-right: ${({ index }) => (index % 2 === 0 ? '4%' : '0')};
    margin-bottom: 15px;
    padding: 20px 10px;
    min-height: 180px;
    border-radius: 4px;
    align-items: center;
    justify-content: space-between;
`;
const ProductTitleContainer = styled.View`
    align-items: center;
`;
const ProductTitle = styled(GenericText)``;
const ProductPrice = styled(GenericText)`
    margin: 10px 0;
`;
const ProductImage = styled(FastImage)`
    height: 75px;
    width: 75px;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 10px;
`;
const HeartIconContainer = styled.View`
    position: absolute;
    right: 10px;
    top: 10px;
`;
const HeartButton = styled.TouchableOpacity``;
const HeartButtonLoader = styled.ActivityIndicator`
    position: absolute;
    z-index: 10;
    transform: scale(0.4) translateY(1px);
`;
const HeartIcon = styled(FastImage)`
    width: 20px;
    height: 20px;
`;

interface ComponentProps {
    favorite?: boolean;
    item: ProductListItem;
    index: number;
    onProductPress: (product: ProductListItem) => void;
    onFavoritePress: (product: ProductListItem) => void;
    onAddToCart: (product: ProductListItem) => void;
    appState: AppStateProviderState;
    productState: ProductProviderState;
}

interface ComponentState {
    favoriteLoading: boolean;
    favorited: boolean;
}

@withAppState
@withProduct
class HomeProductsListItem extends Component<ComponentProps, ComponentState> {
    static defaultProps = {
        appState: {},
        productState: {},
    };
    state: ComponentState = {
        favoriteLoading: false,
        favorited: Boolean(this.props.favorite),
    };
    onProductPress = (product: ProductListItem) => {
        this.props.onProductPress(product);
    };
    onFavoritePress = async () => {
        const { item, onFavoritePress } = this.props;

        if (this.state.favoriteLoading) return;

        this.setState({ favoriteLoading: true });
        await onFavoritePress(item);
        this.setState((prevState) => ({ favoriteLoading: false, favorited: !prevState.favorited }));
    };
    onBuyPress = async () => {
        const { item, onAddToCart } = this.props;

        await onAddToCart(item);
    };
    render() {
        const { item, index, productState, appState } = this.props;
        const { favorited, favoriteLoading } = this.state;

        return (
            <ProductContainer
                index={index}
                onPress={() => {
                    this.onProductPress(item);
                }}
                style={[shadowStyles.regular, { shadowColor: appState.theme.color.shadow.regular }]}
            >
                <HeartIconContainer>
                    <HeartButton
                        hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
                        disabled={favoriteLoading}
                        onPress={this.onFavoritePress}
                    >
                        {favoriteLoading && (
                            <HeartButtonLoader
                                color={favorited ? appState.theme.color.background : appState.theme.color.error}
                            />
                        )}
                        <HeartIcon
                            source={favorited ? ICONS.HEART : ICONS.HEART_OUTLINE}
                            tintColor={favorited ? appState.theme.color.error : appState.theme.color.textPrimary}
                        />
                    </HeartButton>
                </HeartIconContainer>
                <ProductTitleContainer>
                    <ProductImage source={{ uri: item.image }} />
                    <ProductTitle small bold center>
                        {item.name}
                    </ProductTitle>
                    <ProductPrice black center>
                        {MoneyUtils.formatWithCurrency(item.price)}
                    </ProductPrice>
                </ProductTitleContainer>
                <Button
                    onPress={this.onBuyPress}
                    onStartShouldSetResponder={() => true}
                    title={strings.addToCart}
                    primary
                    small
                    style={{ width: 120 }}
                    loading={productState.loading.addToCart}
                    disabled={productState.loading.addToCart}
                />
            </ProductContainer>
        );
    }
}

export default HomeProductsListItem;
