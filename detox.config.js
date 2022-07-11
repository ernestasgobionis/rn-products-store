module.exports = {
    testRunner: 'jest',
    runnerConfig: 'e2e/config.json',
    specs: 'e2e',
    behavior: {
        init: {},
    },
    configurations: {
        'ios.sim.debug': {
            binaryPath: 'ios/build/Build/Products/E2E-Debug-iphonesimulator/ProductsShop.app',
            build:
                'xcodebuild -workspace ios/ProductsShop.xcworkspace -scheme ProductsShop-Dev -configuration E2E-Debug -sdk iphonesimulator -derivedDataPath ios/build',
            type: 'ios.simulator',
            name: 'iPhone 8',
        },
        'ios.sim.release': {
            binaryPath: 'ios/build/Build/Products/E2E-Release-iphonesimulator/ProductsShop.app',
            build:
                'xcodebuild -workspace ios/ProductsShop.xcworkspace -scheme ProductsShop-Dev -configuration E2E-Release -sdk iphonesimulator -derivedDataPath ios/build',
            type: 'ios.simulator',
            name: 'iPhone 8',
        },
        'android.emu.debug': {
            binaryPath: 'android/app/build/outputs/apk/dev/debug/app-dev-debug.apk',
            build:
                'cd android && ENVFILE=./.env.e2e.debug ./gradlew assembleDevDebug assembleAndroidTest -DtestBuildType=debug && cd ..',
            type: 'android.emulator',
            name: 'Pixel_3_API_30',
        },
        'android.emu.release': {
            binaryPath: 'android/app/build/outputs/apk/dev/release/app-dev-release.apk',
            build:
                'cd android && ENVFILE=./.env.e2e.release ./gradlew assembleDevRelease assembleAndroidTest -DtestBuildType=release && cd ..',
            type: 'android.emulator',
            name: 'Pixel_3_API_30',
        },
    },
};
