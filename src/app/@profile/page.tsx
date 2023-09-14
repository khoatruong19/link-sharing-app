'use client';

import { useMutation, useQuery } from 'convex/react';
import CustomButton from '../[components]/CustomButton';
import { api } from '../../../convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import { POPUP, usePopupContext } from '../[providers]/PopupProvider';
import { CropImageProps } from '../[components]/CropImage';
import { resizeImage } from '../[utils]/helpers';

const ProfileDetailSchema = z.object({
  email: z.string().trim().email(),
  firstName: z
    .string()
    .trim()
    .min(3, 'First name must contain at least 3 characters!')
    .max(20, 'First name only contain at most 20 characters!'),
  lastName: z
    .string()
    .trim()
    .min(3, 'Last name must contain at least 3 characters!')
    .max(20, 'Last name only contain at most 20 characters!'),
});

type ProfileDetailSchemaType = z.infer<typeof ProfileDetailSchema>;

const Profile = () => {
  const { user } = useUser();
  const [selectedImage, setSelectedImage] = useState<null | File>(null);
  const [croppedImage, setCroppedImage] = useState<null | string>(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const { showPopup } = usePopupContext();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const profile = useQuery(api.profile.getProfileByUserId, {
    userId: user!.id,
  });
  const updateProfile = useMutation(api.profile.updateProfile);
  const savedImageToProfile = useMutation(api.profile.savedImageToProfile);
  const generateUploadUrl = useMutation(api.profile.generateUploadImageUrl);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<ProfileDetailSchemaType>({
    resolver: zodResolver(ProfileDetailSchema),
  });

  const watchAllFields = watch();

  const isDetailsChanged = useMemo(() => {
    const { email, firstName, lastName } = getValues();
    if (!profile || !email || !firstName || !lastName) return false;
    if (
      email.trim() !== profile?.email ||
      firstName.trim() !== profile.firstName ||
      lastName.trim() !== profile.lastName
    )
      return true;
    return !!selectedImage;
  }, [watchAllFields, profile]);

  const handleOpenSelectImage = () => {
    if (!fileInputRef || !fileInputRef.current) return;
    fileInputRef.current.click();
  };

  const handleOnChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const image = e.target.files[0];

    if (!image) return;

    setSelectedImage(image);
    setTimeout(() => {
      showPopup<CropImageProps>(POPUP.CROP_IMAGE, {
        image,
        setCroppedImage,
      });
    }, 200);
  };

  const onSubmit: SubmitHandler<ProfileDetailSchemaType> = async (data) => {
    if (!user || !profile) return;
    setUpdateLoading(true);
    updateProfile({ userId: user.id, profileId: profile._id, ...data });

    if (!selectedImage) {
      setUpdateLoading(false);
      return;
    }

    let image: File | Blob = selectedImage;

    if (croppedImage) {
      const response = await fetch(croppedImage);
      const imageBlob = await response.blob();
      image = imageBlob;
    }

    resizeImage({ image }, async (resultBlob) => {
      const postUrl = await generateUploadUrl();

      const result = await fetch(postUrl, {
        method: 'POST',
        headers: { 'Content-Type': resultBlob!.type },
        body: resultBlob,
      });
      const { storageId } = await result.json();

      await savedImageToProfile({
        storageId,
        profileId: profile._id,
        userId: user.id,
      });

      setUpdateLoading(false);
    });
  };

  const __renderProfileForm = () => (
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
  );

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
          <div
            className="group w-40 h-40 relative overflow-hidden rounded-lg "
            onClick={handleOpenSelectImage}
          >
            <Image
              alt=""
              src={
                croppedImage
                  ? croppedImage
                  : selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : profile?.imageUrl ?? ''
              }
              fill
              className="object-cover"
              placeholder="blur"
              blurDataURL="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black/20 hidden group-hover:flex flex-col items-center justify-center gap-2 text-white">
              <ImageIcon size={40} />
              <span className="text-lg font-semibold">Change Image</span>
            </div>
          </div>
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
        {__renderProfileForm()}
      </div>

      <div className="pt-5 border-t-2 flex justify-end mt-auto">
        <CustomButton
          disabled={!isDetailsChanged}
          form="profileDetailForm"
          type="submit"
          text="Save"
          className={`font-semibold text-white rounded-md px-6 ${
            isDetailsChanged ? 'bg-tertiary' : 'bg-secondary '
          }`}
          isLoading={updateLoading}
        />
      </div>
    </div>
  );
};

export default Profile;
