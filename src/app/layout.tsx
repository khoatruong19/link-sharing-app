'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import ConvexClientProvider from './[providers]/ConvexClientProvider';
import HomeNavbar from './[components]/HomeNavbar';
import LinksScreen from './[components]/LinksScreen';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
  links,
  profile,
}: {
  children: React.ReactNode;
  links: React.ReactNode;
  profile: React.ReactNode;
}) {
  const pathname = usePathname();
  const [homepageNavItem, setHomepageNavItem] = useState(() => {
    if (pathname.length > 1) return null;
    return 'links';
  });

  useEffect(() => {
    if (pathname.length > 1) setHomepageNavItem(null);
  }, [pathname]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>
          {children}
          {homepageNavItem && (
            <div className="w-screen h-screen p-4 flex flex-col gap-4">
              <HomeNavbar
                navItem={homepageNavItem}
                setNavItem={setHomepageNavItem}
              />
              <div className="h-full w-full flex gap-5">
                <LinksScreen />
                <div className="flex-1 bg-red-400">
                  {homepageNavItem === 'links' ? links : profile}
                </div>
              </div>
            </div>
          )}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
