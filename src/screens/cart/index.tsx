import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Observer } from 'mobx-react';

import withProvider from './provider';
import { withAppState } from 'app/provider/app-state';
import { AppStateProviderState } from 'app/provider/app-state/provider';
import DefaultLayout from 'app/components/layout/default-layout';
import { withProduct } from 'app/provider/product';
import { ProductProviderState } from 'app/provider/product/provider';
import CartItemsList from 'app/components/cart/cart-items-list';
import ProductDetails from 'app/screens/modal/product-details';
import { withModal } from 'app/provider/modal';
import { ModalProviderState } from 'app/provider/modal/provider';
import FloatingButton from 'app/components/cart/floating-button';

interface ComponentProps extends ScreenProps {
    appState: AppStateProviderState;
    productState: ProductProviderState;
    modalState: ModalProviderState;
}

@withAppState
@withProduct
@withModal
class CartScreen extends Component<ComponentProps> {
    scrollRef = React.createRef<KeyboardAwareScrollView>();

    onCartItemPress = async (cartItem: CartItem) => {
        const { productState, modalState } = this.props;

        productState.fetchSelectedProduct(cartItem.itemId);
        modalState.toggleModal({
            show: true,
            content: <ProductDetails productState={productState} />,
        });
    };
    onUpdateCartItem = (cartItem: CartItem, quantity: number) => {
        const { productState } = this.props;

        productState.updateCartItem({
            id: cartItem.itemId,
            name: cartItem.name,
            image: cartItem.image,
            price: cartItem.price,
            quantity,
        });
    };
    onRemoveCartItem = (cartItem: CartItem) => {
        const { productState } = this.props;

        productState.removeCartItem(cartItem.itemId);
    };

    render() {
        return (
            <Observer
                render={() => (
                    <DefaultLayout
                        style={styles.container}
                        scrollContainer={false}
                        contentStyle={styles.content}
                        showHeader
                        FooterElement={
                            this.props.productState.state.cartItems.length > 0 ? <FloatingButton /> : undefined
                        }
                    >
                        <CartItemsList
                            onCartItemPress={this.onCartItemPress}
                            onUpdateCartItem={this.onUpdateCartItem}
                            onRemoveCartItem={this.onRemoveCartItem}
                            productState={this.props.productState}
                        />
                    </DefaultLayout>
                )}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        zIndex: 1,
    },
    content: { paddingLeft: 0, paddingRight: 0 },
});

export default withProvider(CartScreen);
