import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { ThemeProvider } from "../context/ThemeContext";
import { StoreProvider } from "../context/StoreContext";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-foreground">404</h1>
        <h2 className="font-display mt-4 text-xl font-semibold text-foreground">
          Blade not found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The atelier piece you are seeking does not exist or has been retired.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-sm bg-primary px-6 py-3 text-xs font-semibold tracking-[0.2em] uppercase text-primary-foreground transition-transform hover:scale-105"
          >
            Return to Atelier
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl font-semibold tracking-tight text-foreground">
          Atelier Connection Interrupted
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong loading this forge piece. Please retry or return to the forge.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-sm bg-primary px-5 py-2.5 text-xs font-semibold tracking-[0.2em] uppercase text-primary-foreground transition-transform hover:scale-105"
          >
            Rekindle
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-sm border border-border bg-background px-5 py-2.5 text-xs font-semibold tracking-[0.2em] uppercase text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            Return Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "White Hills Knives — Hand-Forged Damascus Steel | Obsidian Atelier" },
      { name: "description", content: "Hand-forged Damascus steel knives and axes. 1,700+ verified reviews, ships fast from California, 30-day returns." },
      { name: "author", content: "White Hills Knives" },
      { property: "og:title", content: "White Hills Knives — Hand-Forged Damascus Steel" },
      {
        property: "og:description",
        content: "Hand-forged Damascus steel knives and axes. 1,700+ verified reviews, ships fast from California.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Jost:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              try {
                var t = localStorage.getItem('white-hills-atelier-theme') || 'obsidian';
                document.documentElement.setAttribute('data-theme', t);
                if (t === 'nordic') {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }
              } catch(e){}
            })();`,
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <StoreProvider>
          <Outlet />
        </StoreProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
