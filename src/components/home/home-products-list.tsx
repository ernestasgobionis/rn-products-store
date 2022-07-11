import React, { Component } from 'react';
import { ActivityIndicator, FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import { Observer } from 'mobx-react';
import { toJS } from 'mobx';
import styled from 'styled-components/native';
import Animated, { CurvedTransition, FadeIn, FadeOut } from 'react-native-reanimated';

import { ProductProviderState } from 'app/provider/product/provider';
import { withAppState } from 'app/provider/app-state';
import { AppStateProviderState } from 'app/provider/app-state/provider';
import HomeProductsListItem from 'app/components/home/home-products-list-item';
import { GenericText } from 'app/components/ui/text';
import { strings } from 'app/localization/strings';

const ContainerSpringConfig = {
    entering: FadeIn.springify().mass(0.3),
    exiting: FadeOut.springify().mass(0.3),
    layout: CurvedTransition.duration(250).delay(250),
};

const Container = Animated.createAnimatedComponent(styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`);

interface ComponentProps {
    favorite?: boolean;
    onProductPress: (product: ProductListItem) => void;
    onAddToCart: (product: ProductListItem) => void;
    productState: ProductProviderState;
    appState: AppStateProviderState;
}

@withAppState
class HomeProductsList extends Component<ComponentProps> {
    static defaultProps = {
        appState: {},
    };
    onProductPress = (product: ProductListItem) => {
        this.props.onProductPress(product);
    };
    onFavoritePress = (_product: ProductListItem): Promise<void> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    };
    onAddToCart = (product: ProductListItem) => {
        this.props.onAddToCart(product);
    };
    renderProduct = ({ item, index }: ListRenderItemInfo<ProductListItem>) => {
        const { favorite } = this.props;

        return (
            <HomeProductsListItem
                item={item}
                index={index}
                favorite={favorite}
                onProductPress={this.onProductPress}
                onFavoritePress={this.onFavoritePress}
                onAddToCart={this.onAddToCart}
            />
        );
    };
    render() {
        return (
            <Observer
                render={() => {
                    const { products } = this.props.productState.state;
                    const items = toJS(products);

                    if (items.length === 0) {
                        if (this.props.productState.loading.products) {
                            return (
                                <Container {...ContainerSpringConfig}>
                                    <ActivityIndicator />
                                </Container>
                            );
                        }

                        return (
                            <Container {...ContainerSpringConfig}>
                                <GenericText center bold>
                                    {strings.productsEmptyPlaceholder}
                                </GenericText>
                            </Container>
                        );
                    }

                    return (
                        <Animated.View {...ContainerSpringConfig}>
                            <FlatList
                                data={items}
                                renderItem={this.renderProduct}
                                keyExtractor={(item, index) => `${item.id}-${item.name}-${index}`}
                                numColumns={2}
                                contentContainerStyle={styles.contentContainerStyle}
                            />
                        </Animated.View>
                    );
                }}
            />
        );
    }
}

const styles = StyleSheet.create({
    contentContainerStyle: {
        paddingTop: 15,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 100,
    },
});

export default HomeProductsList;
