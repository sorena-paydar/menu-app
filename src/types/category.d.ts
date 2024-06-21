export type AddItemCategory = {
  _id?: string;
  position: number;
};

export type Category = {
  _id: string;
  name: string;
  items: AddItemCategory[];
  createdAt: number;
};

export type CreateCategoryInput = {
  name: string;
  items: AddItemCategory[];
};
