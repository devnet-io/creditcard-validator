export interface ICardValidationRules {
    label: string;
    allowedNumberLengths: number[];
    allowedNumberPrefixes: number[];
    allowedCvcLength: number;
}

export const rules: ICardValidationRules[] = [
    /**
     * American Express (AmEx):
     * - Starts with '34' or '37'.
     * - Card number length must be 15 digits.
     * - Must pass Luhn's checksum algorithm.
     * - 4 digit cvc
     */
    {
        label: "American Express",
        allowedNumberLengths: [15],
        allowedNumberPrefixes: [34, 37],
        allowedCvcLength: 4
    },
    /**
     * Diners Club card:
     * - Starts with '30', '36', '38', or '39'.
     * - Card number length must be 14 digits.
     * - Must pass Luhn's checksum algorithm.
     * - 3 digit cvc
     */
    {
        label: "Diners Club",
        allowedNumberLengths: [14],
        allowedNumberPrefixes: [30, 36, 38, 39],
        allowedCvcLength: 3
    },
    /**
     * Discover card:
     * - Starts with '6011' or '65'
     * - Card number length must be 16 digits.
     * - Must pass Luhn's checksum algorithm.
     * - 3 digit cvc
     */
    {
        label: "Discover",
        allowedNumberLengths: [16],
        allowedNumberPrefixes: [6011, 65],
        allowedCvcLength: 3
    },
    /**
     * Mastercard:
     * - Starts with '51' - '55'
     * - Card number length must be 16 digits.
     * - Must pass Luhn's checksum algorithm.
     * - 3 digit cvc
     */
    {
        label: "MasterCard",
        allowedNumberLengths: [16],
        allowedNumberPrefixes: [51, 52, 53, 54, 55],
        allowedCvcLength: 3
    },
    /**
     * Visa card:
     * - Starts with '4'.
     * - Card number length must be either 13 or 16 digits.
     * - Must pass Luhn's checksum algorithm.
     * - 3 digit cvc
     */
    {
        label: "Visa",
        allowedNumberLengths: [13, 16],
        allowedNumberPrefixes: [4],
        allowedCvcLength: 3
    }
];
