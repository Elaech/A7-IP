import { NextRouter } from 'next/router';

import { AlertService } from './core/services/AlertService';
import { ApiService } from './core/services/ApiService';
import type {DateService} from './core/services/DateService';

interface ContextDependencies {
  alertService: AlertService;
  apiService: ApiService;
  routerService: NextRouter;
  dateService: DateService;
}
export class Context {
  static alertService: AlertService;
  static apiService: ApiService;
  static routerService: NextRouter;
  static dateService: DateService;

  static initialize(dependencies: ContextDependencies) {
    Context.alertService = dependencies.alertService;
    Context.apiService = dependencies.apiService;
    Context.routerService = dependencies.routerService;
    Context.dateService = dependencies.dateService;
  }
}
