import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@garantiya_items';

export async function loadItems() {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  } catch {
    return [];
  }
}

export async function saveItems(items) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export async function addItem(item) {
  const items = await loadItems();
  items.push(item);
  await saveItems(items);
}

export async function updateItem(updatedItem) {
  const items = await loadItems();
  const idx = items.findIndex((i) => i.id === updatedItem.id);
  if (idx !== -1) items[idx] = updatedItem;
  await saveItems(items);
}

export async function deleteItem(id) {
  const items = await loadItems();
  await saveItems(items.filter((i) => i.id !== id));
}
