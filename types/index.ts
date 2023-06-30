import { User } from 'next-auth';
//import { JWT } from 'next-auth/jwt';

type UserId = string;

declare module 'next-auth/jwt' {
  interface JWT {
    id: UserId;
  }
}

declare module 'next-auth' {
  interface Session {
    user: User & {
      id: UserId;
    };
  }
}

// --  Table

export type TableHeader = {
  label: string;
  value: string;
  width?: number;
  emptyValue?: string | number;
};
export type TableItem = Record<string, any>;

type MapPropertyValue<T, P, R> = {
  [K in keyof T]: T[K] extends P ? R : T[K];
};

//type NewUnlockedAccount = MapPropertyValue<UnlockedAccount, string, number>;;
