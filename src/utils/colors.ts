/**
 * Generates a consistent gradient color pair for a wall based on its name
 * Uses a hash function to ensure same name always gets same colors
 */
export const getGradientForWall = (wallName: string, type: 'my' | 'shared' = 'my'): string => {
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < wallName.length; i++) {
    // eslint-disable-next-line no-bitwise
    hash = wallName.charCodeAt(i) + ((hash << 5) - hash);
  }

  const colorPairs =
    type === 'my'
      ? [
          ['#3b82f6', '#8b5cf6'], // blue to purple
          ['#06b6d4', '#3b82f6'], // cyan to blue
          ['#8b5cf6', '#ec4899'], // purple to pink
          ['#10b981', '#06b6d4'], // green to cyan
          ['#f59e0b', '#ef4444'], // amber to red
        ]
      : [
          ['#10b981', '#3b82f6'], // green to blue
          ['#06b6d4', '#8b5cf6'], // cyan to purple
          ['#14b8a6', '#10b981'], // teal to green
          ['#6366f1', '#8b5cf6'], // indigo to purple
          ['#f59e0b', '#10b981'], // amber to green
        ];

  const index = Math.abs(hash) % colorPairs.length;
  const [color1, color2] = colorPairs[index];

  return `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
};
