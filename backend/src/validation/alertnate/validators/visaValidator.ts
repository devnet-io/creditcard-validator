import { IValidator } from "../IValidator";
import {ValidationContext, ValidationFailure} from "../../validationContext";
import { isValidLuhn } from "../utils";

/**
 * Visa card:
 * - Starts with '4'.
 * - Card number length must be either 13 or 16 digits.
 * - Must pass Luhn's checksum algorithm.
 * - 3 digit cvc
 */
export const visaCardValidator: IValidator = {
    label: "Visa",
    validate(context: ValidationContext) {
        const card = context.evaluationTarget;
        const cardNumberStr = card.number.toString();

        // Check if it starts with a '4' and has 13 or 16 digits
        if (!cardNumberStr.startsWith("4") || (cardNumberStr.length !== 13 && cardNumberStr.length !== 16)) {
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
