import { Input, Select } from './deps.ts'

async function promptType() {
  return await Select.prompt({
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
}

async function promptCommit() {
  return await Input.prompt({
    message: 'Insert commit message',
    validate: (value: string) => {
      if (value === '') return false
      return true
    },
  })
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log('Cocli - v0.1.0 🌱🚀')
  console.log('exit using ctrl/cmd + c, or exit, type help for more info')

  const type = await promptType()
  const commit = await promptCommit()
  console.log({ type, commit })
}
