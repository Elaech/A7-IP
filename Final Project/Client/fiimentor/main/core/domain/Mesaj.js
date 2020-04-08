export class Mesaj {

static contentContraint = {
  min:0,
  max: 500,
};

  id: number;
  senderId: number;
  receiverId: number[];
  content: string;
  time: number;
  isAnonymous: boolean;

  constructor(mesaj: Mesaj) {
    const {id, senderId, receiverId, content, time, isAnonymous} = mesaj;

    this.id = id;
    this.content = content;
    this.senderId = senderId;
    this.receiverId = receiverId;
    this.time = time;
    this.isAnonymous = isAnonymous;
  }

}
