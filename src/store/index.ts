import { container } from 'app/services/container';
import { HttpService } from 'app/services/http/service/http-service';
import { StorageService } from 'app/services/storage/storage-service';
// Stores
import AppStateStore from 'app/store/app-state';
import NetworkStore from 'app/store/network';
import ProductStore from 'app/store/product';

export default () => {
    const httpService = container.get<HttpService>('HttpService');
    const storageService = container.get<StorageService>('StorageService');

    // Stores
    const appStateStore = AppStateStore.init(storageService, httpService);
    const productStore = ProductStore.init(httpService);
    const networkStore = NetworkStore.init();

    return {
        appStateStore,
        productStore,
        networkStore,
    };
};
