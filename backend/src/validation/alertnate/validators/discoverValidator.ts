import { IValidator } from "../IValidator";
import {ValidationContext, ValidationFailure} from "../../validationContext";
import { isValidLuhn } from "../utils";

/**
 * Discover card:
 * - Starts with '6011'.
 * - Card number length must be 16 digits.
 * - Must pass Luhn's checksum algorithm.
 * - 3 digit cvc
 */
export const discoverCardValidator: IValidator = {
    label: "Discover",
    validate(context: ValidationContext) {
        const card = context.evaluationTarget;
        const cardNumberStr = card.number.toString();

        // Check if it starts with '6011' and has 16 digits
        if (!cardNumberStr.startsWith("6011") || cardNumberStr.length !== 16) {
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
