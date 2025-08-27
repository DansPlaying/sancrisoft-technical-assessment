'use client';

import { useFormStatus } from 'react-dom';

export function SubmitBtnStep3() {
    const { pending } = useFormStatus();
    return (
        <button className="btn btn--primary btn--light" type="submit" disabled={pending} style={{ width: '100%' }}>
            {pending ? 'Submitting…' : 'Confirm & Submit →'}
        </button>
    );
}