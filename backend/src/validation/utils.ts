
export function isNumeric(str?: string) {
    // natural numbers only (incl zero)
    return typeof str === "string" && /^[0-9]\d*$/.test(str);
}

// Helper function for Luhn's algorithm (checksum)
export function isValidLuhn(cardNumber?: string): boolean {
    if(typeof cardNumber !== "string" || !cardNumber) {
        return false;
    }

    let sum = 0;
    let shouldDouble = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
        try {
            let digit = parseInt(cardNumber.charAt(i), 10);
            if (shouldDouble) {
                if ((digit *= 2) > 9) digit -= 9;
            }
            sum += digit;
            shouldDouble = !shouldDouble;
        } catch (e) {
            return false;
        }
    }

    return sum % 10 === 0;
}

export function removeAllSpaces(str?: string) {
    return str?.replace(/\s/g, '');
}