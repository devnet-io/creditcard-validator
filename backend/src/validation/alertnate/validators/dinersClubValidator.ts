import { IValidator } from "../IValidator";
import {ValidationContext, ValidationFailure} from "../../validationContext";
import { isValidLuhn } from "../utils";

/**
 * Diners Club card:
 * - Starts with '30', '36', '38', or '39'.
 * - Card number length must be 14 digits.
 * - Must pass Luhn's checksum algorithm.
 * - 3 digit cvc
 */
export const dinersClubCardValidator: IValidator = {
    label: "Diners Club",
    validate(context: ValidationContext) {
        const card = context.evaluationTarget;
        const cardNumberStr = card.number.toString();

        // Check if it starts with '30', '36', '38', or '39' and has 14 digits
        if (!cardNumberStr.startsWith("30") && !cardNumberStr.startsWith("36") &&
            !cardNumberStr.startsWith("38") && !cardNumberStr.startsWith("39") || cardNumberStr.length !== 14) {
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
