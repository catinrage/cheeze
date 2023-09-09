import type {
  Observable,
  ObservableValueType,
  Subscriber,
  Updater,
} from './types';

export class BasicObservable<T = unknown> implements Observable<T> {
  protected _subscribers: Subscriber<T>[] = [];
  constructor(protected _value: T = null as T) {}
  subscribe(subscriber: Subscriber<T>) {
    this._subscribers.push(subscriber);
    return () => {
      this._subscribers = this._subscribers.filter((s) => s !== subscriber);
    };
  }
  set(newValue: T) {
    this.value = newValue;
  }
  update(updater: Updater<T>) {
    this.value = updater(this.value);
  }
  bind<Y extends readonly Observable[]>(
    dependencies: Y,
    compute: (args: ObservableValueType<Y>) => T
  ) {
    const unsubscribers: (() => void)[] = [];
    for (const dependency of dependencies) {
      unsubscribers.push(
        dependency.subscribe(() => {
          this.value = compute(
            dependencies.map(
              (dependency: Observable) => dependency.value
            ) as ObservableValueType<Y>
          );
        })
      );
    }
    return () => {
      for (const unsubscriber of unsubscribers) {
        unsubscriber();
      }
    };
  }
  get value(): T {
    return this._value;
  }
  set value(value: T) {
    const oldValue: T = this._value;
    this._value = value;
    for (const subscriber of this._subscribers) {
      subscriber(value, oldValue);
    }
  }
}

export class InputElementObservable extends BasicObservable<string> {
  constructor(private inputElement: HTMLInputElement | HTMLTextAreaElement) {
    super(inputElement.value);
    'change input'.split(' ').forEach((eventName) => {
      inputElement.addEventListener(eventName, () => {
        this.value = inputElement.value;
      });
    });
  }
  set value(value: string) {
    this.inputElement.value = value;
    const oldValue = this._value;
    this._value = value;
    for (const subscriber of this._subscribers) {
      subscriber(value, oldValue);
    }
  }
}
