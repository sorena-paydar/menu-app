export type CreateBranchInputs = {
  name: string;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  groups?: { _id: string; position: number }[];
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
