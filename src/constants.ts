import pkg from '../deno.json' with { type: 'json' }

export const CLI_VERSION = `v${pkg.version}`

export const BRANCH_STRATEGIES = {
	CURRENT: 'current',
	NEW: 'new',
} as const
export const COMMIT_TYPES = {
	FEAT: 'feat',
	FIX: 'fix',
	HOTFIX: 'hotfix',
	CHORE: 'chore',
	DESIGN: 'design',
	EXPERIMENT: 'experiment',
	DOCS: 'docs',
	REFACTOR: 'refactor',
	CI: 'ci',
	INFRA: 'infra',
	TEST: 'test',
} as const
