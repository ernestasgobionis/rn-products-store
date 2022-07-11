import { action, observable } from 'mobx';

import { HttpService } from 'app/services/http/service/http-service';
import { productConverter } from 'app/data/converters/response/product';
import { cartItemConverter } from 'app/data/converters/response/cart-item';

interface State {
    products: ProductListItem[];
    selectedProduct?: Product;
    cartItems: CartItem[];
}

export type OrderStoreLoadingState = StoreLoadingState<State> & {
    addToCart: boolean;
    updateCartItem: boolean;
    removeCartItem: boolean;
    clearCart: boolean;
};

class ProductStore {
    private static instance: ProductStore;

    httpService: HttpService;

    @observable state: State = {
        products: [],
        selectedProduct: undefined,
        cartItems: [],
    };

    @observable.shallow loading: Required<OrderStoreLoadingState> = {
        products: false,
        selectedProduct: false,
        cartItems: false,
        addToCart: false,
        updateCartItem: false,
        removeCartItem: false,
        clearCart: false,
    };

    constructor(httpService: HttpService) {
        this.httpService = httpService;
    }

    static init(httpService: HttpService) {
        this.instance = new ProductStore(httpService);

        return this.instance;
    }

    static getInstance() {
        return this.instance;
    }

    @action.bound
    setLoading(key: keyof OrderStoreLoadingState, state: boolean) {
        this.loading[key] = state;
    }

    @action.bound
    setProducts(products: ProductListItem[]) {
        this.state.products = products;
    }

    @action.bound
    setSelectedProduct(product?: Product) {
        this.state.selectedProduct = product;
    }

    @action.bound
    setCartItems(cartItems: CartItem[]) {
        this.state.cartItems = cartItems;
    }

    fetchProducts = async () => {
        try {
            if (this.loading.products) {
                return;
            }
            this.setLoading('products', true);
            const response = await this.httpService.get('getProducts', null, null, { useAuth: false });
            const products = response.data.map((d: SimpleObject, idx: number) =>
                productConverter.convert({ ...d, id: d.id + idx, name: `${d.name}-${idx}` }),
            );

            this.setProducts(products);
            this.setLoading('products', false);
        } catch (e) {
            this.setLoading('products', false);
            throw e;
        }
    };

    fetchSelectedProduct = async (id: string) => {
        try {
            if (this.loading.selectedProduct) {
                return;
            }
            this.setSelectedProduct(undefined);
            this.setLoading('selectedProduct', true);
            const response = await this.httpService.get('getProduct', { id }, null, { useAuth: false });
            const selectedProduct = productConverter.convert(response.data);

            this.setSelectedProduct(selectedProduct);
            this.setLoading('selectedProduct', false);

            return selectedProduct;
        } catch (e) {
            this.setLoading('selectedProduct', false);
            throw e;
        }
    };

    fetchCart = async () => {
        try {
            if (this.loading.cartItems) {
                return;
            }
            this.setLoading('cartItems', true);
            const response = await this.httpService.get('getCartItems', null, null, { useAuth: false });
            const selectedProduct = response.data.map((d: SimpleObject) => cartItemConverter.convert(d));

            this.setCartItems(selectedProduct);
            this.setLoading('cartItems', false);
        } catch (e) {
            this.setLoading('cartItems', false);
            throw e;
        }
    };

    addItemToCart = async (data: { id: string; name: string; image: string; price: number; quantity: number }) => {
        try {
            if (this.loading.addToCart) {
                return;
            }
            const found = this.state.cartItems.find((item) => item.itemId === data.id);

            if (found) {
                await this.updateCartItem({ ...data, quantity: found.quantity + 1 });

                return;
            }
            this.setLoading('addToCart', true);
            this.state.cartItems.push({
                itemId: data.id,
                name: data.name,
                image: data.image,
                price: data.price,
                quantity: 1,
            });

            await this.httpService.post('addToCart', data, null, null, { useAuth: false });
            // this.setSelectedProduct(selectedProduct);
            this.setLoading('addToCart', false);
        } catch (e) {
            this.setLoading('addToCart', false);
            throw e;
        }
    };

    updateCartItem = async (data: { id: string; name: string; image: string; price: number; quantity: number }) => {
        try {
            if (this.loading.updateCartItem) {
                return;
            }
            this.setLoading('updateCartItem', true);
            const found = this.state.cartItems.find((i) => i.itemId === data.id);

            if (found) {
                if (data.quantity === 0) {
                    await this.removeCartItem(data.id);
                    this.setLoading('updateCartItem', false);

                    return;
                }
                found.quantity = data.quantity;
            }

            await this.httpService.put('updateCartItem', { itemId: data.id }, null, null, {
                useAuth: false,
            });

            this.setLoading('updateCartItem', false);
        } catch (e) {
            this.setLoading('updateCartItem', false);
            throw e;
        }
    };

    removeCartItem = async (itemId: string) => {
        try {
            if (this.loading.removeCartItem) {
                return;
            }
            this.setLoading('removeCartItem', true);
            // Simulate cart update
            this.state.cartItems = this.state.cartItems.filter((i) => i.itemId !== itemId);
            await this.httpService.delete('removeFromCart', { itemId }, null, { useAuth: false });

            this.setLoading('removeCartItem', false);
        } catch (e) {
            this.setLoading('removeCartItem', false);
            throw e;
        }
    };

    clearCart = async () => {
        try {
            if (this.loading.clearCart) {
                return;
            }
            this.setLoading('clearCart', true);
            // Simulate cart update
            this.state.cartItems = [];
            await this.httpService.delete('clearCart', null, null, { useAuth: false });

            this.setLoading('clearCart', false);
        } catch (e) {
            this.setLoading('clearCart', false);
            throw e;
        }
    };
}

export default ProductStore;
