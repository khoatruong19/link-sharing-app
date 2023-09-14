'use client';

import { useEffect, useMemo, useRef } from 'react';
import CustomButton from '../[components]/CustomButton';
import SocialLinkSetting from '../[components]/SocialLinkSetting';
import useLinks from '../[hooks]/useLinks';
import { SocialLink } from '../[utils]/types';

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
  const previousLinksRef = useRef<SocialLink[] | null>(null);

  const scrollToNewLink = () => {
    if (!bottomLinksRef || !bottomLinksRef.current) return;
    bottomLinksRef.current.scrollIntoView();
  };

  const isLinksChanged = useMemo(() => {
    if (!previousLinksRef || !previousLinksRef.current) return false;
    return JSON.stringify(previousLinksRef.current) !== JSON.stringify(links);
  }, [previousLinksRef, links]);

  useEffect(() => {
    if (!previousLinksRef || previousLinksRef.current) return;
    if (links.length > 0) {
      previousLinksRef.current = links;
    }
  }, [links]);

  return (
    <div className="text-black h-full  flex flex-col">
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
      <div className=" pt-5 border-t-2 flex justify-end mt-auto">
        <CustomButton
          disabled={!isLinksChanged}
          clickHandler={handleSaveLinks}
          text="Save"
          className={`font-semibold text-white rounded-md px-6 ${
            isLinksChanged ? 'bg-tertiary' : 'bg-secondary '
          }`}
        />
      </div>
    </div>
  );
};

export default Links;
