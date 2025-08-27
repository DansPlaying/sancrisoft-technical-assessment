Multi-Step Form (Next.js / App Router)

A 3-step company onboarding form built with Next.js, Server Actions, Zod validation, and a simple Context store. Styles live in app/globals.css.

# 1) Install deps
npm install

# 2) Run dev server
npm run dev

Open http://localhost:3000
 — the form is shown on the home page. You can go through the steps and submit.

What to try

Step 1: Business data (validated with Zod).

Step 2: Contact person (validated with Zod; phone field is controlled and writes to context).

Step 3: Review & submit (Server Action → Beeceptor demo endpoint).

Success: returns a green banner.

Business error simulation: use “Sancrisoft” as the company name to trigger an error message (status 200 with {status:"error"}).

Occasional 500s are handled and shown as a red banner.

Status pill updates to in progress / success / error.

Local persistence: progress and field values are saved to localStorage. Use Start Over to clear.

Scripts

dev — start the Next dev server

build — production build

start — run the production build

lint — lint the project

Configuration

No environment variables are required.
