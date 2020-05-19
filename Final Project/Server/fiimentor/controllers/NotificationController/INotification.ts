export interface INotificationPrivateMessage{
    pmessageID: number,
    author: String,
    timestamp: Date
}
export interface INotificationComment{

    commentID: number,
    author: String,
    timestamp: Date
}
export interface INotificationPost{
    title: String,
    postID: number,
    author: String,
    timestamp: Date|null
}