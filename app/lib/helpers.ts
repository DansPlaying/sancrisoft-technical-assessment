import { $ZodIssue } from "zod/v4/core";

export function toErrorMap(issues: $ZodIssue[]) {
    const out: Record<string, string> = {};
    for (const i of issues) {
        const key = i.path.join('.');
        if (!out[key]) out[key] = i.message;
    }
    return out;
}

export const trimAll = (s: string) => s.replace(/\s+/g, ' ').trim();

export function digitsOnly(s: string) {
    return (s || '').replace(/\D+/g, '');
}

export function formatUS(digits: string) {
    const d = digitsOnly(digits).slice(0, 10);
    if (!d) return '';
    if (d.length <= 3) return `(${d}`;
    if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
    return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}
