const componentTemplate = (
  relativeImportPath: string,
  importStatement: string,
  componentName: string
) => `
  import { fireEvent } from '@testing-library/react';
  
  import { renderWithProviders } from '../../../test/renderWithProviders';
  ${relativeImportPath}
  
  describe('${componentName}', () => {
    it('should render correctly', () => {
      // Implement your rendering checks here
    });
  
    it('should call some function correctly', () => {
      // Implement your interaction checks here
    });
  });
  `;

export default componentTemplate;
