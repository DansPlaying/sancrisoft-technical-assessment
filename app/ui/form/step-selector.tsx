'use client';

import { useForm } from "@/app/state/formContext";
import { Step1Business } from "./step-1";
import { Step2Contact } from "./step-2";
import { Step3Review } from "./step-3";

export default function StepSelector() {

    const { step } = useForm();

    return (
        <>
            {step == 1 && <Step1Business />}
            {step == 2 && <Step2Contact />}
            {step > 2 && <Step3Review />}
        </>
    );
}