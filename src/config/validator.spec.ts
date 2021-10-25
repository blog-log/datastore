import { DatabaseType, Environment } from './schema';
import { validate } from './validator';

describe('Validator', () => {
  afterEach(() => {
    // clear any possible env vars
    delete process.env['NODE_ENV'];
    delete process.env['DATABASE_TYPE'];
    delete process.env['DATABASE_URI'];
  });

  it('should return valid env config', () => {
    // setup
    process.env['NODE_ENV'] = 'test';
    process.env['DATABASE_TYPE'] = 'firebase';
    process.env['DATABASE_URI'] = 'fake-db-uri';

    // test
    const res = validate();

    // verify
    expect(res.NODE_ENV).toEqual(Environment.Test);
    expect(res.DATABASE_TYPE).toEqual(DatabaseType.Firebase);
    expect(res.DATABASE_URI).toEqual('fake-db-uri');
  });

  it('should throw error from bad node env type', () => {
    // setup
    process.env['NODE_ENV'] = 'fake-node-env';
    process.env['DATABASE_TYPE'] = 'firebase';
    process.env['DATABASE_URI'] = 'fake-db-uri';

    // test
    const test = () => {
      validate();
    };

    // verify
    expect(test).toThrow(Error);
  });

  it('should throw error from bad database type', () => {
    // setup
    process.env['NODE_ENV'] = 'test';
    process.env['DATABASE_TYPE'] = 'fake-database-type';
    process.env['DATABASE_URI'] = 'fake-db-uri';

    // test
    const test = () => {
      validate();
    };

    // verify
    expect(test).toThrow(Error);
  });
});
