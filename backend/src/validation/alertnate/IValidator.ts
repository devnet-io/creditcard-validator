import { ValidationContext } from "../validationContext";

export interface IValidator {
    label: string;
    validate: (context: ValidationContext) => ValidationContext;
}

export interface ICardProperties {
    label: string;
    allowedNumberLengths: number[];
    allowedNumberPrefixes: number[];
    allowedCvcLength: number;
}

const cards: ICardProperties[] = [
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
    {
        label: "American Express",
        allowedNumberLengths: [15],
        allowedNumberPrefixes: [34, 37],
        allowedCvcLength: 4
    },
    {
        label: "American Express",
        allowedNumberLengths: [15],
        allowedNumberPrefixes: [34, 37],
        allowedCvcLength: 4
    },
    {
        label: "American Express",
        allowedNumberLengths: [15],
        allowedNumberPrefixes: [34, 37],
        allowedCvcLength: 4
    }
]