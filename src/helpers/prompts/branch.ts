import { Input, Select } from '../../../deps.ts'
import { BRANCH_STRATEGIES, COMMIT_TYPES } from '../../constants.ts'

export async function branchStrategyPrompt() {
	return await Select.prompt<
		| keyof typeof BRANCH_STRATEGIES
		| typeof BRANCH_STRATEGIES[keyof typeof BRANCH_STRATEGIES]
	>({
		message: 'Where do you want to commit?',
		options: [
			{ name: 'Current branch', value: BRANCH_STRATEGIES.CURRENT },
			{
				name: 'Create and switch to a new branch',
				value: BRANCH_STRATEGIES.NEW,
			},
		],
	})
}

export async function branchNamePrompt() {
	return await Input.prompt({
		message: 'Enter new branch name',
		validate: (value: string) => value.trim().length > 0,
	})
}

export async function branchTypePrompt() {
	return await Select.prompt<
		typeof COMMIT_TYPES[keyof typeof COMMIT_TYPES]
	>({
		message: 'Choose branch type',
		options: [
			{ name: 'feat', value: COMMIT_TYPES.FEAT },
			{ name: 'fix', value: COMMIT_TYPES.FIX },
			{ name: 'hotfix', value: COMMIT_TYPES.HOTFIX },
			{ name: 'chore', value: COMMIT_TYPES.CHORE },
			{ name: 'design', value: COMMIT_TYPES.DESIGN },
			{ name: 'experiment', value: COMMIT_TYPES.EXPERIMENT },
			{ name: 'docs', value: COMMIT_TYPES.DOCS },
			{ name: 'refactor', value: COMMIT_TYPES.REFACTOR },
			{ name: 'ci', value: COMMIT_TYPES.CI },
			{ name: 'infra', value: COMMIT_TYPES.INFRA },
			{ name: 'test', value: COMMIT_TYPES.TEST },
		],
	})
}
