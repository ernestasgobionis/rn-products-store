import React from 'react';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppStateProvider } from 'app/provider/app-state';
import { ModalProvider } from 'app/provider/modal';
import { ProductProvider } from 'app/provider/product';

const RootProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <SafeAreaProvider>
            <ActionSheetProvider>
                <AppStateProvider>
                    <ModalProvider>
                        <ProductProvider>{children}</ProductProvider>
                    </ModalProvider>
                </AppStateProvider>
            </ActionSheetProvider>
        </SafeAreaProvider>
    );
};

export default RootProvider;
