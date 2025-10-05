export type TCommonRecord = Record<string, string>
export type TPromisedCommonRecord = Promise<Record<string, string>>

export type TCliError = {
	message?: string
	stack?: string
}

export type TGitCommit = {
	commit: string
}

export type TLogType = 'info' | 'success' | 'error'

export type TLog = {
	type?: TLogType
	msg: string
	isConsole?: boolean
	newLine?: boolean
}

export type TGitStaged = 'modified' | 'untracked'

export type TBranchStrategy = 'current' | 'new'

export type TGitCheckoutNew = {
	name: string
}
