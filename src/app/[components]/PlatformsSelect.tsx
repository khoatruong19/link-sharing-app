'use client';

import { ChevronDown } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { SocialIcon } from 'react-social-icons';
import { PLATFORM_OPTIONS } from '../[utils]/constants';
import { Platform, PlatformItem } from '../[utils]/types';
import useClickOutside from '../[hooks]/useClickOutside';

const SELECT_OPTIONS_HEIGHT = 300;

type Props = {
  platformSelected: PlatformItem;
  setPlatformSelected: (platform: PlatformItem) => void;
  platformsSelected: Platform[];
  onSelect: (platform: PlatformItem) => void;
};

const PlatformsSelect = ({
  platformSelected,
  setPlatformSelected,
  platformsSelected,
  onSelect,
}: Props) => {
  const [openSelect, setOpenSelect] = useState<{
    active: boolean;
    position: 'top' | 'bottom';
  }>({
    active: false,
    position: 'bottom',
  });

  const selectTriggerRef = useRef<HTMLDivElement | null>(null);
  const optionsRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(optionsRef, () => {
    setOpenSelect((prev) => ({ ...prev, active: false }));
  });

  const handleOpenSelect = () => {
    if (!selectTriggerRef || !selectTriggerRef.current) return;
    if (openSelect.active) {
      setOpenSelect((prev) => ({ ...prev, active: false }));
      return;
    }

    const coordinateY = selectTriggerRef.current.getBoundingClientRect().y;

    const thesholdCoordinateY = window.screen.height * 0.8;
    let position: 'top' | 'bottom' = 'bottom';

    if (coordinateY + SELECT_OPTIONS_HEIGHT > thesholdCoordinateY)
      position = 'top';

    setOpenSelect({ active: true, position });
  };

  const handleSelectPlatform = (platform: PlatformItem) => {
    if (platformsSelected.includes(platform.label)) return;
    setPlatformSelected(platform);
    setOpenSelect((prev) => ({ ...prev, active: false }));
    onSelect(platform);
  };

  return (
    <div className="w-full relative">
      <div
        ref={selectTriggerRef}
        onClick={handleOpenSelect}
        className="flex items-center justify-between border rounded-md cursor-pointer hover:opacity-80 bg-white"
      >
        <div className="flex items-center gap-2 pl-0.5">
          <SocialIcon
            as="div"
            bgColor="transparent"
            fgColor="#AAC8A7"
            url={platformSelected.iconUrl}
          />
          <span className="ml-[-7px] font-medium text-gray-500">
            {platformSelected.label}
          </span>
        </div>

        <ChevronDown className="mr-2.5 text-tertiary" />
      </div>

      {openSelect.active && (
        <div
          ref={optionsRef}
          className={`absolute ${
            openSelect.position === 'bottom' ? 'top-14' : 'bottom-[110%]'
          } rounded-md left-0 z-10 h-[300px] w-full bg-white shadow-md border overflow-auto custom-scrollbar`}
        >
          {PLATFORM_OPTIONS.map((option) => (
            <div
              key={option.label}
              className={`flex items-center px-3 py-2 ${
                platformsSelected.includes(option.label)
                  ? 'hover:opacity-100 bg-primary cursor-default'
                  : ' cursor-pointer hover:bg-primary'
              }  ${
                platformSelected.label === option.label &&
                'bg-tertiary cursor-default hover:bg-tertiary'
              } `}
              onClick={() => handleSelectPlatform(option)}
            >
              <SocialIcon
                as="div"
                url={option.iconUrl}
                bgColor="transparent"
                fgColor={option.color}
              />
              <span className="font-semibold">{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlatformsSelect;
