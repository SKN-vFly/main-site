'use client'
import { createContext, useState, Dispatch } from 'react'
import { BlogComponent } from './BlogComponent'
import { Blog } from '@/payload-types'

interface BlogDisplayProps {
  posts: Blog[]
  readMore: string
}

export interface BlogClickedContextType {
  allowInteraction: boolean
  setAllowInteraction: Dispatch<React.SetStateAction<boolean>>
}

export const BlogClickedContext = createContext<BlogClickedContextType>({
  allowInteraction: false,
  setAllowInteraction: () => {},
})

export const BlogDisplay = ({ posts, readMore }: BlogDisplayProps) => {
  const [allowInteraction, setAllowInteraction] = useState(true)
  return (
    <BlogClickedContext.Provider value={{ allowInteraction, setAllowInteraction }}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post: Blog) => (
          <BlogComponent key={post.id} post={post} readMore={readMore} />
        ))}
      </div>
    </BlogClickedContext.Provider>
  )
}
