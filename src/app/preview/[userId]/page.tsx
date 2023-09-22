'use client';

import { useQuery } from 'convex/react';
import React, { useEffect, useState } from 'react';
import { api } from '../../../../convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import CustomButton from '@/app/[components]/CustomButton';
import { useRouter } from 'next/navigation';
import SocialLinksDetail from '@/app/[components]/SocialLinksDetail';
import { toast } from 'react-toastify';

type Props = {};

const PreviewPage = (props: { params: { userId: string } }) => {
  const { userId } = props.params;
  const profile = useQuery(api.profile.getProfileByUserId, {
    userId,
  });

  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const handleCopyLink = () => {
    if (typeof window === undefined) return;
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied!');
  };

  const __renderNoProfileFound = () => (
    <div className="w-full h-full flex items-center justify-center">
      No Profile Found!
    </div>
  );

  const __renderProfile = () => (
    <>
      {user?.id === profile?.userId && (
        <div className="h-20 w-full bg-white border rounded-md shadow-md">
          <div className="px-3 h-full flex items-center justify-between ">
            <CustomButton
              text="Back to Editor"
              className="text-tertiary border-2 border-tertiary rounded-md font-semibold"
              clickHandler={() => router.push('/')}
            />
            <CustomButton
              text="Share Link"
              className="text-white bg-tertiary rounded-md font-semibold"
              clickHandler={handleCopyLink}
            />
          </div>
        </div>
      )}
      <div className="w-full flex-1 flex flex-col items-center justify-center">
        <div className="w-[95%] md:w-[400px] 2xl:w-[500px] md:p-2 bg-white border rounded-xl shadow-md">
          <SocialLinksDetail userId={userId} />
        </div>
      </div>
    </>
  );

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  });

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center p-4 text-black">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : !profile ? (
        __renderNoProfileFound()
      ) : (
        __renderProfile()
      )}
    </div>
  );
};

export default PreviewPage;
