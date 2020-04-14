export class Postare {

static contentConstraint = {
  min:0,
  max: 5000,
};

static titleConstraint = {
  min:0,
  max: 250,
};

  id: number;
  senderId: number;
  receiverId: number[];
  title: string;
  content: string;
  time: number;
  isAnonymous: boolean;

  constructor(postare: Postare) {
    const {id, senderId, receiverId, title, content, time, isAnonymous} = postare;

    this.id = id;
    this.senderId = senderId;
    this.receiverId = receiverId;
    this.title = title;
    this.content = content;
    this.time = time;
    this.isAnonymous = isAnonymous;
  }

}
