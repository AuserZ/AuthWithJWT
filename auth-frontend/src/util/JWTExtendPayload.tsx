import { JwtPayload } from 'jwt-decode';

export default interface JWTExtendPayload extends JwtPayload {
  username: string; // Add your custom claim
}