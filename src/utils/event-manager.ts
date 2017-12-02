interface EventManagerSubscription {
  key: string;
  event: string;
  callback: Function;
}

let subscriptions: EventManagerSubscription[] = [];
let publishKeys: string[] = [];

const addSubscription = function(sub: EventManagerSubscription) {
  subscriptions.unshift(sub);
};

const removeSubscription = function(key: string) {
  subscriptions = subscriptions.filter(function(sub) {
    return sub.key !== key
  });
};

const handleEvent = function(event) {
  if(!publishKeys.length) { return; }

  subscriptions.forEach(function(sub) {
    if(publishKeys.indexOf(sub.key) >= 0 && sub.event === event.type) {
      sub.callback(event);
    }
  });  
};

export default {
  startPublishing(key: string) {
    publishKeys.push(key);
  },

  stopPublishing(key: string) {
    const index = publishKeys.indexOf(key);
    if(index < 0) { return; }
    publishKeys.splice(index, 1);
  },

  subscribe(sub: EventManagerSubscription) {
    if(!subscriptions.length) {
      document.body.addEventListener('focus', handleEvent, true);
      document.addEventListener('keydown', handleEvent);
    }

    addSubscription(sub);
  },

  unsubscribe(key: string) {
    removeSubscription(key);
    
    if(!subscriptions.length) {
      document.body.removeEventListener('focus', handleEvent, true);
      document.removeEventListener('keydown', handleEvent);
    }
  }
}