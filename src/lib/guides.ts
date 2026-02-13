export type DutyType = "ultimate" | "savage" | "extreme";

export interface GuideFilterState {
  type: DutyType | "";
  patch: string;
  tag: string;
  q: string;
}

export interface GuideFilterable {
  slug: string;
  dutyType: DutyType;
  patch: string;
  tags: string[];
}

const filterKeys = ["type", "patch", "tag", "q"] as const;

export function normalizeText(value: string | null | undefined): string {
  return (value ?? "").trim();
}

export function parseGuideFilters(params: URLSearchParams): GuideFilterState {
  const typeValue = normalizeText(params.get("type"));
  const type: GuideFilterState["type"] =
    typeValue === "ultimate" || typeValue === "savage" || typeValue === "extreme"
      ? typeValue
      : "";

  return {
    type,
    patch: normalizeText(params.get("patch")),
    tag: normalizeText(params.get("tag")),
    q: normalizeText(params.get("q")),
  };
}

export function matchesStructuredFilters(guide: GuideFilterable, filters: GuideFilterState): boolean {
  if (filters.type && guide.dutyType !== filters.type) {
    return false;
  }

  if (filters.patch && guide.patch.toLowerCase() !== filters.patch.toLowerCase()) {
    return false;
  }

  if (
    filters.tag &&
    !guide.tags.some((tag) => tag.toLowerCase() === filters.tag.toLowerCase())
  ) {
    return false;
  }

  return true;
}

export function buildGuideFilterQuery(filters: GuideFilterState): string {
  const params = new URLSearchParams();

  for (const key of filterKeys) {
    const value = normalizeText(filters[key]);
    if (value) {
      params.set(key, value);
    }
  }

  const query = params.toString();
  return query ? `?${query}` : "";
}

export function extractGuideSlugFromUrl(url: string): string | null {
  const match = url.match(/\/guides\/([^/?#]+)\/?$/);
  if (!match) {
    return null;
  }

  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}
