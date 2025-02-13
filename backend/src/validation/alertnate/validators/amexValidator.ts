import { IValidator } from "../IValidator";
import {ValidationContext, ValidationFailure} from "../../validationContext";
import { isValidLuhn } from "../utils";

/**
 * American Express (AmEx):
 * - Starts with '34' or '37'.
 * - Card number length must be 15 digits.
 * - Must pass Luhn's checksum algorithm.
 * - 4 digit cvc
 */
export const amexCardValidator: IValidator = {
    label: "AmEx",
    validate(context: ValidationContext) {
        const { number, cvc } = context.evaluationTarget;

        // Check if number has 15 digits
        if (isNaN(number) || number.length !== 15) {
            context.pushFailure(ValidationFailure.CARD_NUMBER_INVALID_LENGTH);
        }

        // Check if it starts with '34' or '37'
        if (!number.startsWith("34") && !number.startsWith("37")) {
            context.pushFailure(ValidationFailure.CARD_NUMBER_INVALID_PREFIX);
        }

        // Validate checksum using Luhn's algorithm
        if (!isValidLuhn(card.number)) {
            context.pushFailure(ValidationFailure.CHECKSUM_INVALID);
        }

        // Validate the CVC (should be 4 digits)
        if (isNaN(cvc) || cvc.length !== 4) {
            context.pushFailure(ValidationFailure.CVC_INVALD);
        }

        return context;
    }
};
