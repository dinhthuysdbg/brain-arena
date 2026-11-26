// Định tuyến bằng hash (#/games/1), không cần máy chủ đặc biệt.
import { useSyncExternalStore } from 'react';

const subscribe = (l: () => void) => { window.addEventListener('hashchange', l); return () => window.removeEventListener('hashchange', l); };
const snapshot = () => window.location.hash.replace(/^#/, '') || '/';

export function usePath(): string {
  return useSyncExternalStore(subscribe, snapshot, () => '/');
}

export function navigate(path: string) {
  window.location.hash = path;
  window.scrollTo({ top: 0 });
}

export function match(path: string): { name: string; params: Record<string, string> } {
  if (path === '/' || path === '') return { name: 'home', params: {} };
  const g = /^\/games\/(\d+)$/.exec(path);
  if (g) return { name: 'play', params: { id: g[1]! } };
  if (path === '/games') return { name: 'games', params: {} };
  if (path === '/ranking') return { name: 'ranking', params: {} };
  if (path === '/missions') return { name: 'missions', params: {} };
  if (path === '/profile') return { name: 'profile', params: {} };
  if (path === '/login') return { name: 'login', params: {} };
  return { name: 'notfound', params: {} };
}
