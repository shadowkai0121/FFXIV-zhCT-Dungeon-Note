import { describe, expect, it } from "vitest";
import {
  buildGuideFilterQuery,
  extractGuideSlugFromUrl,
  matchesStructuredFilters,
  parseGuideFilters,
} from "../src/lib/guides";

describe("parseGuideFilters", () => {
  it("normalizes accepted fields", () => {
    const params = new URLSearchParams("type=savage&patch=7.2&tag=%E9%87%8D%E6%93%8A&q=%20phase%201%20");

    expect(parseGuideFilters(params)).toEqual({
      type: "savage",
      patch: "7.2",
      tag: "重擊",
      q: "phase 1",
    });
  });

  it("drops invalid duty type", () => {
    const params = new URLSearchParams("type=invalid");
    expect(parseGuideFilters(params).type).toBe("");
  });
});

describe("matchesStructuredFilters", () => {
  const guide = {
    slug: "sample-guide",
    dutyType: "ultimate" as const,
    patch: "7.2",
    tags: ["時間軸", "減傷規劃"],
  };

  it("matches when all filters are empty", () => {
    expect(matchesStructuredFilters(guide, { type: "", patch: "", tag: "", q: "" })).toBe(true);
  });

  it("matches specific type/patch/tag", () => {
    expect(
      matchesStructuredFilters(guide, {
        type: "ultimate",
        patch: "7.2",
        tag: "時間軸",
        q: "",
      }),
    ).toBe(true);
  });

  it("rejects non-matching filters", () => {
    expect(
      matchesStructuredFilters(guide, {
        type: "savage",
        patch: "7.2",
        tag: "時間軸",
        q: "",
      }),
    ).toBe(false);
  });
});

describe("buildGuideFilterQuery", () => {
  it("creates query string with non-empty fields", () => {
    const query = buildGuideFilterQuery({
      type: "extreme",
      patch: "7.2",
      tag: "速刷",
      q: "固定站位",
    });

    expect(query).toContain("type=extreme");
    expect(query).toContain("patch=7.2");
    expect(query).toContain("tag=%E9%80%9F%E5%88%B7");
    expect(query).toContain("q=%E5%9B%BA%E5%AE%9A%E7%AB%99%E4%BD%8D");
  });
});

describe("extractGuideSlugFromUrl", () => {
  it("extracts guide slug from guides url", () => {
    expect(extractGuideSlugFromUrl("/FFXIV-zhCT-Dungeon-Note/guides/extreme-voidqueen-arsenal-72/")).toBe(
      "extreme-voidqueen-arsenal-72",
    );
  });

  it("returns null when url does not match", () => {
    expect(extractGuideSlugFromUrl("/updates/")).toBeNull();
  });
});
