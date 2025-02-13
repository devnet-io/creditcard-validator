import { useEffect, useState } from "react";
import CreditCardForm from "./CreditCardForm.tsx";
import TwoPaneContainer from "./TwoPanelContainer.tsx";
import {CreditCardIcon, ShoppingCartIcon, XMarkIcon} from "@heroicons/react/16/solid";
import Dropdown from "./Dropdown.tsx";
import type { CardValidationResult } from "../creditCardUtils.ts";
import ResultsList from "./ResultsList.tsx";
import { ICreditCard, validateCreditCard } from "../creditCardUtils.ts";

const App = () => {
    const [validationResult, setValidationResult] = useState<CardValidationResult>();
    const [formState, setFormState] = useState<ICreditCard>({});
    const clear = () => setFormState({number: "", expirationDate: "", cvc: ""});

    useEffect(() => {
        validateCreditCard(formState)
            .then((result) => setValidationResult(result));
    }, [formState]);

    return (
        <div className=" dark:bg-gray-900">
            <TwoPaneContainer
                primary={
                    (setExpanded) => (
                        <div className="flex items-center justify-center h-screen">
                            <div className="w-100 flex flex-col gap-8">
                                <div className="flex gap-4 items-center">
                                    <ShoppingCartIcon className="text-gray-700 dark:text-gray-200 size-10"/>
                                    <div className="flex flex-col gap-1">
                                        <h2 className="text-gray-800 dark:text-gray-100 text-2xl">Checkout</h2>
                                        <h4 className="font-light text-gray-800 dark:text-gray-100 text-md">Step 2 of 2</h4>
                                    </div>
                                </div>
                                <CreditCardForm
                                    value={formState}
                                    onChange={(event) => {
                                        setExpanded(true);
                                        setFormState(event);
                                    }}
                                    validationResult={validationResult}
                                />
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Pay Now
                                    <CreditCardIcon aria-hidden="true" className="-mr-0.5 size-5" />
                                </button>
                            </div>
                        </div>
                    )
                }
                secondaryWidth={40}
                secondary={
                    (setExpanded) => (
                        <div className="flex flex-col items-start justify-left h-screen bg-gray-800 px-6 py-7 gap-6 text-gray-100">
                            <div className="text-gray-800 dark:text-gray-200 flex w-full justify-between gap-4">
                                <div className="flex flex-col gap-1">
                                    <h1 className="text-lg font-bold">Credit Card Validator</h1>
                                    <h4 className="text-sm">demo / debug panel</h4>
                                </div>
                                <button
                                    onClick={() => setExpanded(false)}
                                >
                                    <XMarkIcon className="size-6 hover:text-gray-400 cursor-pointer" />
                                </button>
                            </div>

                            <div className="flex items-center gap-3 bg-gray-700 rounded px-4 py-3 min-w-sm">
                                <div>
                                    <Dropdown
                                        selected={formState}
                                        onChange={(sampleCard) => {
                                            setFormState(sampleCard)
                                        }}
                                    />
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => clear()}
                                        className="rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-white/20 cursor-pointer"
                                    >
                                        Clear
                                    </button>
                                </div>
                            </div>

                            <div className="min-w-sm">
                                <ResultsList result={validationResult} />
                            </div>
                        </div>
                    )
                }
            />
        </div>
    );
}

export default App;
