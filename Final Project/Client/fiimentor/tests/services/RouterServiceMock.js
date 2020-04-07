import { NextRouter } from 'next/router';

export class RouterServiceMock implements NextRouter {
  asPath = '';
  back = jest.fn();
  beforePopState = jest.fn();
  pathname = '/';
  prefetch = jest.fn();
  push = jest.fn();
  query = {};
  reload = jest.fn();
  replace = jest.fn();
  route = '';
  events = {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  };
}
