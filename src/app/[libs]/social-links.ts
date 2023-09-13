import { SocialLinks, Config } from 'social-links';
import { Platform } from '../[utils]/types';

class SocialLinkValidator {
  private socialLinksValidator: SocialLinks;
  private validationConfig: Config = {
    usePredefinedProfiles: true,
    trimInput: true,
    allowQueryParams: false,
  };

  constructor() {
    this.socialLinksValidator = new SocialLinks(this.validationConfig);
  }

  public checkValidLink(platform: Platform, url: string) {
    const profileName = this.socialLinksValidator.detectProfile(url); // 'linkedin'
    return profileName === platform.toLowerCase();
  }
}

export default SocialLinkValidator;
