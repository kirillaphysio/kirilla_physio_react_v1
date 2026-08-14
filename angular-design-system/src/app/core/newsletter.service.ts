import { Injectable } from '@angular/core';

/**
 * The mailing-list endpoint is not in the design bundle yet — Réka supplies it. It lives here as
 * a single constant so wiring the real provider is a one-line change; every caller keeps its real
 * idle/submitting/success/error states. Until an endpoint is set, submit() resolves as a no-op
 * success so the client flow is exercisable.
 */
export const LEAD_MAGNET_ENDPOINT = '';

@Injectable({ providedIn: 'root' })
export class NewsletterService {
  /** Subscribe an address to the list. Resolves on success, rejects on failure. */
  async submit(email: string): Promise<void> {
    if (!LEAD_MAGNET_ENDPOINT) {
      // No provider wired yet — treat as a successful no-op so the UI states still work.
      return;
    }
    const res = await fetch(LEAD_MAGNET_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) {
      throw new Error(`Subscribe failed: ${res.status}`);
    }
  }
}
