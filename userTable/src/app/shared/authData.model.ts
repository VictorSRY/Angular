export class AuthDataModel{
    constructor(public email:string,public userId:string,private _token:string,private _tokenExp:Date){ }
    
    get token(){
        return this._token
    }
    get tokenExp(){
        return this._tokenExp
    }
}