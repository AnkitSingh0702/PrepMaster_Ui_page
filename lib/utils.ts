import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {
  Atom,
  FlaskConical,
  Calculator,
  Zap,
  Target,
  Compass,
  Gauge,
  Waves,
  Magnet,
  Battery,
  Sun,
  Eye,
  Microscope,
  Beaker,
  TestTube,
  Dna,
  MicroscopeIcon as Molecule,
  Triangle,
  Circle,
  Square,
  ActivityIcon as Function,
  Infinity,
  PieChart,
} from "lucide-react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const icons = [
  Atom,
  FlaskConical,
  Calculator,
  Zap,
  Target,
  Compass,
  Gauge,
  Waves,
  Magnet,
  Battery,
  Sun,
  Eye,
  Microscope,
  Beaker,
  TestTube,
  Dna,
  Molecule,
  Triangle,
  Circle,
  Square,
  Function,
  Infinity,
  PieChart,
]

export function getRandomIcon(seed: string) {
 
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash 
  }

  const index = Math.abs(hash) % icons.length
  return icons[index]
}
