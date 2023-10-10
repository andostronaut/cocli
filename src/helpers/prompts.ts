import { Select, Input, Confirm } from '../../deps.ts'

export async function typePrompt() {
  return await Select.prompt({
    message: 'Choose commit type',
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

export async function commitPrompt() {
  return await Input.prompt({
    message: 'Insert commit message',
    validate: (value: string) => {
      if (value === '') return false
      return true
    },
  })
}

export async function stagedPrompt(type: TGitStaged) {
  return await Confirm.prompt({
    message: `No changes added to commit, would you like to add ${type} files ?`,
    default: true,
  })
}
