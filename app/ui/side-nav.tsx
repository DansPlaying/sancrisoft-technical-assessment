'use client';

import { Steps } from "../lib/constants";
import { Step } from "../lib/definitions";
import { useForm } from "../state/formContext";

export function SideNav() {

    const { step, setStep } = useForm();

    const go = (n: Step) => {
        if (n < step && step != 4) setStep(n);
    }

    return (
        <aside className="sidenav" aria-label="Form steps">
            <ol className="sidenav__list">
                
                {
                Steps.map(({ id, label }) => {
                    const isCurrent = step === id;
                    const isDone = step > id;

                    return (
                        <li
                            key={id}
                            className={`sidenav__item ${isDone ? 'is-done' : ''}`}
                            onClick={() => go(id)}
                        >
                            <span
                                className={`sidenav__dot ${isCurrent ? 'is-current' : isDone ? 'is-done' : ''}`}
                                aria-hidden="true"
                            >
                                {isDone ? <span className="sidenav__check">✓</span> : String(id)}
                            </span>
                            <span className="sidenav__label">{label}</span>
                        </li>
                    );
                })}
            </ol>
            <div className="background-sidenav-dots"></div>
        </aside>
    );
}