'use client';

import { useMutation, useQuery } from 'convex/react';
import CustomButton from '../[components]/CustomButton';
import { api } from '../../../convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

type Props = {};

const ProfileDetailSchema = z.object({
  email: z.string().email(),
  firstName: z
    .string()
    .min(3, 'First name must contain at least 3 characters!')
    .max(20, 'First name only contain at most 20 characters!'),
  lastName: z
    .string()
    .min(3, 'Last name must contain at least 3 characters!')
    .max(20, 'Last name only contain at most 20 characters!'),
});

type ProfileDetailSchemaType = z.infer<typeof ProfileDetailSchema>;

const Profile = (props: Props) => {
  const { user } = useUser();
  const [selectedImage, setSelectedImage] = useState<null | File>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const profile = useQuery(api.profile.getProfileByUserId, {
    userId: user!.id,
  });
  const updateProfile = useMutation(api.profile.updateProfile);
  const savedImageToProfile = useMutation(api.profile.savedImageToProfile);
  const generateUploadUrl = useMutation(api.profile.generateUploadImageUrl);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfileDetailSchemaType>({
    resolver: zodResolver(ProfileDetailSchema),
  });

  const handleOpenSelectImage = () => {
    if (!fileInputRef || !fileInputRef.current) return;
    fileInputRef.current.click();
  };

  const handleOnChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setSelectedImage(e.target.files[0]);
  };

  const onSubmit: SubmitHandler<ProfileDetailSchemaType> = async (data) => {
    if (!user || !profile) return;
    updateProfile({ userId: user.id, profileId: profile._id, ...data });
    if (selectedImage) {
      const postUrl = await generateUploadUrl();

      const result = await fetch(postUrl, {
        method: 'POST',
        headers: { 'Content-Type': selectedImage!.type },
        body: selectedImage,
      });
      const { storageId } = await result.json();

      await savedImageToProfile({
        storageId,
        profileId: profile._id,
        userId: user.id,
      });
    }
  };

  useEffect(() => {
    if (!profile) return;
    setValue('firstName', profile.firstName);
    setValue('lastName', profile.lastName);
    setValue('email', profile.email);
  }, [profile]);

  return (
    <div className="text-black h-full flex flex-col">
      <h1 className="text-4xl font-bold mb-2">Profile Details</h1>
      <p className="text-gray-500 mb-7 3xl:mb-10">
        Add your details to create a personal touch to your profile.
      </p>

      <div className="bg-primary p-4 flex items-center justify-between text-gray-500 rounded-lg border">
        <p>Profile picture</p>
        <div className="flex items-center justify-between w-[500px] cursor-pointer hover:opacity-80">
          <Image
            alt=""
            src={
              selectedImage
                ? URL.createObjectURL(selectedImage)
                : profile?.imageUrl ?? ''
            }
            width={192}
            height={192}
            className="rounded-lg object-cover"
            onClick={handleOpenSelectImage}
          />
          <span className="text-xs max-w-[280px]">
            Images must be below 1024x1024px. Use PNG, JPG or BMP format.
          </span>
          <input
            ref={fileInputRef}
            hidden
            type="file"
            onChange={handleOnChangeImage}
            accept="image/*"
          />
        </div>
      </div>

      <div className="bg-primary p-4 flex items-center justify-between text-gray-500 rounded-lg border mt-5">
        <form
          id="profileDetailForm"
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-2"
        >
          <div className="flex items-center justify-between">
            <label>First name*</label>

            <div className="flex flex-col gap-1 w-[500px] ">
              <input
                {...register('firstName')}
                type="text"
                placeholder="First name..."
                className="py-3 px-4 bg-white rounded-md border outline-tertiary outline-offset-2 focus:shadow-lg shadow-tertiary"
              />
              {errors.firstName && (
                <span className="text-xs text-red-400 font-semibold">
                  {errors.firstName.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label>Last name*</label>

            <div className="flex flex-col gap-1 w-[500px] ">
              <input
                {...register('lastName')}
                type="text"
                placeholder="Last name..."
                className="py-3 px-4 bg-white rounded-md border outline-tertiary outline-offset-2 focus:shadow-lg shadow-tertiary"
              />
              {errors.lastName && (
                <span className="text-xs text-red-400 font-semibold">
                  {errors.lastName.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label>Email</label>

            <div className="flex flex-col gap-1 w-[500px] ">
              <input
                {...register('email')}
                type="email"
                placeholder="Email..."
                className="py-3 px-4 bg-white rounded-md border outline-tertiary outline-offset-2 focus:shadow-lg shadow-tertiary"
              />
              {errors.email && (
                <span className="text-xs text-red-400 font-semibold">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>
        </form>
      </div>

      <div className="pt-5 border-t-2 flex justify-end mt-auto">
        <CustomButton
          form="profileDetailForm"
          type="submit"
          text="Save"
          className="bg-secondary font-semibold text-white rounded-md px-6 hover:bg-tertiary"
        />
      </div>
    </div>
  );
};

export default Profile;
