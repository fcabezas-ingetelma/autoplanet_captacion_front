import { validaRut, validaPhoneLength } from '../utils/utils';

test('Validate phone length', () => {
    expect(validaPhoneLength('12345678')).toBeTruthy();
    expect(validaPhoneLength('1234')).toBeFalsy();
});

test('Validate correct RUT format', () => {
    expect(validaRut('11111111-1')).toBeTruthy();
    expect(validaRut('11111111-0')).toBeFalsy();
    expect(validaRut('111111111')).toBeFalsy();
    expect(validaRut('11111111')).toBeFalsy();
    expect(validaRut('16224289-K')).toBeTruthy();
    expect(validaRut('16224289-k')).toBeTruthy();
    expect(validaRut('16224289k')).toBeFalsy();
    expect(validaRut('123')).toBeFalsy();
});