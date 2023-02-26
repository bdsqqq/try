# Try™

Don't let the Try Catch Tower of Terror destroy your beautiful one liners.

## Usage

```
npm install @bdsqqq/try
```

```TS

import { trytm } from "@bdsqqq/try";

const mockPromise = () => {
  return new Promise<string>((resolve, _) => {
    setTimeout(() => {
      resolve("hello from promise");
    }, 1000);
  });
};

const mockPromiseThatFails = () => {
  return new Promise<string>((_, reject) => {
    setTimeout(() => {
      reject(new Error("hello from promise"));
    }, 1000);
  });
};

const [data, error] = await trytm(mockPromise());
const [data2, error2] = await trytm(mockPromiseThatFails());
```

## Why does this exist?

Async await feels like heaven because it avoids the callback hell or Pyramid of Doom by writing asyncronous code in a line by line format:

```TS
function hell() {
   step1((a) => {
      step2((b) => {
         step3((c) => {
            // ...
         })
      })
   })
}

async function heaven(){
   const a = await step1();
   const b = await step2(a);
   const c = await step3(b);
   // ...
}

```

Until error handling comes into play... Because then you end up with the Try-Catch Tower of Terror, where your beautiful one-liners magically expand to at least 5 lines of code:

```TS
async function Terror(){
   let a;
   let b;
   let c;

   try {
      a = await step1();
   } catch (error) {
      handle(error);
   }


   try {
      b = await step2(a);
   } catch (error) {
      handle(error);
   }


   try {
      c = await step3(b);
   } catch (error) {
      handle(error);
   }

   // ...
}

```

An easy solution would be to append the `.catch()` method to the end of each promise:

```TS

async function easy(){
   const a = await step1().catch(err => handle(err));
   const b = await step2(a).catch(err => handle(err));
   const c = await step3(b).catch(err => handle(err));
   // ...
}

```

This approach solves the issue but can get a bit repetitive, another approach is to create a function that implements one Try Catch to replace all the others:

```TS

import { trytm } from "@bdsqqq/try"

async function awesome() {
   const [aData, aError] = await trytm(step1());
   if(aError) // ...

   const [bData, bError] = await trytm(step2(aData));
   if(bError) // ...

   const [cData, cError] = await trytm(step3(bData));
   if(cError) // ...

   // ...
}
```

You can also use the `try$` function to collapse the error and data into a single object:

```TS
import { try$ } from "@bdsqqq/try"

async function awesome() {
   const a = await try$(step1());
   if(a.error) // ...

   const b = await try$(step2(a.data));
   if(b.error) // ...

   const c = await try$(step3(b.data));
   if(c.error) // ...
   
   // ...
}
```

### Why does this REALLY exist?

I watched [a fireship short](https://www.youtube.com/watch?v=ITogH7lJTyE) and ended up in a rabbit hole to learn how to publish a NPM package. This is still an interesting pattern to use in your codebase but might be best copy pasted instead of being a dependency.

I'll leave the source code here so you don't have to look for the one .ts file in the /src folder:

```TS
export const trytm = async <T>(promise: Promise<T>) => {
   try {
      const data = await promise;
      return [data, null] as const;
   } catch (error) {
      return [null, error] as const;
   }
};
```

## Attributions

This code is blatantly stolen from [a fireship youtube short](https://www.youtube.com/watch?v=ITogH7lJTyE), with minor additions to make `data` infer its typing from the promise passed as an argument.
