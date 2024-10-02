'use client'
import { type LucideIcon } from 'lucide-react'

export interface DefaultValueOption {
  payload?: unknown
  label: string
  value: string
  icon?: LucideIcon
  avatar?: React.ReactNode
  iconProps?: {
    size?: number
    fill?: string
    color?: string
    strokeWidth?: number
    className?: string
  }
  color?: string
  info?: string
}

export type SortableKeys = 'label' | 'value'
