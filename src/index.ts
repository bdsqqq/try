// blatantly stolen from fireship at https://www.youtube.com/watch?v=ITogH7lJTyE

export class OK<T> extends Array<T | null> {
   public readonly [0]: null = null;
   public readonly [1]: T;
   public error: null = null;
   public data: T;

   constructor(data: T) {
      super(2);  
      this[1] = data;
      this.data = data;
   }
}

export class ERR<E> extends Array<E | null> {
   public readonly [0]: E;
   public readonly [1]: null = null;
   public data: null = null;
   public error: E;

   constructor(error: E) {
      super(2);  
      this[0] = error;
      this.error = error;
   }
} 

export const trytm = async <T>(
   promise: Promise<T>,
): Promise<OK<T> | ERR<Error>> => {
   try {
      const data = await promise;
      return new OK(data);
   } catch (throwable) {
      if (throwable instanceof Error) return new ERR(throwable);

      throw throwable;
   }
};
