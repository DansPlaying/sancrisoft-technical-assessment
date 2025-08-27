'use client';
import React, { createContext, useContext, useState } from 'react';


export type Step = 1 | 2 | 3 | 4;
export type Status = 'idle' | 'In Progress' | 'Success' | 'Error';


export interface Address { line1: string; line2?: string; city: string; state: string; zip: string; }
export interface Contact { firstName: string; lastName: string; email: string; phoneCode: string; phone: string; }
export interface FormAllData {
    businessName: string;
    businessType: string;
    address: Address;
    contact: Contact;
}


const INITIAL: FormAllData = {
    businessName: '',
    businessType: '',
    address: { line1: '', line2: '', city: '', state: '', zip: '' },
    contact: { firstName: '', lastName: '', email: '', phoneCode: '+1', phone: '' }
};


interface Ctx {
    step: Step; 
    setStep: (s: Step) => void; 
    next: () => void; 
    back: () => void; 
    reset: () => void;
    status: Status; setStatus: (s: Status) => void;
    data: FormAllData; setData: React.Dispatch<React.SetStateAction<FormAllData>>;
}


const FormContext = createContext<Ctx | null>(null);


export function FormProviderSimple({ children }: { children: React.ReactNode }) {
    const [step, setStep] = useState<Step>(1);
    const [status, setStatus] = useState<Status>('idle');
    const [data, setData] = useState<FormAllData>(INITIAL);


    const next = () => setStep((s) => (s < 4 ? ((s + 1) as Step) : s));
    const back = () => setStep((s) => (s > 1 && s != 4 ? ((s - 1) as Step) : s));
    const reset = () => { setStep(1); setStatus('idle'); setData(INITIAL); };

    return (
        <FormContext.Provider value={{ step, setStep, next, back, reset, status, setStatus, data, setData }}>
            {children}
        </FormContext.Provider>
    );
}


export function useForm() {
    const ctx = useContext(FormContext);
    if (!ctx) throw new Error('useForm must be used inside <FormProviderSimple>');
    return ctx;
}