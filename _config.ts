import lume from "lume/mod.ts";
import postcss from "lume/plugins/postcss.ts";

const site = lume();
site.use(postcss());
site.ignore("README.md");
site.copy("CNAME");
site.copy("img");

export default site;
