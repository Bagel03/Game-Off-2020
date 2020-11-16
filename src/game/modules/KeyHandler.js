
/**ADD OTHER KEYCODES, SEE CHART -->.   https://keycode.info **/

  window.Key = {
    _pressed: {},
    _up:null,
    LEFT: "ArrowLeft",
    UP: "ArrowUp",
    RIGHT: "ArrowRight",
    DOWN: "ArrowDown",
    A: "KeyA",
    D: "KeyD",
    S: "KeyS",
    ESC : "Escape",
    code: null,

    isDown: function(code) {
      return this._pressed[code];
    },
    isPressed: function(code) {
      return this._pressed[code];
    },
    isUp: function(code) {
      return this._pressed[code];
    },
    
    onKeypress: function(e) {
        this.code = e.code;
      this._pressed[e.code] = true;
    },

    onKeydown: function(e) {
        this.code = e.code;
      this._pressed[e.code] = true;
    },
    
    onKeyup: function(e) {
      delete this._pressed[e.code];
      this._up=e.code;
    }
  };

  window.addEventListener('keyup', function(e) { Key.onKeyup(e); }, false)
  window.addEventListener('keydown', function(e) { Key.onKeydown(e); }, false)
  window.addEventListener('keypress', function(e) { Key.onKeypress(e); }, false)

