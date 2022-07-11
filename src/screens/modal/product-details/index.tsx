import React, { Component } from 'react';
import { ActivityIndicator, Image } from 'react-native';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import { Observer } from 'mobx-react';
import Animated, {
    Extrapolation,
    FadeIn,
    FadeOut,
    interpolate,
    SharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated';

import { ProductProviderState } from 'app/provider/product/provider';
import { GenericText } from 'app/components/ui/text';
import { Button } from 'app/components/ui/button';
import { DEVICE_WIDTH } from 'app/constants/constants';
import { IS_ANDROID } from 'app/utils/platform-utils';
import { MoneyUtils } from 'app/utils/money-utils';

const ProductPageContainer = styled.View`
    padding-left: 20px;
    padding-right: 20px;
    align-items: center;
    justify-content: center;
`;

const ProductTitleContainer = Animated.createAnimatedComponent(styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
`);
const ProductTitle = Animated.createAnimatedComponent(styled(GenericText)``);
const ProductAmount = Animated.createAnimatedComponent(styled(GenericText)``);
const ProductImage = Animated.createAnimatedComponent(styled(IS_ANDROID ? Image : FastImage)`
    height: 150px;
    width: 150px;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 10px;
`);
const ProductDescriptionContainer = styled.View`
    min-height: 150px;
    justify-content: center;
    align-items: center;
`;
const AnimatedLoader = Animated.createAnimatedComponent(styled.ActivityIndicator``);
const DescriptionText = Animated.createAnimatedComponent(styled(GenericText)``);
const ProductDescriptionWrapper = Animated.createAnimatedComponent(styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
`);
const AddToCartButton = styled(Button)`
    margin: 0 auto;
`;

const LoaderContainer = Animated.createAnimatedComponent(styled.View`
    height: 300px;
    justify-content: center;
    align-items: center;
`);

interface ComponentProps {
    productState: ProductProviderState;
    product?: ProductListItem;
    cartItem?: CartItem;
    modalPanOffsetY?: SharedValue<number>;
}

class ProductDetailsScreen extends Component<ComponentProps> {
    onAddToCart = async () => {
        const { productState } = this.props;

        if (productState.loading.selectedProduct || !productState.state.selectedProduct) return;
        await productState.addItemToCart({
            id: productState.state.selectedProduct.id,
            name: productState.state.selectedProduct.name,
            image: productState.state.selectedProduct.image,
            price: productState.state.selectedProduct.price,
            quantity: 1,
        });
        // productState.fetchCart();
    };

    render() {
        return (
            <Observer
                render={() => {
                    const { productState } = this.props;
                    const item = productState.state.selectedProduct;

                    return (
                        <ProductPageContainer>
                            {this.props.modalPanOffsetY && item ? (
                                <ProductTitleComponent
                                    item={item}
                                    modalPanOffsetY={this.props.modalPanOffsetY}
                                    loading={productState.loading.selectedProduct}
                                    addToCartLoading={productState.loading.addToCart}
                                    onAddToCart={this.onAddToCart}
                                />
                            ) : (
                                <LoaderContainer
                                    entering={FadeIn.springify().mass(0.3)}
                                    exiting={FadeOut.springify().mass(0.3)}
                                >
                                    <ActivityIndicator />
                                </LoaderContainer>
                            )}
                        </ProductPageContainer>
                    );
                }}
            />
        );
    }
}

const ProductTitleComponent = ({
    modalPanOffsetY,
    item,
    loading,
    onAddToCart,
    addToCartLoading,
}: {
    modalPanOffsetY: SharedValue<number>;
    item: Product;
    description?: string;
    onAddToCart: () => void;
    loading: boolean;
    addToCartLoading: boolean;
}) => {
    const containerStyle = useAnimatedStyle(() => {
        return {
            paddingTop: interpolate(modalPanOffsetY.value, [-600, 0], [0, 30], Extrapolation.CLAMP),
        };
    }, [item.image]);
    const imageStyle = useAnimatedStyle(() => {
        return {
            width: interpolate(modalPanOffsetY.value, [-800, -600, 0, 300], [DEVICE_WIDTH * 1.5, DEVICE_WIDTH, 150, 0]),
            height: interpolate(modalPanOffsetY.value, [-600, 0, 300], [300, 150, 0]),
            borderRadius: interpolate(modalPanOffsetY.value, [-600, 0], [0, 20], Extrapolation.CLAMP),
            marginBottom: interpolate(modalPanOffsetY.value, [-600, 0], [30, 10]),
        };
    }, [item.image]);
    const titleStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(modalPanOffsetY.value, [0, 200], [1, 0], Extrapolation.CLAMP),
        };
    }, [item.image]);
    const descriptionStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(modalPanOffsetY.value, [0, 200], [1, 0], Extrapolation.CLAMP),
        };
    }, [item.image]);

    return (
        <ProductTitleContainer
            style={containerStyle}
            entering={FadeIn.springify().mass(0.3)}
            exiting={FadeOut.springify().mass(0.3)}
        >
            <ProductImage source={{ uri: item.image }} style={imageStyle} />
            <ProductTitle large bold center style={titleStyle}>
                {item.name}
            </ProductTitle>
            <ProductAmount huge black center style={titleStyle}>
                {MoneyUtils.formatWithCurrency(item.price)}
            </ProductAmount>
            <ProductDescriptionWrapper style={descriptionStyle}>
                <ProductDescriptionContainer>
                    {loading ? (
                        <AnimatedLoader entering={FadeIn} exiting={FadeOut} />
                    ) : (
                        <DescriptionText center entering={FadeIn} exiting={FadeOut}>
                            {item.description}
                        </DescriptionText>
                    )}
                </ProductDescriptionContainer>
                <AddToCartButton
                    onPress={onAddToCart}
                    title="Add to Cart"
                    primary
                    loading={addToCartLoading}
                    fullWidth
                />
            </ProductDescriptionWrapper>
        </ProductTitleContainer>
    );
};

export default ProductDetailsScreen;
