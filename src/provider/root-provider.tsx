import React from 'react';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import { AppStateProvider } from 'app/provider/app-state';
import { ModalProvider } from 'app/provider/modal';
import { ProductProvider } from 'app/provider/product';

const RootProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ActionSheetProvider>
            <AppStateProvider>
                <ModalProvider>
                    <ProductProvider>{children}</ProductProvider>
                </ModalProvider>
            </AppStateProvider>
        </ActionSheetProvider>
    );
};

export default RootProvider;
