'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import CustomButton from '../[components]/CustomButton';
import SocialLinkSetting from '../[components]/SocialLinkSetting';
import { SocialLink } from '../[utils]/types';
import { PLATFORM_OPTIONS } from '../[utils]/constants';

type Props = {};

const Links = (props: Props) => {
  const [links, setLinks] = useState<SocialLink[]>([]);

  const bottomLinksRef = useRef<HTMLDivElement | null>(null);

  const addNewLink = useCallback(() => {
    const emptyLink = links.find((link) => !!!link.url);
    if (!!emptyLink) return;
    setLinks((prev) => [...prev, { ...PLATFORM_OPTIONS[0], url: '' }]);
  }, [links]);

  const handleUpdateLink = (order: number, info: SocialLink) => {
    const linkIndex = order - 1;
    const existinglink = links.find((_, index) => index === linkIndex);
    if (!existinglink) return;

    const tempLinks = [...links];
    tempLinks[linkIndex] = info;
    setLinks(tempLinks);
  };

  useEffect(() => {
    if (!bottomLinksRef || !bottomLinksRef.current) return;
    bottomLinksRef.current.scrollIntoView();
  }, [links]);

  return (
    <div className="text-black h-full">
      <h1 className="text-4xl font-bold mb-2">Customize your links</h1>
      <p className="text-gray-500 mb-7 3xl:mb-10">
        Add/edit/remove links below and then share all your profiles with the
        world!
      </p>
      <CustomButton
        clickHandler={addNewLink}
        className="border-2 border-tertiary rounded-lg text-tertiary w-full font-semibold"
        text="+ Add new link"
      />

      <div className="mt-7 pr-2 flex flex-col gap-6 h-[460px] 3xl:h-[530px] overflow-auto custom-scrollbar">
        {links.map((link, index) => (
          <SocialLinkSetting
            key={link.label + index}
            link={link}
            order={index + 1}
            updateLink={handleUpdateLink}
          />
        ))}
        <div ref={bottomLinksRef}></div>
      </div>
      <div className="mt-5 pt-5 border-t-2 flex justify-end">
        <CustomButton
          text="Save"
          className="bg-secondary font-semibold text-white rounded-md px-6 hover:bg-tertiary"
        />
      </div>
    </div>
  );
};

export default Links;
