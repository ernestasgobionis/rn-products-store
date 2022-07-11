import Config from 'react-native-config';

import emptyImage from 'assets/images/user_image.png';
import { IS_ANDROID } from 'app/utils/platform-utils';

export type ApiEndpoints = keyof typeof parameters.api.endpoints;

export const parameters = {
    app: {
        env: Config.ENV,
        name: Config.APP_NAME,
        inTestMode: Config.TEST_MODE === 'true',
        schema: 'products-shop://',
        uriPrefixes: [`${Config.URL_SCHEME}://`, 'https://www.products-shop.app'],
        defaultProfilePicture: emptyImage,
        confirmCodeLength: 6,
        pinCodeLength: 4,
        unknownUserId: 'unknown',
        supportMail: Config.SUPPORT_EMAIL,
        dateTimeFormatDateBirth: 'DD/MM/YYYY',
        orderPeriodicCheckTimeout: 2000,
    },
    oneSignal: {
        appId: Config.ONE_SIGNAL_APP_ID,
    },
    stripe: {
        publishableKey: Config.STRIPE_PUBLISHABLE_KEY,
        enabled: Config.STRIPE_ENABLED !== 'false',
    },
    socket: {
        namespace: Config.WEBSOCKET_NAMESPACE,
        port: Config.WEBSOCKET_PORT,
        subscriptionName: Config.WEBSOCKET_SUBSCRIPTION_NAME,
    },
    api: {
        baseUrl: Config.ENV === 'test' && IS_ANDROID ? 'http://10.0.2.2:80' : Config.API_BASE_URL,
        endpoints: {
            getProducts: '/items',
            getProduct: '/items/:id/',
            getCartItems: '/cart',
            addToCart: '/cart',
            clearCart: '/cart',
            removeFromCart: '/cart/:itemId',
            updateCartItem: '/cart/:itemId',
        },
    },
};
