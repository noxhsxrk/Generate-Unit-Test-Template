# Unit Test Generator Extension

This Visual Studio Code extension automates the generation of test files for TypeScript and TypeScript React projects. It provides templates for generating unit tests for components, functions, and API-related code.

## Features

- **Component Test Generation:** Automatically generates test files for React components with rendering and interaction test cases.

- **Function Test Generation:** Generates test files for TypeScript functions with a basic test case.

- **API Test Generation:** Creates test files for API-related code using Axios with mock responses.

## Installation

1. Install the extension from the Visual Studio Code Marketplace.

2. Reload or restart Visual Studio Code to activate the extension.

## Usage

1. Open a TypeScript or TypeScript React file in the editor.

2. Run the command: `Generate Unit Test Template`.

3. The extension will generate a corresponding test file in the "**tests**" folder within the same directory as the source file.

## Supported File Types

- TypeScript (.ts)
- TypeScript React (.tsx)

## Examples

### Component Test File Example

```tsx
import { fireEvent } from "@testing-library/react";

import { renderWithProviders } from "../../../test/renderWithProviders";
import YourComponentOrFunction from "../YourComponentOrFunction";

describe("YourComponentOrFunction", () => {
  it("should render correctly", () => {
    // Implement your rendering checks here
  });

  it("should call some function correctly", () => {
    // Implement your interaction checks here
  });
});
```
