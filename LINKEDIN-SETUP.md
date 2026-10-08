# Patrick’s public LinkedIn sign-in

Public meetings and messages use LinkedIn OpenID Connect. This authenticates a LinkedIn account; it is not verification of the person’s real-world identity. It does not grant access to either dashboard or to LinkedIn messaging APIs.

## Configure the application

1. Create an application at https://www.linkedin.com/developers/apps.
2. Enable **Sign In with LinkedIn using OpenID Connect** in its Products tab.
3. Add the exact authorized redirect URL:
   - Local development: `http://127.0.0.1:3100/api/public/linkedin/callback`
   - Production: `https://unitalk.com/api/public/linkedin/callback`
4. In an ignored `.env.local`, configure server-only values:

```dotenv
LINKEDIN_CLIENT_ID=your_application_client_id
LINKEDIN_CLIENT_SECRET=your_application_client_secret
LINKEDIN_REDIRECT_URI=http://127.0.0.1:3100/api/public/linkedin/callback
PUBLIC_AUTH_SECRET=your_random_32_byte_base64url_secret
```

Generate the secret with:

```powershell
node -e "console.log(require('node:crypto').randomBytes(32).toString('base64url'))"
```

Restart Next.js after configuring the values. Visit using the same hostname and port as the redirect URI. In production, configure these values in the host’s environment and use the HTTPS callback. Never prefix secrets with `NEXT_PUBLIC_` or commit them.

## Calendar

The authenticated meeting space embeds the user-supplied `https://calendly.com/patrick-chassany`. Calendly owns booking, availability and invitations. The page gate requires LinkedIn sign-in before loading the embed; the Calendly URL itself remains a public external calendar, not a private resource protected by Unitalk. No booking claim is based on a client-side postMessage.

## Message delivery

LinkedIn supplies the sender’s account ID and name; a verified email is optional. The website does not invent an email or ask for LinkedIn messaging permissions.

Delivery requires an HTTPS endpoint configured with:

```dotenv
PUBLIC_MESSAGE_WEBHOOK_URL=https://your-service.example/receive-message
PUBLIC_MESSAGE_WEBHOOK_TOKEN=optional_server_to_server_bearer_token
```

It receives a JSON POST with `recipient`, authenticated `sender` (`subject`, `name`, optional `email`), `subject`, `message`, and optional visitor-question `context`. Return a successful 2xx response only after accepting the message for delivery. Until configured, the UI retains drafts but does not report messages as sent. Do not retry ambiguous deliveries automatically; the recipient service should deduplicate submissions as needed.

## Security and remaining configuration

- Authorization-code flow has an encrypted ten-minute state/nonce cookie; callback validates provider JWT signature, discovery issuer, audience, time and nonce, and matches the userinfo subject.
- Browser session contains only encrypted account details, expires after one hour, and is HttpOnly / SameSite=Lax / Secure over HTTPS. Provider tokens are not stored or exposed.
- Sign-in/logout/message POSTs enforce the configured origin; message delivery verifies the session server-side.
- Popup completion is checked against its window and exact origin. It keeps mounted conversation/form drafts while signing in.
- The LinkedIn application and a recipient delivery endpoint are not configured in this repository. A real LinkedIn account round trip remains to be verified after setup.
