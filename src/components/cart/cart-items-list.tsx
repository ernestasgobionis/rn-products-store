import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Observer } from 'mobx-react';
import { toJS } from 'mobx';
import styled from 'styled-components/native';
import Animated, { CurvedTransition, FadeIn, FadeOut, FadeOutUp } from 'react-native-reanimated';

import { ProductProviderState } from 'app/provider/product/provider';
import CartListItem from 'app/components/cart/cart-list-item';
import { GenericText } from 'app/components/ui/text';
import { strings } from 'app/localization/strings';
import { Button } from 'app/components/ui/button';

const Container = Animated.createAnimatedComponent(styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`);

const ClearButton = styled(Button)`
    margin: 0 auto 15px;
`;

interface ComponentProps {
    onCartItemPress: (cartItem: CartItem) => void;
    onUpdateCartItem: (cartItem: CartItem, quantity: number) => void;
    onRemoveCartItem: (cartItem: CartItem) => void;
    productState: ProductProviderState;
}

class CartItemsList extends Component<ComponentProps> {
    renderProduct = (item: CartItem) => {
        return (
            <CartListItem
                key={item.itemId}
                item={item}
                onCartItemPress={this.props.onCartItemPress}
                onUpdateCartItem={this.props.onUpdateCartItem}
                onRemoveCartItem={this.props.onRemoveCartItem}
            />
        );
    };
    render() {
        return (
            <Observer
                render={() => {
                    const items = toJS(this.props.productState.state.cartItems);

                    if (items.length === 0) {
                        return (
                            <Container
                                entering={FadeIn.duration(550).delay(250)}
                                exiting={FadeOut.duration(250)}
                                layout={CurvedTransition.duration(500)}
                            >
                                <GenericText center bold>
                                    {strings.cartEmptyPlaceholder}
                                </GenericText>
                            </Container>
                        );
                    }

                    return (
                        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
                            <Animated.View
                                entering={FadeIn.springify().mass(0.3)}
                                exiting={FadeOutUp.springify().mass(0.3)}
                                layout={CurvedTransition.duration(250)}
                            >
                                <ClearButton
                                    onPress={this.props.productState.clearCart}
                                    title={strings.clearCart}
                                    danger
                                />
                            </Animated.View>
                            {items.map(this.renderProduct)}
                        </ScrollView>
                    );
                }}
            />
        );
    }
}

const styles = StyleSheet.create({
    contentContainerStyle: {
        paddingTop: 15,
        paddingBottom: 150,
        paddingLeft: 10,
        paddingRight: 10,
    },
});

export default CartItemsList;
