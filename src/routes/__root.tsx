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
      {
        rel: "icon",
        href: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSI+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iMTQiIGZpbGw9IiMxMzE0MWEiLz48cmVjdCB4PSIxLjUiIHk9IjEuNSIgd2lkdGg9IjYxIiBoZWlnaHQ9IjYxIiByeD0iMTIuNSIgc3Ryb2tlPSIjZDk3NzA2IiBzdHJva2Utb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEuNSIvPjxjaXJjbGUgY3g9IjMyIiBjeT0iMzIiIHI9IjIyIiBmaWxsPSIjZDk3NzA2IiBmaWxsLW9wYWNpdHk9IjAuMTUiLz48ZyB0cmFuc2Zvcm09InJvdGF0ZSgtNDUgMzIgMzIpIj48cGF0aCBkPSJNMzIgOCBDMzIgOCAzOCAxOCAzOCAzNCBMMjYgMzQgQzI2IDE4IDMyIDggMzIgOCBaIiBmaWxsPSIjY2JkN2UxIiBzdHJva2U9IiNmOGZhZmMiIHN0cm9rZS13aWR0aD0iMSIvPjxwYXRoIGQ9Ik0yOCAxNiBRMzIgMTggMzYgMTYgTTI3IDIxIFEzMiAyNCAzNyAyMSBNMjcgMjYgUTMyIDI5IDM3IDI2IE0yNi41IDMwIFEzMiAzMyAzNy41IDMwIiBzdHJva2U9IiM2NDc0OGIiIHN0cm9rZS13aWR0aD0iMC44IiBmaWxsPSJub25lIi8+PHJlY3QgeD0iMjMiIHk9IjM0IiB3aWR0aD0iMTgiIGhlaWdodD0iNCIgcng9IjEuNSIgZmlsbD0iI2Q5NzcwNiIgc3Ryb2tlPSIjNzgzNTBmIiBzdHJva2Utd2lkdGg9IjAuOCIvPjxwYXRoIGQ9Ik0yNiAzOCBMMzggMzggTDM2IDU2IEwyOCA1NiBaIiBmaWxsPSIjOTI0MDBlIiBzdHJva2U9IiM0NTFhMDMiIHN0cm9rZS13aWR0aD0iMSIvPjxjaXJjbGUgY3g9IjMyIiBjeT0iNDMiIHI9IjEuNSIgZmlsbD0iI2ZlZjNjNyIvPjxjaXJjbGUgY3g9IjMyIiBjeT0iNTAiIHI9IjEuNSIgZmlsbD0iI2ZlZjNjNyIvPjxwYXRoIGQ9Ik0yNyA1NiBMMzcgNTYgTDM1IDU5IEwyOSA1OSBaIiBmaWxsPSIjZDk3NzA2Ii8+PC9nPjwvc3ZnPg==",
        type: "image/svg+xml",
      },
      { rel: "alternate icon", href: "/favicon.png", type: "image/png" },
      { rel: "shortcut icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
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
        <link
          rel="icon"
          type="image/svg+xml"
          href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSI+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iMTQiIGZpbGw9IiMxMzE0MWEiLz48cmVjdCB4PSIxLjUiIHk9IjEuNSIgd2lkdGg9IjYxIiBoZWlnaHQ9IjYxIiByeD0iMTIuNSIgc3Ryb2tlPSIjZDk3NzA2IiBzdHJva2Utb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEuNSIvPjxjaXJjbGUgY3g9IjMyIiBjeT0iMzIiIHI9IjIyIiBmaWxsPSIjZDk3NzA2IiBmaWxsLW9wYWNpdHk9IjAuMTUiLz48ZyB0cmFuc2Zvcm09InJvdGF0ZSgtNDUgMzIgMzIpIj48cGF0aCBkPSJNMzIgOCBDMzIgOCAzOCAxOCAzOCAzNCBMMjYgMzQgQzI2IDE4IDMyIDggMzIgOCBaIiBmaWxsPSIjY2JkN2UxIiBzdHJva2U9IiNmOGZhZmMiIHN0cm9rZS13aWR0aD0iMSIvPjxwYXRoIGQ9Ik0yOCAxNiBRMzIgMTggMzYgMTYgTTI3IDIxIFEzMiAyNCAzNyAyMSBNMjcgMjYgUTMyIDI5IDM3IDI2IE0yNi41IDMwIFEzMiAzMyAzNy41IDMwIiBzdHJva2U9IiM2NDc0OGIiIHN0cm9rZS13aWR0aD0iMC44IiBmaWxsPSJub25lIi8+PHJlY3QgeD0iMjMiIHk9IjM0IiB3aWR0aD0iMTgiIGhlaWdodD0iNCIgcng9IjEuNSIgZmlsbD0iI2Q5NzcwNiIgc3Ryb2tlPSIjNzgzNTBmIiBzdHJva2Utd2lkdGg9IjAuOCIvPjxwYXRoIGQ9Ik0yNiAzOCBMMzggMzggTDM2IDU2IEwyOCA1NiBaIiBmaWxsPSIjOTI0MDBlIiBzdHJva2U9IiM0NTFhMDMiIHN0cm9rZS13aWR0aD0iMSIvPjxjaXJjbGUgY3g9IjMyIiBjeT0iNDMiIHI9IjEuNSIgZmlsbD0iI2ZlZjNjNyIvPjxjaXJjbGUgY3g9IjMyIiBjeT0iNTAiIHI9IjEuNSIgZmlsbD0iI2ZlZjNjNyIvPjxwYXRoIGQ9Ik0yNyA1NiBMMzcgNTYgTDM1IDU5IEwyOSA1OSBaIiBmaWxsPSIjZDk3NzA2Ii8+PC9nPjwvc3ZnPg=="
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              try {
                var t = localStorage.getItem('white-hills-atelier-theme') || 'obsidian';
                if (t === 'nordic') t = 'light';
                document.documentElement.setAttribute('data-theme', t);
                if (t === 'light') {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }

                // Force browser tab to adopt the Damascus blade icon instantly
                var bladeDataUri = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSI+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iMTQiIGZpbGw9IiMxMzE0MWEiLz48cmVjdCB4PSIxLjUiIHk9IjEuNSIgd2lkdGg9IjYxIiBoZWlnaHQ9IjYxIiByeD0iMTIuNSIgc3Ryb2tlPSIjZDk3NzA2IiBzdHJva2Utb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEuNSIvPjxjaXJjbGUgY3g9IjMyIiBjeT0iMzIiIHI9IjIyIiBmaWxsPSIjZDk3NzA2IiBmaWxsLW9wYWNpdHk9IjAuMTUiLz48ZyB0cmFuc2Zvcm09InJvdGF0ZSgtNDUgMzIgMzIpIj48cGF0aCBkPSJNMzIgOCBDMzIgOCAzOCAxOCAzOCAzNCBMMjYgMzQgQzI2IDE4IDMyIDggMzIgOCBaIiBmaWxsPSIjY2JkN2UxIiBzdHJva2U9IiNmOGZhZmMiIHN0cm9rZS13aWR0aD0iMSIvPjxwYXRoIGQ9Ik0yOCAxNiBRMzIgMTggMzYgMTYgTTI3IDIxIFEzMiAyNCAzNyAyMSBNMjcgMjYgUTMyIDI5IDM3IDI2IE0yNi41IDMwIFEzMiAzMyAzNy41IDMwIiBzdHJva2U9IiM2NDc0OGIiIHN0cm9rZS13aWR0aD0iMC44IiBmaWxsPSJub25lIi8+PHJlY3QgeD0iMjMiIHk9IjM0IiB3aWR0aD0iMTgiIGhlaWdodD0iNCIgcng9IjEuNSIgZmlsbD0iI2Q5NzcwNiIgc3Ryb2tlPSIjNzgzNTBmIiBzdHJva2Utd2lkdGg9IjAuOCIvPjxwYXRoIGQ9Ik0yNiAzOCBMMzggMzggTDM2IDU2IEwyOCA1NiBaIiBmaWxsPSIjOTI0MDBlIiBzdHJva2U9IiM0NTFhMDMiIHN0cm9rZS13aWR0aD0iMSIvPjxjaXJjbGUgY3g9IjMyIiBjeT0iNDMiIHI9IjEuNSIgZmlsbD0iI2ZlZjNjNyIvPjxjaXJjbGUgY3g9IjMyIiBjeT0iNTAiIHI9IjEuNSIgZmlsbD0iI2ZlZjNjNyIvPjxwYXRoIGQ9Ik0yNyA1NiBMMzcgNTYgTDM1IDU5IEwyOSA1OSBaIiBmaWxsPSIjZDk3NzA2Ii8+PC9nPjwvc3ZnPg==';
                var links = document.querySelectorAll("link[rel*='icon']");
                links.forEach(function(l){ if (l.parentNode) l.parentNode.removeChild(l); });
                var nl = document.createElement('link');
                nl.rel = 'icon';
                nl.type = 'image/svg+xml';
                nl.href = bladeDataUri;
                document.head.appendChild(nl);
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
