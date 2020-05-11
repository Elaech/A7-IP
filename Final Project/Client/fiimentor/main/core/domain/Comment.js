export class Comment {

    static contentConstraint = {
        min:0,
        max: 500,
      };

    postId: number;
    pmessageId: number;
    content: string;
    isAnonymous: false;

    constructor(comment: Comment) {
        const {postId, pmessageId, content, isAnonymous} = comment;
    
        this.postId = postId || '';
        this.pmessageId = pmessageId || '';
        this.content = content;
        this.isAnonymous = isAnonymous;
      }
}
