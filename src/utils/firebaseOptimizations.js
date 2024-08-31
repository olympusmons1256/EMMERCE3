import { getDoc, updateDoc } from "firebase/firestore";

const cache = new Map();

export const cachedGetDoc = async (docRef) => {
  const cacheKey = docRef.path;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  const docSnap = await getDoc(docRef);
  cache.set(cacheKey, docSnap);
  return docSnap;
};

// Custom debounce function
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const debouncedUpdateDoc = debounce((docRef, data) => {
  return updateDoc(docRef, data);
}, 500);

export const clearCache = () => {
  cache.clear();
};

export const removeFromCache = (docPath) => {
  cache.delete(docPath);
};