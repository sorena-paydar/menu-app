export const GET_ITEMS_EP = 'menu/items';

export const POST_CREATE_ITEM_EP = 'menu/items';

export const GET_ITEM_DETAILS_EP = ({ itemId }: { itemId: string }) =>
  `menu/items/${itemId}`;

export const DELETE_ITEM_EP = ({ itemId }: { itemId: string }) =>
  `menu/items/${itemId}`;

export const PUT_EDIT_ITEM_DETAILS_EP = ({ itemId }: { itemId: string }) =>
  `menu/items/${itemId}`;
