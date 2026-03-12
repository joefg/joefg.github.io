import lumeCMS from "lume/cms/mod.ts";

const cms = lumeCMS({
  site: {
    name: "jfg.name CMS",
    url: "https://jfg.name"
  }
});

cms.storage("posts", "posts/*.md")
cms.collection("posts", "posts")
cms.collection({
  name: "posts",
  description: "Blog posts",
  store: "posts",
  fields: [
    "title: text",
    "date: datetime",
    "content: markdown"
  ]
})

export default cms;
