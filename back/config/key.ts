import { mongoURI as prod } from './prod';
import { mongoURI as dev } from './dev';

let mongoURI: string;

if (process.env.NODE_ENV === 'production') {
  mongoURI = prod;
} else {
  mongoURI = dev;
}

export default mongoURI;
