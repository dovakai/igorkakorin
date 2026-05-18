import { Colors } from './colors';

export const CATEGORIES = [
  { id: 'electronics', label: 'Электроника', color: Colors.categoryElectronics, icon: 'laptop-outline' },
  { id: 'appliances', label: 'Бытовая техника', color: Colors.categoryAppliances, icon: 'home-outline' },
  { id: 'auto', label: 'Авто', color: Colors.categoryAuto, icon: 'car-outline' },
  { id: 'tools', label: 'Инструменты', color: Colors.categoryTools, icon: 'construct-outline' },
  { id: 'other', label: 'Другое', color: Colors.categoryOther, icon: 'ellipsis-horizontal-outline' },
];

export const getCategoryById = (id) =>
  CATEGORIES.find((c) => c.id === id) || CATEGORIES[4];
