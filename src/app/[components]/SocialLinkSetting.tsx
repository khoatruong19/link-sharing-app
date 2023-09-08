'use client';

import { Equal, Link } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import CustomButton from './CustomButton';
import PlatformsSelect from './PlatformsSelect';
import { PlatformItem, SocialLink } from '../[utils]/types';
import { PLATFORM_OPTIONS } from '../[utils]/constants';

type Props = {
  link: SocialLink;
  order: number;
  updateLink: (order: number, info: SocialLink) => void;
};

const SocialLinkSetting = ({ link, order, updateLink }: Props) => {
  const { url = '', ...rest } = link;

  const [platformSelected, setPlatformSelected] = useState<PlatformItem>(
    rest ?? PLATFORM_OPTIONS[0]
  );
  const [linkUrl, setLinkUrl] = useState(url);

  const urlInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!urlInputRef || !urlInputRef.current) return;
    urlInputRef.current.focus();
  }, [urlInputRef]);

  return (
    <div className="bg-primary px-3 py-5 rounded-md border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-500">
          <Equal className="opacity-50" />
          <span className="font-semibold text-lg">Link #{order}</span>
        </div>
        <CustomButton className="text-gray-500 font-medium" text="Remove" />
      </div>

      <div className="flex flex-col gap-1.5 mt-2.5">
        <h5 className="text-xs text-gray-500 font-medium">Platform</h5>
        <PlatformsSelect
          platformSelected={platformSelected}
          setPlatformSelected={setPlatformSelected}
        />
      </div>

      <div className="flex flex-col gap-1.5 mt-2.5">
        <h5 className="text-xs text-gray-500 font-medium">Link</h5>
        <div className="flex items-center gap-4 py-1 px-4 border rounded-md bg-white">
          <Link size={20} className="text-tertiary" />
          <input
            ref={urlInputRef}
            onBlur={() =>
              updateLink(order, { ...platformSelected, url: linkUrl })
            }
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            className="flex-1 h-10 outline-none font-medium text-gray-500"
            placeholder="Your link here..."
          />
        </div>
      </div>
    </div>
  );
};

export default SocialLinkSetting;
