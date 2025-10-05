import pkg from '../deno.json' with { type: 'json' }

export const CLI_VERSION = `v${pkg.version}`
