'use client'
import { useEffect, useState } from 'react'
import { SendHorizonalIcon } from 'lucide-react'

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  // Show button when page is scrolled upto given distance
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return (
    <div className="fixed right-5 bottom-5 z-50">
      {isVisible && (
        <div
          role="button"
          onClick={scrollToTop}
          className="bg-primary flex justify-center items-center h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
        >
          <SendHorizonalIcon className="h-8 w-8 -rotate-90 text-primary-foreground" />
        </div>
      )}
    </div>
  )
}
