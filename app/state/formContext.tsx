'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';


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

const STORAGE_KEY = 'form-data';
const PERSIST_VERSION = 1;

type Persisted = {
    v: number;
    step: Step;
    status: Status;
    data: FormAllData;
    updatedAt: number;
};

function loadPersisted(): Persisted | null {
    try {
        const raw = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
        if (!raw) return null;
        const obj = JSON.parse(raw);
        if (!obj || obj.v !== PERSIST_VERSION) return null;
        return obj as Persisted;
    } catch {
        return null;
    }
}

function savePersisted(p: Persisted) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    } catch { }
}

function clearPersisted() {
    try { localStorage.removeItem(STORAGE_KEY); } catch { }
}

interface Ctx {
    step: Step;
    setStep: (s: Step) => void;
    next: () => void;
    back: () => void;
    reset: () => void;
    status: Status; 
    setStatus: (s: Status) => void;
    data: FormAllData; 
    setData: React.Dispatch<React.SetStateAction<FormAllData>>;
}

const FormContext = createContext<Ctx | null>(null);

export function FormProviderSimple({ children }: { children: React.ReactNode }) {
    const [step, setStep] = useState<Step>(1);
    const [status, setStatus] = useState<Status>('idle');
    const [data, setData] = useState<FormAllData>(INITIAL);

    const hydratedRef = useRef(false);
    const debounceRef = useRef<number | null>(null);

    useEffect(() => {
        const p = loadPersisted();
        if (p) {
            setStep(p.step);
            setStatus(p.status);
            setData(p.data);
        }
        hydratedRef.current = true;
    }, []);

    useEffect(() => {
        if (!hydratedRef.current) return;
        if (debounceRef.current) window.clearTimeout(debounceRef.current);
        debounceRef.current = window.setTimeout(() => {
            const payload: Persisted = { v: PERSIST_VERSION, step, status, data, updatedAt: Date.now() };
            savePersisted(payload);
        }, 250);
        return () => {
            if (debounceRef.current) window.clearTimeout(debounceRef.current);
        };
    }, [step, status, data]);

    const next = () => setStep((s) => (s < 4 ? ((s + 1) as Step) : s));
    const back = () => setStep((s) => (s > 1 && s != 4 ? ((s - 1) as Step) : s));
    const reset = () => { 
        setStep(1); 
        setStatus('idle'); 
        setData(INITIAL); 
        clearPersisted();
    };

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