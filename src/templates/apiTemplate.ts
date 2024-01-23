const apiTemplate = (importStatement: string, apiName: string) => `
  import MockAdapter from 'axios-mock-adapter';
  import { axiosInstance } from '../services/http_request';
  ${importStatement}
  
  describe('${apiName}', () => {
    let mockedAxios: MockAdapter;
  
    beforeAll(() => {
      mockedAxios = new MockAdapter(axiosInstance);
    });
  
    afterEach(() => {
      mockedAxios.reset();
    });
  
    it('should have a test case for success when success', async () => {
      mockedAxios.onPost(/\\/otp\\/verify/).reply(200, { /* Mocked response */ });
  
      const result = await ${apiName}({ refId: 'exampleId', otp: '123456' });
  
      expect(result._unsafeUnwrap()).toBeTruthy();
    });
  
    it('should have a test case for failure when failed', async () => {
      mockedAxios.onPost(/\\/otp\\/verify/).reply(500, { /* Mocked error response */ });
  
      const result = await ${apiName}({ refId: 'exampleId', otp: '123456' });
  
      expect(result.isErr()).toBeTruthy();
    });
  });
  `;

export default apiTemplate;
