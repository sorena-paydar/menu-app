export const GET_CATEGORIES_EP = 'menu/categories';

export const POST_CREATE_CATEGORY_EP = 'menu/categories';

export const GET_CATEGORY_DETAILS_EP = ({
  categoryId,
}: {
  categoryId: string;
}) => `menu/categories/${categoryId}`;
