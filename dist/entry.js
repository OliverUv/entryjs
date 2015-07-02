var Entry = {};
window.Entry = Entry;
Entry.Model = function() {
  this.data = this.schema;
};
(function(a) {
  a.schema = {id:null};
  a.get = function(c) {
    return this.data[c];
  };
  a.set = function(c) {
    for (var a in c) {
      this.data[a] = c[a];
    }
  };
})(Entry.Model.prototype);
Entry.LoopModel = function() {
  Entry.Model.call(this);
  this._observers = [];
};
Entry.LoopModel.prototype = new Entry.Model;
(function(a) {
  a.base = Entry.Model;
  a.bind = function(a) {
    this._observers.push(a);
  };
  a.unbind = function(a) {
    for (var b in this._observers) {
      if (this._observers[b] === a) {
        return this._observers.splice(b, 1), !0;
      }
    }
    return !1;
  };
  a.notify = function() {
    var a = Array.prototype.slice.call(arguments, 0), b;
    for (b in this._observers) {
      this._observers[b].update.apply(null, a);
    }
  };
})(Entry.LoopModel.prototype);
Entry.ObserverModel = function() {
  Entry.Model.call(this);
  this._observers = [];
};
Entry.ObserverModel.prototype = new Entry.Model;
(function(a) {
  a.base = Entry.Model;
  a.set = function(a) {
    this.base.prototype.set.call(this, a);
    this.notify();
  };
  a.observe = function(a) {
    this._observers.push(a);
  };
  a.unobserve = function(a) {
    for (var b in this._observers) {
      if (this._observers[b] === a) {
        return this._observers.splice(b, 1), !0;
      }
    }
    return !1;
  };
  a.notify = function() {
    var a = Array.prototype.slice.call(arguments, 0), b;
    for (b in this._observers) {
      this._observers[b].update.apply(null, a);
    }
  };
})(Entry.ObserverModel.prototype);
Entry.EntryObject = function() {
  Entry.LoopModel.call(this);
};
Entry.EntryObject.prototype = new Entry.LoopModel;
(function(a) {
  a.base = Entry.LoopModel;
  a.schema = {id:null, name:null, order:null, objectType:null, scene:null, lock:null, rotateMethod:null, entity:null, script:null, sprite:null};
})(Entry.EntryObject.prototype);
