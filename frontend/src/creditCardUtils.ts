
export interface ICreditCard {
    number?: string;
    expirationDate?: string;
    cvc?: string;
}

export interface CardValidationDetail {
    label: string;
    isValid: boolean;
    errors: string[];
}

export interface CardValidationResult {
    isValid: boolean;
    details: CardValidationDetail[];
}

const API_URL = import.meta.env.VITE_API_URL;

export function validateCreditCard(card: ICreditCard): Promise<CardValidationResult> {
    return fetch(`${API_URL}/api/validateCreditCard`, {
    //return fetch("http://localhost:3002/api/validateCreditCard", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(card)
    })
        .then((res) => res.json())
        .catch((err) => console.error(err));
}