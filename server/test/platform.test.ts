import { describe, expect, test } from "bun:test";
import { readlink, symlink, unlink } from "node:fs/promises";
import { funny } from "../platform/platform";

const isWin = process.platform === "win32";

// Window test
describe.if(isWin)("Window platform", async () => {
  test("Basic", () => expect(funny).toBe("win32"));
  try {
    if (await readlink("server/test/.test.env/link.txt")) {
      await unlink("server/test/.test.env/link.txt");
    }
  } catch (_) {}
  test("Linking", async () =>
    await symlink(
      "server/test/symlink/a.txt",
      "server/test/.test.env/link.txt",
    ));
  test("Unlinking", async () => await unlink("server/test/.test.env/link.txt"));
});

// Unix testing
describe.skipIf(isWin)("UNIX platform", async () => {
  test("Basic", () => expect(funny).toBe("other"));
  try {
    if (await readlink("server/test/.test.env/link.txt")) {
      await unlink("server/test/.test.env/link.txt");
    }
  } catch (_) {}
  test("Linking", async () =>
    await symlink(
      "server/test/symlink/a.txt",
      "server/test/.test.env/link.txt",
    ));
  test("Unlinking", async () => await unlink("server/test/.test.env/link.txt"));
});
