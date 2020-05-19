import {Comment} from '../../core/domain/Comment';
export class Postare {

static contentConstraint = {
  min:0,
  max: 5000,
};

static titleConstraint = {
  min:0,
  max: 250,
};

static create(partial: Partial<Postare>) {
  return new Postare(partial);
}
  id: number;
  type: string;
  title: string;
  author: string;
  content: string;
  timestamp: number;
  isAnonymous: boolean;
  comments: Comment[];


  constructor(postare: Partial<Postare>={}) {
    const {id, type, title, content, timestamp, author, isAnonymous, comments} = postare;

    this.comments = comments;
    this.id = id;
    this.type = type;
    this.title = title;
    this.content = content;
    this.timestamp = timestamp;
    this.author = author;
    this.isAnonymous = isAnonymous;
  }

}
