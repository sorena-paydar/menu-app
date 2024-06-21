export type CreateBranchInputs = {
  name: string;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  menuGroup?: string | null;
};

export type Branch = {
  _id: string;
  name: string;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  menuGroup: string | null;
  tables: string | null;
};
