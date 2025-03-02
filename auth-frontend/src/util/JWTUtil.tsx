import { jwtDecode } from "jwt-decode";
import JWTExtendPayload from './JWTExtendPayload';

export function isTokenExpired(token: string) {
  if (!token) return true;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds

    if (decoded.exp)
      return decoded.exp < currentTime; // Check if token is expired
    return true;

  } catch (error) {
    console.error('Invalid token:', error);
    return true;
  }
}

export function getUsernameFromToken(token: string){
  if (!token)
    return null;

  const decoded = jwtDecode<JWTExtendPayload>(token);
  return decoded.username;
}

export function getUserIdFromToken(token: string){
  if (!token)
    return null;

  const decoded = jwtDecode(token);
  return decoded.sub;
}

export function deleteAllToken() {
  localStorage.clear();
}


export default isTokenExpired;