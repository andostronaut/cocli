import { green, yellow, promisify, exec } from '../../deps.ts'

import { CliError } from './error.ts'

const execa = promisify(exec)

export async function gitStatus() {
  const { stdout: stdoutStatus, stderr: stderrStatus }: TCommonRecord =
    await execa('git status')
  return { stdoutStatus, stderrStatus }
}

export async function gitAdd() {
  const { stdout: stdoutAdd, stderr: stderrAdd }: TCommonRecord = await execa(
    'git add .'
  )
  return { stdoutAdd, stderrAdd }
}

export async function gitCommit({ commit }: TGitCommit) {
  const { stdout: stdoutCommit, stderr: stderrCommit }: TCommonRecord =
    await execa(`git commit -m "${commit}"`)
  return { stdoutCommit, stderrCommit }
}

export async function isTreeClean() {
  const { stdoutStatus, stderrStatus }: TCommonRecord = await gitStatus()
  if (stderrStatus) throw new CliError(`An error occured: ${stderrStatus}`)
  if (stdoutStatus.includes('nothing to commit, working tree clean')) {
    console.log(green('Nothing to commit, working tree clean 🧹'))
    Deno.exit(1)
  }
}

export async function isGitRepository() {
  const dir: string = await Deno.realPath('.git')
  try {
    await Deno.stat(dir)
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      console.log(yellow('Not a git repository 😢'))
      Deno.exit(1)
    } else {
      console.error(err)
      Deno.exit(1)
    }
  }
}
