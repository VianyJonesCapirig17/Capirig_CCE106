const BASE_URL = 'https://dummyjson.com';

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  accessToken: string;
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  image?: string;
}

export class SessionRejectedError extends Error {
  constructor() {
    super('Your saved session has expired. Please sign in again.');
    this.name = 'SessionRejectedError';
  }
}

export async function loginUser(username: string, password: string): Promise<AuthUser> {
  if (!username.trim() || !password) {
    throw new Error('Enter both your username and password.');
  }

  let response: Response;
  try {
    response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username.trim(),
        password,
        expiresInMins: 30,
      }),
    });
  } catch {
    throw new Error('Could not connect. Check your internet connection and try again.');
  }

  if (!response.ok) {
    throw new Error('Username or password is incorrect. Please try again.');
  }

  let user: AuthUser;
  try {
    user = (await response.json()) as AuthUser;
  } catch {
    throw new Error('The sign-in service returned an unreadable response. Please try again.');
  }

  if (!user.accessToken || !user.username) {
    throw new Error('The sign-in service returned incomplete account details. Please try again.');
  }

  return user;
}

export async function getCurrentUser(token: string): Promise<UserProfile> {
  let response: Response;
  try {
    response = await fetch(`${BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch {
    throw new Error('Could not verify your saved session. Check your internet connection.');
  }

  if (response.status === 401 || response.status === 403) {
    throw new SessionRejectedError();
  }
  if (!response.ok) {
    throw new Error('Could not verify your saved session. Please try again.');
  }

  let user: UserProfile;
  try {
    user = (await response.json()) as UserProfile;
  } catch {
    throw new Error('The profile service returned an unreadable response.');
  }

  if (!user.username) {
    throw new SessionRejectedError();
  }
  return user;
}
