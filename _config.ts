import lume from "lume/mod.ts";
import me from "me/mod.ts";

const site = lume();

site.use(me());

export default site;
