/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CancelSubscriptionMutation
// ====================================================

export interface CancelSubscriptionMutation_cancelSubscription_shippingAddress {
  __typename: "ShippingAddress";
  city: string | null;
  country: string | null;
  line1: string | null;
  line2: string | null;
  postal_code: string | null;
  state: string | null;
}

export interface CancelSubscriptionMutation_cancelSubscription {
  __typename: "User";
  id: string;
  email: string;
  type: string;
  ccLast4: string | null;
  shippingAddress: (CancelSubscriptionMutation_cancelSubscription_shippingAddress | null)[] | null;
}

export interface CancelSubscriptionMutation {
  cancelSubscription: CancelSubscriptionMutation_cancelSubscription | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChangeCreditCardMutation
// ====================================================

export interface ChangeCreditCardMutation_changeCreditCard_shippingAddress {
  __typename: "ShippingAddress";
  city: string | null;
  country: string | null;
  line1: string | null;
  line2: string | null;
  postal_code: string | null;
  state: string | null;
}

export interface ChangeCreditCardMutation_changeCreditCard {
  __typename: "User";
  id: string;
  email: string;
  type: string;
  ccLast4: string | null;
  shippingAddress: (ChangeCreditCardMutation_changeCreditCard_shippingAddress | null)[] | null;
}

export interface ChangeCreditCardMutation {
  changeCreditCard: ChangeCreditCardMutation_changeCreditCard | null;
}

export interface ChangeCreditCardMutationVariables {
  source: string;
  ccLast4: string;
  shippingAddress: ShippingAddressInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MeQuery
// ====================================================

export interface MeQuery_me_shippingAddress {
  __typename: "ShippingAddress";
  city: string | null;
  country: string | null;
  line1: string | null;
  line2: string | null;
  postal_code: string | null;
  state: string | null;
}

export interface MeQuery_me {
  __typename: "User";
  id: string;
  email: string;
  type: string;
  ccLast4: string | null;
  shippingAddress: (MeQuery_me_shippingAddress | null)[] | null;
}

export interface MeQuery {
  me: MeQuery_me | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateSubscriptionMutation
// ====================================================

export interface CreateSubscriptionMutation_createSubscription_shippingAddress {
  __typename: "ShippingAddress";
  city: string | null;
  country: string | null;
  line1: string | null;
  line2: string | null;
  postal_code: string | null;
  state: string | null;
}

export interface CreateSubscriptionMutation_createSubscription {
  __typename: "User";
  id: string;
  email: string;
  type: string;
  ccLast4: string | null;
  shippingAddress: (CreateSubscriptionMutation_createSubscription_shippingAddress | null)[] | null;
}

export interface CreateSubscriptionMutation {
  createSubscription: CreateSubscriptionMutation_createSubscription | null;
}

export interface CreateSubscriptionMutationVariables {
  source: string;
  ccLast4: string;
  shippingAddress: ShippingAddressInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginUserMutation
// ====================================================

export interface LoginUserMutation_login_shippingAddress {
  __typename: "ShippingAddress";
  city: string | null;
  country: string | null;
  line1: string | null;
  line2: string | null;
  postal_code: string | null;
  state: string | null;
}

export interface LoginUserMutation_login {
  __typename: "User";
  id: string;
  email: string;
  type: string;
  ccLast4: string | null;
  shippingAddress: (LoginUserMutation_login_shippingAddress | null)[] | null;
}

export interface LoginUserMutation {
  login: LoginUserMutation_login | null;
}

export interface LoginUserMutationVariables {
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RegisterUserMutation
// ====================================================

export interface RegisterUserMutation {
  register: boolean;
}

export interface RegisterUserMutationVariables {
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserInfo
// ====================================================

export interface UserInfo_shippingAddress {
  __typename: "ShippingAddress";
  city: string | null;
  country: string | null;
  line1: string | null;
  line2: string | null;
  postal_code: string | null;
  state: string | null;
}

export interface UserInfo {
  __typename: "User";
  id: string;
  email: string;
  type: string;
  ccLast4: string | null;
  shippingAddress: (UserInfo_shippingAddress | null)[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface ShippingAddressInput {
  city?: string | null;
  country?: string | null;
  line1?: string | null;
  line2?: string | null;
  postal_code?: string | null;
  state?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
