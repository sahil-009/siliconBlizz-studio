import { Helmet } from "react-helmet-async";

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: string;
    author?: string;
    schema?: Record<string, any>;
}

export default function SEO({
    title = "SiliconBlizz Studio | AI Automation & Web Development Company",
    description = "SiliconBlizz Studio is a leading AI automation and web development company. We build scalable websites, custom apps, and automate business workflows to help you grow.",
    keywords = "SiliconBlizz, automation agency, web development company, AI automation, business process automation, software development, scalable web apps, digital transformation",
    image = "/og-image.png",
    url = "https://siliconblizz.com",
    type = "website",
    author = "SiliconBlizz Studio",
    schema,
}: SEOProps) {
    const siteTitle = title.includes("SiliconBlizz") ? title : `${title} | SiliconBlizz Studio`;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{siteTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content="SiliconBlizz Studio" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Structured Data (JSON-LD) */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
}
