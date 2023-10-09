import { green, yellow, promisify, exec, access, resolve } from '../../deps.ts'

import { CliError } from './cli-errror.ts'

const execa = promisify(exec)

export const gitStatus = async () => {
  const { stdout: stdoutStatus, stderr: stderrStatus } = await execa(
    'git status'
  )
  return { stdoutStatus, stderrStatus }
}

export const gitAdd = async () => {
  const { stdout: stdoutAdd, stderr: stderrAdd } = await execa('git add .')
  return { stdoutAdd, stderrAdd }
}

export const gitCommit = async ({ commit }: { commit: string }) => {
  const { stdout: stdoutCommit, stderr: stderrCommit } = await execa(
    `git commit -m "${commit}"`
  )
  return { stdoutCommit, stderrCommit }
}

export const isTreeClean = async () => {
  const { stdoutStatus, stderrStatus } = await gitStatus()
  if (stderrStatus) throw new CliError(`An error occured: ${stderrStatus}`)
  if (stdoutStatus.includes('nothing to commit, working tree clean')) {
    console.log(green('Nothing to commit, working tree clean 🧹'))
    Deno.exit(1)
  }
}

export const isGitRepository = () => {
  const dir = resolve('.git')
  access(dir, err => {
    if (err && err.code === 'ENOENT') {
      console.log(yellow('Not a git repository 😢'))
      Deno.exit(1)
    }
  })
}
