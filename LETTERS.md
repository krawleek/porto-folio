# Private letters

The form stores messages on the server. It does not send email or open a mail app.
`/letters.html` has no public navigation link, but access to messages is protected by a server-checked key, not by the hidden URL.

## Localhost

Start `npm run dev` (Node 22.13+). Open `/letters.html`. The access key is in `.private/admin-key`; read it locally and paste into the login form. The key is never embedded in client code. Data lives in `.private/letters.sqlite`, excluded from Git and denied by Vite. Tests must use a temporary data directory.

## Timeweb PHP hosting

1. Build with `npm run build`; upload the **contents of dist** into the site's `public_html`, including `api/.htaccess`.
2. Enable PHP 8.1+ and PDO SQLite in the hosting control panel. Confirm the extension on your server; availability depends on the server configuration.
3. Enable HTTPS. The PHP process must be able to create `.portfolio-letters` next to `public_html`. This folder must remain outside the document root; never upload it into `public_html`.
4. Open `/api/letters.php` once. An unauthenticated request must return HTTP 401. It creates `.portfolio-letters/admin-key` and `letters.sqlite` privately on the server.
5. Read the key using Timeweb's file manager or SSH, then log in at `/letters.html`. Do not share the key or add it to Git.
6. Submit a test message and confirm that it appears only after authorized login. Back up the private folder separately from the website.

The PHP endpoint has not been deployed or verified on your Timeweb account from this workspace. If PDO SQLite or directory permissions are unavailable, the form reports a failure and retains its text rather than claiming delivery. No email delivery is configured.

To rotate access, replace the private `admin-key` with a new random key of at least 32 characters. The local key and the production key are separate.
