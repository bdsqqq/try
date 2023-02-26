// blatantly stolen from fireship at https://www.youtube.com/watch?v=ITogH7lJTyE

export const trytm = async <T>(
   promise: Promise<T>,
): Promise<[T, null] | [null, Error]> => {
   try {
      const data = await promise;
      return [data, null];
   } catch (throwable) {
      if (throwable instanceof Error) return [null, throwable];

      throw throwable;
   }
};

export const try$ = async <T>(
   promise: Promise<T>,
): Promise<{ data: T | null; error: Error | null }> => {
   try {
      const data = await promise;
      return { data, error: null };
   } catch (throwable) {
      if (throwable instanceof Error) return { data: null, error: throwable };

      throw throwable;
   }
};
