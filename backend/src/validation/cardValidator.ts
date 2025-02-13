import { rules, ICardValidationRules } from "./rules";
import { ICreditCard, ValidationContext, ValidationFailure } from "./validationContext";
import {isNumeric, isValidLuhn} from "./utils";

/**
 * Validates a credit card by checking it against rule sets for different card types
 *
 * @param {ICardValidationRules[]} validationRules - List of rules to check against.
 * @param {ICreditCard} target - The target credit card object.
 * @returns {ValidationContext[]} - List of validation results for each validator.
 */
export function processValidation(validationRules: ICardValidationRules[], target: ICreditCard) {
    return validationRules.map((rules) => {
        const context = new ValidationContext(target);
        const { number, cvc } = context.evaluationTarget;

        // check if the value is a number and that it's of the allowed lengths
        if (!isNumeric(number) || rules.allowedNumberLengths.every((l) => l !== number?.length)) {
            context.pushFailure(ValidationFailure.CARD_NUMBER_INVALID_LENGTH);
        }

        // Check if it starts with allowed prefixes
        if (rules.allowedNumberPrefixes.every((prefix) => !number?.startsWith(prefix.toString()))) {
            context.pushFailure(ValidationFailure.CARD_NUMBER_INVALID_PREFIX);
        }

        // Validate checksum using Luhn's algorithm
        if (!isValidLuhn(number)) {
            context.pushFailure(ValidationFailure.CHECKSUM_INVALID);
        }

        // Validate the CVC
        if (!isNumeric(cvc) || cvc?.length !== rules.allowedCvcLength) {
            //TODO disabled for now for demo efficiency
            //context.pushFailure(ValidationFailure.CVC_INVALID);
        }

        return {
            label: rules.label,
            result: context
        };
    });
}

export function validateCreditCard(target: ICreditCard) {
    const results = processValidation(rules, target);

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
