import React from 'react';
import SocialLinksDetail from './SocialLinksDetail';
import { useUser } from '@clerk/nextjs';

type Props = {};

const SocialLinksScreen = (props: Props) => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="w-[40%] h-full overflow-hidden bg-white border shadow-md rounded-md grid place-items-center p-8 xl:p-20 2xl:p-24">
      <div className="w-[90%] 3xl:w-[80%] h-full border-2 border-tertiary rounded-2xl overflow-hidden">
        <SocialLinksDetail userId={user.id} />
      </div>
    </div>
  );
};

export default SocialLinksScreen;
