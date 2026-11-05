import { validateLead } from "@/lib/lead-contact";

export const runtime = "nodejs";

function reply(body: Record<string, unknown>, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

// Bound the actual bytes read, including requests without Content-Length.
async function readBody(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("invalid_body");
  const decoder = new TextDecoder();
  let bytes = 0;
  let text = "";
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    if (bytes > 8192) {
      await reader.cancel();
      throw new Error("body_too_large");
    }
    text += decoder.decode(value, { stream: true });
  }
  return JSON.parse(text + decoder.decode());
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return reply({ error: "Cette origine n’est pas autorisée." }, 403);
  }
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return reply({ error: "Le format du formulaire est invalide." }, 415);
  }
  let body: unknown;
  try {
    body = await readBody(request);
  } catch (error) {
    return reply({ error: "Le formulaire est invalide ou trop volumineux." }, error instanceof Error && error.message === "body_too_large" ? 413 : 400);
  }
  if (body && typeof body === "object" && "website" in body && body.website) {
    return reply({ error: "Veuillez vérifier le formulaire." }, 400);
  }
  const validated = validateLead(body);
  if (!validated.data) return reply({ error: validated.error }, 400);

  const supabaseUrl = process.env.SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!supabaseUrl || !secretKey) {
    return reply({ error: "Le service est temporairement indisponible. Veuillez réessayer plus tard." }, 503);
  }
  const lead = validated.data;
  try {
    const response = await fetch(new URL("/rest/v1/rpc/submit_aquaprox_lead", supabaseUrl), {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: secretKey },
      body: JSON.stringify({
        p_submission_id: lead.submissionId, p_name: lead.name, p_email: lead.email,
        p_phone: lead.phone, p_zone: lead.zone, p_consent: lead.consent,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(12000),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => null);
      if (error?.message === "lead_rate_limited") {
        return reply({ error: "Plusieurs demandes ont déjà été envoyées. Veuillez réessayer dans une heure." }, 429);
      }
      // Log only status and SQL error code, never submitted fields or credentials.
      console.error("Lead storage rejected request", { status: response.status, code: error?.code });
      return reply({ error: "Votre demande n’a pas pu être enregistrée. Veuillez réessayer." }, 502);
    }
    if (await response.json() !== true) throw new Error("unexpected_storage_response");
    return reply({ ok: true });
  } catch {
    return reply({ error: "Connexion interrompue. Veuillez réessayer pour confirmer votre demande." }, 502);
  }
}
