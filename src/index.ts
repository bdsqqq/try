// blatantly stolen from fireship at https://www.youtube.com/watch?v=ITogH7lJTyE

export const trytm = async <T>(promise: Promise<T>) => {
   try {
      const data = await promise;
      return [data, null] as const;
   } catch (error) {
      return [null, error] as const;
   }
};
