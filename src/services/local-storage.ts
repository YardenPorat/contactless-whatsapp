import { Option } from '../constants/country-codes';
import { debounce } from '../utils/debounce';

const KEYS = {
    message: 'message',
    phone: 'phone',
    countryCode: 'countryCode',
};

const save = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const get = (key: string) => {
    const saved = localStorage.getItem(key);
    if (saved) {
        return JSON.parse(saved);
    }
    return '';
};

const saveMessage = debounce((message: string) => save(KEYS.message, message), 1000);
const savePhone = debounce((phone: string) => save(KEYS.phone, phone), 1000);
const saveCountryCode = (country: Option) => save(KEYS.countryCode, country);

const getMessage = (): string => get(KEYS.message);
const getPhone = (): string => get(KEYS.phone);
const getCountryCode = () => get(KEYS.countryCode);

export const localStorageService = {
    saveMessage,
    getMessage,
    savePhone,
    getPhone,
    saveCountryCode,
    getCountryCode,
};
