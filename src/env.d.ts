/// <reference types="astro/client" />

// Allow importing YAML files as raw strings (parsed with js-yaml at build time).
declare module "*.yaml?raw" {
  const content: string;
  export default content;
}
