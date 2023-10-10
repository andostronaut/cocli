import { Input, Select, Confirm } from './deps.ts'
import {
  isGitRepository,
  isTreeClean,
  gitAdd,
  gitCommit,
  gitStatus,
} from './src/helpers/git.ts'
import { log } from './src/helpers/log.ts'
import { CliError } from './src/helpers/error.ts'

async function prompts() {
  const type = await Select.prompt({
    message: 'Choose commit type',
    default: 'feat',
    options: [
      {
        name: 'Feat - For new features (e.g., feat: implement --cache-to feature to export cache)',
        value: 'feat',
      },
      {
        name: 'Fix - For improvements and bugfixes that do not introduce a feature (e.g., fix: improve error message)',
        value: 'fix',
      },
      {
        name: 'Hotfix - For improvements and bugfixes that do not introduce a feature, directly in prodution mode (e.g., fix: improve success message)',
        value: 'hotfix',
      },
      {
        name: 'Chore - General things that should be excluded (e.g., chore: clean up X)',
        value: 'chore',
      },
      {
        name: 'Design - For design changes only (e.g., design: use rounded button)',
        value: 'design',
      },
      {
        name: 'Experiment - General things that should be in experiment (e.g., experiment: implement new query system in X)',
        value: 'experiment',
      },
      {
        name: 'Docs - For documentation changes only (e.g., docs: fix typo in X)',
        value: 'docs',
      },
      {
        name: 'Refact - General things that should be restructured but not changing the orginal functionality (e.g., refact: move X to new file utils)',
        value: 'refact',
      },
      {
        name: 'CI - For internal CI specific changes (e.g., ci: enable X for tests)',
        value: 'ci',
      },
      {
        name: 'Infra - For infrastructure changes (e.g., infra: Enable cloudfront for X)',
        value: 'infra',
      },
      {
        name: 'Test - For changes to tests only (e.g., test: check if X does Y)',
        value: 'test',
      },
    ],
  })

  const commit = await Input.prompt({
    message: 'Insert commit message',
    validate: (value: string) => {
      if (value === '') return false
      return true
    },
  })

  return { type, commit }
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log('Cocli - v0.1.0 🌱🚀')
  console.log('exit using ctrl/cmd + c, type help for more info')

  isGitRepository()

  await isTreeClean()

  const values = await prompts()

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
      const addStagedFiles = await Confirm.prompt({
        message: `No changes added to commit, would you like to add ${type} files ?`,
        default: true,
      })

      if (addStagedFiles) {
        const { stderrAdd } = await gitAdd()

        if (stderrAdd) throw new CliError(`An error occured: ${stderrAdd}`)

        const { stderrCommit } = await gitCommit({ commit: commit.trim() })

        if (stderrCommit)
          throw new CliError(`An error occured: ${stderrCommit}`)

        console.log(`
        You're all set 🎉

        use "git push" to publish your local commits
      `)
      }

      Deno.exit(1)
    }

    const { stderrCommit } = await gitCommit({ commit: commit.trim() })

    if (stderrCommit) throw new CliError(`An error occured: ${stderrCommit}`)

    console.log(`
    You're all set 🎉

    use "git push" to publish your local commits
  `)
  } catch (err) {
    log({ type: 'error', msg: err.message })
    Deno.exit(1)
  }
}
