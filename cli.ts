import { green, parseFlags, yellow } from './deps.ts'
import {
	gitAdd,
	gitCheckoutNew,
	gitCommit,
	gitStatus,
	isGitRepository,
	isTreeClean,
} from './src/helpers/git.ts'
import { log } from './src/helpers/log.ts'
import { CliError } from './src/helpers/error.ts'
import {
	branchNamePrompt,
	branchStrategyPrompt,
	commitPrompt,
	stagedPrompt,
	typePrompt,
} from './src/helpers/prompts.ts'
import { BRANCH_STRATEGIES, CLI_VERSION } from './src/constants.ts'

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
	const { flags } = parseFlags(Deno.args)

	if (flags.version) {
		console.log(CLI_VERSION)
		Deno.exit()
	}

	console.log(green('-'.repeat(50)))
	console.log()
	console.log(`Cocli - ${CLI_VERSION} 🌱🚀`)
	console.log('Press Ctrl/Cmd + C, type help for more info')
	console.log()
	console.log(green('-'.repeat(50)))

	await isGitRepository()

	await isTreeClean()

	const branchStrategy = await branchStrategyPrompt()
	if (branchStrategy === BRANCH_STRATEGIES.NEW) {
		const newBranchName = await branchNamePrompt()
		const { stderr } = await gitCheckoutNew({ name: newBranchName.trim() })
		if (stderr) {
			throw new CliError(`An error occured: ${stderr}`)
		}
	}

	const typeVal = await typePrompt()
	const commitVal = await commitPrompt()

	try {
		const commit = `${typeVal}: ${commitVal}`

		const { stdoutStatus, stderrStatus } = await gitStatus()

		if (stderrStatus) throw new CliError(`An error occured: ${stderrStatus}`)

		if (
			stdoutStatus.includes('no changes added to commit') ||
			stdoutStatus.includes(
				'nothing added to commit but untracked files present',
			)
		) {
			const type = stdoutStatus.includes('no changes added to commit')
				? 'modified'
				: 'untracked'
			const addStagedFiles = await stagedPrompt(type)

			if (addStagedFiles) {
				const { stderrAdd } = await gitAdd()

				if (stderrAdd) throw new CliError(`An error occured: ${stderrAdd}`)

				const { stderrCommit } = await gitCommit({ commit: commit.trim() })

				if (stderrCommit) {
					throw new CliError(`An error occured: ${stderrCommit}`)
				}

				console.log(green('-'.repeat(50)))
				console.log()
				console.log(green("You're all set 🎉"))
				console.log(yellow('use "git push" to publish your local commits 🚀'))
			}

			Deno.exit(1)
		}

		const { stderrCommit } = await gitCommit({ commit: commit.trim() })

		if (stderrCommit) throw new CliError(`An error occured: ${stderrCommit}`)

		console.log(green('-'.repeat(50)))
		console.log()
		console.log(green("You're all set 🎉"))
		console.log(yellow('use "git push" to publish your local commits 🚀'))
	} catch (err) {
		log({
			type: 'error',
			msg: err instanceof Error ? err.message : 'An unknown error occurred',
		})
		Deno.exit(1)
	}
}
