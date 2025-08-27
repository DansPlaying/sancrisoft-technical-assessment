'use server';

import { FormAllData } from "./definitions";

export type SubmitState = { ok: boolean; status: number; message: string };

export async function submitCompany( prevState: SubmitState,            // ← 1º el estado previo
  formData: FormData) {
  try {
    const data = JSON.parse(String(formData.get('payload') ?? '{}'));
    const payload = toApiPayload(data as FormAllData);

    const res = await fetch('https://ss-company.free.beeceptor.com/company', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    const text = await res.text();                
    const body = tryJson(text); 

    console.log('Payload:', payload);
    
    const message  = String(body?.message ?? (text || (res.ok ? 'OK' : 'Server error')));
    const apiState = String(body?.status  ?? (res.ok ? 'ok' : 'error')).toLowerCase();

    const ok = res.ok && apiState === 'ok';

    return { ok, status: res.status, message };
    
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unexpected error';
    return { ok: false, status: 0, message: msg };
  }
}

function tryJson(s: string) {
  try { return JSON.parse(s); } catch { return null; }
}

const trim = (s?: string) => String(s ?? '').trim();

const toApiPayload = (d: FormAllData) => ({
  name: trim(d.businessName),
  type: trim(d.businessType),
  address: {
    line1: trim(d.address.line1),
    line2: trim(d.address.line2),
    city : trim(d.address.city),
    state: trim(d.address.state),
    zip  : trim(d.address.zip),
  },
  contact: {
    firstName: trim(d.contact.firstName),
    lastName : trim(d.contact.lastName),
    email    : trim(d.contact.email),
    phone    : `${d.contact.phoneCode} ${d.contact.phone}`,
  },
});