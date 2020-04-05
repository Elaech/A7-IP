class Tutore extends Profesor {
 static create(partial: Partial<Tutore>) {
   return new Tutore(partial);
 }

  groupId: ?number;

  constructor(tutore: Partial<Tutore>={}) {
    super(tutore);

    const {groupId } = tutore;

    this.groupId = groupId;
  }

}
