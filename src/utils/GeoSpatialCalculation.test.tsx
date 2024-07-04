import { describe, expect, it } from "vitest";

import GeoSpatialCalculation from "./GeoSpatialCalculation";

describe("#transformFromLonLat", () => {
  it("Returns true value for [52.3958421,13.0538824] coordinate", () => {
    const location = { long: 13.0538824, lat: 52.3958421 };
    const expected = { x: 1453151.541643276, y: 6872017.69074176 };
    expect(GeoSpatialCalculation.transformFromLonLat(location).x).toBe(
      expected.x
    );
    expect(GeoSpatialCalculation.transformFromLonLat(location).y).toBe(
      expected.y
    );
  });
});
