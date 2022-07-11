import React, { Component } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet } from 'react-native';

import withProvider from './provider';
import { withAppState } from 'app/provider/app-state';
import { AppStateProviderState } from 'app/provider/app-state/provider';
import DefaultLayout from 'app/components/layout/default-layout';
import { withProduct } from 'app/provider/product';
import { ProductProviderState } from 'app/provider/product/provider';
import HomeProductsList from 'app/components/home/home-products-list';
import { withModal } from 'app/provider/modal';
import { ModalProviderState } from 'app/provider/modal/provider';
import ProductDetails from '../modal/product-details';

interface ComponentProps extends ScreenProps {
    appState: AppStateProviderState;
    productState: ProductProviderState;
    modalState: ModalProviderState;
}

@withAppState
@withProduct
@withModal
class HomeScreen extends Component<ComponentProps> {
    scrollRef = React.createRef<KeyboardAwareScrollView>();

    componentDidMount() {
        this.props.productState.fetchProducts();
        this.props.productState.fetchCart();
    }

    onProductPress = (product: ProductListItem) => {
        const { productState, modalState } = this.props;

        productState.fetchSelectedProduct(product.id);
        modalState.toggleModal({
            show: true,
            content: <ProductDetails productState={productState} />,
        });
    };

    onAddToCart = async (product: ProductListItem) => {
        const { productState } = this.props;

        await productState.addItemToCart({
            id: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
            quantity: 1,
        });
    };

    render() {
        return (
            <DefaultLayout onEndReachedThreshold={70} contentStyle={styles.content} scrollContainer={false} showHeader>
                <HomeProductsList
                    onProductPress={this.onProductPress}
                    onAddToCart={this.onAddToCart}
                    productState={this.props.productState}
                />
            </DefaultLayout>
        );
    }
}

const styles = StyleSheet.create({
    content: { paddingLeft: 0, paddingRight: 0 },
});

export default withProvider(HomeScreen);
