'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { fadeUp, inViewConfig } from '@/lib/animations'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  label?: string
  title: string
  description?: string
  centered?: boolean
  className?: string
}

export function SectionHeading({
  label,
  title,
  description,
  centered = false,
  className,
}: SectionHeadingProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, inViewConfig)

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className={cn(centered && 'text-center', className)}
    >
      {label && (
        <motion.span
          variants={fadeUp}
          className="inline-block text-xs font-semibold tracking-[0.15em] uppercase text-[#00D4FF] mb-3"
        >
          {label}
        </motion.span>
      )}
      <motion.h2
        variants={fadeUp}
        className="font-poppins font-bold text-display-md md:text-display-lg text-[#F0F4FF] leading-tight mb-4"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeUp}
          className={cn(
            'text-body-lg text-[#6B7FA3]',
            centered && 'max-w-2xl mx-auto'
          )}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}

