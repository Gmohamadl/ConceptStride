# ConceptStride — Interactive AI Learning Platform

A student-centered learning hub for AI fundamentals. Built with HTML, CSS, and vanilla JavaScript, with a familiar course-workspace layout and an emphasis on applying concepts and explaining your thinking.

## Use in StackBlitz

Download `dist/conceptstride-stackblitz.zip` and extract it. Use all extracted files together, including `auth.js` and the `vendor/` folder. Replace the prior project with this extracted folder. The included package.json and package-lock.json preserve the Servor setup.

Run `npm install` if needed, then `npm start`. No compilation or API key is required. `page2.html` opens the learning modules for compatibility with the original project.

For this hosted checkout, the web assets are under `dist/`. The downloadable archive places them at the project root for the original StackBlitz setup.

## Working features

- Local username/password login, account creation, logout, and immediate password reset without email verification.
- Separate saved learning workspaces for each local username.
- Light, dark, and device-default themes; larger text, stronger contrast, roomier reading, system font, underlined links, reduced motion, and focus mode. Preferences are saved separately for each account or guest.
- Profiles with display names, short bios, learning goals, nine avatar choices, and optional cropped photo uploads stored only in the browser.
- Remember-this-device login lasting up to 30 days, with explicit logout clearing the remembered identity. Standard password autofill hints let the browser offer to save credentials.
- A dismissible welcome cloud after signup and login.
- Five AI foundation modules with Learn, Try, and Reflect steps.
- Practice feedback and reflection completion requirements.
- Resume links that keep the current lesson step, including after a reload.
- Practice studio: five recall cards, authored explanations, and self-reported confidence.
- Notebook: six topic spaces, automatic local saving, and word counts.
- Educator preview: create activities, choose assistance policies, review local submissions, and write feedback.
- Student assignment drafts, explicit support disclosures, and visible educator feedback.
- Searchable and filterable modules; links to original learning sources.
- Prompt builder and an illustrative dataset coverage activity.
- Progress and JSON export, including notebook entries and classroom records.
- Responsive navigation, labels, focus states, reduced-motion support, and no required autoplay.

## Scope

Stride Guide is an offline, lesson-based assistant, not a connected AI model. It uses course explanations and a glossary, follows conversational topics, varies examples, gives structured prompt feedback, and runs short ungraded quizzes with hints. Conversation history and quiz state are stored per workspace and clear separately from course progress. Unsupported questions receive an explicit limitation instead of fabricated answers. Independent practice pauses the guide within the interface. It does not block other websites, detect AI-generated work, or monitor external browser activity.

Student and educator views are classroom previews within a local account. Usernames and password hashes are saved in this browser, and each username opens its own saved workspace. These are demo accounts, not server-enforced classroom roles. There is no Canvas integration, shared database, cross-device sync, or institutional gradebook. Reflections are saved, not automatically graded. Practice studio confidence is self-assessment and does not complete a module.

The existing hosted Site is public, as requested by the owner. GitHub/Netlify publishing has not been configured yet.

## Data

Guest state is stored in `localStorage` under `conceptstride-learning-v2`. Registered workspace state uses a separate `conceptstride-workspace-<account-id>` key. Demo account records use `conceptstride-demo-accounts-v1`; passwords use salted bcrypt hashes. Raw passwords are not saved. The active account ID uses sessionStorage. Opting into “Remember this device” also stores an account ID and 30-day expiry in localStorage; no raw password is saved. Logout clears both. This is convenience for a browser-local prototype, not a secure server session. When accessed on the same origin, the app can carry forward the prior `umoja-learning-v2` data. Browser storage does not transfer between different domains. Export a JSON record to keep a copy; import is not implemented.

Exports contain progress, reflections, notebook entries, assignment drafts, submissions, disclosures, feedback, and course settings. Account records and password hashes are excluded from learning-record exports. No personal information or usage records are bundled in the downloadable source. Clearing browser storage removes the locally stored work.

## Files

- `index.html`: app shell, navigation, guide container, and metadata.
- `styles.css`: visual system and responsive layout.
- `script.js`: lesson content, routing, persistence, study tools, and classroom interactions.
- `auth.js`: browser-local account flows, remembered devices, and workspace selection.
- `preferences.js`: appearance initialization before paint and per-account settings.
- `personalize.js` / `personalize.css`: profile editing, code-drawn avatars, photo upload, settings, and theme/accessibility styles.
- `guide.js`: lesson-based conversation, glossary, prompt checks, and practice quizzes.
- `vendor/bcrypt.min.js`: bundled bcryptjs 2.4.3 browser build, with its MIT license beside it.
- `page2.html`: compatibility redirect.

Google Fonts and optional original YouTube videos require network access. System font fallbacks and the core activities work without those services.

## Validation of this revision

JavaScript syntax checked with `node --check`. Browser checks covered recall cards, notebook persistence after reload, educator feedback visible to students, saved lesson-step routing, practice grading, and phone-width navigation without horizontal overflow. A new browser starts with an empty learning record; screenshot progress reflects local QA activity.

## Local demo login

Create an account with a username of 3–30 letters, digits, underscores, or hyphens, and a password of at least 4 characters. No email, code, or external service is needed. Use a demo password rather than one used for another service. Usernames ignore capitalization. A new account starts with an empty workspace; the existing guest workspace stays available through guest access.

Forgot-password reset accepts a local username and a new password immediately. It does not verify identity: anyone with access to the same browser can reset a local password. This is intentionally a low-security demonstration. Browser data can be inspected or changed locally. Accounts and learning work do not sync between devices, browser profiles, or different file/site origins.

The hosted Site is publicly accessible. Downloaded files also open locally. Browser data does not transfer to a new hosted origin, including Netlify; no import or cross-device sync is implemented.

## Login validation

Run `node tests/auth.test.cjs` in the hosted source checkout. The tests use fake DOM controls and in-memory storage. They cover account creation, case-insensitive duplicate names, mismatched confirmation, bcrypt verification, wrong-password rejection, login, logout, direct local reset, session identity, and per-account workspace persistence/isolation. The actual user’s browser accounts are not used for tests.

## Future integration

A production classroom needs server-enforced roles, shared storage, a secure AI endpoint, and a school-approved data and assessment policy. Keep provider API secrets on a server; never place them in these frontend files.

## Settings and profile validation

Run `node tests/auth.test.cjs`, `node tests/preferences.test.cjs`, and `node tests/guide.test.cjs`. Tests use in-memory storage, fake form controls, and synthetic identities. They cover remembered-login expiry/logout, account-isolated preferences, profile edits and safe rendering, and guide conversational behavior and independent-work pauses. Browser QA checks themes across reloads, focus mode, guide replies, and a 390px iframe for settings/profile layout with no horizontal overflow, including extra-large text. Profile layout is rendered from a synthetic fixture; credential entry is not tested through the browser.

A live AI service remains unconnected. Enable OpenAI Developers to configure an approved server-side key flow before adding open-ended AI responses. No provider key belongs in this frontend. Welcome email sending is also not connected.
