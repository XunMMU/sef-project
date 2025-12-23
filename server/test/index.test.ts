import { describe, expect, test } from "bun:test";
import { app } from "../index";

describe("Elysia", () => {
  test("testing api", async () => {
    const response = await app
      .handle(new Request("http://localhost:3000/api"))
      .then((res) => res.text());

    expect(response).toBe("BACKEND API");
  });
});
