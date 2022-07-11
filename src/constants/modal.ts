import { Options, OptionsModalPresentationStyle } from 'react-native-navigation';

export const MODAL_NAVIGATION_OPTIONS = ({ label, ...rest }: SimpleObject): Options => ({
    modalPresentationStyle: OptionsModalPresentationStyle.pageSheet,
    topBar: {
        title: {
            text: label,
        },
        visible: true,
        drawBehind: false,
        leftButtons: [
            {
                id: 'cancel',
                systemItem: 'cancel',
            },
        ],
        rightButtons: [
            {
                id: 'done',
                systemItem: 'done',
                fontWeight: 'semibold',
            },
        ],
        ...rest,
    },
});
