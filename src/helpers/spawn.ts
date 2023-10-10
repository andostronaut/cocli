export async function spawn(name: string, args: string[]): Promise<void> {
  const command = new Deno.Command(name, {
    args,
    stdout: 'inherit',
    stderr: 'inherit',
  })
  const child = command.spawn()
  await child.status
}

export async function spawnPiped(
  name: string,
  args: string[]
): Promise<string> {
  const command = new Deno.Command(name, {
    args,
    stdout: 'piped',
    stderr: 'inherit',
  })
  const child = command.spawn()
  await child.status
  const { stdout } = await child.output()
  const decoder = new TextDecoder()
  return decoder.decode(stdout)
}
