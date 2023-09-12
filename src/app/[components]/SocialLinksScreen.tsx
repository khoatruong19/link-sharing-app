import Image from 'next/image';
import React from 'react';
import SocialLinks from './SocialLinks';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useUser } from '@clerk/nextjs';

type Props = {};

const SocialLinksScreen = (props: Props) => {
  const { user } = useUser();
  const profile = useQuery(api.profile.getProfileByUserId, {
    userId: user!.id,
  });

  const links = useQuery(api.link.getLinksByUserId, {
    userId: user!.id,
  });

  return (
    <div className="w-[40%] h-full overflow-hidden bg-white border shadow-md rounded-md grid place-items-center p-8 xl:p-20 2xl:p-24">
      <div className="w-[90%] 3xl:w-[80%] h-full border-2 border-tertiary rounded-2xl overflow-hidden">
        <div className="w-full h-full overflow-auto custom-scrollbar  p-6">
          <div className="flex flex-col items-center gap-2 text-black">
            <div className="relative mx-auto mb-2 w-24 h-24 rounded-full overflow-hidden">
              <Image
                alt=""
                src={profile?.imageUrl ?? ''}
                fill
                objectFit="cover"
              />
            </div>
            <h2 className="text-xl font-semibold">
              {profile?.firstName} {profile?.lastName}
            </h2>
            <p className="text-sm text-gray-500">{profile?.email}</p>
          </div>

          <div className="mt-10">
            {links &&
              links.map((link) => <SocialLinks key={link._id} link={link} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialLinksScreen;
