import { ChevronRight } from 'lucide-react';
import React from 'react';
import { SocialIcon } from 'react-social-icons';
import { Doc } from '../../../convex/_generated/dataModel';
import { getColorByPlatform } from '../[utils]/helpers';
import { Platform } from '../[utils]/types';

type Props = {
  link: Doc<'link'>;
};

const SocialLinks = ({ link }: Props) => {
  return (
    <div className="w-[80%] mb-4 mx-auto">
      <div
        className="group hover:opacity-90 flex items-center justify-between pr-4 rounded-xl cursor-pointer"
        style={{
          backgroundColor: getColorByPlatform(link.platform as Platform),
        }}
      >
        <div className="flex items-center">
          <SocialIcon as="div" url={link.url} bgColor="transparent" />
          <span>{link.platform}</span>
        </div>
        <ChevronRight className="group-hover:translate-x-2 duration-200 transform" />
      </div>
    </div>
  );
};

export default SocialLinks;
