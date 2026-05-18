import { Colors } from '../constants/colors';

export function getExpiryDate(purchaseDate, warrantyMonths) {
  const d = new Date(purchaseDate);
  d.setMonth(d.getMonth() + warrantyMonths);
  return d;
}

export function getDaysLeft(expiryDate) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const exp = new Date(expiryDate);
  exp.setHours(0, 0, 0, 0);
  return Math.round((exp - now) / (1000 * 60 * 60 * 24));
}

export function getStatusColor(daysLeft) {
  if (daysLeft < 0) return Colors.statusGray;
  if (daysLeft <= 30) return Colors.statusRed;
  if (daysLeft <= 90) return Colors.statusYellow;
  return Colors.statusGreen;
}

export function getStatusBgColor(daysLeft) {
  if (daysLeft < 0) return Colors.statusGrayBg;
  if (daysLeft <= 30) return Colors.statusRedBg;
  if (daysLeft <= 90) return Colors.statusYellowBg;
  return Colors.statusGreenBg;
}

export function formatDaysLeft(daysLeft) {
  if (daysLeft < 0) return 'Истекла';
  if (daysLeft === 0) return 'Сегодня';
  if (daysLeft === 1) return '1 день';
  if (daysLeft <= 4) return `${daysLeft} дня`;
  return `${daysLeft} дней`;
}

export function formatDate(dateString) {
  const d = new Date(dateString);
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
}
