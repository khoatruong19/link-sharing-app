'use client';

import { Equal, Link } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import CustomButton from './CustomButton';
import PlatformsSelect from './PlatformsSelect';
import { Platform, PlatformItem, SocialLink } from '../[utils]/types';
import { PLATFORM_OPTIONS } from '../[utils]/constants';
import SocialLinkValidator from '../[libs]/social-links';

type Props = {
  link: SocialLink;
  order: number;
  platformsSelected: Platform[];
  updateLink: (order: number, info: SocialLink) => void;
  deleteLink: (order: number) => void;
};

const SocialLinkSetting = ({
  link,
  order,
  platformsSelected,
  updateLink,
  deleteLink,
}: Props) => {
  const { url = '', ...rest } = link;

  const [platformSelected, setPlatformSelected] = useState<PlatformItem>(
    rest ?? PLATFORM_OPTIONS[0]
  );
  const [linkUrl, setLinkUrl] = useState(url);
  const [errorValidation, setErrorValidation] = useState(false);

  const urlInputRef = useRef<HTMLInputElement | null>(null);

  const handleValidateAndUpdateLink = (platform: PlatformItem) => {
    const socialLinksValidator = new SocialLinkValidator();

    const isValid = socialLinksValidator.checkValidLink(
      platform.label,
      linkUrl
    );

    if (!isValid) {
      setErrorValidation(true);
      return;
    }

    setErrorValidation(false);

    updateLink(order, {
      url: linkUrl,
      _id: link._id,
      ...platform,
    });
  };

  useEffect(() => {
    if (!urlInputRef || !urlInputRef.current) return;
    urlInputRef.current.focus();
  }, [urlInputRef]);

  return (
    <div
      className={`bg-primary px-3 py-5 rounded-md border ${
        errorValidation && 'border-2 border-red-700'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-500">
          <Equal className="opacity-50" />
          <span className="font-semibold text-lg">Link #{order}</span>
        </div>
        <CustomButton
          clickHandler={() => deleteLink(order)}
          className="text-gray-500 font-medium"
          text="Remove"
        />
      </div>

      <div className="flex flex-col gap-1.5 mt-2.5">
        <h5 className="text-xs text-gray-500 font-medium">Platform</h5>
        <PlatformsSelect
          platformSelected={platformSelected}
          setPlatformSelected={setPlatformSelected}
          platformsSelected={platformsSelected}
          onSelect={handleValidateAndUpdateLink}
        />
      </div>

      <div className="flex flex-col gap-1.5 mt-2.5">
        <h5 className="text-xs text-gray-500 font-medium">Link</h5>
        <div className="flex items-center gap-4 py-1 px-4 border rounded-md bg-white">
          <Link size={20} className="text-tertiary" />
          <input
            ref={urlInputRef}
            onBlur={() => handleValidateAndUpdateLink(platformSelected)}
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
