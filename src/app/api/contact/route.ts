type ContactPayload = {
  prenom?: unknown;
  societe?: unknown;
  contact?: unknown;
  website?: unknown;
};

const clean = (value: unknown, max: number) => typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0].trim();
  const host = forwardedHost || request.headers.get("host");
  const forwardedProtocol = request.headers.get("x-forwarded-proto")?.split(",")[0].trim();
  const protocol = forwardedProtocol || new URL(request.url).protocol.replace(":", "");
  if (origin && host && origin !== `${protocol}://${host}`) return Response.json({ error: "origin_not_allowed" }, { status: 403 });
  if (Number(request.headers.get("content-length") ?? 0) > 10_000) return Response.json({ error: "payload_too_large" }, { status: 413 });

  const body = await request.json().catch(() => null) as ContactPayload | null;
  if (!body) return Response.json({ error: "invalid_json" }, { status: 400 });
  if (clean(body.website, 100)) return Response.json({ ok: true });

  const payload = {
    prenom: clean(body.prenom, 80),
    societe: clean(body.societe, 120),
    contact: clean(body.contact, 160),
    source: "aquaprox-event-experience",
    submittedAt: new Date().toISOString(),
  };
  if (!payload.prenom || !payload.societe || payload.contact.length < 6) return Response.json({ error: "invalid_fields" }, { status: 400 });

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) return Response.json({ error: "contact_not_configured" }, { status: 503 });

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.CONTACT_WEBHOOK_SECRET ? { Authorization: `Bearer ${process.env.CONTACT_WEBHOOK_SECRET}` } : {}),
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  }).catch(() => null);

  if (!response?.ok) return Response.json({ error: "contact_delivery_failed" }, { status: 502 });
  return Response.json({ ok: true });
}
