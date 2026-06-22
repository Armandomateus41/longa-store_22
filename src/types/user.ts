export type UserProfile = {
  id: string;
  fullName: string;
  email: string;
  password: string;
  phone: string;
  zipCode: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  createdAt: string;
};

export type RegisterInput = {
  fullName: string;
  email: string;
  password: string;
};

export type ProfileUpdateInput = Partial<
  Omit<UserProfile, "id" | "email" | "password" | "createdAt">
>;
