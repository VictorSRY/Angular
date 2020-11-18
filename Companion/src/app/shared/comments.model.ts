export class Comment{
    constructor(public author:string, private author_id:string, public heading:string,public message:string,public date:string,public likes:string){}
        get authorId(){
        return this.author_id
    }
}