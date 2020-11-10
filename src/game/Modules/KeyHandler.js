
/**ADD OTHER KEYCODES, SEE CHART -->.   https://keycode.info **/

  window.Key = {
    _pressed: {},
    LEFT: "ArrowLeft",
    UP: "ArrowUp",
    RIGHT: "ArrowRight",
    DOWN: "ArrowDown",
    A: "KeyA",
    D: "KeyD",
      code: null,

    isDown: function(code) {
        
      return this._pressed[code];
    },
    
    onKeydown: function(e) {
        this.code = e.code;
      this._pressed[e.code] = true;
    },
    
    onKeyup: function(e) {
        
      delete this._pressed[e.code];
    }
  };

  window.addEventListener('keyup', function(e) { Key.onKeyup(e); }, false)
  window.addEventListener('keydown', function(e) { Key.onKeydown(e); }, false)

