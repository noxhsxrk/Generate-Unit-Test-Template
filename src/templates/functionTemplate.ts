const functionTemplate = (importStatement: string, functionName: string) => `
  import { vi } from '../../../test/testUtils'; // You may need to adjust this import based on your setup
  ${importStatement}
  
  describe('${functionName}', () => {
    beforeEach(() => {
      // Add any setup code specific to the function tests
    });
  
    it('should have a test case when success', () => {
      // Implement your function test case here
    });
  
    it('should have a test case when failed', () => {
      // Implement your function test case here
    });
  });
  `;

export default functionTemplate;
