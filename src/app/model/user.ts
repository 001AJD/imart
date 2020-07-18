export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoUrl?: string;
  cart?: [];
  cartTotal?: number;
}
