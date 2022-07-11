import Deviceinfo from 'react-native-device-info';

export class DeviceInfo {
    private version: Nullable<string> = null;
    private buildNumber: Nullable<string> = null;
    private brand: Nullable<string> = null;
    private systemVersion: Nullable<string> = null;
    private model: Nullable<string> = null;
    private emulator: Nullable<boolean> = null;
    private os: Nullable<string> = null;
    private osVersion: Nullable<string> = null;
    private uniqueDeviceId: Nullable<string> = null;
    private memoryUsage = 0;
    private totalMemory = 0;

    constructor() {
        this.preload();
    }

    private async preload(): Promise<void> {
        this.version = Deviceinfo.getVersion();
        this.buildNumber = Deviceinfo.getBuildNumber();
        this.brand = Deviceinfo.getBrand();
        this.systemVersion = Deviceinfo.getSystemVersion();
        this.model = Deviceinfo.getModel();
        this.emulator = await Deviceinfo.isEmulator();
        this.memoryUsage = await Deviceinfo.getUsedMemory();
        this.totalMemory = await Deviceinfo.getTotalMemory();
        this.os = `${Deviceinfo.getDeviceId()} v${Deviceinfo.getSystemVersion()}`;
        this.osVersion = Deviceinfo.getSystemVersion();
        this.uniqueDeviceId = Deviceinfo.getUniqueId();
    }

    getVersion(): Nullable<string> {
        return this.version;
    }

    getBuildNumber(): Nullable<string> {
        return this.buildNumber;
    }

    getBrand(): Nullable<string> {
        return this.brand;
    }

    getSystemVersion(): Nullable<string> {
        return this.systemVersion;
    }

    getModel(): Nullable<string> {
        return this.model;
    }

    isEmulator(): Nullable<boolean> {
        return this.emulator;
    }

    getUsedMemory(): number {
        return this.memoryUsage;
    }

    getTotalMemory(): number {
        return this.totalMemory;
    }

    getOs(): Nullable<string> {
        return this.os;
    }

    getOsVersion(): Nullable<string> {
        return this.osVersion;
    }

    getUniqueDeviceId(): Nullable<string> {
        return this.uniqueDeviceId;
    }
}

export const deviceInfo = new DeviceInfo();
