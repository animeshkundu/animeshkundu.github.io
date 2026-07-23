/// <reference types="astro/client" />

declare const process: {
  readonly env: Readonly<Record<string, string | undefined>>;
};
