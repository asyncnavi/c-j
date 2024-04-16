import { ForgotPasswordParams, LoginParams, RegisterParams } from './auth'

export type { RegisterParams, LoginParams, ForgotPasswordParams }
export type ListRecords<T> = { records: T[]; total_count: number }
