'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { RiMoonLine, RiSunLine } from 'react-icons/ri';

const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="rounded-lg bg-gray-200 dark:bg-green-950 text-gray-800 dark:text-gray-200 transition-colors"
      aria-label="Toggle theme"
    >
       {theme === 'dark' ? (
          <RiMoonLine size={30} />
        ) : (
          <RiSunLine size={30} color="white" />
        )}
    </button>
  );
};

export default ThemeChanger;