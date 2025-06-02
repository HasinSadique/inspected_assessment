import { formatDuration } from "./formatDuration";

describe("formatDuration()", () => {
  it("formats 0 seconds as 00:00", () => {
    expect(formatDuration(0)).toBe("00:00");
  });

  it("formats 65 seconds as 01:05", () => {
    expect(formatDuration(65)).toBe("01:05");
  });

  it("formats 600 seconds as 10:00", () => {
    expect(formatDuration(600)).toBe("10:00");
  });

  it("formats 3599 seconds as 59:59", () => {
    expect(formatDuration(3599)).toBe("59:59");
  });
});
