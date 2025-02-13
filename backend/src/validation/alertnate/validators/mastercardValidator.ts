import { IValidator } from "../IValidator";
import {ValidationContext, ValidationFailure} from "../../validationContext";
import { isValidLuhn } from "../utils";

/**
 * Mastercard:
 * - Starts with '5'.
 * - Card number length must be 16 digits.
 * - Must pass Luhn's checksum algorithm.
 * - 3 digit cvc
 */
export const mastercardValidator: IValidator = {
    label: "Mastercard",
    validate(context: ValidationContext) {
        const card = context.evaluationTarget;
        const cardNumberStr = card.number.toString();

        // Check if it starts with a '5' and has 16 digits
        if (!cardNumberStr.startsWith("5") || cardNumberStr.length !== 16) {
            context.pushFailure(ValidationFailure.CARD_NUMBER_INVALID);
        }

        // Validate checksum using Luhn's algorithm
        if (!isValidLuhn(card.number)) {
            context.pushFailure(ValidationFailure.CHECKSUM_INVALID);
        }

        // Validate the CVC (should be 3 digits)
        const cvcStr = target.cvc;
        if (cvcStr.length !== 3 || isNaN(target.cvc)) {
            context.pushFailure(ValidationFailure.CVC_INVALD);
        }

        return context;
    }
};
