import { Helmet } from "react-helmet-async";

/**
 * Per-route overrides only. The site-wide SEO, Open Graph and JSON-LD tags live in
 * index.html so crawlers that don't run JavaScript (social link previews) see them.
 * Rendering those same tags here would duplicate them.
 */
interface SEOProps {
    title?: string;
    noindex?: boolean;
}

export default function SEO({ title, noindex = false }: SEOProps) {
    const siteTitle = title && !title.includes("SiliconBlizz") ? `${title} | SiliconBlizz Studio` : title;

    return (
        <Helmet>
            {siteTitle && <title>{siteTitle}</title>}
            {noindex && <meta name="robots" content="noindex, follow" />}
        </Helmet>
    );
}
