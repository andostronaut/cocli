export async function spawn(name: string, args: string[]): Promise<void> {
	const command = new Deno.Command(name, {
		args,
		stdout: 'inherit',
		stderr: 'inherit',
	})
	const child = command.spawn()

	await child.status
}

import type { TPromisedCommonRecord } from '../types.ts'

export async function spawnPiped(
	name: string,
	args: string[],
): TPromisedCommonRecord {
	const command = new Deno.Command(name, {
		args,
		stdout: 'piped',
		stderr: 'piped',
	})
	const child = command.spawn()

	await child.status

	const { stdout: stdoutOutput, stderr: stderrOutput } = await child.output()

	const decoder = new TextDecoder()

	const stdout = decoder.decode(stdoutOutput)
	const stderr = decoder.decode(stderrOutput)

	return { stdout, stderr }
}
