import fs from "fs";
import path from "path";

export function getFixture(
  name: "AppDelegate.mm" | "MainApplication.kt" | "MainApplication.java",
): string {
  const filepath = path.join(__dirname, name);
  return fs.readFileSync(filepath, "utf8");
}
