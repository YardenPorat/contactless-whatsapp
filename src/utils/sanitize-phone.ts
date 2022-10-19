export function getPhoneWithPrefix(phone: string, prefix: string) {
    const sanitizedPhone = sanitizePhone(phone);
    if (sanitizedPhone.startsWith(prefix)) {
        return sanitizedPhone;
    }
    return `${prefix}${sanitizedPhone}`;
}

function sanitizePhone(phone: string) {
    return phone.replace(/\D/g, '').replace(/^0/, '');
}
