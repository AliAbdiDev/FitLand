import {
  initialShopFiltersState,
  type ShopFiltersState,
} from "@/stores/shop-filters-store";

type ActiveFilterState = Pick<
  ShopFiltersState,
  "range" | "colorSelected" | "sizeSelected"
>;

const FILTER_QUERY_KEYS = ["minPrice", "maxPrice", "color", "size", "brands"] as const;

type TagLike = {
  text?: unknown;
};

const normalizeText = (value: string) => value.trim();

function getBrandTexts(tagInputValue: unknown) {
  if (!Array.isArray(tagInputValue)) return [] as string[];

  const brands = tagInputValue
    .map((tag) => {
      if (typeof tag === "string") return normalizeText(tag);
      if (tag && typeof tag === "object") {
        return normalizeText(String((tag as TagLike).text ?? ""));
      }
      return "";
    })
    .filter(Boolean);

  return Array.from(new Set(brands));
}

function removeFilterParams(params: URLSearchParams) {
  FILTER_QUERY_KEYS.forEach((key) => params.delete(key));
  return params;
}

export function buildShopFilterQueryString(
  currentQueryString: string,
  filters: ActiveFilterState,
  tagInputValue: unknown
) {
  const params = removeFilterParams(new URLSearchParams(currentQueryString));

  const [rangeStart, rangeEnd] = filters.range ?? initialShopFiltersState.range;
  const minRange = Math.min(rangeStart, rangeEnd);
  const maxRange = Math.max(rangeStart, rangeEnd);
  const [defaultMin, defaultMax] = initialShopFiltersState.range;

  if (minRange > defaultMin) {
    params.set("minPrice", String(minRange));
  }

  if (maxRange < defaultMax) {
    params.set("maxPrice", String(maxRange));
  }

  if (filters.colorSelected) {
    params.set("color", filters.colorSelected);
  }

  if (filters.sizeSelected) {
    params.set("size", filters.sizeSelected);
  }

  const brands = getBrandTexts(tagInputValue);
  if (brands.length > 0) {
    params.set("brands", brands.join(","));
  }

  return params.toString();
}

export function clearShopFiltersQueryString(currentQueryString: string) {
  const params = removeFilterParams(new URLSearchParams(currentQueryString));
  return params.toString();
}

export function setShopSortQueryString(currentQueryString: string, sortValue: string) {
  const params = new URLSearchParams(currentQueryString);
  params.set("category", sortValue);
  return params.toString();
}

export function clearShopSortQueryString(currentQueryString: string) {
  const params = new URLSearchParams(currentQueryString);
  params.delete("category");
  return params.toString();
}

export function toShopUrl(queryString: string) {
  return queryString ? `/shop?${queryString}` : "/shop";
}
