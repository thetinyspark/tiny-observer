import IEmitter from "./IEmitter";
import INotification from "./INotification";
import Notification from "./Notification";

type ObserverCB = {func:Function, limit:number, infinite:boolean};

export default class Emitter implements IEmitter{

    private _observers:Map<string,ObserverCB[]> = new Map<string,ObserverCB[]>();

    emit(eventType: string, payload:any ): void {
        const observers:ObserverCB[] = this._observers.get(eventType) || [];
        const notif:INotification = new Notification(eventType, this, payload);
        observers.forEach(
            (observer:ObserverCB)=>{
                if( observer.limit > 0 || observer.infinite){
                    observer.func(notif);
                    observer.limit--;
                }
                else{
                    this.unsubscribe(eventType, observer.func);
                }
            }
        )
    }

    hasObservers(eventType: string): boolean {
        return this._observers.get(eventType) !== undefined;
    }

    unsubscribe(eventType: string, observer: Function): void {
        if( this.isObserver(eventType, observer )){
            const observers = this._observers.get(eventType) || [];
            const index:number = observers.map(o=>o.func).indexOf(observer);
            observers.splice(index,1);
            if( observers.length === 0 )
                this._observers.set(eventType, undefined);
        }
    }

    isObserver(eventType: string, observer: Function): boolean {
        const observers:ObserverCB[] = this._observers.get(eventType) || [];
        return observers.map(o=>o.func).indexOf(observer) > -1;
    }

    subscribe(eventType: string, observer: Function, limit:number = -1): boolean {
        if( this.isObserver(eventType, observer))
            return false; 

        const observers:ObserverCB[] = this._observers.get(eventType) || [];
        observers.push( {func:observer, limit, infinite: limit < 0 });
        this._observers.set(eventType, observers);

        return true;
    }

    unsubscribeAll():void{
        this._observers = new Map<string,ObserverCB[]>();
    }


}