'use client';

import { companyTypesString, states } from "@/app/lib/constants";
import { toErrorMap } from "@/app/lib/helpers";
import { Step1Schema } from "@/app/lib/validation/schemas";
import { useForm } from "@/app/state/formContext";
import { useState } from "react";

export function Step1Business() {

    const { data, setData, next, setStatus } = useForm();
    const [errors, setErrors] = useState<Record<string, string>>({});
    const a = data.address;

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        const result = Step1Schema.safeParse({
            businessName: data.businessName,
            businessType: data.businessType,
            address: data.address
        });


        if (!result.success) {
            const map = toErrorMap(result.error.issues);

            setErrors(map);
            const firstKey = Object.keys(map)[0];
            if (firstKey) {
                const el = document.querySelector(`[data-err="${firstKey}"]`) as HTMLElement | null;
                el?.focus();
            }
            return;
        }

        const dataParsed = result.data;
        
        setData((initData) => ({
            ...initData,
            businessName: dataParsed.businessName,
            businessType: dataParsed.businessType,
            address: { ...initData.address, ...dataParsed.address }
        }));

        setErrors({});
        setStatus('In Progress')
        next();
    };

    const clear = (key: string) => {
        if (errors[key]) setErrors((e) => { const { [key]: _, ...rest } = e; return rest; });
    };

    return (
        <form className="form" onSubmit={submit}>
            <div className="field">
                <label htmlFor="businessName" className="label">Business name</label>
                <input id="businessName" value={data.businessName} className="input input--light" placeholder="Registered business name"
                    aria-invalid={!!errors['businessName']} aria-describedby={errors['businessName'] ? 'err-businessName' : undefined} data-err="businessName"
                    onChange={(e) => { setData((d) => ({ ...d, businessName: e.target.value })); clear('businessName'); }}
                />
                {errors['businessName'] && <p id="err-businessName" className="error"><span className="error__icon" aria-hidden></span>{errors['businessName']}</p>}
            </div>


            <div className="field">
                <label htmlFor="type" className="label">Type</label>
                <div className="select-wrap">
                    <select id="type" className="select select--light" value={data.businessType}
                        onChange={(e) => { setData((d) => ({ ...d, businessType: e.target.value })); clear('businessType'); }}
                        aria-invalid={!!errors['businessType']}
                        aria-describedby={errors['businessType'] ? 'err-businessType' : undefined}
                        data-err="businessType">
                        <option value="" disabled>Type of business</option>
                        {companyTypesString.map((t, index) => (
                            <option key={index} value={t}>
                                {t}
                            </option>
                        ))}
                    </select>
                </div>
                {errors['businessType'] && <p id="err-businessType" className="error"><span className="error__icon" aria-hidden></span>{errors['businessType']}</p>}
            </div>


            <h2 className="section__title">Address</h2>

            <div className="field">
                <input id="line1" className="input input--light" placeholder="Address line 1" value={a.line1}
                    onChange={(e) => { setData((d) => ({ ...d, address: { ...d.address, line1: e.target.value } })); clear('address.line1'); }}
                    aria-invalid={!!errors['address.line1']}
                    aria-describedby={errors['address.line1'] ? 'err-line1' : undefined}
                    data-err="address.line1" />
                {errors['address.line1'] && <p id="err-line1" className="error"><span className="error__icon" aria-hidden></span>{errors['address.line1']}</p>}
            </div>


            <div className="field">
                <label htmlFor="line2" className="label">Address line 2 <span className="muted">(optional)</span></label>
                <input id="line2" className="input input--light" placeholder="Address line 2 | optional"
                    value={a.line2 || ''}
                    onChange={(e) => setData((d) => ({ ...d, address: { ...d.address, line2: e.target.value } }))}
                />
            </div>


            <div className="field">
                <label htmlFor="city" className="label">City</label>
                <input id="city" className="input input--light" placeholder="City"
                    value={a.city}
                    onChange={(e) => { setData((d) => ({ ...d, address: { ...d.address, city: e.target.value } })); clear('address.city'); }}
                    aria-invalid={!!errors['address.city']}
                    aria-describedby={errors['address.city'] ? 'err-city' : undefined}
                    data-err="address.city"
                />
                {errors['address.city'] && <p id="err-city" className="error"><span className="error__icon" aria-hidden></span>{errors['address.city']}</p>}
            </div>

            <div className="form__grid form__grid--2-light">
                <div className="field">
                    <label htmlFor="state" className="label">State</label>
                    <div className="select-wrap">
                        <select id="state" className="select select--light"
                            value={a.state}
                            onChange={(e) => { setData((d) => ({ ...d, address: { ...d.address, state: e.target.value } })); clear('address.state'); }}
                            aria-invalid={!!errors['address.state']}
                            aria-describedby={errors['address.state'] ? 'err-state' : undefined}
                            data-err="address.state"
                        >
                            <option value="" disabled>State</option>
                            {states.map((s) => (
                                <option key={s.name + s.abbreviation} value={s.abbreviation}>
                                    {s.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {errors['address.state'] && <p id="err-state" className="error"><span className="error__icon" aria-hidden></span>{errors['address.state']}</p>}
                </div>
                <div className="field">
                    <label htmlFor="zip" className="label">Zip</label>
                    <input id="zip" className="input input--light" placeholder="Zip" inputMode="numeric"
                        value={a.zip}
                        onChange={(e) => { setData((d) => ({ ...d, address: { ...d.address, zip: e.target.value } })); clear('address.zip'); }}
                        aria-invalid={!!errors['address.zip']}
                        aria-describedby={errors['address.zip'] ? 'err-zip' : undefined}
                        data-err="address.zip"
                    />
                    {errors['address.zip'] && <p id="err-zip" className="error"><span className="error__icon" aria-hidden></span>{errors['address.zip']}</p>}
                </div>
            </div>


            <div className="actions" >
                <button className="btn btn--primary btn--light" style={{ width: '100%' }} type="submit">Continue →</button>
            </div>
        </form>
    );
}