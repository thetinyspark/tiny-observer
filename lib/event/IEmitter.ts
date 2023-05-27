export default interface IEmitter{
    subscribe(eventType:string, subscriber:Function):boolean;
    subscribe(eventType:string, subscriber:Function, limit:number):boolean;
    isObserver(eventType:string, subscriber:Function):boolean;
    unsubscribe(eventType:string, subscriber:Function):void;
    unsubscribeAll():void;
    emit(eventType:string, payload:any, promised:boolean):void|Promise<any>;
    hasObservers(eventType:string): boolean;
}