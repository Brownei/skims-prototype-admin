import { Admin } from "@prisma/client";

export interface IUser {
    _id: string;
    name: string;
    email: string;
    image: string;
}

export interface adminProfile {
    id: string;
    sub?: string;
    name: string;
    email: string;
    picture?: string;
    given_name?: string;
    family_name?: string;
    at_hash?: string;
}

export type SafeUser = Omit<
  Admin,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
};

export interface Collection {
  id: string;
  adminId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}