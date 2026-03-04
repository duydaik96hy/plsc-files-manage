import { getCorsOriginWhitelist, isProductionEnv } from "./env";

describe("Testing isProductionEnv", () => {
    const nodeEnv = process.env.NODE_ENV;

    afterEach(() => {
        process.env.NODE_ENV = nodeEnv;
    });

    it("should return `false` when `NODE_ENV` is not set (undefined)", () => {
        process.env.NODE_ENV = undefined;
        expect(isProductionEnv()).toBe(false);
    });

    it("should return `false` when `NODE_ENV` is not set (null)", () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        process.env.NODE_ENV = null as any;
        expect(isProductionEnv()).toBe(false);
    });

    it("should return `false` when `NODE_ENV` is 'development'", () => {
        process.env.NODE_ENV = "development";
        expect(isProductionEnv()).toBe(false);
    });

    it("should return `true` when `NODE_ENV` is 'production'", () => {
        process.env.NODE_ENV = "production";
        expect(isProductionEnv()).toBe(true);
    });

    it("should return `true` when `NODE_ENV` is 'prod'", () => {
        process.env.NODE_ENV = "prod";
        expect(isProductionEnv()).toBe(true);
    });
});

describe("Testing getCorsOriginWhitelist", () => {
    it("should return null for q=null", () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(getCorsOriginWhitelist(null as any)).toBeNull();
    });

    it("should return null for q=undefined", () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(getCorsOriginWhitelist(undefined as any)).toBeNull();
    });

    it("should return null for q='*'", () => {
        expect(getCorsOriginWhitelist("*")).toBeNull();
    });

    it("should return null for q='domain.com'", () => {
        expect(getCorsOriginWhitelist("domain.com")).toBeNull();
    });

    it("should return null for q='https://domain.com'", () => {
        expect(getCorsOriginWhitelist("https://domain.com")).toBeNull();
    });

    it("should return ['domain1.com', 'domain2.com', 'domain3.com'] for q='domain1.com, domain2.com, domain3.com'", () => {
        expect(getCorsOriginWhitelist("domain1.com, domain2.com, domain3.com")).toStrictEqual(["domain1.com", "domain2.com", "domain3.com"]);
    });

    it("should return ['domain1.com', 'domain2.com', 'domain3.com'] for q='domain1.com, domain2.com, domain3.com,,,,,'", () => {
        expect(getCorsOriginWhitelist("domain1.com, domain2.com, domain3.com,,,,,")).toStrictEqual(["domain1.com", "domain2.com", "domain3.com"]);
    });
});
