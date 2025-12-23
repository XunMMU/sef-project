let funny: string; // example conditional export

switch (process.platform) {
  case "win32":
    funny = "win32";
    break;
  default:
    funny = "other";
}

export { funny };

// preventing undeclared variable
console.log(funny);
