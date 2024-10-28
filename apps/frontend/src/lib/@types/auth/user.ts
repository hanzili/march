/**
 * User type.
 */

export interface AuthAccount {
  email?: string
  isVerified: boolean
}

export type AccountProvider = "local" | "google" | "github"

export type IntegrationType =
  | "linear"
  | "googleCalendar"
  | "gmail"
  | "github"
  | "notion"

export interface User {
  fullName: string
  username: string
  avatar: string
  timezone: string
  userName: string
  accounts: Partial<Record<AccountProvider, AuthAccount>>
  integrations: Partial<Record<IntegrationType, { connected: boolean }>>
}

export const isIntegrationConnected = (
  user: User | null,
  integrationType: IntegrationType
): boolean => {
  return user?.integrations?.[integrationType]?.connected === true
}
