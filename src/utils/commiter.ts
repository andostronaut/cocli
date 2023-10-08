import * as p from '@clack/prompts'
import { lightGreen } from 'kolorist'
import dedent from 'dedent'

import { CANCELED_OP_MSG, VERSION } from './constants'
import { type, commit } from './prompts'
import { handleCliError, CliError } from '../helpers/cli-errror'
import { log } from '../helpers/log'
import {
  isTreeClean,
  gitAdd,
  gitStatus,
  gitCommit,
  isGitRepository,
} from '../helpers/git'

export const commiter = async () => {
  p.intro(lightGreen(`Cocli - v${VERSION} 🌱🚀`))

  isGitRepository()

  await isTreeClean()

  const values = await p.group(
    {
      type: () => type(),
      commit: () => commit(),
    },
    {
      onCancel: () => {
        p.cancel(CANCELED_OP_MSG)
        process.exit(0)
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
      const addStagedFiles = await p.confirm({
        message: `No changes added to commit, would you like to add ${type} files ?`,
        initialValue: true,
      })

      if (addStagedFiles) {
        const { stderrAdd } = await gitAdd()

        if (stderrAdd) throw new CliError(`An error occured: ${stderrAdd}`)

        const { stderrCommit } = await gitCommit({ commit: commit.trim() })

        if (stderrCommit)
          throw new CliError(`An error occured: ${stderrCommit}`)

        p.outro(dedent`
        You're all set 🎉

        use "git push" to publish your local commits
      `)
      }

      return
    }

    const { stderrCommit } = await gitCommit({ commit: commit.trim() })

    if (stderrCommit) throw new CliError(`An error occured: ${stderrCommit}`)

    p.outro(dedent`
    You're all set 🎉

    use "git push" to publish your local commits
  `)
  } catch (err: any) {
    log({ type: 'error', msg: err.message })
    handleCliError(err)
    process.exit(1)
  }
}
