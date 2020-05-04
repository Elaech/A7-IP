import {DateService} from '../core/services/DateService';

export class TimeService implements DateService {
    formatTime(timestamp) {
        if(timestamp) {
            const dateOptions = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            };
            const timeOptiosn = {
                hour: '2-digit',
                minute: '2-digit',
            };

            const date = new Date(timestamp).toLocaleDateString('ro-RO', dateOptions);
            const time = new Date(timestamp).toLocaleTimeString('ro-RO', timeOptiosn);

            return date + ', ' + time;
        } else {
            return '';
        }
    }
}
