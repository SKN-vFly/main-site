'use client'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Mail } from 'lucide-react'
import { Skeleton } from './ui/skeleton'

export function PersonalCard(params: {
  name: string
  email: string
  role: string
  imageSrc: string
  translations: {
    name: string
    email: string
    role: string
  }
}) {
  const [isHovered, setIsHovered] = useState(false)
  const { name, email, role } = params

  return (
    <div
      className="cursor-pointer h-full w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="w-full h-full relative transition-all duration-300 hover:shadow-lg overflow-hidden p-0">
        <CardContent className="p-0 h-full relative">
          <div className="w-full h-full relative">
            <Skeleton className="absolute inset-0 w-full h-full rounded-t-lg pointer-events-none" />

            <div
              className={`absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-white transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Avatar className="w-16 h-16 mb-3 border-2 border-white">
                <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">
                  {name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold text-center mb-2">{name}</h3>
              <Badge variant="secondary" className="mb-3">
                {role}
              </Badge>
              <button
                onClick={() => window.open(`mailto:${email}`, '_blank')}
                className="text-sm text-white hover:text-blue-200 transition-colors flex items-center justify-center gap-2 p-2 rounded-md hover:bg-white/10 border border-white/20 hover:border-white/40"
              >
                <Mail className="h-4 w-4" />
                {email}
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
