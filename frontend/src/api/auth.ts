import { apiClient } from './client'
import type { AuthUser } from '@/types'

export interface RegisterPayload {
  username: string
  email: string
  password: string
}

export interface LoginPayload {
  email: string
  password: string
}

interface AuthResponse {
  user: AuthUser
}

export async function register(payload: RegisterPayload): Promise<AuthUser> {
  const { data } = await apiClient.post<AuthResponse>('/auth/register', payload)
  return data.user
}

export async function login(payload: LoginPayload): Promise<AuthUser> {
  const { data } = await apiClient.post<AuthResponse>('/auth/login', payload)
  return data.user
}

export async function getMe(): Promise<AuthUser> {
  const { data } = await apiClient.get<AuthUser>('/auth/me')
  return data
}

export async function logout(): Promise<void> {
  await apiClient.post('/auth/logout')
}
