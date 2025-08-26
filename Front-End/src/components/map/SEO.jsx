import { useEffect } from "react";

const SEO = ({ title, description, canonical = "/", jsonLd }) => {
  useEffect(() => {
    document.title = title;

    const setMeta = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);

    const ogTitle = document.querySelector('meta[property="og:title"]') || document.createElement("meta");
    ogTitle.setAttribute("property", "og:title");
    ogTitle.setAttribute("content", title);
    if (!ogTitle.parentElement) document.head.appendChild(ogTitle);

    const ogDesc = document.querySelector('meta[property="og:description"]') || document.createElement("meta");
    ogDesc.setAttribute("property", "og:description");
    ogDesc.setAttribute("content", description);
    if (!ogDesc.parentElement) document.head.appendChild(ogDesc);

    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonical);

    let script = document.getElementById("seo-jsonld");
    if (jsonLd) {
      if (!script) {
        script = document.createElement("script");
        script.id = "seo-jsonld";
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    } else if (script) {
      script.remove();
    }
  }, [title, description, canonical, jsonLd]);

  return null;
};

export default SEO;