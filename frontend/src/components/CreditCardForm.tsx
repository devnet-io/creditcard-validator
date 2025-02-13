import { ChevronDownIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/16/solid'
import {CardValidationResult, ICreditCard} from "../creditCardUtils.ts";

interface ICreditCardFormProps {
    value: ICreditCard;
    validationResult?: CardValidationResult
    onChange: (event: ICreditCard) => void
}

export default function CardFormLarge({onChange, value, validationResult}: ICreditCardFormProps) {
    const {number, expirationDate, cvc} = value;

    return (
        <div>
            <fieldset>
                <legend className="block text-base/6 font-medium text-gray-900 dark:text-gray-100">Card details</legend>
                <div className="mt-3 grid grid-cols-2">
                    <div className="col-span-2">
                        <div className="mt-2 grid grid-cols-1">
                            <input
                                id="card-number"
                                name="card-number"
                                type="tel"
                                inputMode="numeric"
                                pattern="[0-9\s]{13,19}"
                                autoComplete="cc-number"
                                maxLength={19}
                                required
                                value={number}
                                onChange={(e) => onChange({...value, number: e.target.value})}
                                placeholder="Card number"
                                aria-label="Card number"
                                className="col-start-1 block row-start-1 w-full rounded-t-lg bg-white dark:bg-gray-800 pl-4 py-3 pr-10 text-lg text-gray-900 dark:text-gray-100 outline-2 -outline-offset-2 outline-gray-300 dark:outline-gray-700 placeholder:text-gray-400 dark:placeholder-gray-500 sm:text-base/6"

                           />
                            {(value.number && validationResult?.isValid )&& (
                                <CheckCircleIcon
                                    aria-hidden="true"
                                    className="pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-green-600 sm:size-4"
                                />
                            )}
                            {value.number && !validationResult?.isValid && (
                                <ExclamationCircleIcon
                                    aria-hidden="true"
                                    className="pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-red-600 sm:size-4"
                                />
                            )}
                        </div>
                    </div>
                    <div className="-mt-1 -mr-1">
                        <input
                            id="card-expiration-date"
                            name="card-expiration-date"
                            type="text"
                            placeholder="MM / YY"
                            value={expirationDate}
                            onChange={(e) => onChange({...value, expirationDate: e.target.value})}
                            aria-label="Expiration date"
                            className="block w-full rounded-bl-lg bg-white dark:bg-gray-800 px-4 py-3 text-lg text-gray-900 dark:text-gray-100 outline-2 -outline-offset-2 outline-gray-300 dark:outline-gray-700 placeholder:text-gray-400 dark:placeholder-gray-500 focus:relative  sm:text-base/6"
                        />
                    </div>
                    <div className="-mt-1">
                        <input
                            id="card-cvc"
                            name="card-cvc"
                            type="text"
                            placeholder="CVC"
                            value={cvc}
                            onChange={(e) => onChange({...value, cvc: e.target.value})}
                            aria-label="CVC"
                            className="block w-full rounded-br-lg bg-white dark:bg-gray-800 px-4 py-3 text-lg text-gray-900 dark:text-gray-100 outline-2 -outline-offset-2 outline-gray-300 dark:outline-gray-700 placeholder:text-gray-400 dark:placeholder-gray-500 focus:relative  sm:text-base/6"
                        />
                    </div>
                </div>
            </fieldset>
            <fieldset className="mt-7">
                <legend className="block text-base/6 font-medium text-gray-900 dark:text-gray-100">Billing address</legend>
                <div className="mt-3 grid grid-cols-1">
                    <div className="grid grid-cols-1 focus-within:relative">
                        <select
                            id="country"
                            name="country"
                            autoComplete="country-name"
                            aria-label="Country"
                            className="col-start-1 row-start-1 w-full appearance-none rounded-t-lg bg-white dark:bg-gray-800 py-3.5 pr-9 pl-4 text-lg text-gray-900 dark:text-gray-100 outline-2 -outline-offset-2 outline-gray-300 dark:outline-gray-700 placeholder:text-gray-400 dark:placeholder-gray-500  sm:text-base/6"
                        >
                            <option>United States</option>
                            <option>Canada</option>
                            <option>Mexico</option>
                        </select>
                        <ChevronDownIcon
                            aria-hidden="true"
                            className="pointer-events-none col-start-1 row-start-1 mr-3 size-6 self-center justify-self-end text-gray-500 dark:text-gray-400 sm:size-5"
                        />
                    </div>
                    <div className="-mt-1">
                        <input
                            id="postal-code"
                            name="postal-code"
                            type="text"
                            placeholder="ZIP / Postal code"
                            autoComplete="postal-code"
                            aria-label="ZIP / Postal code"
                            className="block w-full rounded-b-lg bg-white dark:bg-gray-800 px-4 py-3 text-lg text-gray-900 dark:text-gray-100 outline-2 -outline-offset-2 outline-gray-300 dark:outline-gray-700 placeholder:text-gray-400 dark:placeholder-gray-500 focus:relative  sm:text-base/6"
                        />
                    </div>
                </div>
            </fieldset>
        </div>
    )
}
