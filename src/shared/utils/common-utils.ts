import { nanoid } from "@reduxjs/toolkit";

export const getSafeId = (id?: string) => {
  if (id) {
    return id;
  }

  return nanoid();
};

export const dollarFormatter = Intl.NumberFormat("en", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

export const toSlugCase = (str: string): string => {
  const slug = str
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  return slug;
};
