export class User{
    private username: string;
    constructor(username: string){
        this.username = username;
    }
    get getName(){
        return this.username;
    }
}