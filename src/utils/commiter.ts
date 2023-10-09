import { intro, outro, cancel, group, confirm, lightGreen } from '../../deps.ts'

import { type, commit } from './prompts.ts'
import { handleCliError, CliError } from '../helpers/cli-errror.ts'
import { log } from '../helpers/log.ts'
import {
  isTreeClean,
  gitAdd,
  gitStatus,
  gitCommit,
  isGitRepository,
} from '../helpers/git.ts'

export const commiter = async () => {
  intro(lightGreen('Cocli - v0.1.0 🌱🚀'))

  isGitRepository()

  await isTreeClean()

  const values = await group(
    {
      type: () => type(),
      commit: () => commit(),
    },
    {
      onCancel: () => {
        cancel('Operation canceled')
        Deno.exit(0)
      },
    }
  )

  try {
    const commit = `${values.type}: ${values.commit}`

    const { stdoutStatus, stderrStatus } = await gitStatus()

    if (stderrStatus) throw new CliError(`An error occured: ${stderrStatus}`)

    if (
      stdoutStatus.includes('no changes added to commit') ||
      stdoutStatus.includes(
        'nothing added to commit but untracked files present'
      )
    ) {
      const type = stdoutStatus.includes('no changes added to commit')
        ? 'modified'
        : 'untracked'
      const addStagedFiles = await confirm({
        message: `No changes added to commit, would you like to add ${type} files ?`,
        initialValue: true,
      })

      if (addStagedFiles) {
        const { stderrAdd } = await gitAdd()

        if (stderrAdd) throw new CliError(`An error occured: ${stderrAdd}`)

        const { stderrCommit } = await gitCommit({ commit: commit.trim() })

        if (stderrCommit)
          throw new CliError(`An error occured: ${stderrCommit}`)

        outro(`
        You're all set 🎉

        use "git push" to publish your local commits
      `)
      }

      return
    }

    const { stderrCommit } = await gitCommit({ commit: commit.trim() })

    if (stderrCommit) throw new CliError(`An error occured: ${stderrCommit}`)

    outro(`
    You're all set 🎉

    use "git push" to publish your local commits
  `)
  } catch (err) {
    log({ type: 'error', msg: err.message })
    handleCliError(err)
    Deno.exit(1)
  }
}
