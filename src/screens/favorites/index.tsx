import React, { Component } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Observer } from 'mobx-react';
import { StyleSheet } from 'react-native';

import withProvider from 'app/screens/home/provider';
import { withAppState } from 'app/provider/app-state';
import { AppStateProviderState } from 'app/provider/app-state/provider';
import DefaultLayout from 'app/components/layout/default-layout';
import { withProduct } from 'app/provider/product';
import { ProductProviderState } from 'app/provider/product/provider';
import HomeProductsList from 'app/components/home/home-products-list';
import ProductDetails from 'app/screens/modal/product-details';
import { withModal } from 'app/provider/modal';
import { ModalProviderState } from 'app/provider/modal/provider';

interface ComponentProps extends ScreenProps {
    appState: AppStateProviderState;
    productState: ProductProviderState;
    modalState: ModalProviderState;
}

@withAppState
@withProduct
@withModal
class FavoritesScreen extends Component<ComponentProps> {
    scrollRef = React.createRef<KeyboardAwareScrollView>();

    componentDidMount() {
        this.props.productState.fetchProducts();
    }

    onProductPress = (product: ProductListItem) => {
        const { modalState, productState } = this.props;

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
            <DefaultLayout scrollContainer={false} showHeader contentStyle={styles.content}>
                <Observer
                    render={() => (
                        <HomeProductsList
                            favorite
                            onProductPress={this.onProductPress}
                            onAddToCart={this.onAddToCart}
                            productState={this.props.productState}
                        />
                    )}
                />
            </DefaultLayout>
        );
    }
}

const styles = StyleSheet.create({
    content: { paddingLeft: 0, paddingRight: 0 },
});

export default withProvider(FavoritesScreen);
