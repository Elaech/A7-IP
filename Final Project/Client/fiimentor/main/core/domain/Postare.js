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
  type: string;
  title: string;
  author: string;
  content: string;
  timestamp: number;
  isAnonymous: boolean;

  constructor(postare: Postare) {
    const {id, type, title, content, timestamp, author, isAnonymous} = postare;

    this.id = id;
    this.type = type;
    this.title = title;
    this.content = content;
    this.timestamp = timestamp;
    this.author = author;
    this.isAnonymous = isAnonymous;
  }

}
