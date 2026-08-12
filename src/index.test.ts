import { deepStrictEqual, equal, rejects } from "node:assert/strict";
import { describe, it } from "node:test";
import { trytm } from "./index.ts";

describe("tryTm", () => {
   it("Should return promise value if the promise resolves", async () => {
      const [data, error] = await trytm(Promise.resolve({ hey: "Bedesqui" }));

      deepStrictEqual(data, { hey: "Bedesqui" });
      equal(error, null);
   });

   it("Should return error if the promise rejects with an Error value", async () => {
      const [data, error] = await trytm(
         Promise.reject(new Error("I'm a failure")),
      );

      equal(data, null);
      equal(error instanceof Error, true);
      equal(error?.message, "I'm a failure");
   });

   it("Should throw if the promise rejects with an non-Error value", async () => {
      await rejects(
         trytm(
            Promise.reject({
               someNonErrorValue: "Maybe I'm not a failure",
            }),
         ),
         (throwable) => {
            deepStrictEqual(throwable, {
               someNonErrorValue: "Maybe I'm not a failure",
            });
            return true;
         },
      );
   });
});
