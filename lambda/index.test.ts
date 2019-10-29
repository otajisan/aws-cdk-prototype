import { handler } from './index';

describe('should fetch employees', ():void => {
    test('should fetch employees', (): void => {
        const actual = handler(null);
        expect(handler).toBe('otajisan')
    });
});
