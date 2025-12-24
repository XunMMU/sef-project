import { afterAll, beforeAll } from "bun:test";
import { mkdir, rm } from "node:fs/promises";

beforeAll(async () => {
  console.log("Setting up the test enviroment\n");

  const testdir = Bun.file("server/test/.test.env");

  if ((await testdir.exists()) === false) {
    console.warn("The test enviroment is not clean. Cleaning\n");
    await rm("server/test/.test.env", { recursive: true });
  }

  await mkdir("server/test/.test.env");

  await Bun.write(
    "server/test/.test.env/a.txt",
    `This is the original text file waiting to be linked\n` +
      `If you reading via link.txt, this file(a.txt) is in fact linked`,
  );

  console.log("Test enviroment setup\n");
});

afterAll(async () => {
  console.log("removing up the test enviroment\n");

  const testdir = Bun.file("server/test/.test.env");

  if ((await testdir.exists()) === false) {
    await rm("server/test/.test.env", { recursive: true });
  }

  console.log("Test enviroment removed\n");
});
