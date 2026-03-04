/**
 * Return true if current process is running in production (having NODE_ENV='production')
 */
 export const isProductionEnv = (): boolean => {
    const q = process?.env?.NODE_ENV?.trim().toLowerCase();
    if (q === undefined) return false;

    return ["production", "prod"].findIndex((x) => x === q) !== -1;
};

/**
 * Return an array of allowed domains if q is a valid domain list: domain1.com, domain2.com, domain3.com
 * Otherwise null for {empty string}, {null}, {undefined}, {domain.com}
 *
 * @param q
 */
 export const getCorsOriginWhitelist = (q: string): Array<string> | null => {
    if (q === null || q === undefined) return null;

    const corsOriginWhitelist = q
        .split(",")
        .map((x) => x.trim())
        .filter((x) => x.length >= 1);

    return corsOriginWhitelist.length === 1 ? null : corsOriginWhitelist;
};
