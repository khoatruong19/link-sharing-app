'use client';

import { useEffect } from 'react';
import Logo from '../[components]/Logo';
import { SignInButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useAction } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useUser } from '@clerk/nextjs';

type Props = {};

const LandingPage = (props: Props) => {
  const { user } = useUser();

  const router = useRouter();

  const checkProfileExist = useAction(api.profile.checkProfileExist);

  useEffect(() => {
    if (user) {
      checkProfileExist({
        email: user.primaryEmailAddress?.emailAddress ?? '',
        firstName: user.firstName ?? '',
        lastName: user.lastName ?? '',
        imageUrl: user.imageUrl,
        userId: user.id,
      });
      router.push('/');
    }
  }, [user]);

  return (
    <div className="flex flex-col p-8 w-screen h-screen">
      <Logo />

      <div className="flex flex-col gap-5 items-center justify-center text-tertiary flex-1 ">
        <div className="flex flex-col md:flex-row items-center gap-5">
          <h1 className="text-4xl 3xl:text-5xl text-center font-semibold max-w-[750px] hei">
            <span className="text-lime-600">Gather</span> your{' '}
            <span className="text-lime-600">Social Links</span> in a Single
            Place and <span className="text-lime-600">Share</span> it to all
            people
          </h1>
        </div>
        <SignInButton mode="modal" redirectUrl="/landing-page">
          <button className="py-2 px-5 border-2 border-tertiary text-tertiary font-semibold lg:text-lg rounded-md hover:bg-lime-700 hover:text-white shadow-md">
            Get Started
          </button>
        </SignInButton>
      </div>
    </div>
  );
};

export default LandingPage;
