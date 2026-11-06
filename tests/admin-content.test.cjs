const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

function loadModule(file, mocks = {}, cache = new Map()) {
  const absolute = path.resolve(__dirname, "..", file);
  if (cache.has(absolute)) return cache.get(absolute).exports;
  const module = { exports: {} };
  cache.set(absolute, module);
  const requireFile = (name) => {
    if (name in mocks) return mocks[name];
    if (name.startsWith("@/"))
      return loadModule(name.slice(2) + ".ts", mocks, cache);
    return require(name);
  };
  vm.runInNewContext(
    ts.transpileModule(fs.readFileSync(absolute, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
      },
    }).outputText,
    {
      module,
      exports: module.exports,
      require: requireFile,
      process: { env: {} },
      URL,
      Request,
      Response,
      Buffer,
      console: { error: () => {} },
    },
    { filename: absolute },
  );
  return module.exports;
}
function fixture({
  rows = [],
  initialized = false,
  configured = true,
  fail = false,
} = {}) {
  const list = async () => {
    if (fail) throw Error("Database unavailable");
    return rows;
  };
  return loadModule("src/lib/content-loader.ts", {
    "@/src/lib/db": {
      getSql: () => (configured ? {} : null),
      listProjects: list,
      listServices: async (_, opts) =>
        opts?.publishedOnly ? rows.filter((r) => r.published) : rows,
      listPackages: async (_, opts) =>
        opts?.publishedOnly ? rows.filter((r) => r.published) : rows,
      listTestimonials: async (_, opts) =>
        opts?.publishedOnly ? rows.filter((r) => r.published) : rows,
      isContentInitialized: async () => initialized,
    },
  });
}
const row = {
  id: 22,
  slug: "impactdesk-legacy",
  title: "ImpactDesk updated in admin",
  published: true,
  featured: true,
  sort_order: 0,
  image: "/uploaded.jpg",
  role: "Lead developer",
  stack: ["React", "PostgreSQL"],
  image_fit: "cover",
  image_position: "center",
  project_url: "https://example.com",
  image_caption: "Uploaded preview",
  problem: "Updated problem",
};

test("admin edits replace a built-in alias instead of being silently overridden", async () => {
  const projects = await fixture({ rows: [row] }).getPublicProjects();
  const matches = projects.filter((p) => p.title.startsWith("ImpactDesk"));
  assert.equal(matches.length, 1);
  assert.equal(matches[0].image, "/uploaded.jpg");
  assert.equal(matches[0].role, "Lead developer");
  assert.equal(matches[0].stack.join(","), "React,PostgreSQL");
  assert.equal(matches[0].projectUrl, "https://example.com");
  assert.equal(matches[0].imagePosition, "center");
});
test("a draft override cannot reveal its built-in counterpart", async () => {
  const projects = await fixture({
    rows: [{ ...row, published: false }],
  }).getPublicProjects();
  assert.equal(
    projects.filter((p) => p.title.startsWith("ImpactDesk")).length,
    0,
  );
});
test("initialized empty collections remain empty after deletion", async () => {
  const content = fixture({ initialized: true });
  for (const method of [
    "getPublicProjects",
    "getPublicServices",
    "getPublicPackages",
    "getPublicTestimonials",
  ])
    assert.equal((await content[method]()).length, 0, method);
});
test("initialized projects preserve admin order and hide drafts", async () => {
  const projects = await fixture({
    initialized: true,
    rows: [
      { ...row, id: 30, slug: "first", title: "First" },
      { ...row, id: 31, slug: "draft", title: "Draft", published: false },
      { ...row, id: 32, slug: "last", title: "Last" },
    ],
  }).getPublicProjects();
  assert.equal(projects.map((p) => p.id).join(","), "first,last");
});
test("an unavailable configured database does not republish old projects", async () => {
  assert.equal((await fixture({ fail: true }).getPublicProjects()).length, 0);
});
test("no-database development keeps the reviewed Heroes Help case study", async () => {
  const projects = await fixture({ configured: false }).getPublicProjects();
  assert(
    projects.some(
      (p) =>
        p.id === "heroes-help-social" &&
        p.title === "Heroes Help Social Media Programme",
    ),
  );
});
test("project input validates links, images, booleans, and partial updates", () => {
  const { parseProjectInput } = loadModule("src/lib/project-input.ts");
  assert.throws(
    () =>
      parseProjectInput({ title: "Test", project_url: "javascript:alert(1)" }),
    /https or http/,
  );
  assert.throws(
    () =>
      parseProjectInput({
        title: "Test",
        image: "data:image/svg+xml;base64,AAAA",
      }),
    /image/,
  );
  assert.throws(
    () => parseProjectInput({ title: "Test", published: "false" }),
    /true or false/,
  );
  assert.throws(() => parseProjectInput({ title: "   " }), /required/);
  const result = parseProjectInput(
    {
      stack: "React, Django\nReact",
      image_fit: "cover",
      image_position: "center",
      published: false,
    },
    true,
  );
  assert.equal(result.stack.join(","), "React,Django");
  assert.equal(result.published, false);
  assert.equal(result.image_position, "center");
  assert(!("title" in result));
});

test("public pages reference uploads by URL instead of serializing base64", async () => {
  const content = fixture({
    initialized: true,
    rows: [
      {
        ...row,
        image: "data:image/png;base64,AAAA",
        updated_at: "2026-11-06T00:00:00Z",
      },
    ],
  });
  const project = (await content.getPublicProjects())[0];
  assert(project.image.startsWith("/api/project-images/22?v="));
  assert(!project.image.includes("base64"));
});

test("image delivery returns published bytes and ETags; drafts and SVG data are rejected", async () => {
  let image = "data:image/png;base64,aGVsbG8=";
  let published = true;
  const sql = async (strings) => {
    assert(strings.join("").includes("published = true"));
    return published ? [{ image }] : [];
  };
  const { GET } = loadModule("src/app/api/project-images/[id]/route.ts", {
    "@/src/lib/db": { getSql: () => sql },
  });
  const response = await GET(
    new Request("https://example.com/api/project-images/22"),
    { params: { id: "22" } },
  );
  assert.equal(response.status, 200);
  assert.equal(await response.text(), "hello");
  const cached = await GET(
    new Request("https://example.com/api/project-images/22", {
      headers: { "if-none-match": response.headers.get("etag") },
    }),
    { params: { id: "22" } },
  );
  assert.equal(cached.status, 304);
  published = false;
  assert.equal(
    (await GET(new Request("https://example.com"), { params: { id: "22" } }))
      .status,
    404,
  );
  published = true;
  image = "data:image/svg+xml;base64,AAAA";
  assert.equal(
    (await GET(new Request("https://example.com"), { params: { id: "22" } }))
      .status,
    404,
  );
});
