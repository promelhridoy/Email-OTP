import type { InputHTMLAttributes, ReactNode } from "react";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <main className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-cobalt p-12 text-white lg:flex">
        <span className="font-display text-2xl font-semibold tracking-tight">
          Harbor
        </span>
        <div>
          <h2 className="font-display max-w-md text-5xl leading-[1.05] font-semibold tracking-tight">
            Everything you need, one calm place.
          </h2>
          <p className="mt-5 max-w-sm text-lg text-white/75">
            Your projects, notes and settings stay in sync wherever you sign in.
          </p>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -bottom-24 h-96 w-96 rounded-full border border-white/20"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-8 -bottom-8 h-64 w-64 rounded-full border border-white/20"
        />
      </aside>

      <section className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <span className="font-display mb-10 block text-xl font-semibold lg:hidden">
            Harbor
          </span>
          <h1 className="font-display text-3xl font-semibold tracking-tight">
            {title}
          </h1>
          <p className="mt-2 text-ink-soft">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <p className="mt-8 text-sm text-ink-soft">{footer}</p>
        </div>
      </section>
    </main>
  );
}

export function Field({
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      <input
        {...props}
        className="w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-base outline-none transition focus:border-cobalt focus:ring-2 focus:ring-cobalt/25"
      />
    </label>
  );
}

export function SubmitButton({
  loading,
  children,
}: {
  loading: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full rounded-lg bg-cobalt px-4 py-2.5 font-medium text-white transition hover:bg-cobalt-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt disabled:opacity-60"
    >
      {loading ? "Please wait…" : children}
    </button>
  );
}