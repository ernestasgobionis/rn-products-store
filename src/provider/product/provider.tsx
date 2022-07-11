import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import Context from './context';
import ProductStore from 'app/store/product';

export type ProductProviderState = ProductStore;

interface ComponentProps {
    productStore: ProductStore;
    children: React.ReactNode;
}

@inject('productStore')
@observer
class ProductProvider extends Component<ComponentProps> {
    static defaultProps = {
        productStore: {},
    };

    render() {
        const { children, productStore } = this.props;

        return (
            <Context.Provider
                value={{
                    productState: productStore,
                }}
            >
                {children}
            </Context.Provider>
        );
    }
}

export default ProductProvider;
