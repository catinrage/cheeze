# Cheeze

Cheeze is a TypeScript project that provides an minimal observable pattern for tracking and reacting to changes in values.

## Installation

To use Cheeze in your Node.js project, you can install it via npm/yarn/pnpm:

```bash
npm install cheeze
# or
yarn add cheeze
# or
pnpm add cheeze
```

## Usage

### Initialization

You can initiate `cheeze` with either a value or an input element.

#### Initiating with a Value

```typescript
import cheeze from 'cheeze';

const observableValue = cheeze('initial value');

observableValue.subscribe((newValue, oldValue) => {
  console.log(`Value changed from ${oldValue} to ${newValue}`);
});
```

#### Initiating with an Input Element

```typescript
import cheeze from 'cheeze';

const inputElement = document.getElementById('myInput') as HTMLInputElement;
const observableValue = cheeze(inputElement);

observableValue.subscribe((newValue, oldValue) => {
  console.log(`Value changed from ${oldValue} to ${newValue}`);
});

inputElement.value = 'New Value'; // This will trigger the subscriber function
```

### `subscribe(subscriber)`

Subscribes to changes in the value and returns a function to unsubscribe.

```typescript
const unsubscribe = observableValue.subscribe((newValue, oldValue) => {
  console.log(`Value changed from ${oldValue} to ${newValue}`);
});

// Later, to unsubscribe:
// unsubscribe();
```

### `set(newValue)`

Sets a new value for the observable.

```typescript
observableValue.set('new value');
```

### `update(updater)`

Applies an update function to the current value.

```typescript
const counter = cheeze(0);

function increase(): void {
  observableValue.update((currentValue) => currentValue + 1);
}
```

### `bind(dependencies, compute)`

Binds the observable to one or more dependencies and a compute function. When any of the dependencies change, the compute function is called with the current values of the dependencies, and the result becomes the new value of the observable.

For example, let's say we have a form with two input fields for first name and last name, and we want to automatically generate the full name:

```typescript
const firstName = cheeze(
  document.getElementById('firstName') as HTMLInputElement
);
const lastName = cheeze(
  document.getElementById('lastName') as HTMLInputElement
);
const fullName = cheeze('');

const dependencies = [firstName, lastName];
const compute = ([firstNameValue, lastNameValue]: [string, string]) =>
  `${firstNameValue} ${lastNameValue}`;

const unbind = fullName.bind(dependencies, compute);

// Later, to unbind:
// unbind();
```

## License

This project is licensed under the MIT License.
