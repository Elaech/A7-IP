import { Profesor } from './Profesor';

export class Tutore extends Profesor {
 static createTutore(partial: Partial<Tutore>) {
   return new Tutore(partial);
 }

  groupId: ?number;

  constructor(tutore: Partial<Tutore>={}) {
    super(tutore);

    const {groupId } = tutore;

    this.groupId = groupId;
    this.role = 'tutor';
  }

}
