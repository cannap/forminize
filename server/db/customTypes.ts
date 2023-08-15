import { customType } from 'drizzle-orm/mysql-core';

export const datetimeUtc = (name: string, precision: number) =>
  customType<{ data: Date; driverData: string }>({
    dataType() {
      return `datetime(${precision})`;
    },
    toDriver(value: Date): string {
      // This works fine since Date.toISOString() always returns a UTC ISO string ('Z' timezone offset)
      return value.toISOString().replace('T', ' ').replace('Z', '');
    },
    fromDriver(value: string): Date {
      // When retrieving datetimes from driver, convert them to ISO string with "Z" (UTC) timezone
      // before passing into the Date object...
      // Otherwise the Date object will do this implicitly with the local timezone instead.
      return new Date(value.replace(' ', 'T') + 'Z');
    }
  })(name);
