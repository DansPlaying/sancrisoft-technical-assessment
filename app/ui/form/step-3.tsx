'use client';

import { submitCompany, SubmitState } from "@/app/lib/actions";
import { useForm } from "@/app/state/formContext";
import { useActionState, useEffect } from "react";
import { useFormStatus } from 'react-dom';

function SubmitBtn() {
    const { pending } = useFormStatus();
    return (
        <button className="btn btn--primary btn--light" type="submit" disabled={pending} style={{ width: '100%' }}>
            {pending ? 'Submitting…' : 'Confirm & Submit →'}
        </button>
    );
}

export function Step3Review() {

    const { data, status, setStatus, next, reset } = useForm();
    const initial: SubmitState = { ok: false, status: 1, message: '' };
    const [state, formAction] = useActionState(submitCompany, initial);

    useEffect(() => {
        if (state.status === 1) return;
        const nextStatus = state.ok ? 'Success' : 'Error';
        if (status !== nextStatus) setStatus(nextStatus);
        next();
    }, [state, status, setStatus, next]);

    return (
        <>

            <form action={formAction}>

                <div className="review light">
                    <h2 className="review__title">Business structure
                        <button style={{ marginLeft: '20px' }} className="link-edit" type="button">Edit</button>
                    </h2>

                    <dl className="definitions">
                        <div className="definition">
                            <dt className="item-definition">Name:</dt>
                            <dd className="item-description">{data.businessName}</dd>
                        </div>
                        <div className="definition">
                            <dt className="item-definition">Type:</dt>
                            <dd className="item-description">{data.businessType}</dd>
                        </div>
                        <div className="definition">
                            <dt className="item-definition">Address:</dt>
                            <dd className="item-description">
                                {data.address.line1}
                            </dd>
                        </div>
                    </dl>


                    <h2 className="review__title">Contact person
                        <button style={{ marginLeft: '40px' }} className="link-edit" type="button">Edit</button>
                    </h2>

                    <dl className="definitions">
                        <div className="definition">
                            <dt className="item-definition">Name:</dt>
                            <dd className="item-description">{`${data.contact.firstName}  ${data.contact.lastName}`}</dd>
                        </div>
                        <div className="definition">
                            <dt className="item-definition">Email:</dt>
                            <dd className="item-description">{data.contact.email}</dd>
                        </div>
                        <div className="definition">
                            <dt className="item-definition">Phone:</dt>
                            <dd className="item-description">{`${data.contact.phoneCode}  ${data.contact.phone}`}</dd>
                        </div>
                    </dl>

                    <input type="hidden" name="payload" value={JSON.stringify(data)} />

                    {state.status !== 1 && (
                        <div
                            className={`banner ${state.ok ? 'banner--success' : 'banner--danger'}`}
                            role="status"
                            aria-live="polite"
                            style={{ marginTop: 12 }}
                        >
                            {state.message}
                        </div>
                    )}

                    {!state.ok && <div className="actions">
                        <SubmitBtn />
                    </div>}
                </div>
            </form>
            <div onClick={ reset }>
                {state.ok &&
                    <button className="btn btn--primary btn--light" type="button" style={{ width: '100%' }}> Start Over →   </button>
                }
            </div>
        </>
    );
}