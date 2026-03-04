import { Request, Response } from "express";
import { cors } from "./cors";

describe("Testing corsHeader", () => {
    it("should use '*' for Access-Control-Allow-Origin if whitelist is null", () => {
        const res: Partial<Response> = {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            header: jest.fn<Response, [string, string]>() as any
        };
        const req: Partial<Request> = {};

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cors(req as any, res as any, jest.fn(), "*", null);
        expect(res.header).toHaveBeenCalledWith("Access-Control-Allow-Origin", "*");
        expect(res.header).toHaveBeenCalledWith("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-Auth-Token, Content-Type, Accept, Authorization, AuthUser,userName,accessToken");
        expect(res.header).toHaveBeenCalledWith("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS");
    });

    it("should use 'draphony.com' for Access-Control-Allow-Origin if whitelist is ['draphony.com', 'zeroti.com'] and req.hostname is set to 'draphony.com'", () => {
        const res: Partial<Response> = {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            header: jest.fn<Response, [string, string]>() as any
        };
        const req: Partial<Request> = {
            hostname: "draphony.com"
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cors(req as any, res as any, jest.fn(), "*", ["draphony.com", "zeroti.com"]);
        expect(res.header).toHaveBeenCalledWith("Access-Control-Allow-Origin", req.hostname);
        expect(res.header).toHaveBeenCalledWith("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-Auth-Token, Content-Type, Accept, Authorization, AuthUser,userName,accessToken");
        expect(res.header).toHaveBeenCalledWith("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS");
    });

    it("should reject 'fenidu.com' for Access-Control-Allow-Origin if whitelist is ['draphony.com', 'zeroti.com'] and req.hostname is set to 'fenidu.com'", () => {
        const res: Partial<Response> = {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            header: jest.fn<Response, [string, string]>() as any
        };
        const req: Partial<Request> = {
            hostname: "fenidu.com"
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cors(req as any, res as any, jest.fn(), "*", ["draphony.com", "zeroti.com"]);
        expect(res.header).not.toHaveBeenCalledWith("Access-Control-Allow-Origin", req.hostname);
        expect(res.header).toHaveBeenCalledWith("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-Auth-Token, Content-Type, Accept, Authorization, AuthUser,userName,accessToken");
        expect(res.header).toHaveBeenCalledWith("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS");
    });
});
