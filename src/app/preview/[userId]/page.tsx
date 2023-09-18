'use client';

import { useQuery } from 'convex/react';
import React from 'react';
import { api } from '../../../../convex/_generated/api';

type Props = {};

const PreviewPage = (props: { params: { userId: string } }) => {
  const { userId } = props.params;
  const profile = useQuery(api.profile.getProfileByUserId, {
    userId,
  });

  const __renderNoProfileFound = () => (
    <div className="w-full h-full flex items-center justify-center">
      No Profile Found!
    </div>
  );

  const __renderProfile = () => (
    <div className="h-20 w-full bg-white border rounded-md shadow-md">
      {JSON.stringify(profile)}
    </div>
  );

  return (
    <div className="w-screen h-screen p-4 text-black">
      {!profile ? __renderNoProfileFound() : __renderProfile()}
    </div>
  );
};

export default PreviewPage;
