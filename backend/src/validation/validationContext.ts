import {removeAllSpaces} from "./utils";

export interface ICreditCard {
    number?: string;
    cvc?: string;
    expirationDate?: Date;
}

export enum ValidationFailure {
    CARD_NUMBER_INVALID_LENGTH = "Invalid card number length",
    CARD_NUMBER_INVALID_PREFIX = "Invalid card number prefix",
    CHECKSUM_INVALID = "Invalid card number checksum",
    CVC_INVALID = "Invalid CVC / CVV length",
    //CARD_EXPIRED = "Card is expired",
}

export interface IValidationContext {
    evaluationTarget: ICreditCard;
    results: ValidationFailure[];
}

export class ValidationContext implements IValidationContext {
    evaluationTarget: ICreditCard
    results: ValidationFailure[] = [];

    constructor(target: ICreditCard) {
        this.evaluationTarget = {
            number: removeAllSpaces(target.number),
            cvc: removeAllSpaces(target.cvc)
        };
    }

    isValid() {
        return this.results.length === 0;
    }

    isFailed() {
        return this.results.length > 0;
    }

    pushFailure(reason: ValidationFailure) {
        this.results.push(reason);
        return this;
    }
}
