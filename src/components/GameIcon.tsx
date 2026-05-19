'use client'

import type { FC, SVGProps } from 'react'

type Props = {
  icon: FC
  size?: number
  color?: string
  className?: string
}

export default function GameIcon({ icon: Icon, size = 34, color = '#c9a84c', className }: Props) {
  const Comp = Icon as FC<SVGProps<SVGSVGElement>>
  return <Comp width={size} height={size} fill={color} className={className} />
}
