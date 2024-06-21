export const ERROR_MESSAGES = {
  email: {
    format: 'Invalid email format',
    required: 'Email is required',
  },
  password: {
    required: 'Password is required',
  },
  firstName: {
    required: 'First name is required',
  },
  lastName: {
    required: 'Last name is required',
  },
  brandName: {
    required: 'Brand name is required',
  },
  phoneNumber: {
    digit: 'Phone number must be exactly 10 digits',
    required: 'Phone Number is required',
  },
  changePassword: {
    notMatch: 'New passwords must match',
    currentPasswordRequired: 'Current passwords required',
    newPasswordConfirmRequired: 'Confirm new password',
  },
  branch: {
    name: {
      required: 'Branch name is required',
    },
    location: {
      address: {
        required: 'Branch location address is required',
      },
      coordinates: {
        lat: {
          required: 'Branch location coordinates lat is required',
        },
        lng: {
          required: 'Branch location coordinates lng is required',
        },
      },
    },
  },
  item: {
    name: {
      required: 'Item name is required',
    },
    picture: {
      required: 'Item image is required',
    },
    price: {
      type: 'Price must be a number',
      required: 'Item price is required',
    },
    description: {
      max: (maxCharacter: number) =>
        `Description cannot be more than ${maxCharacter} characters`,
      required: 'Item description is required',
    },
  },
  category: {
    name: {
      required: 'Category name is required',
    },
    items: {
      required: 'Must select at least one Item',
    },
  },
  menuGroup: {
    name: {
      required: 'Group name is required',
    },
    categories: {
      required: 'Must select at least one Category',
    },
  },
};
