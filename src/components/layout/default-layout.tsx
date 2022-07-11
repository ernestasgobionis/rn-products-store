import React, { Component } from 'react';
import {
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollViewProps,
    StyleSheet,
    ViewStyle,
    RefreshControl,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Observer } from 'mobx-react';

import { ScreenContainer, ScreenContentContainer } from 'app/components/ui/screen';
import { withAppState } from 'app/provider/app-state';
import { AppStateProviderState } from 'app/provider/app-state/provider';
import { IS_ANDROID } from 'app/utils/platform-utils';
import BottomTabs from 'app/components/navigation/bottom-tabs';
import Header, { LayoutHeaderProps } from './header';
import { withProduct } from 'app/provider/product';
import { ProductProviderState } from 'app/provider/product/provider';

export const DEFAULT_LAYOUT_TOP_OVERFLOW = IS_ANDROID ? 0 : -48;

interface ComponentProps extends Partial<LayoutHeaderProps> {
    children: React.ReactChild | React.ReactChild[] | React.ReactElement | Element | Element[];
    setLayoutRef?: (ref: DefaultLayout) => void;
    style?: ViewStyle;
    contentStyle?: ViewStyle;
    contentContainerStyle?: ViewStyle;
    scrollable?: boolean;
    scrollContainer?: boolean;
    appState: AppStateProviderState;
    productState: ProductProviderState;
    scrollRef?: React.Ref<KeyboardAwareScrollView>;
    scrollProps?: ScrollViewProps;
    onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    onContentSizeChange?: (w: number, h: number) => void;
    onEndReached?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    onEndReachedThreshold: number;
    onStartReached?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    onStartReachedThreshold: number;
    FooterElement?: React.ReactElement;
    refreshProps?: {
        refreshing: boolean;
        onRefresh: () => void;
    };
    showTabs?: boolean;
    showHeader?: boolean;
    testID?: string;
}

const calculateEndReached = (
    { layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent,
    onEndReachedThreshold?: number,
) => {
    const paddingToBottom = onEndReachedThreshold || 20;

    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
};

@withAppState
@withProduct
class DefaultLayout extends Component<ComponentProps> {
    static defaultProps = {
        showHeader: false,
        scrollContainer: true,
        appState: {},
        productState: {},
        scrollProps: { scrollEventThrottle: 10000 },
        onStartReachedThreshold: 0,
        onEndReachedThreshold: 0,
        showTabs: true,
    };

    leftStartThreshold = false;
    leftEndThreshold = false;

    componentDidMount() {
        const { setLayoutRef } = this.props;

        if (setLayoutRef) setLayoutRef(this);
    }

    constructor(props: ComponentProps) {
        super(props);
    }

    onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { onScroll, onEndReached, onEndReachedThreshold, onStartReached, onStartReachedThreshold } = this.props;

        if (onStartReached && event.nativeEvent.contentOffset.y <= onStartReachedThreshold && this.leftStartThreshold) {
            onStartReached(event);
            this.leftStartThreshold = false;
        }
        if (
            (event.nativeEvent.contentOffset.y <= onStartReachedThreshold || onStartReachedThreshold === 0) &&
            !this.leftStartThreshold
        ) {
            this.leftStartThreshold = true;
        }

        if (
            (event.nativeEvent.contentOffset.y >= onEndReachedThreshold || onEndReachedThreshold === 0) &&
            !this.leftEndThreshold
        ) {
            this.leftEndThreshold = true;
        }

        if (onEndReached && calculateEndReached(event.nativeEvent, onEndReachedThreshold) && this.leftEndThreshold) {
            onEndReached(event);
            this.leftEndThreshold = false;
        }

        if (onScroll) {
            onScroll(event);
        }
    };

    render() {
        const {
            appState,
            children,
            style,
            scrollable,
            scrollContainer,
            contentStyle,
            contentContainerStyle,
            scrollRef,
            scrollProps,
            FooterElement,
            refreshProps,
            onContentSizeChange,
            showTabs,
            testID,

            componentId,
            headerStyle,
            showHeader,
            showBack,
            headerTitle,
        } = this.props;

        const contentProps = {
            componentId,
            contentStyle,
            headerStyle,
            showHeader,
            scrollRef,
            scrollable,
            showBack,
            headerTitle,
        };

        return (
            <ScreenContainer style={style}>
                {scrollContainer ? (
                    <KeyboardAwareScrollView
                        {...scrollProps}
                        refreshControl={
                            refreshProps && (
                                <RefreshControl
                                    refreshing={refreshProps.refreshing}
                                    onRefresh={refreshProps.onRefresh}
                                    tintColor="#fff"
                                    style={{ zIndex: 1000 }}
                                />
                            )
                        }
                        scrollEnabled={scrollable}
                        contentContainerStyle={[contentContainerStyle, scrollProps?.contentContainerStyle]}
                        style={{ backgroundColor: appState.theme.color.background }}
                        // @ts-ignore
                        ref={scrollRef}
                        onScroll={this.onScroll}
                        onContentSizeChange={onContentSizeChange}
                        keyboardOpeningTime={0}
                        extraHeight={100}
                        scrollToOverflowEnabled={false}
                        enableResetScrollToCoords={false}
                        enableOnAndroid={true}
                        keyboardShouldPersistTaps="handled"
                        testID={testID}
                    >
                        <LayoutContent {...contentProps}>{children}</LayoutContent>
                    </KeyboardAwareScrollView>
                ) : (
                    <LayoutContent {...contentProps}>{children}</LayoutContent>
                )}
                {FooterElement}
                {showTabs && (
                    <Observer
                        render={() => {
                            return <BottomTabs cartItems={this.props.productState.state.cartItems.length} />;
                        }}
                    />
                )}
            </ScreenContainer>
        );
    }
}
const LayoutContent = ({
    contentStyle,
    children,
    showHeader,
    componentId,
    headerStyle,
    showBack,
    headerTitle,
}: Partial<ComponentProps>) => {
    return (
        <React.Fragment>
            {showHeader && (
                <Header
                    componentId={componentId}
                    headerStyle={headerStyle}
                    showBack={showBack}
                    headerTitle={headerTitle}
                />
            )}
            <ScreenContentContainer style={[styles.content, contentStyle]}>{children}</ScreenContentContainer>
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    content: {
        // paddingBottom: IS_ANDROID ? 50 : 0,
    },
});

export default DefaultLayout;
