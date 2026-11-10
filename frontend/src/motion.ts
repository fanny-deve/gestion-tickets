import { Variants } from "motion/react";
export const ease = [0.22, 1, 0.36, 1] as const;
export const fadeUp: Variants = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: .42, ease } } };
export const stagger = { hidden: {}, show: { transition: { staggerChildren: .06 } } };
export const pop: Variants = { hidden: { opacity: 0, scale: .96 }, show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 360, damping: 26 } } };
