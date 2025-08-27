"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm } from "../state/formContext";
import { formatUS } from "../lib/helpers";

type Country = {
    name: string;
    phone_code: string;
    flag_url: string;
};

export default function PhoneField({
    countries,
    label = "Phone",
    defaultCode,
}: {
    countries: Country[];
    label?: string;
    defaultCode?: string;
}) {
    const { data, setData } = useForm();
    const defaultIndex =
        defaultCode
            ? Math.max(0, countries.findIndex(c => c.phone_code === (data?.contact?.phoneCode ?? defaultCode)))
            : 0;
    const [i, setI] = useState(defaultIndex);

    const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        const next = formatUS(e.target.value) ;

        setData(d => ({
            ...d,
            contact: { ...d.contact, phone: next },
        }));
    };

    return (
        <div className="field-phone">
            <label className="label">{label}</label>

            <div className="phone" role="group" aria-label={`${label} with country code`}>
                <Image
                    className="flag"
                    src={countries[i].flag_url}
                    alt={`${countries[i].name} flag`}
                    width={16}
                    height={12}
                    priority={false}
                />

                <select
                    className="code"
                    value={i}
                    onChange={(e) => {
                        setI(Number(e.target.value)); setData((d) => ({ ...d, contact: { ...d.contact, phoneCode: countries[Number(e.target.value)].toString() } }));
                    }
                    }
                    aria-label="Country code"
                >
                    {countries.map((c, idx) => (
                        <option key={c.name + c.phone_code} value={idx}>
                            {c.phone_code}
                        </option>
                    ))}
                </select>

                <input
                    className="number"
                    type="tel"
                    inputMode="text"
                    placeholder="enter a phone number"
                    aria-label="Phone number"
                    value={data.contact.phone}
                    onChange={onChangePhone}
                />
            </div>
        </div>
    );
}