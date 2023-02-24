import { describe, it, vi, expect } from "vitest";
import { trytm } from ".";

describe("tryTm", () => {
   it("Should return promise value if the promise resolves", async () => {
      const promiseFn = vi
         .fn()
         .mockImplementationOnce(async () =>
            Promise.resolve({ hey: "Bedesqui" }),
         );

      const [data, error] = await trytm(promiseFn());

      expect(data).toStrictEqual({ hey: "Bedesqui" });
      expect(error).toBeNull();
   });

   it("Should return error if the promise rejects", async () => {
      const promiseFn = vi
         .fn()
         .mockImplementationOnce(async () =>
            Promise.reject(new Error("I'm a failure")),
         );

      const [data, error] = await trytm(promiseFn());

      expect(data).toBeNull();
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toBe("I'm a failure");
   });

   it("Should return 'data' kind if the promise resolves", async () => {
      const promiseFn = vi
         .fn()
         .mockImplementationOnce(async () =>
            Promise.resolve({ hey: "Bedesqui" }),
         );

      const [data, error, kind] = await trytm(promiseFn());

      expect(kind).toStrictEqual("data");
      expect(data).toStrictEqual({ hey: "Bedesqui" });
      expect(error).toBeNull();
   });

   it("Should return 'error' kind if the promise rejects", async () => {
      const promiseFn = vi
         .fn()
         .mockImplementationOnce(async () =>
            Promise.reject(new Error("I'm a failure")),
         );

      const [data, error] = await trytm(promiseFn());

      expect(kind).toStrictEqual("error");
      expect(data).toBeNull();
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toBe("I'm a failure");
   });
});
