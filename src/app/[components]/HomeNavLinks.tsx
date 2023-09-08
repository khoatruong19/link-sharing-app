import React from 'react';
import { NAV_ITEMS } from '../[utils]/constants';

type Props = {
  navItem: string | null;
  setNavItem: (item: string) => void;
};

const HomeNavLinks = ({ navItem, setNavItem }: Props) => {
  return (
    <div className="flex items-center gap-2">
      {NAV_ITEMS.map(({ icon: Icon, label, value }) => (
        <div
          onClick={() => setNavItem(value)}
          key={label}
          className={`flex items-center gap-2 py-2 px-5 cursor-pointer rounded-lg ${
            navItem === value
              ? 'bg-secondary text-emerald-500'
              : 'text-gray-400'
          }`}
        >
          <Icon strokeWidth={2} size={15} />
          <span className="font-semibold">{label}</span>
        </div>
      ))}
    </div>
  );
};

export default HomeNavLinks;
