// import original module declarations

declare module '*.svg' {
    import { SvgProps } from 'react-native-svg';

    const content: React.ComponentClass<SvgProps, any>;
    export default content;
}

declare type SimpleObject<T = any> = {
    [key: string]: T;
};

declare type Nullable<T> = T | null;

interface Country {
    name: string;
    dialCode: string;
    id: string;
}

declare interface UrlNavigationEvent {
    url: Nullable<string>;
}

declare interface ScreenProps {
    componentId: string;
}

type StoreLoadingState<T> = {
    [K in keyof T]?: boolean;
};

type StorePaginationState<T> = {
    [K in keyof T]?: PaginationItem;
};

interface PaginationItem extends SimpleObject {
    perPage: number;
    page: number;
    pages?: number;
    isLastPage?: boolean;
    query?: string;
}

declare module '*.png';
declare module '*.gif';

declare module '@react-native-community/async-storage/jest/async-storage-mock';
