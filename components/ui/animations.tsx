"use client"

import React, { createContext, useContext } from "react"
import { motion, HTMLMotionProps, Variants } from "motion/react"

// Context to check if a component is inside a StaggerContainer
const StaggerContext = createContext<boolean>(false)

export interface FadeInProps extends HTMLMotionProps<"div"> {
  delay?: number
  duration?: number
  y?: number
  x?: number
  once?: boolean
  margin?: string
}

/**
 * FadeIn
 * Basic fade and slide up animation. Adjust delay, duration, and translation values.
 */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  y = 30,
  x = 0,
  once = true,
  margin = "-50px",
  className,
  ...props
}: FadeInProps) {
  // If we are inside a StaggerContainer, we let StaggerItem handle the animation
  const isStaggered = useContext(StaggerContext)

  if (isStaggered) {
    return <div className={className}>{children as React.ReactNode}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, margin }}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  staggerDelay?: number
  delayChildren?: number
  once?: boolean
  margin?: string
}

/**
 * StaggerContainer
 * Wraps multiple StaggerItems and controls their staggered entry.
 */
export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  delayChildren = 0,
  once = true,
  margin = "-50px",
  className,
  ...props
}: StaggerContainerProps) {
  const variants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delayChildren,
      },
    },
  }

  return (
    <StaggerContext.Provider value={true}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin }}
        variants={variants}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    </StaggerContext.Provider>
  )
}

export interface StaggerItemProps extends HTMLMotionProps<"div"> {
  duration?: number
  y?: number
  x?: number
}

/**
 * StaggerItem
 * Must be a direct child of StaggerContainer. Automatically inherits staggered timing.
 */
export function StaggerItem({
  children,
  duration = 0.6,
  y = 30,
  x = 0,
  className,
  ...props
}: StaggerItemProps) {
  const isStaggered = useContext(StaggerContext)

  const variants: Variants = {
    hidden: { opacity: 0, y, x },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration, ease: [0.21, 0.47, 0.32, 0.98] },
    },
  }

  // If used outside of StaggerContainer, gracefully fallback to a simple div
  // or a standard whileInView (though FadeIn should be used instead)
  if (!isStaggered) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={variants}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div variants={variants} className={className} {...props}>
      {children}
    </motion.div>
  )
}
