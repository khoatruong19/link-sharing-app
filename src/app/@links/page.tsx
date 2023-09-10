'use client';

import { useEffect, useRef } from 'react';
import CustomButton from '../[components]/CustomButton';
import SocialLinkSetting from '../[components]/SocialLinkSetting';
import useLinks from '../[hooks]/useLinks';

type Props = {};

const Links = (props: Props) => {
  const {
    links,
    platformsSelected,
    handleAddNewLink,
    handleSaveLinks,
    handleDeleteLink,
    handleUpdateLink,
  } = useLinks();

  const bottomLinksRef = useRef<HTMLDivElement | null>(null);

  const scrollToNewLink = () => {
    if (!bottomLinksRef || !bottomLinksRef.current) return;
    bottomLinksRef.current.scrollIntoView();
  };

  return (
    <div className="text-black h-full">
      <h1 className="text-4xl font-bold mb-2">Customize your links</h1>
      <p className="text-gray-500 mb-7 3xl:mb-10">
        Add/edit/remove links below and then share all your profiles with the
        world!
      </p>
      <CustomButton
        clickHandler={() => {
          handleAddNewLink();
          scrollToNewLink();
        }}
        className="border-2 border-tertiary rounded-lg text-tertiary w-full font-semibold"
        text="+ Add new link"
      />

      <div className="mt-7 pr-2 flex flex-col gap-6 h-[460px] 3xl:h-[500px] overflow-auto custom-scrollbar">
        {links.map((link, index) => (
          <SocialLinkSetting
            key={link.label + index}
            link={link}
            platformsSelected={platformsSelected}
            order={index + 1}
            updateLink={handleUpdateLink}
            deleteLink={handleDeleteLink}
          />
        ))}
        <div ref={bottomLinksRef}></div>
      </div>
      <div className="mt-5 pt-5 border-t-2 flex justify-end">
        <CustomButton
          clickHandler={handleSaveLinks}
          text="Save"
          className="bg-secondary font-semibold text-white rounded-md px-6 hover:bg-tertiary"
        />
      </div>
    </div>
  );
};

export default Links;
