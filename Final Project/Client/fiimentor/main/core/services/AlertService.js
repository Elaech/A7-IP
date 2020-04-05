import { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';

export interface AlertService {
  fire(content: SweetAlertOptions): Promise<SweetAlertResult>;
}
