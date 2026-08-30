# Authentication Flow

This document explains the custom authentication and UVA email verification flow
for the UVA Pickleball Club platform.

The app uses:

- Next.js App Router for pages and API routes
- Supabase Auth for account creation, login, and sessions
- Supabase Postgres for profile and verification-token storage
- Resend for sending custom UVA email verification messages

## High-Level Goal

Users should be able to create an account and log in before custom UVA email
verification is complete.

However, their profile should clearly show whether their UVA email has been
verified.

The app does not use Supabase's built-in `email_confirmed_at` value as the
source of truth for this custom verification status. Instead, the app uses:

```text
profiles.email_verified
profiles.email_verified_at
```

## Important Supabase Setting

Supabase's built-in email confirmation is intentionally turned off:

```text
Authentication -> Providers -> Email -> Confirm email: OFF
```

This allows users to log in immediately after creating an account.

The platform then handles UVA email verification separately with a custom token
and Resend email.

## Signup Flow

File:

```text
src/app/signup/page.tsx
```

When a user submits the signup form:

1. The app normalizes the UVA email to lowercase.
2. The app checks that the email ends with `@virginia.edu`.
3. The app creates the Supabase Auth user with `supabase.auth.signUp`.
4. The app sends first name, last name, school, and graduation year as user
   metadata.
5. After signup succeeds, the app calls the custom verification email endpoint.
6. If Supabase returns a session, the user can be redirected into the signed-in
   experience.

The user is allowed to log in before custom UVA email verification is complete.

## Sending The Verification Email

File:

```text
src/app/api/send-verification/route.ts
```

This route sends the custom verification email through Resend.

The route:

1. Requires a Supabase access token from the signed-in user.
2. Uses `SUPABASE_SECRET_KEY` server-side to verify the user.
3. Confirms the user's email ends with `@virginia.edu`.
4. Checks `profiles.email_verified`.
5. Rate-limits repeated verification email requests.
6. Generates a secure random raw token.
7. Hashes the raw token with SHA-256.
8. Stores only the token hash in `email_verification_tokens`.
9. Deletes old verification tokens for that user.
10. Sends a Resend email containing:

```text
/verify-email?token=RAW_TOKEN
```

The raw token is sent to the user's email but is never stored in the database.

## Token Storage

Table:

```text
email_verification_tokens
```

The database stores:

```text
user_id
token_hash
expires_at
created_at
```

The database must not store the raw token.

This matters because if the token table is ever exposed, attackers should not be
able to verify accounts directly from stored token values.

## Why GET Verification Was Removed

Old behavior:

```text
GET /verify-email?token=...
```

The old GET route immediately verified the account.

That was risky because Microsoft Outlook, Gmail, and other email providers may
open links automatically for malware scanning. If a scanner opened the link
first, it could accidentally verify the user's account before the user manually
clicked anything.

New behavior:

```text
GET /verify-email?token=...
```

only shows a confirmation page.

It does not modify the database.

## Verification Confirmation Page

File:

```text
src/app/verify-email/page.tsx
```

This page reads the token from the URL and renders a confirmation button.

It does not:

- query Supabase
- update `profiles`
- delete tokens
- create a login session
- verify the user automatically

The page renders a form:

```text
POST /api/verify-email
```

The user must explicitly click the "Verify UVA Email" button before verification
happens.

## Verification API Route

File:

```text
src/app/api/verify-email/route.ts
```

This route handles the real verification work.

It only supports POST.

The route:

1. Reads the raw token from form data or JSON.
2. Hashes the raw token with SHA-256.
3. Looks up `email_verification_tokens.token_hash`.
4. Rejects missing, invalid, already-used, or expired tokens.
5. Deletes expired tokens.
6. Consumes the valid token so it can only be used once.
7. Updates the matching profile:

```sql
email_verified = true
email_verified_at = current timestamp
```

8. Redirects to:

```text
/auth/confirm
```

The route uses:

```text
SUPABASE_SECRET_KEY
```

only on the server.

## Confirmation Page

File:

```text
src/app/auth/confirm/page.tsx
```

After the POST route verifies the email, the user lands on the confirmation
page.

This page tells the user that their UVA email is verified and sends them to the
login page.

Verification does not automatically create a login session.

## Profile Account Status

File:

```text
src/app/profile/page.tsx
```

The profile page reads verification status from:

```text
profiles.email_verified
```

If `email_verified` is true, the profile displays:

```text
Verified
```

If `email_verified` is false, the profile displays:

```text
Not Verified
```

The profile page does not use:

```text
user.email_confirmed_at
```

for the custom UVA verification status.

## Environment Variables

Local development uses `.env.local`.

Vercel must define these environment variables in the project settings:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
SUPABASE_SECRET_KEY
RESEND_API_KEY
```

Only the `NEXT_PUBLIC_` variables are safe for browser/client code.

Never expose these to client code:

```text
SUPABASE_SECRET_KEY
RESEND_API_KEY
```

## Local Testing Checklist

1. Start the local app:

```bash
npm run dev
```

2. Create a new account with an `@virginia.edu` email.

3. Confirm the user can log in before custom UVA verification.

4. Open the user's profile and confirm Account Status shows:

```text
Not Verified
```

5. Send or request a verification email.

6. Open the email link:

```text
http://localhost:3000/verify-email?token=...
```

7. Before clicking the button, check Supabase:

```sql
select email_verified, email_verified_at
from profiles
where id = 'USER_ID';
```

The user should still be unverified.

8. Click "Verify UVA Email".

9. Confirm the app redirects to:

```text
/auth/confirm
```

10. Check Supabase again. The profile should now have:

```text
email_verified = true
email_verified_at = not null
```

11. Try opening the same verification link again. It should no longer verify
again because the token was already consumed.

## Vercel Testing Checklist

1. Push the latest code to GitHub.

2. Make sure Vercel redeploys the latest commit.

3. Confirm the Vercel project has all required environment variables.

4. Create a test account on the production URL.

5. Send a real verification email.

6. Open the email link.

7. Confirm opening the link only shows the confirmation page.

8. Confirm clicking "Verify UVA Email" updates `profiles.email_verified`.

9. Confirm the same token cannot be reused.

## Security Notes

- GET requests never mutate verification state.
- Email scanners cannot verify accounts by simply opening a link.
- Raw verification tokens are not stored in the database.
- Tokens are one-time use.
- Expired tokens are rejected.
- Secret keys stay in server-only API routes.
- Verification does not create a login session.
- `profiles.email_verified` is the authoritative verification field.

## Files Involved

```text
src/app/signup/page.tsx
src/app/login/page.tsx
src/app/profile/page.tsx
src/app/verify-email/page.tsx
src/app/api/send-verification/route.ts
src/app/api/verify-email/route.ts
src/app/auth/confirm/page.tsx
src/lib/supabase/client.ts
src/lib/supabase/server.ts
```

## Quick Mental Model

Think of account creation and UVA email verification as two related but separate
systems:

```text
Supabase Auth account
  -> lets the user sign up and log in

Custom UVA email verification
  -> proves the user owns their UVA email
  -> controls profiles.email_verified
  -> controls the Account Status shown on profile
```

That separation gives the app a friendlier login experience while still keeping
UVA verification explicit and secure.
