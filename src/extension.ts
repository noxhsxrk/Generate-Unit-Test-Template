import * as vscode from "vscode";
import * as path from "path";
import * as ts from "typescript";
import componentTemplate from "./templates/componentTemplate";
import apiTemplate from "./templates/apiTemplate";
import functionTemplate from "./templates/functionTemplate";

const generateTestFile = () => {
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    const currentFilePath = editor.document.fileName;
    const extension = path.extname(currentFilePath);

    if (
      (extension === ".tsx" || extension === ".ts") &&
      (editor.document.languageId === "typescript" ||
        editor.document.languageId === "typescriptreact")
    ) {
      const currentFileContent = editor.document.getText();
      const testFileContent = generateTestContent(
        currentFileContent,
        currentFilePath
      );

      const testFolderPath = path.join(
        path.dirname(currentFilePath),
        "__tests__"
      );
      const testFileName =
        path.basename(currentFilePath, extension) + ".spec" + extension;
      const testFilePath = path.join(testFolderPath, testFileName);

      vscode.workspace.fs.writeFile(
        vscode.Uri.file(testFilePath),
        Buffer.from(testFileContent)
      );
      vscode.window.showInformationMessage(
        `Test file generated: ${testFilePath}`
      );
    } else {
      vscode.window.showErrorMessage(
        "Please open a TypeScript or TypeScript React file before generating a test file."
      );
    }
  }
};

const isComponent = (content: string): boolean => {
  const sourceFile = ts.createSourceFile(
    "temp.tsx",
    content,
    ts.ScriptTarget.Latest,
    true
  );

  let isJsxElement = false;

  const visit = (node: ts.Node) => {
    if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
      isJsxElement = true;
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);

  return isJsxElement;
};

const isApi = (content: string): boolean => {
  return (
    /from\s+['"]\.\.\/services\/http_request['"]/i.test(content) ||
    /getGraphqlClient()/i.test(content)
  );
};

const generateTestContent = (
  originalContent: string,
  currentFilePath: string
): string => {
  const nameMatch = originalContent.match(/export\s+default\s+(\w+)/);
  const name = nameMatch ? nameMatch[1] : "YourComponentOrFunction";

  const relativeImportPath = path.relative(
    path.dirname(currentFilePath),
    path.join(path.dirname(currentFilePath), `${name}`)
  );

  const isComponentFile = isComponent(originalContent);
  const isApiFile = isApi(originalContent);

  const importStatement = `import ${
    isComponentFile || isApiFile ? name : `{ ${name} }`
  } from '../${name}';`;

  let template;
  if (isComponentFile) {
    template = componentTemplate;
  } else if (isApiFile) {
    template = apiTemplate;
  } else {
    template = functionTemplate;
  }

  return template(importStatement, relativeImportPath, name);
};

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "generate-ts-unit-test-template.generateUnitTestFile",
    () => {
      generateTestFile();
    }
  );

  context.subscriptions.push(disposable);
}
