import axios from "axios";

const SIGN_UP_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp";

const SIGN_IN_URL =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword";

const API_URL =
  "https://nanny-servies-app-default-rtdb.europe-west1.firebasedatabase.app/users";

export interface RegistrationRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export async function logUp(data: RegistrationRequest) {
  const res = await axios.post(
    `${SIGN_UP_URL}?key=${import.meta.env.VITE_FIREBASE_API_KEY}`,
    {
      email: data.email,
      password: data.password,
      returnSecureToken: true,
    }
  );

  const { idToken, localId } = res.data;
  await axios.put(
    `https://nanny-servies-app-default-rtdb.europe-west1.firebasedatabase.app/users/${localId}.json?auth=${idToken}`,
    {
      name: data.name,
      email: data.email,
    }
  );

  await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${
      import.meta.env.VITE_FIREBASE_API_KEY
    }`,
    {
      idToken: idToken,
      displayName: data.name,
      returnSecureToken: true,
    }
  );

  return res.data;
}

export async function login(data: LoginRequest) {
  const res = await axios.post(
    `${SIGN_IN_URL}?key=${import.meta.env.VITE_FIREBASE_API_KEY}`,
    {
      email: data.email,
      password: data.password,
      returnSecureToken: true,
    }
  );
  return res.data;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("uid");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userName");
}

export const getUserName = async (localId: string, idToken: string) => {
  const res = await axios.get(`${API_URL}/${localId}.json?auth=${idToken}`);
  return res.data.name;
};
