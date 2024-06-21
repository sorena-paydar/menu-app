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
