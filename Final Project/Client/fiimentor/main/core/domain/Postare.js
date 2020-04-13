export class Postare {

    static contentContraint = {
      min:0,
      max: 500,
    };
    
      id: number;
      senderId: number;
      receiverId: number[];
      title: string;
      content: string;
      time: number;
      isAnonymous: boolean;
    
      constructor(postare: Postare) {
        const {id, senderId, receiverId, content, title, time, isAnonymous} = postare;
    
        this.id = id;
        this.title = title;
        this.content = content;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.time = time;
        this.isAnonymous = isAnonymous;
      }
    
    }
    