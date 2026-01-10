import confetti from "canvas-confetti";

export const shootConfetti = () => {
  confetti({
    particleCount: 120,
    spread: 70,
    origin: { y: 0.6 }
  });
};
