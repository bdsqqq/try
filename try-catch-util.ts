// blatantly stolen from fireship at https://www.youtube.com/watch?v=ITogH7lJTyE

export const tryCatch = async <T>(promise: Promise<T>) => {
  try {
    const data = await promise;
    return [data, null] as const;
  } catch (error) {
    return [null, error] as const;
  }
};

// usage:
const mockPromise = new Promise<string>((resolve) => {
  setTimeout(() => {
    resolve("success");
  }, 1000);
});

const mockPromiseThatFails = new Promise<string>((_, reject) => {
  setTimeout(() => {
    reject("error");
  }, 1000);
});

async function main() {
  const [data, error] = await tryCatch(mockPromise);
  console.log(data, error);

  const [data2, error2] = await tryCatch(mockPromiseThatFails);
  console.log(data2, error2);
}
