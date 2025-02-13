import { IValidator } from "./IValidator";
import { ICreditCard, ValidationContext } from "../validationContext";
import * as validators from "./validators";

/**
 * Validates a credit card by checking it against the individual card type validators.
 *
 * @param {IValidator[]} validators - List of validators to check the card.
 * @param {ICreditCard} target - The target credit card object.
 * @returns {ValidationContext[]} - List of validation results for each validator.
 */
export function processValidation(validators: IValidator[], target: ICreditCard) {
    return validators.map((validator) => {
        const context = new ValidationContext(target);

        /*
        // Check expiration date (should not be in the past, accounting for end of day validity)
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Set to start of the day (midnight)

        // If the card's expiration date is before today, it's expired
        if (target.expirationDate < currentDate) {
            context.pushFailure(ValidationFailure.CARD_EXPIRED);
        }
        */

        // Run the individual card type validator
        return {
            label: validator.label,
            result: validator.validate(context)
        };
    });
}

export function validateCreditCard(target: ICreditCard) {
    const results = processValidation(Object.values(validators), target);

    return {
        // if any of the validators passed, the card is valid
        isValid: results.some(({result}) => result.isValid()),
        details: results.map(({result, label}) => ({
            label,
            isValid: result.isValid(),
            errors: result.results
        }))
    };
}
