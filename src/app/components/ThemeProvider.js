/* 'use client';

import { ThemeProvider } from 'next-themes';
import { useState, useEffect } from 'react';

export default function ThemeClientProvider({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Optional: show nothing or a fallback (like <div className="bg-white"></div>)
    return null;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange={true}
    >
      {children}
    </ThemeProvider>
  );
}
 */