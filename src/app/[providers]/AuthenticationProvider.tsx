'use client';

import React from 'react';
import { useConvexAuth } from 'convex/react';
import { useRouter } from 'next/navigation';
import { MoonLoader } from 'react-spinners';

type Props = {
  children: React.ReactNode;
};

const AuthenticationProvider = ({ children }: Props) => {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const router = useRouter();

  if (!isLoading && isAuthenticated) return children;

  if (!isLoading && !isAuthenticated) router.push('/landing-page');

  return (
    <div className="w-screen h-screen z-50 bg-black text-white grid place-items-center">
      <MoonLoader size={100} color="#fff" />
    </div>
  );
};

export default AuthenticationProvider;
