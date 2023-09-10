import { Platform, SocialLink } from '../[utils]/types';
import { PLATFORM_OPTIONS } from '../[utils]/constants';
import { useAction } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'convex/react';
import { getColorByPlatform } from '../[utils]/helpers';
import { Id } from '../../../convex/_generated/dataModel';

type FormatedNewLink = {
  platform: string;
  url: string;
};

type FormatedUpdateLink = FormatedNewLink & { _id: Id<'link'> };

const useLinks = () => {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [platformsSelected, setPlatformSelected] = useState<Platform[]>([]);
  const [deleteLinksId, setDeleteLinksId] = useState<Id<'link'>[]>([]);

  const { user } = useUser();
  const savedLinks = useQuery(api.link.getLinksByUserId, {
    userId: user!.id,
  });

  const saveLinks = useAction(api.link.saveLinks);

  const handleAddNewLink = useCallback(() => {
    const emptyLink = links.find((link) => !!!link.url);
    if (!!emptyLink) return;

    if (links.length === PLATFORM_OPTIONS.length) return;

    const nextPlatformNotSelected = PLATFORM_OPTIONS.find(
      (item) => !platformsSelected.includes(item.label)
    );

    if (!nextPlatformNotSelected) return;

    const newLinks = [...links, { ...nextPlatformNotSelected, url: '' }];
    setLinks(newLinks);
  }, [links]);

  const handleDeleteLink = (order: number) => {
    const linkIndex = order - 1;
    const linkId = links[linkIndex]?._id;

    if (linkId) {
      setDeleteLinksId((prev) => [...prev, linkId]);
    }

    const tempLinks = [...links];

    tempLinks.splice(linkIndex, 1);

    setLinks(tempLinks);
  };

  const handleUpdateLink = (order: number, info: SocialLink) => {
    const linkIndex = order - 1;
    const existinglink = links.find((_, index) => index === linkIndex);
    if (!existinglink) return;

    const tempLinks = [...links].map((link, idx) => {
      if (idx === linkIndex)
        return {
          ...link,
          ...info,
        };
      return link;
    });

    setLinks(tempLinks);
  };

  const handleSaveLinks = () => {
    if (!user) return;

    const formatedNewLinks: FormatedNewLink[] = [];
    const formatedUpdateLinks: FormatedUpdateLink[] = [];

    let hasErrorLink = false;

    links.forEach((link) => {
      if (!link.url) {
        hasErrorLink = true;
        return;
      }
      const formatedLink: FormatedNewLink = {
        platform: link.label,
        url: link.url,
      };
      if (link._id) {
        formatedUpdateLinks.push({ ...formatedLink, _id: link._id });
      } else formatedNewLinks.push(formatedLink);
    });

    if (hasErrorLink) return alert('Wrong links existing!');

    saveLinks({
      userId: user.id,
      links: formatedNewLinks,
      deleteLinksId,
      updateLinks: formatedUpdateLinks,
    });

    setDeleteLinksId([]);
  };

  useEffect(() => {
    if (!savedLinks) return;

    const initLinks: SocialLink[] = savedLinks.map((item) => ({
      _id: item._id,
      label: item.platform as Platform,
      url: item.url,
      iconUrl: item.url,
      color: getColorByPlatform(item.platform as Platform),
    }));

    setLinks(initLinks);
  }, [savedLinks]);

  useEffect(() => {
    if (links.length > 0) {
      const tempPlatformsSelected: Platform[] = [];
      links.forEach((link) => {
        tempPlatformsSelected.push(link.label as Platform);
      });
      setPlatformSelected(tempPlatformsSelected);
    }
  }, [links]);

  return {
    links,
    platformsSelected,
    handleAddNewLink,
    handleUpdateLink,
    handleDeleteLink,
    handleSaveLinks,
  };
};

export default useLinks;
