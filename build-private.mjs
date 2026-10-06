// Encrypts private-src/index.html into private.html (AES-256-GCM, PBKDF2-SHA256 key).
// Usage: PAGE_PASSWORD='…' node build-private.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { webcrypto as crypto } from "node:crypto";

const password = process.env.PAGE_PASSWORD;
if (!password) { console.error("Set PAGE_PASSWORD"); process.exit(1); }

const ITER = 600000;
const b64 = (u8) => Buffer.from(u8).toString("base64");
const plain = readFileSync(new URL("./private-src/index.html", import.meta.url));
const salt = crypto.getRandomValues(new Uint8Array(16));
const iv = crypto.getRandomValues(new Uint8Array(12));

const base = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveKey"]);
const key = await crypto.subtle.deriveKey(
  { name: "PBKDF2", salt, iterations: ITER, hash: "SHA-256" }, base,
  { name: "AES-GCM", length: 256 }, false, ["encrypt"]);
const ct = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, plain));

const payload = JSON.stringify({ salt: b64(salt), iv: b64(iv), ct: b64(ct), iter: ITER });
const template = readFileSync(new URL("./private-gate.template.html", import.meta.url), "utf8");
writeFileSync(new URL("./private.html", import.meta.url), template.replace("__PAYLOAD__", payload));
console.log("Wrote private.html");
