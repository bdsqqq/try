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

   it("Should return error if the promise rejects with an Error value", async () => {
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

   it("Should throw if the promise rejects with an non-Error value", async () => {
      expect.assertions(1);

      const promiseFn = vi
         .fn()
         .mockImplementationOnce(async () =>
            Promise.reject({ someNonErrorValue: "Maybe I'm not a failure" }),
         );

      await trytm(promiseFn()).catch((throwable) => {
         expect(throwable).toEqual({
            someNonErrorValue: "Maybe I'm not a failure",
         });
      });
   });
});
