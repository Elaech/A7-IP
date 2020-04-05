import { NextRouter } from 'next/router';

import { AlertService } from './core/services/AlertService';
import { ApiService } from './core/services/ApiService';

interface ContextDependencies {
  alertService: AlertService;
  apiService: ApiService;
  routerService: NextRouter;
}
export class Context {
  static alertService: AlertService;
  static apiService: ApiService;
  static routerService: NextRouter;

  static initialize(dependencies: ContextDependencies) {
    Context.alertService = dependencies.alertService;
    Context.apiService = dependencies.apiService;
    Context.routerService = dependencies.routerService;
  }
}
