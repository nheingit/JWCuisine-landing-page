/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MeQuery
// ====================================================

export interface MeQuery_me {
  __typename: "User";
  id: string;
  email: string;
  type: string;
  ccLast4: string | null;
  postalCode: string | null;
}

export interface MeQuery {
  me: MeQuery_me | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddDishToSubscriptionMutation
// ====================================================

export interface AddDishToSubscriptionMutation_addDishToSubscription {
  __typename: "User";
  id: string;
  email: string;
  type: string;
  ccLast4: string | null;
  postalCode: string | null;
}

export interface AddDishToSubscriptionMutation {
  addDishToSubscription: AddDishToSubscriptionMutation_addDishToSubscription | null;
}

export interface AddDishToSubscriptionMutationVariables {
  foodDishData: FoodDishInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CancelSubscriptionMutation
// ====================================================

export interface CancelSubscriptionMutation_cancelSubscription {
  __typename: "User";
  id: string;
  email: string;
  type: string;
  ccLast4: string | null;
  postalCode: string | null;
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

export interface ChangeCreditCardMutation_changeCreditCard {
  __typename: "User";
  id: string;
  email: string;
  type: string;
  ccLast4: string | null;
  postalCode: string | null;
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
// GraphQL mutation operation: CreateSubscriptionMutation
// ====================================================

export interface CreateSubscriptionMutation_createSubscription {
  __typename: "User";
  id: string;
  email: string;
  type: string;
  ccLast4: string | null;
  postalCode: string | null;
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
// GraphQL mutation operation: CreateSubscriptionFourMutation
// ====================================================

export interface CreateSubscriptionFourMutation_createSubscriptionFour {
  __typename: "User";
  id: string;
  email: string;
  type: string;
  ccLast4: string | null;
  postalCode: string | null;
}

export interface CreateSubscriptionFourMutation {
  createSubscriptionFour: CreateSubscriptionFourMutation_createSubscriptionFour | null;
}

export interface CreateSubscriptionFourMutationVariables {
  source: string;
  ccLast4: string;
  shippingAddress: ShippingAddressInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LogoutUserMutation
// ====================================================

export interface LogoutUserMutation {
  logout: boolean | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginUserMutation
// ====================================================

export interface LoginUserMutation_login {
  __typename: "User";
  id: string;
  email: string;
  type: string;
  ccLast4: string | null;
  postalCode: string | null;
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

export interface UserInfo {
  __typename: "User";
  id: string;
  email: string;
  type: string;
  ccLast4: string | null;
  postalCode: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface FoodDishInput {
  dishOne?: string | null;
  dishTwo?: string | null;
  dishThree?: string | null;
  dishFour?: string | null;
}

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
