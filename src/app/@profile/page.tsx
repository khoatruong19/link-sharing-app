'use client';

import CustomButton from '../[components]/CustomButton';

type Props = {};

const Profile = (props: Props) => {
  return (
    <div className="text-black h-full flex flex-col">
      <h1 className="text-4xl font-bold mb-2">Profile Details</h1>
      <p className="text-gray-500 mb-7 3xl:mb-10">
        Add your details to create a personal touch to your profile.
      </p>

      <div className="bg-primary p-4 flex items-center justify-between text-gray-500 rounded-lg border">
        <p>Profile picture</p>
        <div className="flex items-center justify-between w-[500px]">
          <div className="h-48 w-48 rounded-lg bg-black"></div>
          <span className="text-xs max-w-[280px]">
            Images must be below 1024x1024px. Use PNG, JPG or BMP format.
          </span>
        </div>
      </div>

      <div className="bg-primary p-4 flex items-center justify-between text-gray-500 rounded-lg border mt-5">
        <form className="w-full flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label>First name*</label>
            <input
              type="text"
              placeholder="First name..."
              className="py-3 px-4 bg-white rounded-md w-[500px] border outline-tertiary outline-offset-2 focus:shadow-lg shadow-tertiary"
            />
          </div>
          <div className="flex items-center justify-between">
            <label>Last name*</label>
            <input
              type="text"
              placeholder="Last name..."
              className="py-3 px-4 bg-white rounded-md w-[500px] border outline-tertiary outline-offset-2 focus:shadow-lg shadow-tertiary"
            />
          </div>
          <div className="flex items-center justify-between">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email..."
              className="py-3 px-4 bg-white rounded-md w-[500px] border outline-tertiary outline-offset-2 focus:shadow-lg shadow-tertiary"
            />
          </div>
        </form>
      </div>

      <div className="pt-5 border-t-2 flex justify-end mt-auto">
        <CustomButton
          text="Save"
          className="bg-secondary font-semibold text-white rounded-md px-6 hover:bg-tertiary"
        />
      </div>
    </div>
  );
};

export default Profile;
