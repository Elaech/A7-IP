import { Context } from '../main/Context';

import { AlertServiceMock } from './services/AlertServiceMock';
import { ApiServiceMock } from './services/ApiServiceMock';
import { RouterServiceMock } from './services/RouterServiceMock';


Context.initialize({
  alertService: new AlertServiceMock(),
  apiService: new ApiServiceMock(),
  routerService: new RouterServiceMock(),
});
