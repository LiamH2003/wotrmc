import type { LucideIcon } from 'lucide-react'

type Props = {
  icon: LucideIcon
  size?: number
  color?: string
  className?: string
}

export default function GameIcon({ icon: Icon, size = 34, color = '#c9a84c', className }: Props) {
  return <Icon width={size} height={size} color={color} strokeWidth={1.5} className={className} />
}
