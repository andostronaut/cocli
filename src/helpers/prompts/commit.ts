import { Confirm, Input, Select } from '../../../deps.ts'
import { COMMIT_TYPES } from '../../constants.ts'
import type { TGitStaged } from '../../types.ts'

export async function typePrompt() {
	return await Select.prompt<
		typeof COMMIT_TYPES[keyof typeof COMMIT_TYPES]
	>({
		message: 'Choose commit type',
		options: [
			{
				name:
					'Feat - For new features (e.g., feat: implement --cache-to feature to export cache)',
				value: COMMIT_TYPES.FEAT,
			},
			{
				name:
					'Fix - For improvements and bugfixes that do not introduce a feature (e.g., fix: improve error message)',
				value: COMMIT_TYPES.FIX,
			},
			{
				name:
					'Hotfix - For improvements and bugfixes that do not introduce a feature, directly in production mode (e.g., fix: improve success message)',
				value: COMMIT_TYPES.HOTFIX,
			},
			{
				name:
					'Chore - General things that should be excluded (e.g., chore: clean up X)',
				value: COMMIT_TYPES.CHORE,
			},
			{
				name:
					'Design - For design changes only (e.g., design: use rounded button)',
				value: COMMIT_TYPES.DESIGN,
			},
			{
				name:
					'Experiment - General things that should be in experiment (e.g., experiment: implement new query system in X)',
				value: COMMIT_TYPES.EXPERIMENT,
			},
			{
				name:
					'Docs - For documentation changes only (e.g., docs: fix typo in X)',
				value: COMMIT_TYPES.DOCS,
			},
			{
				name:
					'Refactor - General things that should be restructured but not changing the original functionality (e.g., refactor: move X to new file utils)',
				value: COMMIT_TYPES.REFACTOR,
			},
			{
				name:
					'CI - For internal CI specific changes (e.g., ci: enable X for tests)',
				value: COMMIT_TYPES.CI,
			},
			{
				name:
					'Infra - For infrastructure changes (e.g., infra: Enable cloudfront for X)',
				value: COMMIT_TYPES.INFRA,
			},
			{
				name:
					'Test - For changes to tests only (e.g., test: check if X does Y)',
				value: COMMIT_TYPES.TEST,
			},
		],
	})
}

export async function commitPrompt() {
	return await Input.prompt({
		message: 'Insert commit message',
		validate: (value: string) => {
			if (value === '') return false
			return true
		},
	})
}

export async function stagedPrompt(type: TGitStaged) {
	return await Confirm.prompt({
		message:
			`No changes added to commit, would you like to add ${type} files ?`,
		default: true,
	})
}
