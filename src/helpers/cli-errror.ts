import { dim } from '../../deps.ts'
import { log } from './log.ts'

export class CliError extends Error {}

const indent = ' '.repeat(4)

export function handleCliError(error: { message?: string; stack?: string }) {
  if (error instanceof Error && !(error instanceof CliError)) {
    if (error.stack) {
      log({
        type: 'error',
        msg: error.stack.split('\n').slice(1).join('\n'),
      })
    }
    log({
      type: 'error',
      msg: `\n${indent}${dim('Cocli - v0.1.0 🌱🚀')}`,
    })
    log({
      type: 'error',
      msg: `\n${indent}Please open a Bug report with the information above:`,
    })
    log({
      type: 'error',
      msg: `${indent}https://github.com/iamando/cocli/issues/new`,
    })
  }
}
