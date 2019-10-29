import {handler} from './hello';

test('should return statusCode 200', (): void => {
    const actual = handler(null);
    expect(actual.statusCode).toBe(200);
});

