import { db } from '../firebase';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, deleteDoc, collection, addDoc } from "firebase/firestore";
import { AppError, handleError, wrapAsync } from './errorHandling';
import { validateUserData, validateOrganization } from './validation';
import { cachedGetDoc, debouncedUpdateDoc, removeFromCache } from './firebaseOptimizations';

const USER_COLLECTION = 'users';
const INVITATION_COLLECTION = 'invitations';

const initializeUserData = () => ({
  organizations: [],
  menus: [],
  menuItems: {},
  settings: {
    isDarkMode: false,
    isDyslexicFont: false,
    colorblindMode: 'none'
  },
  tiles: {},  // Added tiles property
  createdAt: new Date().toISOString()
});

export const saveUserData = wrapAsync(async (userId, data, merge = false) => {
  const errors = validateUserData(data);
  if (errors) {
    console.warn("User data validation errors:", errors);
    Object.keys(errors).forEach(key => delete data[key]);
  }

  const userRef = doc(db, USER_COLLECTION, userId);
  await (merge ? debouncedUpdateDoc(userRef, data) : setDoc(userRef, data));
  removeFromCache(userRef.path);
  console.log("User data saved successfully");
});

export const loadUserData = wrapAsync(async (userId) => {
  const userRef = doc(db, USER_COLLECTION, userId);
  const docSnap = await cachedGetDoc(userRef);

  if (docSnap.exists()) {
    const userData = docSnap.data();
    const errors = validateUserData(userData);
    if (errors) {
      console.warn("User data validation errors:", errors);
      Object.keys(errors).forEach(key => delete userData[key]);
    }
    return userData;
  } else {
    console.log("No user data found, creating new document");
    const newUserData = initializeUserData();
    await saveUserData(userId, newUserData);
    return newUserData;
  }
});

export const addOrganizationToUser = wrapAsync(async (userId, orgData) => {
  const errors = validateOrganization(orgData);
  if (errors) {
    throw new AppError("Invalid organization data", "VALIDATION_ERROR", errors);
  }

  const userRef = doc(db, USER_COLLECTION, userId);
  await updateDoc(userRef, {
    organizations: arrayUnion(orgData)
  });
  removeFromCache(userRef.path);
  console.log("Organization added to user successfully");
});

export const updateOrganization = wrapAsync(async (userId, orgId, updatedData) => {
  const userRef = doc(db, USER_COLLECTION, userId);
  const docSnap = await cachedGetDoc(userRef);

  if (!docSnap.exists()) {
    throw new AppError("User not found", "USER_NOT_FOUND");
  }

  const userData = docSnap.data();
  const orgIndex = userData.organizations.findIndex(org => org.id === orgId);

  if (orgIndex === -1) {
    throw new AppError("Organization not found", "ORG_NOT_FOUND");
  }

  const updatedOrg = { ...userData.organizations[orgIndex], ...updatedData };
  const errors = validateOrganization(updatedOrg);
  if (errors) {
    throw new AppError("Invalid organization data", "VALIDATION_ERROR", errors);
  }

  userData.organizations[orgIndex] = updatedOrg;
  await debouncedUpdateDoc(userRef, { organizations: userData.organizations });
  removeFromCache(userRef.path);

  return updatedOrg;
});

export const deleteOrganization = wrapAsync(async (orgId, userId) => {
  const userRef = doc(db, USER_COLLECTION, userId);
  const docSnap = await cachedGetDoc(userRef);

  if (!docSnap.exists()) {
    throw new AppError("User not found", "USER_NOT_FOUND");
  }

  const userData = docSnap.data();
  const updatedOrgs = userData.organizations.filter(org => org.id !== orgId);

  if (updatedOrgs.length === userData.organizations.length) {
    throw new AppError("Organization not found", "ORG_NOT_FOUND");
  }

  await debouncedUpdateDoc(userRef, { organizations: updatedOrgs });
  removeFromCache(userRef.path);

  console.log("Organization deleted successfully");
});

export const inviteUserToOrganization = wrapAsync(async (orgId, email) => {
  const invitationRef = await addDoc(collection(db, INVITATION_COLLECTION), {
    orgId,
    email,
    status: "pending",
    createdAt: new Date()
  });
  
  console.log(`Invitation created for ${email} to join organization ${orgId}`);
  return invitationRef.id;
});

export const initUserData = wrapAsync(async (userId, email) => {
  const userRef = doc(db, USER_COLLECTION, userId);
  const docSnap = await cachedGetDoc(userRef);

  if (!docSnap.exists()) {
    const initialData = {
      ...initializeUserData(),
      email
    };
    await setDoc(userRef, initialData);
    return initialData;
  } else {
    return docSnap.data();
  }
});

// New function to save tile data
export const saveTileData = wrapAsync(async (userId, tileData) => {
  const userRef = doc(db, USER_COLLECTION, userId);
  await updateDoc(userRef, {
    [`tiles.${tileData.id}`]: tileData
  });
  removeFromCache(userRef.path);
  console.log("Tile data saved successfully");
});