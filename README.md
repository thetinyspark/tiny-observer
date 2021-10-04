# Tiny Observer
A tiny libray which implements the 'Observer' design pattern. 
You can also implement your own version according to the IEmitter and INotification interfaces

## How to install

Run this command and enjoy !
```bash
npm i @thetinyspark/tiny-observer
```

## How to use 
```typescript

    function onEvent(notification:INotification){
        console.log(notification.getEventType());
        console.log(notification.getEmitter());
        console.log(notification.getPayload());
    }

    // create an observer
    const emitter = new Emitter();
    const eventType = "myCustomEvent";

    // subscribe to a certain event
    emitter.subscribe(eventType, onEvent) ;

    // is the method/function an observer of this type on this emitter ?
    const isObserver:boolean = emitter.isObserver(eventType, onEvent);

    // is there any observer for this type ?
    const hasObservers:boolean = emitter.hasObservers(eventType);

    // emit event so the observer is triggered
    const payload = {msg: "hello world" };
    emitter.emit(eventType, paylaod); 

    // unsubscribe an observer to a specific event
    emitter.unsubscribe(eventType, onEvent); 

    // unsubcribe all observers for all events
    emitter.unsubscribeAll();
```


