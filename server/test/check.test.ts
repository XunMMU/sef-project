import { describe, expect, test } from "bun:test";
import { randomBytes } from "node:crypto";

describe("Hashing (Argon2id)", async () => {
  const pw = randomBytes(Math.round(Math.random() * 56) + 4).toString("hex");

  console.log(pw);

  const hash = await Bun.password.hash(pw, {
    algorithm: "argon2id",
    timeCost: Number(Bun.env.HASH_ITER ?? 4),
  });

  test("Length", () => {
    expect(hash.length).toBe(118);
  });

  test("Checking", async () =>
    expect(await Bun.password.verify(pw, hash)).toBeTrue());
});
