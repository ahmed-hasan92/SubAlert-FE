import dashIcon from '../assets/dashboard.svg';
import analyticsIcon from '../assets/analytics.svg';
import premIcon from '../assets/premium.svg';
import infoIcon from '../assets/info.svg';
import settingIcon from '../assets/settings.svg';

export const sideBarItems = [
  { label: 'Dashboard', itemIcon: dashIcon, itemLink: '/dashboard' },
  { label: 'Analytics', itemIcon: analyticsIcon, itemLink: '*' },
  { label: 'Premium', itemIcon: premIcon, itemLink: '*' },
  { label: 'About', itemIcon: infoIcon, itemLink: '*' },
  { label: 'Settings', itemIcon: settingIcon, itemLink: '*' },
];
