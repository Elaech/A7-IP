import { AlertService } from '../../main/core/services/AlertService';

export class AlertServiceMock implements AlertService {
  fire() {
    return Promise.resolve({});
  }
}
