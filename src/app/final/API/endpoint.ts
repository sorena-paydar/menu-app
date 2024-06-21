export const GET_BRANCH_PUBLIC_DETAILS_EP = ({
  branchId,
}: {
  branchId: string;
}) => `branches/${branchId}/public`;

export const GET_BRANCH_GROUP_PUBLIC_DETAILS_EP = ({
  groupId,
}: {
  groupId: string;
}) => `menu/groups/${groupId}/public`;
