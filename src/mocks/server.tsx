import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Create a new instance of the mock server worker
export const server = setupServer(...handlers);

// Start the mock server worker
//server.listen();
