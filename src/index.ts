import { BasicObservable, InputElementObservable } from './observable';
import type { DOMElements, ObservableValueOptions } from './types';

function isDOMInputElement(value: unknown): value is DOMElements {
  return (
    value instanceof HTMLInputElement || value instanceof HTMLTextAreaElement
  );
}

export default function cheeze(input: DOMElements): InputElementObservable;
export default function cheeze<T>(input: T): BasicObservable<T>;
export default function cheeze(input: ObservableValueOptions) {
  if (isDOMInputElement(input)) {
    return new InputElementObservable(input);
  } else {
    return new BasicObservable(input);
  }
}
