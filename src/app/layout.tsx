'use client';

import './globals.css';
import 'cropperjs/dist/cropper.css';
import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import ConvexClientProvider from './[providers]/ConvexClientProvider';
import HomeNavbar from './[components]/HomeNavbar';
import SocialLinksScreen from './[components]/SocialLinksScreen';
import AuthenticationProvider from './[providers]/AuthenticationProvider';
import PopupProvider from './[providers]/PopupProvider';

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
    else setHomepageNavItem('links');
  }, [pathname]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>
          <PopupProvider>
            {children}
            {homepageNavItem && (
              <AuthenticationProvider>
                <div className="w-screen h-screen p-4 flex flex-col gap-4">
                  <HomeNavbar
                    navItem={homepageNavItem}
                    setNavItem={setHomepageNavItem}
                  />
                  <div className="h-full w-full flex gap-5 overflow-hidden">
                    <SocialLinksScreen />
                    <div className="flex-1 px-10 pb-5 pt-10 2xl:px-16 bg-white border rounded-md shadow-md">
                      {homepageNavItem === 'links' ? links : profile}
                    </div>
                  </div>
                </div>
              </AuthenticationProvider>
            )}
          </PopupProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
