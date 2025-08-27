'use client';

import { useForm } from "../state/formContext";

export function BadgeIndicator() {
    const { status } = useForm();

    return (
        <>
            {status != 'idle' &&
                <div className={`status status--${status.toLowerCase().replace(' ', '-')}`} style={{ marginLeft: '20px', fontWeight: 'normal', fontSize: '12px', display: 'inline-block' }}>
                    <span>{status}</span>
                </div>
            }
        </>
    );
}