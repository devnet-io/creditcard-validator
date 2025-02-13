import React from "react";
import { CardValidationResult } from "../creditCardUtils.ts";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/16/solid";

interface ResultsListProps {
    result?: CardValidationResult;
}

const ResultsList: React.FC<ResultsListProps> = ({ result }) => {
    const ordered = result?.details.sort((r) => Number(!r.isValid)) || [];

    return (
        <div className="space-y-4">
            {ordered.map(({isValid, label, errors}, index) => (
                <div
                    key={index}
                    className={`px-5 py-3 rounded ${isValid ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"}`}
                >
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2 items-center">
                            {isValid ? (
                                <CheckCircleIcon className="size-4.5" />
                            ) : (
                                <XCircleIcon className="size-4.5" />
                            )}
                            <h3 className="text-md font-medium">{label}</h3>
                        </div>
                        {!isValid && (
                            <ul className="text-sm text-red-700 dark:text-red-300">
                                {errors.map((error, errIndex) => (
                                    <li key={errIndex} className="list-disc ml-4">
                                        {error}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ResultsList;
