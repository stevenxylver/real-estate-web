const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export interface PaginationMeta {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

export interface PropertiesResponse {
    data: any[];
    meta: {
        pagination: PaginationMeta;
    };
}

// Banner interface
export interface Banner {
    id: number;
    title: string;
    slug: string;
    image: string;
    description?: string;
}

// Fetch single banner by slug
export async function getBannerBySlug(slug: string): Promise<Banner | null> {
    try {
        const res = await fetch(
            `${STRAPI_URL}/api/banners?filters[slug][$eq]=${slug}&populate=image`,
            { cache: "no-store" }
        );

        if (!res.ok) {
            console.error("Strapi API error:", res.status, res.statusText);
            return null;
        }

        const json = await res.json();

        if (!json.data || json.data.length === 0) {
            return null;
        }

        const item = json.data[0];

        // Handle image URL
        let imageUrl = "";
        if (item.image) {
            if (item.image.url) {
                imageUrl = item.image.url;
            } else if (item.image.data?.attributes?.url) {
                imageUrl = item.image.data.attributes.url;
            }
        }

        const fullImageUrl = imageUrl
            ? (imageUrl.startsWith('http') ? imageUrl : `${STRAPI_URL}${imageUrl}`)
            : "";

        // Parse description - handle both rich text array and plain text
        let description = "";
        if (item.description) {
            if (Array.isArray(item.description)) {
                // Strapi Rich Text format (array of blocks)
                description = item.description
                    .map((block: any) => {
                        if (block.children) {
                            return block.children
                                .map((child: any) => child.text || "")
                                .join("");
                        }
                        return "";
                    })
                    .join("\n");
            } else if (typeof item.description === "string") {
                // Plain text
                description = item.description;
            }
        }

        return {
            id: item.id,
            title: item.title || "",
            slug: item.slug || "",
            image: fullImageUrl,
            description: description,
        };
    } catch (error) {
        console.error("Failed to fetch banner by slug:", error);
        return null;
    }
}

// Fetch banners from Strapi
export async function getBanners(): Promise<Banner[]> {
    try {
        const res = await fetch(
            `${STRAPI_URL}/api/banners?populate=image&sort=order:asc`,
            { cache: "no-store" }
        );

        if (!res.ok) {
            console.error("Strapi API error:", res.status, res.statusText);
            return [];
        }

        const json = await res.json();

        // Transform Strapi response to Banner interface
        return (json.data || []).map((item: any) => {
            // Handle both Strapi v4 (nested) and v5 (flat) response structures
            let imageUrl = "";

            if (item.image) {
                // Strapi v5 flat structure: item.image.url
                if (item.image.url) {
                    imageUrl = item.image.url;
                }
                // Strapi v4 nested structure: item.image.data.attributes.url
                else if (item.image.data?.attributes?.url) {
                    imageUrl = item.image.data.attributes.url;
                }
            }

            // Build full URL - add base URL if it's a relative path
            const fullImageUrl = imageUrl
                ? (imageUrl.startsWith('http') ? imageUrl : `${STRAPI_URL}${imageUrl}`)
                : "";

            return {
                id: item.id,
                title: item.title || "",
                slug: item.slug || "",
                image: fullImageUrl,
            };
        });
    } catch (error) {
        console.error("Failed to fetch banners:", error);
        return [];
    }
}

export async function getProperties(page: number = 1, pageSize: number = 6): Promise<PropertiesResponse> {
    const res = await fetch(
        `${STRAPI_URL}/api/properties?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
        { cache: "no-store" }
    );

    const json = await res.json();
    return {
        data: json.data,
        meta: json.meta
    };
}

export async function getPropertyBySlug(slug: string) {
    try {
        const res = await fetch(
            `${STRAPI_URL}/api/properties?filters[slug][$eq]=${slug}&populate=*`,
            { cache: "no-store" }
        );

        if (!res.ok) {
            console.error("Strapi API error:", res.status, res.statusText);
            return null;
        }

        const json = await res.json();
        return json.data[0] ?? null;
    } catch (error) {
        console.error("Failed to fetch property:", error);
        return null;
    }
}

export async function getLatestProperty() {
    try {
        const res = await fetch(
            `${STRAPI_URL}/api/properties?populate=*&sort=publishedAt:desc&pagination[limit]=1`,
            { cache: "no-store" }
        );

        if (!res.ok) {
            return null;
        }

        const json = await res.json();
        return json.data[0] ?? null;
    } catch (error) {
        console.error("Failed to fetch latest property:", error);
        return null;
    }
}

export interface Facility {
    id: number;
    name: string;
    description: string;
    location: string;
    type: string;
    image: string;
}

export async function getFacilities(): Promise<Facility[]> {
    try {
        const res = await fetch(
            `${STRAPI_URL}/api/facilities?populate=image`,
            { cache: "no-store" }
        );

        if (!res.ok) {
            console.error("Strapi API error:", res.status, res.statusText);
            return [];
        }

        const json = await res.json();

        // Transform Strapi response to Facility interface
        return (json.data || []).map((item: any) => {
            const imageUrl = item.image?.url || item.image?.data?.attributes?.url;
            const fullImageUrl = imageUrl
                ? (imageUrl.startsWith('http') ? imageUrl : `${STRAPI_URL}${imageUrl}`)
                : "";
            return {
                id: item.id,
                name: item.name || "",
                description: item.description || "",
                location: item.location || "",
                type: item.type || "",
                image: fullImageUrl,
            };
        });
    } catch (error) {
        console.error("Failed to fetch facilities:", error);
        return [];
    }
}

// Contact Info interface
export interface ContactInfo {
    name: string;
    title: string;
    email: string;
    nophone: string;
    linkedin: string;
    instagram: string;
    image: string;
}

// Fetch contact info from Strapi (Single Type)
export async function getContactInfo(): Promise<ContactInfo | null> {
    try {
        const res = await fetch(
            `${STRAPI_URL}/api/contact-info?populate=image`,
            { cache: "no-store" }
        );

        if (!res.ok) {
            console.error("Strapi API error:", res.status, res.statusText);
            return null;
        }

        const json = await res.json();
        const data = json.data;

        if (!data) {
            return null;
        }

        // Handle image URL
        let imageUrl = "";
        if (data.image) {
            if (data.image.url) {
                imageUrl = data.image.url;
            } else if (data.image.data?.attributes?.url) {
                imageUrl = data.image.data.attributes.url;
            }
        }

        const fullImageUrl = imageUrl
            ? (imageUrl.startsWith('http') ? imageUrl : `${STRAPI_URL}${imageUrl}`)
            : "";

        return {
            name: data.name || "",
            title: data.title || "",
            email: data.email || "",
            nophone: data.nophone || "",
            linkedin: data.linkedin || "",
            instagram: data.instagram || "",
            image: fullImageUrl,
        };
    } catch (error) {
        console.error("Failed to fetch contact info:", error);
        return null;
    }
}
