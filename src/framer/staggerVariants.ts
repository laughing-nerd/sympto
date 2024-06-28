export const staggerVariants = {
  offscreen: {
    opacity: 0,
    y: 100,
  },
  onscreen: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      delay: 0.05 * index,
    },
  }),
};
