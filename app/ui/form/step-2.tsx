'use client';

import { useForm } from "@/app/state/formContext";
import PhoneField from "../phone-field";
import { countries } from "@/app/lib/constants";
import { useState } from "react";
import { toErrorMap, trimAll } from "@/app/lib/helpers";
import { Step2Schema } from "@/app/lib/validation/schemas";

export function Step2Contact() {

    const { data, setData, next } = useForm();
    const [errors, setErrors] = useState<Record<string, string>>({});

    const clear = (key: string) => {
        if (errors[key]) setErrors((e) => { const { [key]: _, ...rest } = e; return rest; });
    };

    const onSubmitStep2 = (e: React.FormEvent) => {
        e.preventDefault();

        const result = Step2Schema.safeParse({
            contact: {
                firstName: data.contact.firstName,
                lastName: data.contact.lastName,
                email: data.contact.email,
                phoneCode: data.contact.phoneCode,
                phone: data.contact.phone
            }
        });


        if (!result.success) {
            const map = toErrorMap(result.error.issues);
            setErrors(map);
            const firstKey = Object.keys(map)[0];
            if (firstKey) {
                const target = document.querySelector(`[data-err="${firstKey}"]`) as HTMLElement | null;
                (target ?? document.body).focus();
            }
            return;
        }

        const dataParsed = result.data.contact;
        setData((oldData) => ({
            ...oldData,
            contact: {
                ...oldData.contact,
                firstName: trimAll(dataParsed.firstName),
                lastName: trimAll(dataParsed.lastName),
                email: trimAll(dataParsed.email),
                phoneCode: dataParsed.phoneCode,
                phone: dataParsed.phone
            }
        }));
        setErrors({});
        next();
    };

    return (
        <form className="form" onSubmit={onSubmitStep2} noValidate>

            <div className="field">
                <label htmlFor="firstName" className="label">Name</label>
                <div className="input-row">
                    <div>
                        <input id="firstName" className="input input--light" placeholder="First name"
                            value={data.contact.firstName}
                            onChange={(e) => { setData((d) => ({ ...d, contact: { ...d.contact, firstName: e.target.value } })); clear('contact.firstName'); }}
                            aria-invalid={!!errors['contact.firstName']}
                            aria-describedby={errors['contact.firstName'] ? 'err-firstName' : undefined}
                            data-err="contact.firstName"
                        />
                        {errors['contact.firstName'] && <p id="err-firstName" className="error"><span className="error__icon" aria-hidden></span>{errors['contact.firstName']}</p>}
                    </div>
                    <div>
                        <input id="lastName" className="input input--light" placeholder="Last name"
                            value={data.contact.lastName}
                            onChange={(e) => { setData((d) => ({ ...d, contact: { ...d.contact, lastName: e.target.value } })); clear('contact.lastName'); }}
                            aria-invalid={!!errors['contact.lastName']}
                            aria-describedby={errors['contact.lastName'] ? 'err-lastName' : undefined}
                            data-err="contact.lastName"
                        />
                        {errors['contact.lastName'] && <p id="err-lastName" className="error"><span className="error__icon" aria-hidden></span>{errors['contact.lastName']}</p>}
                    </div>
                </div>
            </div>

            <div className="field">
                <label htmlFor="email" className="label">Email</label>
                <input id="email" className="input input--light"
                    placeholder="name@company.com"
                    value={data.contact.email}
                    onChange={(e) => { setData((d) => ({ ...d, contact: { ...d.contact, email: e.target.value } })); clear('contact.email'); }}
                    aria-invalid={!!errors['contact.email']}
                    aria-describedby={errors['contact.email'] ? 'err-email' : undefined}
                    data-err="contact.email"
                />
                {errors['contact.email'] && <p id="err-email" className="error"><span className="error__icon" aria-hidden></span>{errors['contact.email']}</p>}
            </div>

            <PhoneField countries={countries} defaultCode="+1" />
            {(errors['contact.phone'] || errors['contact.phoneCode']) && (
                <p className="error"><span className="error__icon" aria-hidden></span>{errors['contact.phone'] || errors['contact.phoneCode']}</p>
            )}

            <div className="actions" >
                <button style={{ width: "100%", marginTop: '15px' }} className="btn btn--primary btn--light" type="submit">Continue →</button>
            </div>
        </form>
    );
}