import { useSyncExternalStore } from "react";

// localStorage-backed list store (SPEC.md §5): seeded from mock data on first load, survives refresh.
// The server snapshot is always the seed, so hydration never mismatches.
export function createPersistentStore<T>(storageKey: string, seed: T[]) {
  const listeners = new Set<() => void>();
  let cache: T[] | null = null;

  function read(): T[] {
    if (cache) return cache;
    try {
      const raw = window.localStorage.getItem(storageKey);
      cache = raw ? (JSON.parse(raw) as T[]) : seed;
    } catch {
      cache = seed;
    }
    return cache;
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  function update(fn: (items: T[]) => T[]) {
    cache = fn(read());
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(cache));
    } catch {
      // Storage unavailable (private mode): state still lives in memory for this session.
    }
    listeners.forEach((l) => l());
  }

  function useItems() {
    return useSyncExternalStore(subscribe, read, () => seed);
  }

  return { update, useItems };
}

const subscribeNoop = () => () => {};

// True only after hydration: lets client-only data (localStorage) decide what to render without a server/client mismatch.
export function useHydrated() {
  return useSyncExternalStore(subscribeNoop, () => true, () => false);
}
