import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/components/sign-out-button";
import { auth } from "@/lib/auth";

const activity = [
  { title: "Moodboard for spring launch", meta: "Edited 2 hours ago" },
  { title: "Weekly planning notes", meta: "Edited yesterday" },
  { title: "Brand colours export", meta: "Shared 3 days ago" },
  { title: "Team onboarding checklist", meta: "Created last week" },
];

export default function HomePage() {
  return (
    <Suspense fallback={<HomeSkeleton />}>
      <Home />
    </Suspense>
  );
}

function HomeSkeleton() {
  return (
    <div className="mx-auto min-h-screen max-w-5xl px-6">
      <div className="py-6 font-display text-xl font-semibold">Harbor</div>
      <div className="h-64 animate-pulse rounded-3xl bg-line" />
    </div>
  );
}

async function Home() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

  const { user } = session;
  const firstName = user.name.split(" ")[0];
  const joined = new Date(user.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mx-auto min-h-screen max-w-5xl px-6 pb-16">
      <header className="flex items-center justify-between py-6">
        <span className="font-display text-xl font-semibold">Harbor</span>
        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-ink-soft sm:block">
            {user.email}
          </span>
          <SignOutButton />
        </div>
      </header>

      <section className="relative overflow-hidden rounded-3xl bg-cobalt px-8 py-14 text-white sm:px-14 sm:py-20">
        <h1 className="font-display max-w-xl text-4xl leading-[1.05] font-semibold tracking-tight sm:text-6xl">
          Good to see you, {firstName}.
        </h1>
        <p className="mt-5 max-w-md text-lg text-white/75">
          You’re signed in and everything is up to date. Pick something up from
          the list below.
        </p>
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full border border-white/20"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-6 -right-6 h-44 w-44 rounded-full border border-white/20"
        />
      </section>

      <div className="mt-10 grid gap-10 md:grid-cols-[1.6fr_1fr]">
        <section>
          <h2 className="font-display text-xl font-semibold">Recent work</h2>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {activity.map((item) => (
              <li
                key={item.title}
                className="flex items-baseline justify-between gap-4 py-4"
              >
                <span className="font-medium">{item.title}</span>
                <span className="shrink-0 text-sm text-ink-soft">
                  {item.meta}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Your account</h2>
          <dl className="mt-4 space-y-4 text-sm">
            <div>
              <dt className="text-ink-soft">Name</dt>
              <dd className="mt-0.5 font-medium">{user.name}</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Email</dt>
              <dd className="mt-0.5 font-medium break-all">{user.email}</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Member since</dt>
              <dd className="mt-0.5 font-medium">{joined}</dd>
            </div>
          </dl>
        </section>
      </div>
    </div>
  );
}