"use client";

import { motion, type HTMLMotionProps, type Variants } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const revealViewport = { once: true, amount: 0.2 } as const;

export const revealContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE,
    },
  },
};

export function RevealGroup({ children, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      variants={revealContainer}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div variants={revealItem} {...props}>
      {children}
    </motion.div>
  );
}

export function RevealList({ children, ...props }: HTMLMotionProps<"ul">) {
  return (
    <motion.ul
      variants={revealContainer}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      {...props}
    >
      {children}
    </motion.ul>
  );
}

export function RevealListItem({
  children,
  ...props
}: HTMLMotionProps<"li">) {
  return (
    <motion.li variants={revealItem} {...props}>
      {children}
    </motion.li>
  );
}
