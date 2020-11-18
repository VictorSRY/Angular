import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class LogService{
    log:boolean=true
    
    public data(...args){
        if(this.log){
            console.log(...args)
        }
    }
}