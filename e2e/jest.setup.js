// JEST setup file
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import jsdom from 'jsdom';
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';

configure({ adapter: new Adapter() });

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);
// jest.mock('react-native', () => require('react-native-mock-render'), {virtual: true});

const { JSDOM } = jsdom;
const { document } = new JSDOM('', { url: 'http://localhost' }).window;

global.document = document;
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
        global[property] = document.defaultView[property];
    }
});
