'use client';

import { Link2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import CustomButton from './CustomButton';
import HomeNavLinks from './HomeNavLinks';
import Logo from './Logo';
import { useUser } from '@clerk/nextjs';

type Props = {
  navItem: string | null;
  setNavItem: (item: string) => void;
};

const HomeNavbar = ({ navItem, setNavItem }: Props) => {
  const router = useRouter();
  const { user } = useUser();

  const navigateToPreviewPage = () => {
    router.push(`/preview/${user?.id ?? ''}`);
  };

  return (
    <div className="h-fit bg-white rounded-md shadow-md border">
      <div className="p-4 flex items-center justify-between">
        <Logo />

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
