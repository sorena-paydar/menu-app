import { Category } from '@/types/category';

export type AddCategoryGroup = {
  _id: string;
  position: number;
};

export type Group = {
  _id: string;
  name: string;
  categories: AddCategoryGroup[];
  createdAt: number;
};

export type CreateGroupInput = {
  name: string;
  categories: AddCategoryGroup[];
};

export type GroupFinal = {
  _id: string;
  name: string;
  categories: Category[];
  createdAt: number;
};
