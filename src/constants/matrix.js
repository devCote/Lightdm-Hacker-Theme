/* eslint-disable no-unused-vars */
class Matrix {
  constructor(canvas, options = {}) {
    const {
      chars = [1, 0],
      font_size = 16,
      width = window.innerWidth,
      height = window.innerHeight,
      font = "monospace",
      color = "#0F0",
      colums = 0,
      speed = 4,
      bold = true,
      background = "rgba(0, 0, 0, 0.5)",
      glowColor = "#0F0",
      glow = true,
    } = options;

    this._canvas = canvas;
    this._ctx = canvas.getContext("2d");
    this._font_size = font_size;
    this._drops = [];
    this._color = color;
    this._background = background;
    this._font = font;
    this._chars = chars || this.generateChars();
    this._run = false;
    this._width = width;
    this._height = height;
    this._columns = colums;
    this._speed = speed;
    this._frameCount = 0;
    this._bold = bold;
    this._glow = glow;
    this._glowColor = glowColor;
    this.resize(width, height);
  }

  generateChars() {
    const charRange = this.range(12449, 12534).concat(this.range(12353, 12438));
    return charRange.map((charCode) => String.fromCharCode(charCode));
  }

  range(start, end) {
    const result = [];
    for (let i = start; i <= end; i++) {
      result.push(i);
    }
    return result;
  }

  random_char() {
    return this._chars[Math.floor(Math.random() * this._chars.length)];
  }

  render_char(t, i, n) {
    if (this._bold) {
      this._ctx.font = "bold " + this._font_size + "px " + this._font;
    } else {
      this._ctx.font = this._font_size + "px " + this._font;
    }

    if (this._glow) {
      this._ctx.shadowBlur = 10;
      this._ctx.shadowColor = this._glowColor;
    }

    this._ctx.fillText(t, i, n);

    if (this._glow) {
      this._ctx.shadowBlur = 0;
      this._ctx.shadowColor = 'transparent';
    }
  }

  start() {
    let t = 0;
    this._run = true;
    const self = this;

    function n() {
      if (self._run) {
        if (self._frameCount >= self._speed) {
          self.render();
          self._frameCount = 0;
        }
        self._frameCount++;
        t++;
        requestAnimationFrame(n);
      }
    }

    n();
  }

  stop() {
    this._run = false;
  }

  reset() {
    for (let t = 0; t < this._columns; t++) {
      this._drops[t] = 255;
    }
  }

  resize(t, i) {
    this._width = t;
    this._height = i;
    this._canvas.width = t;
    setTimeout(() => {
      this._canvas.height = i;
      this.reset();
    }, 0);
    this._columns = Math.round(t / this._font_size);
  }

  clear() {
    this._ctx.fillStyle = this._background;
    this._ctx.fillRect(0, 0, this._width, this._height);
    this._ctx.fillStyle = this._color;
    this._ctx.font = this._font_size + "px " + this._font;
  }

  render() {
    this.clear();
    for (let t = 0; t < this._drops.length; t++) {
      const char = this.random_char();
      const x = t * this._font_size;
      const y = this._drops[t] * this._font_size;
      this.render_char(char, x, y);
      if (y > this._height && Math.random() > 0.975) {
        this._drops[t] = 0;
      }
      this._drops[t]++;
    }
  }
}

export default Matrix;
