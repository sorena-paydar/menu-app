export type CreateItemInputs = {
  name: string;
  picture: string;
  price: number;
  description: string;
};

export type Item = {
  _id: string;
  name: string;
  picture: string;
  price: number;
  description: string;
  createdAt: string;
};
