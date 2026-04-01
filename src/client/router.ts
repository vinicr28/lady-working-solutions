// Lightweight hash-based SPA router

import { api } from './api.js';

type RouteHandler = (params: Record<string, string>) => Promise<string> | string;

interface Route {
  pattern: RegExp;
  paramNames: string[];
  handler: RouteHandler;
  requiresAuth: boolean;
}

const routes: Route[] = [];
let currentUser: { id: string; name: string; email: string; type: string } | null = null;

export function getUser() {
  return currentUser;
}

export function addRoute(
  path: string,
  handler: RouteHandler,
  requiresAuth = false
): void {
  // Convert path like /jobs/:id to regex
  const paramNames: string[] = [];
  const pattern = path.replace(/:(\w+)/g, (_, name) => {
    paramNames.push(name);
    return '([^/]+)';
  });
  routes.push({
    pattern: new RegExp(`^${pattern}$`),
    paramNames,
    handler,
    requiresAuth,
  });
}

export async function checkAuth(): Promise<boolean> {
  try {
    const res = await api.me();
    if (res.success && res.data) {
      currentUser = res.data;
      return true;
    }
    currentUser = null;
    return false;
  } catch {
    currentUser = null;
    return false;
  }
}

export async function navigate(path: string): Promise<void> {
  window.location.hash = path;
}

export async function handleRoute(): Promise<void> {
  const hash = window.location.hash.slice(1) || '/';
  const content = document.getElementById('page-content');
  if (!content) return;

  for (const route of routes) {
    const match = hash.match(route.pattern);
    if (match) {
      // Extract params
      const params: Record<string, string> = {};
      route.paramNames.forEach((name, i) => {
        params[name] = match[i + 1];
      });

      // Auth guard
      if (route.requiresAuth) {
        const authed = await checkAuth();
        if (!authed) {
          navigate(`/login?redirect=${encodeURIComponent(hash)}`);
          return;
        }
      }

      try {
        const html = await route.handler(params);
        content.innerHTML = html;
        // Run any page init scripts
        const event = new CustomEvent('page:loaded', { detail: { path: hash, params } });
        document.dispatchEvent(event);
        window.scrollTo(0, 0);
      } catch (err) {
        console.error('Route error:', err);
        content.innerHTML = `<div class="container page"><h1>Erro</h1><p>Algo deu errado ao carregar a página.</p></div>`;
      }
      return;
    }
  }

  // 404
  content.innerHTML = `<div class="container page text-center"><h1>Página não encontrada</h1><p>A página que você procura não existe.</p><a href="#/" class="btn btn-primary mt-lg">Voltar ao início</a></div>`;
}

export function initRouter(): void {
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}
