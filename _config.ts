import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
import nunjucks from "lume/plugins/nunjucks.ts";
import postcss from "lume/plugins/postcss.ts";
import sitemap from "lume/plugins/sitemap.ts";
import feed from "lume/plugins/feed.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import basePath from "lume/plugins/base_path.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";

const site = lume({
  location: new URL("https://jfg.name"),
});

site
  .ignore("README.md")
  .copy("img")
  .copy("favicon.ico")
  .use(postcss())
  .use(sitemap())
  .use(feed())
  .use(date())
  .use(nunjucks())
  .use(codeHighlight())
  .use(basePath())
  .use(slugifyUrls({ alphanumeric: false }))
  .use(resolveUrls());

export default site;
