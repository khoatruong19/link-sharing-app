import { ChevronRight } from 'lucide-react';
import React from 'react';
import { SocialIcon } from 'react-social-icons';

type Props = {};

const SocialLinks = (props: Props) => {
  return (
    <div className="w-[80%] mb-4 mx-auto">
      <div className="group hover:opacity-90 flex items-center justify-between bg-blue-400 pr-4 rounded-xl cursor-pointer">
        <div className="flex items-center">
          <SocialIcon
            as="div"
            url="https://twitter.com"
            bgColor="transparent"
          />
          <span>Twitter</span>
        </div>
        <ChevronRight className="group-hover:translate-x-2 duration-200 transform" />
      </div>
    </div>
  );
};

export default SocialLinks;
