import detox from 'detox';

import config from '../detox.config';

jest.setTimeout(300000);

beforeAll(async () => {
    // @ts-ignore
    await detox.init(config, { launchApp: false });
    await device.launchApp({
        newInstance: true,
        permissions: {
            notifications: 'YES',
            contacts: 'YES',
        },
    });
}, 300000);

afterAll(async () => {
    await detox.cleanup();
});
