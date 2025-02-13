import { useState, ReactNode } from 'react';
import { Transition } from '@headlessui/react';

export interface ITwoPaneContainerProps {
    initialPrimaryWidth?: number;
    secondaryWidth?: number;
    primary: ((setExpanded: (expanded: boolean) => void) => ReactNode) | ReactNode;
    secondary: ((setExpanded: (expanded: boolean) => void) => ReactNode) | ReactNode;
}

export default function TwoPaneContainer({ initialPrimaryWidth = 100, secondaryWidth = 50, primary, secondary }: ITwoPaneContainerProps) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="flex w-full h-full overflow-hidden relative">
            <div
                className="transition-all duration-500 ease-in-out"
                style={{ width: expanded ? `${100 - secondaryWidth}%` : `${initialPrimaryWidth}%` }}
            >
                {typeof primary === 'function' ? primary(setExpanded) : primary}
            </div>

            <div
                className="absolute top-0 right-0 h-full"
                style={{ width: `${secondaryWidth}%` }}
            >
                <Transition
                    show={expanded}
                    enter="delay-400 transition-opacity duration-300 ease-in-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-300 ease-in-out"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    {typeof secondary === 'function' ? secondary(setExpanded) : secondary}
                </Transition>
            </div>
        </div>
    );
}
