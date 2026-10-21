// Adapted from open-intelligent-ui/src/lib/devtools.ts (MIT; see notices).
// This must load before react-lang: its automatic widget covers mobile chat.
// OpenUIDevtools enabled={false} does not suppress its separate auto-mount.
if (process.env.NODE_ENV === "development") {
  (globalThis as Record<symbol, unknown>)[Symbol.for("openui.devtools.autoMount")] = true;
}

export {};
