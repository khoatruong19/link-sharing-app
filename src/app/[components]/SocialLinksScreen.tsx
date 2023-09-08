import Image from 'next/image';
import React from 'react';
import SocialLinks from './SocialLinks';

type Props = {};

const SocialLinksScreen = (props: Props) => {
  return (
    <div className="w-[40%] h-full overflow-hidden bg-white border shadow-md rounded-md grid place-items-center p-8 xl:p-20 2xl:p-24">
      <div className="w-[90%] 3xl:w-[80%] h-full border-2 border-tertiary rounded-2xl overflow-hidden">
        <div className="w-full h-full overflow-auto custom-scrollbar  p-6">
          <div className="flex flex-col items-center gap-2 text-black">
            <Image
              alt=""
              src="https://avatars.githubusercontent.com/u/85026053?v=4"
              width={100}
              height={100}
              objectFit="cover"
              className="rounded-full mx-auto mb-2"
            />
            <h2 className="text-xl font-semibold">Dark Knight</h2>
            <p className="text-sm text-gray-500">khoa.truongthdk@gmail.com</p>
          </div>

          <div className="mt-10">
            <SocialLinks />
            <SocialLinks />
            <SocialLinks />
            <SocialLinks />
            <SocialLinks />
            <SocialLinks />
            <SocialLinks />
            <SocialLinks />
            <SocialLinks />
            <SocialLinks />
            <SocialLinks />
            <SocialLinks />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialLinksScreen;
