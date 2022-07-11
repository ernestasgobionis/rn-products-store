import NetInfo from '@react-native-community/netinfo';
import { action, observable } from 'mobx';
import { OptionsModalPresentationStyle } from 'react-native-navigation';
import { Dimensions } from 'react-native';

import { NavigationUtils } from 'app/utils/navigation';
import { SCREENS } from 'app/screens/screen-registry';
import AppStateStore from 'app/store/app-state';

export type NetworkConnectivityListener = (isConnected: boolean) => void;

class NetworkStore {
    static instance: NetworkStore;

    private closeNetworkModal: Nullable<() => void> = null;

    @observable
    state = { connected: true, opened: false };

    private listeners: NetworkConnectivityListener[] = [];

    constructor() {
        NetInfo.configure({
            reachabilityTest: async (response) => {
                return response.status === 200 || response.ok;
            },
        });
        NetInfo.fetch().then();
        setTimeout(() => {
            NetInfo.fetch().then((state) => {
                this.state.connected = Boolean(state.isInternetReachable);

                if (
                    !this.state.connected &&
                    !AppStateStore.getInstance().state.registeredScreens.has(SCREENS.MODALS.NETWORK)
                ) {
                    this.showNetworkModal();
                }
            });
            this.bindListeners();
        }, 3000);
    }

    static init() {
        this.instance = new NetworkStore();

        return this.instance;
    }

    static getInstance(): NetworkStore {
        return this.instance;
    }

    get isOffline() {
        return !this.state.connected;
    }

    public addListener(listener: NetworkConnectivityListener) {
        this.listeners.push(listener);
    }

    public removeListener(listener: NetworkConnectivityListener) {
        const indexToRemove = this.listeners.findIndex((l) => listener === l);

        if (indexToRemove === -1) {
            return;
        }

        this.listeners.splice(indexToRemove, 1);
    }

    @action.bound
    setModalOpened(state: boolean) {
        this.state.opened = state;
    }

    private bindListeners() {
        NetInfo.addEventListener((state) => {
            this.handleConnectivityChange(Boolean(state.isInternetReachable));
        });
    }

    private handleConnectivityChange = (isConnected: boolean) => {
        this.state.connected = isConnected;

        if (!this.state.connected) {
            if (!this.state.opened) {
                this.showNetworkModal();
            }
        } else {
            if (this.state.opened && this.closeNetworkModal) {
                this.closeNetworkModal();
                this.setModalOpened(false);
            }
        }

        this.listeners.forEach((listener) => listener(isConnected));
    };

    private showNetworkModal = () => {
        if (__DEV__) {
            return;
        }
        if (this.state.opened) return;
        this.setModalOpened(true);
        NavigationUtils.showModal(
            SCREENS.MODALS.NETWORK,
            SCREENS.MODALS.NETWORK,
            { setModalClose: (f: () => void) => (this.closeNetworkModal = f) },
            {
                topBar: {
                    visible: false,
                    rightButtons: [],
                },
                modalPresentationStyle: OptionsModalPresentationStyle.overCurrentContext,
                layout: {
                    backgroundColor: 'transparent',
                    componentBackgroundColor: 'transparent',
                },
                animations: {
                    showModal: {
                        alpha: {
                            from: 0,
                            to: 1,
                            duration: 350,
                        },
                        y: {
                            from: Dimensions.get('window').height,
                            to: 0,
                            duration: 350,
                        },
                    },
                },
            },
        );
    };
}

export default NetworkStore;
