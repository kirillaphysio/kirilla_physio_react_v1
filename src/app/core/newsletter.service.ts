import { Injectable } from '@angular/core';

/**
 * MailerLite's "Basic" embed form action — posts straight to the account's form/group, no API
 * key involved (a secret key can't live in client-side JS on a static, backend-less site). Taken
 * from the account's Forms → Embed → HTML snippet; the form itself is bound to the target group
 * in the MailerLite dashboard, not here.
 */
const MAILERLITE_FORM_ACTION =
  'https://assets.mailerlite.com/jsonp/2553842/forms/198881653379040736/subscribe';

@Injectable({ providedIn: 'root' })
export class NewsletterService {
  /** Subscribe an address to the list. Resolves on success, rejects on failure. */
  async submit(email: string): Promise<void> {
    const body = new URLSearchParams({
      'fields[email]': email,
      'ml-submit': '1',
      anticsrf: 'true',
    });
    const res = await fetch(MAILERLITE_FORM_ACTION, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });
    if (!res.ok) {
      throw new Error(`Subscribe failed: ${res.status}`);
    }
  }
}
