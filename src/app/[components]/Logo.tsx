import { Link2 } from 'lucide-react';
import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="p-2 grid place-items-center rounded-md bg-tertiary">
        <Link2 size={20} />
      </div>
      <span className="text-2xl text-black font-bold">devlinks</span>
    </div>
  );
};

export default Logo;
