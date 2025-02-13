import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'
import { ICreditCard } from "../creditCardUtils.ts";

interface TestCard {
    cardNumber: string;
    label: string;
}

interface DropdownProps {
    selected: ICreditCard;
    onChange: (card: ICreditCard) => void;
}

const testCards: TestCard[] = [
    { cardNumber: '4111 1111 1111 1111', label: 'Visa Card' },
    { cardNumber: '4000 0566 5566 5556', label: 'Visa Debit' },
    { cardNumber: '5555 5555 5555 4444', label: 'MasterCard' },
    { cardNumber: '5105 1051 0510 5100', label: 'MasterCard Debit' },
    { cardNumber: '3782 822463 10005', label: 'American Express' },
    { cardNumber: '6011 0009 9013 9424', label: 'Discover' },
    { cardNumber: '3056 9309 8253 04', label: 'Diners Club' },
    { cardNumber: '3852 0000 0232 37', label: 'Diners Club International' },
    { cardNumber: '3530 1113 3330 0000', label: 'JCB' },
    { cardNumber: '6304 0000 0000 0000', label: 'Maestro' },
    { cardNumber: '6799 9800 0000 0001', label: 'Maestro UK' }
];

export function removeAllSpaces(str?: string) {
    return str?.replace(/\s/g, '');
}

export default function TestDropdown({ selected, onChange }: DropdownProps) {
    const selectedTestCard = testCards.find((card) => (
        removeAllSpaces(card.cardNumber) === removeAllSpaces(selected?.number)
    ))

    return (
        <Listbox
            value={selectedTestCard}
            onChange={(card) => {
                onChange({
                    number: card.cardNumber,
                    expirationDate: "12/29",
                    cvc: "000",
                });
            }}
        >
            <div className="relative">
                <ListboxButton className="grid min-w-70 cursor-pointer grid-cols-1 rounded-md bg-white dark:bg-gray-800 py-2.5 pr-3 pl-4 text-left text-gray-900 dark:text-gray-200 outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-600 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm">
                    {selectedTestCard ? (
                        <span className="col-start-1 row-start-1 flex w-full gap-2 pr-6">
                            <span className="truncate">{selectedTestCard?.cardNumber}</span>
                        </span>
                    ) : (
                        <span className="col-start-1 row-start-1 flex w-full gap-2 pr-6">
                            <span className="truncate">select test card</span>
                        </span>
                    )}

                    <ChevronUpDownIcon
                        aria-hidden="true"
                        className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 dark:text-gray-400 sm:size-4"
                    />
                </ListboxButton>

                <ListboxOptions
                    transition
                    className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base ring-1 shadow-lg ring-black/5 dark:ring-white/10 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                >
                    {testCards.map((card) => (
                        <ListboxOption
                            key={card.cardNumber}
                            value={card}
                            className="group relative cursor-pointer py-2 pr-9 pl-3 text-gray-900 dark:text-gray-200 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                        >
                            <div className="flex flex-col">
                                <span className="truncate font-normal group-data-selected:font-semibold">{card.cardNumber}</span>
                                <span className="truncate text-gray-500 dark:text-gray-400 group-data-focus:text-indigo-200">{card.label}</span>
                            </div>
                            {selectedTestCard?.cardNumber === card.cardNumber && (
                                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 dark:text-indigo-400 group-data-focus:text-white">
                                    <CheckIcon aria-hidden="true" className="size-5" />
                                </span>
                            )}
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </div>
        </Listbox>
    )
}
