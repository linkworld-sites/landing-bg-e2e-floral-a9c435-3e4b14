// Type-safe wrapper: re-exports funnel config values as string so TypeScript
// doesn't infer literal types (e.g. "" as "") that cause TS2367 in funnel.ts.
// The tsconfig paths entry redirects @/funnel-config here.
export const FUNNEL_COMPANY_ID: string = "3e4b1428-f199-4841-8d69-04bd63cdcc2d";
export const FUNNEL_API: string = "https://app.linkworld.ai";
export const FUNNEL_META_PIXEL: string = "";
export const FUNNEL_LINKEDIN_PIXEL: string = "";
export const FUNNEL_JURISDICTION: string = "";
