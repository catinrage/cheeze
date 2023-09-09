import { BasicObservable, InputElementObservable } from './observable';
import type { DOMElements, ObservableValueOptions } from './types';

function isDOMInputElement(value: unknown): value is DOMElements {
  return (
    value instanceof HTMLInputElement || value instanceof HTMLTextAreaElement
  );
}

export default function cheese(input: DOMElements): InputElementObservable;
export default function cheese<T>(input: T): BasicObservable<T>;
export default function cheese(input: ObservableValueOptions) {
  if (isDOMInputElement(input)) {
    return new InputElementObservable(input);
  } else {
    return new BasicObservable(input);
  }
}
