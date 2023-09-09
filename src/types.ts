export type Subscriber<T> = (newValue: T, oldValue: T) => void;
export type Updater<T> = (currentValue: T) => T;

export interface Observable<T = unknown> {
  value: T;
  subscribe: (subscriber: Subscriber<T>) => () => void;
  set: (value: T) => void;
  update: (updater: Updater<T>) => void;
  bind: <Td extends readonly Observable[]>(
    dependencies: Td,
    compute: (args: ObservableValueType<Td>) => T
  ) => () => void;
}

export type ObservableValueType<T extends readonly Observable[]> = {
  [K in keyof T]: T[K] extends Observable<infer U> ? U : never;
};

export type DOMElements = HTMLInputElement | HTMLTextAreaElement;

export type ObservableValueOptions = DOMElements | unknown;
