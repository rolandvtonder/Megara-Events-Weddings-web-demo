/**
 * Sends a form either to NEXT_PUBLIC_FORM_ENDPOINT (any service that accepts a JSON POST,
 * e.g. Formspree) or — when no endpoint is configured — opens the visitor's email app with
 * the message pre-filled, so enquiries still reach the team on day one.
 */
export const CONTACT_EMAIL = "enquiries@megara.co.za";

export type SubmitResult = "sent" | "mailto";

export async function submitForm(subject: string, fields: Record<string, string>): Promise<SubmitResult> {
  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
  if (endpoint) {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ _subject: subject, ...fields }),
    });
    if (!res.ok) throw new Error(`Form endpoint responded ${res.status}`);
    return "sent";
  }
  const body = Object.entries(fields)
    .filter(([, v]) => v.trim())
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return "mailto";
}

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
