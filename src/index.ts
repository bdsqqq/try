// blatantly stolen from fireship at https://www.youtube.com/watch?v=ITogH7lJTyE

export const trytm = async <T>(promise: Promise<T>) => {
   try {
      const data = await promise;
      return [data, null, 'data'] as const;
   } catch (error) {
      return [null, error, 'error'] as const;
   }
};
