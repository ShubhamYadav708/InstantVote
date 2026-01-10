export const getRemainingTime = (expiresAt) => {
  const diff = new Date(expiresAt) - new Date();

  if (diff <= 0) return "Expired";

  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  return `${minutes}m ${seconds}s`;
};
