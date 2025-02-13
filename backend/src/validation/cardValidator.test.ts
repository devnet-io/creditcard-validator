import { validateCreditCard } from "./cardValidator";
import { ICreditCard } from "./validationContext";

// Global test data
const validFutureDate = new Date(new Date().getFullYear() + 1, 11, 1);
const expiredDate = new Date(2020, 11, 1);
const today = new Date();

// ✅ Valid test cards for all major types
const validVisa: ICreditCard = { number: "4111111111111111", expirationDate: validFutureDate, cvc: "123" };
const validMastercard: ICreditCard = { number: "5555555555554444", expirationDate: validFutureDate, cvc: "456" };
const validAmex: ICreditCard = { number: "378282246310005", expirationDate: validFutureDate, cvc: "7895" };
const validDiscover: ICreditCard = { number: "6011111111111117", expirationDate: validFutureDate, cvc: "321" };
const validDiners: ICreditCard = { number: "30569309025904", expirationDate: validFutureDate, cvc: "123" };

// ❌ Invalid test cases
const shortCardNumber: ICreditCard = { number: "12345", expirationDate: validFutureDate, cvc: "123" };
const invalidCVC: ICreditCard = { number: "4111111111111111", expirationDate: validFutureDate, cvc: "12" };
const expiredCard: ICreditCard = { number: "4111111111111111", expirationDate: expiredDate, cvc: "123" };
const invalidChecksumCard: ICreditCard = { number: "4111111111111112", expirationDate: validFutureDate, cvc: "123" };
const multipleFailures: ICreditCard = { number: "12345", expirationDate: expiredDate, cvc: "12" };
const expiresToday: ICreditCard = { number: "4111111111111111", expirationDate: today, cvc: "123" };

describe("validateCreditCard - Full Integration Tests", () => {
    it("should pass validation for a valid Visa card", () => {
        const result = validateCreditCard(validVisa);
        expect(result.isValid).toBe(true);
    });

    it("should pass validation for a valid Mastercard", () => {
        const result = validateCreditCard(validMastercard);
        expect(result.isValid).toBe(true);
    });

    it("should pass validation for a valid AmEx (15-digit number)", () => {
        const result = validateCreditCard(validAmex);
        console.log(JSON.stringify(result))
        expect(result.isValid).toBe(true);
    });

    it("should pass validation for a valid Discover card", () => {
        const result = validateCreditCard(validDiscover);
        expect(result.isValid).toBe(true);
    });

    it("should pass validation for a valid Diners Club card", () => {
        const result = validateCreditCard(validDiners);
        expect(result.isValid).toBe(true);
    });

    it("should fail validation for an invalid card number (too short) - caught by all validators", () => {
        const result = validateCreditCard(shortCardNumber);
        expect(result.isValid).toBe(false);
    });

    /*it("should fail validation for an invalid CVC (too short) - caught by all validators", () => {
        const result = validateCreditCard(invalidCVC);
        expect(result.isValid).toBe(false);
    });*/

    /*it("should fail validation for an expired card - caught by all validators", () => {
        const result = validateCreditCard(expiredCard);
        expect(result.isValid).toBe(false);
    });*/

    it("should fail validation for an invalid checksum (Luhn failure) - caught by all validators", () => {
        const result = validateCreditCard(invalidChecksumCard);
        expect(result.isValid).toBe(false);
    });

    it("should fail validation for multiple validation errors - all validators should fail", () => {
        const result = validateCreditCard(multipleFailures);
        expect(result.isValid).toBe(false);
    });

    it("should allow a card expiring today (assuming end of day validity)", () => {
        const result = validateCreditCard(expiresToday);
        expect(result.isValid).toBe(true);
    });
});
