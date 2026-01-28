// File: src/pages/Contact.tsx
import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ArrowRight,
  Clock,
  ShieldCheck,
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  // honeypot (spam trap) — keep hidden in UI
  website?: string;
};

const Contact = () => {
  const WHATSAPP = "255717395728";
  const EMAIL = "tanzaniawonderland28@gmail.com";
  const PHONE = "+255 717 395 728";

  const waLink = useMemo(() => `https://wa.me/${WHATSAPP}`, [WHATSAPP]);

  // Use your standard env var pattern (Vite)
  // If VITE_STRAPI_URL is empty, it will use relative "/api/..." (works behind a proxy)
  const STRAPI_BASE = (import.meta.env.VITE_STRAPI_URL || "").replace(/\/$/, "");
  const CONTACT_SUBMIT_URL = STRAPI_BASE
    ? `${STRAPI_BASE}/api/contact-submissions`
    : `/api/contact-submissions`;

  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    website: "", // honeypot
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState<
    | { type: "success"; message: string }
    | { type: "error"; message: string }
    | null
  >(null);

  const onChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [key]: e.target.value }));

  const validate = () => {
    const firstName = form.firstName.trim();
    const lastName = form.lastName.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!firstName) return "First name is required.";
    if (!lastName) return "Last name is required.";
    if (!email) return "Email is required.";
    // simple email sanity check (frontend only)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email.";
    if (!message) return "Message is required.";

    return null;
  };

  const mailtoFallback = () => {
    const subject = encodeURIComponent("Trip planning request — Tanzania Wonderland");
    const body = encodeURIComponent(
      [
        `Name: ${form.firstName} ${form.lastName}`.trim(),
        `Email: ${form.email}`,
        `Phone: ${form.phone}`,
        "",
        "Message:",
        form.message,
      ].join("\n")
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotice(null);

    // honeypot check (if filled, silently stop)
    if ((form.website || "").trim()) {
      setNotice({ type: "success", message: "Message sent. We’ll get back to you shortly." });
      return;
    }

    const err = validate();
    if (err) {
      setNotice({ type: "error", message: err });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        data: {
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          message: form.message.trim(),
        },
      };

      const res = await fetch(CONTACT_SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        // Try to read Strapi error payload
        let msg = "Failed to send your message. Please try again.";
        try {
          const j = await res.json();
          msg =
            j?.error?.message ||
            j?.error?.details?.errors?.[0]?.message ||
            msg;
        } catch {
          // ignore
        }
        throw new Error(msg);
      }

      setNotice({
        type: "success",
        message: "Message sent successfully! We’ll reply within 24 hours.",
      });

      // clear form
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
        website: "",
      });
    } catch (error: any) {
      setNotice({
        type: "error",
        message:
          error?.message ||
          "Could not reach our server. You can still contact us via email.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* HERO (aligned to your premium hero system) */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/40 to-transparent" />
          <div className="absolute -top-40 left-1/2 h-80 w-[52rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute -bottom-48 right-[-12rem] h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_20%,rgba(255,255,255,0.10),transparent_70%)]" />
        </div>

        <div className="relative z-10">
          <div className="container py-16 sm:py-20">
            <div className="mx-auto max-w-5xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold tracking-widest text-white/85 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                TALK TO A LOCAL EXPERT
              </div>

              <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white">
                Plan your <span className="text-primary">dream adventure</span>
              </h1>

              <p className="mt-4 mx-auto max-w-3xl text-base sm:text-lg text-white/80 leading-relaxed">
                Tell us your dates, interests, and budget — we’ll craft a tailor-made itinerary with premium
                logistics, fast responses, and authentic experiences.
              </p>

              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/85 backdrop-blur">
                  <Clock className="h-4 w-4 text-white/80" />
                  Reply within 24 hours
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/85 backdrop-blur">
                  <ShieldCheck className="h-4 w-4 text-white/80" />
                  Secure planning
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/85 backdrop-blur">
                  <Sparkles className="h-4 w-4 text-white/80" />
                  Tailor-made trips
                </div>
              </div>
            </div>
          </div>

          {/* “floating” panel into content */}
          <div className="container pb-10">
            <div className="mx-auto max-w-6xl">
              <div className="rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl p-5 sm:p-6 shadow-[var(--shadow-soft)]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-white/85">
                    <div className="text-sm font-semibold tracking-wide">WhatsApp available</div>
                    <div className="text-xs text-white/70">Tap to chat instantly with our team.</div>
                  </div>

                  <Button
                    type="button"
                    className="h-12 rounded-2xl bg-[#16a34a] text-white hover:bg-[#15803d] shadow-[var(--shadow-soft)]"
                    onClick={() => window.open(waLink, "_blank")}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Chat on WhatsApp
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="relative isolate overflow-hidden py-14 sm:py-16">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-background" />
          <div className="absolute -top-40 left-1/2 h-80 w-[52rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-48 right-[-12rem] h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/[0.03]" />
        </div>

        <div className="container">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:gap-12">
            {/* FORM CARD */}
            <div className="rounded-3xl border border-border bg-white/70 backdrop-blur-xl p-6 sm:p-8 shadow-[var(--shadow-soft)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">Send us a message</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Share your dates, trip style, and must-see places — we’ll respond with options and a free quote.
                  </p>
                </div>
                <div className="hidden sm:block rounded-2xl border border-border bg-white/60 px-3 py-2 text-xs text-muted-foreground">
                  Free quote
                </div>
              </div>

              {/* Notice */}
              {notice && (
                <div
                  className={[
                    "mt-6 rounded-2xl border p-4 text-sm",
                    notice.type === "success"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                      : "border-amber-200 bg-amber-50 text-amber-900",
                  ].join(" ")}
                >
                  <div className="flex items-start gap-2">
                    {notice.type === "success" ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4" />
                    ) : (
                      <AlertTriangle className="mt-0.5 h-4 w-4" />
                    )}
                    <div className="flex-1">
                      {notice.message}
                      {notice.type === "error" && (
                        <div className="mt-3">
                          <button
                            type="button"
                            onClick={mailtoFallback}
                            className="text-xs font-semibold underline underline-offset-4"
                          >
                            Or click here to send via email
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                {/* honeypot field (hidden) */}
                <input
                  type="text"
                  value={form.website || ""}
                  onChange={onChange("website")}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">First Name</label>
                    <Input
                      value={form.firstName}
                      onChange={onChange("firstName")}
                      placeholder="Your first name"
                      className="h-12 rounded-2xl bg-white/60"
                      autoComplete="given-name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Last Name</label>
                    <Input
                      value={form.lastName}
                      onChange={onChange("lastName")}
                      placeholder="Your last name"
                      className="h-12 rounded-2xl bg-white/60"
                      autoComplete="family-name"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={onChange("email")}
                      placeholder="you@email.com"
                      className="h-12 rounded-2xl bg-white/60"
                      autoComplete="email"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Phone</label>
                    <Input
                      value={form.phone}
                      onChange={onChange("phone")}
                      placeholder="+255 XXX XXX XXX"
                      className="h-12 rounded-2xl bg-white/60"
                      autoComplete="tel"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Message</label>
                  <Textarea
                    value={form.message}
                    onChange={onChange("message")}
                    placeholder="Tell us about your dream Tanzania adventure (dates, budget range, interests, group size)..."
                    className="min-h-[140px] rounded-2xl bg-white/60"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 w-full rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-safari)] transition-all disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground">
                  By sending this message, you agree to be contacted about your trip request. We do not sell your data.
                </p>
              </form>
            </div>

            {/* CONTACT CARD */}
            <div className="space-y-6">
              <div className="rounded-3xl border border-border bg-white/70 backdrop-blur-xl p-6 sm:p-8 shadow-[var(--shadow-soft)]">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">Contact information</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Prefer direct contact? Reach us anytime — we’re happy to advise on routes, seasons, and logistics.
                </p>

                <div className="mt-7 space-y-4">
                  <div className="flex items-start gap-4 rounded-2xl border border-border bg-white/60 p-4 transition-all hover:shadow-[var(--shadow-soft)]">
                    <Phone className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">{PHONE}</p>
                      <p className="text-sm text-muted-foreground">24/7 Support</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-2xl border border-border bg-white/60 p-4 transition-all hover:shadow-[var(--shadow-soft)]">
                    <Mail className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">{EMAIL}</p>
                      <p className="text-sm text-muted-foreground">Response within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-2xl border border-border bg-white/60 p-4 transition-all hover:shadow-[var(--shadow-soft)]">
                    <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">Tanzania</p>
                      <p className="text-sm text-muted-foreground">Safari capital of Africa</p>
                    </div>
                  </div>
                </div>

                <div className="mt-7">
                  <Button
                    type="button"
                    className="h-12 w-full rounded-2xl bg-[#16a34a] text-white hover:bg-[#15803d] shadow-[var(--shadow-soft)]"
                    onClick={() => window.open(waLink, "_blank")}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Chat on WhatsApp
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Small “expectations” card */}
              <div className="rounded-3xl border border-border bg-white/70 backdrop-blur-xl p-6 shadow-[var(--shadow-soft)]">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl border border-border bg-white/60 p-3">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">What happens next?</div>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      We’ll confirm availability, recommend the best season/route, and share a clear quote with
                      inclusions. You can refine it until it’s perfect.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* end right column */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
