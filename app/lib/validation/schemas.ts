import { z } from 'zod';

export const Step1Schema = z.object({
    businessName: z.string().trim().min(1, 'Business name is required'),
    businessType: z.string().trim().min(1, 'Type is required'),
    address: z.object({
        line1: z.string().trim().min(1, 'Address line 1 is required'),
        line2: z.string().trim().optional().or(z.literal('')),
        city: z.string().trim().min(1, 'City is required'),
        state: z.string().trim().length(2, 'State is required'),
        zip: z.string().regex(/^\d{5}$/, 'ZIP must be 5 digits')
    })
});

export const Step2Schema = z.object({
    contact: z.object({
        firstName: z.string().trim().min(1, 'First name is required'),
        lastName: z.string().trim().min(1, 'Last name is required'),
        email: z.email('Enter a valid email').trim(),
        phoneCode: z.string().trim().regex(/^\+\d{1,4}$/, 'Country code is required'),
        phone: z.string().trim().refine(
            (v) => /^(\(\d{3}\) \d{3}-\d{4})$/.test(v),
            'Enter a valid phone number'
        )
    })
});

export const fullPayloadSchema = z.object({
    name: z.string(),
    type: z.string(),
    address: z.object({
        line1: z.string(),
        line2: z.string().optional().or(z.literal('')),
        city: z.string(),
        state: z.string(),
        zip: z.string()
    }),
    contact: z.object({
        email: z.string(),
        phone: z.string()
    })
});