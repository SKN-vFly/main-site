import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

export function MediaHeader(props: { text: string }) {
  const { text } = props
  return (
    <Card className="w-full max-w-4xl mx-auto my-8">
      <CardContent className="flex flex-col items-center justify-center min-h-[40vh] p-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          {text}
        </h1>
        <Image src="/logo.svg" alt="Logo vFly" width={350} height={350} className="mt-6" />
      </CardContent>
    </Card>
  )
}
