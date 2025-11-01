// Application constants

export const ROLES = {
  ADMIN: 'admin',
  VENDOR: 'vendor',
  SALES: 'sales',
  MITRA: 'mitra',
  CUSTOMER: 'customer',
};

export const ADMIN_ROLES = [ROLES.ADMIN];

export const CAN_ACCESS_ADMIN = [
  ROLES.ADMIN,
  ROLES.VENDOR
];