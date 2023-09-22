import React from 'react';
import SocialLinks from './SocialLinks';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';

type Props = {
  userId: string;
};

const SocialLinksDetail = ({ userId }: Props) => {
  const profile = useQuery(api.profile.getProfileByUserId, {
    userId,
  });

  const links = useQuery(api.link.getLinksByUserId, {
    userId,
  });
  return (
    <div className="w-full h-full overflow-auto custom-scrollbar  p-6">
      <div className="flex flex-col items-center gap-2 text-black">
        <div className="relative mx-auto mb-2 w-24 h-24 rounded-full overflow-hidden">
          <Image alt="" src={profile?.imageUrl ?? ''} fill objectFit="cover" />
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
  );
};

export default SocialLinksDetail;
