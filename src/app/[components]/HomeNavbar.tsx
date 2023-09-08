'use client';

import { Link2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import CustomButton from './CustomButton';
import HomeNavLinks from './HomeNavLinks';

type Props = {
  navItem: string | null;
  setNavItem: (item: string) => void;
};

const HomeNavbar = ({ navItem, setNavItem }: Props) => {
  const router = useRouter();

  const navigateToPreviewPage = () => {
    router.push('/preview/asdkhsd');
  };

  return (
    <div className="h-fit bg-white rounded-md shadow-md border">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 grid place-items-center rounded-md bg-tertiary">
            <Link2 size={20} />
          </div>
          <span className="text-2xl text-black font-bold">devlinks</span>
        </div>

        <HomeNavLinks navItem={navItem} setNavItem={setNavItem} />

        <CustomButton
          clickHandler={navigateToPreviewPage}
          text="Preview"
          className="border border-tertiary rounded-md text-tertiary font-semibold"
        />
      </div>
    </div>
  );
};

export default HomeNavbar;
