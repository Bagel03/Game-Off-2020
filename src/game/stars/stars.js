
namespace `game.stars` (

    
  
    
  class Stars {

    constructor() {
      //super();
        this.layers = [
        { percent:  30, size: { min: 0.4, max: 1.0 }, speed: { min:   1, max:   2 }, colors: ['#111', '#111', '#811'] }, // 1 in 3 get a tint of red
        { percent:  25, size: { min: 0.6, max: 1.2 }, speed: { min:   2, max:   4 }, colors: ['#333', '#333', '#833'] }, // 1 in 3 get a tint of red
        { percent:  15, size: { min: 0.8, max: 1.4 }, speed: { min:   4, max:   8 }, colors: ['#555', '#555', '#855'] }, // 1 in 3 get a tint of red
        { percent:  15, size: { min: 1.0, max: 1.6 }, speed: { min:   8, max:  16 }, colors: ['#777'] },
        { percent:   8, size: { min: 1.2, max: 1.8 }, speed: { min:  16, max:  32 }, colors: ['#999'] },
        { percent:   4, size: { min: 1.4, max: 2.0 }, speed: { min:  32, max:  64 }, colors: ['#BBB'] },
        { percent:   2, size: { min: 1.6, max: 2.2 }, speed: { min:  64, max: 128 }, colors: ['#DDD'] },
        { percent:   1, size: { min: 1.8, max: 2.4 }, speed: { min: 128, max: 256 }, colors: ['#FFF'] }
                  ];
      this.dx=0;
      this.dy=0;
      this.canvas = document.querySelector("canvas");
      this.c = this.canvas.getContext("2d");
  
      this.w;
      this.h;  
    
    this.setCanvasExtents();
    
    this.crawl = document.getElementById("crawl");
     this.crawlContent = document.getElementById("crawl-content");
     this.crawlContentStyle = this.crawlContent.style;
  
      // start crawl at bottom of 3d plane
      this.crawlPos = this.crawl.clientHeight;
      //console.log(crawlPos);
    this.initLayers(this.layers);
      this.stars = this.makeStars(10000);
      this.warp = false;

    
    window.onresize = () => {
        this.setCanvasExtents();
      };
    
    this.prevTime = 0;
    
}
    
   init (time) {
      this.prevTime = time;
      //requestAnimationFrame(this.tick);
    }

   setCanvasExtents () {
        this.w = document.body.clientWidth;
        this.h = document.body.clientHeight;
          //console.log(w+" / "+h);
        this.canvas.width = this.w;
        this.canvas.height = this.h;
      }
    
    repositionStar (star)  {
      var horizontal = (dy == 0);
      var vertical   = (dx == 0);
      if (horizontal || (!horizontal && !vertical )) {
        star.x = (dx > 0) ? 0 : innerWidth;
        star.y = Math.random()*innerHeight;
      }
      else {
        star.x = Math.random()*innerWidth;
        star.y = (dy > 0) ? 0 : innerHeight;
      }
    }
  
    randomLayer () {
      var i, n = Math.random()*30;
      for(i = 0 ; i < layers.length ; i++) {
          //console.log(layers[i].max);
        if (n <= layers[i].max)
          return layers[i];
      }
    }
  
    initLayers (layers) {
      var n, sum = 0, l;
      for(n = 0 ; n < layers.length ; n++) {
        l = layers[n];
        l.min = sum;
        l.max = sum + l.percent;
        sum = l.max;
      }
      return layers;
    }
  
     makeStars (count) {
 
      var n, layer, count;// = (this.height/2); // good ballpark for sensible number of stars based on screensize
      const out = [];
      for(n = 0 ; n < count ; n++) {
          var seed = Math.floor(Math.random()*8);
        layer = this.layers[seed];//randomLayer();
          //console.log(layer);
        out.push({
          layer: layer,
          color: layer.colors[0],
          speed: Math.random()*layer.speed.max,
          size:  Math.random()*layer.size.max,
          x:     Math.random()* 1600 - 800,
          y:     Math.random()* 900 - 450,
          z: Math.random() * 1000
            
        });
         //console.log(out);
      }
        return out;  
      }

   

      clear () {
        this.c.fillStyle = "black";
        if(!this.warp)
        this.c.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
        
      putPixel (x, y, brightness, star) {
        const intensity = brightness * 255;
        
        const rgb = "rgb(" + intensity/1.85 + "," + intensity + "," + intensity/1.1 + ")";
        this.c.fillStyle = rgb;
        var ss = Math.random()*100;
        this.c.fillRect(x, y, star.size, star.size);
        }

     moveStars (distance) {
      const count = this.stars.length;
      for (var i = 0; i < count; i++) {
        const s = this.stars[i];
      //s.x = s.x + (dx * s.speed );
     // s.y = s.y + (dy * s.speed );
     // if ((s.x < 0) || (s.y < 0) || (s.x > innerWidth) || (s.y > innerHeight))
     // repositionStar(s);
        s.z -= distance;
        while (s.z <= 1) {
          s.z += 1000;
        }
      }
    }

    
     moveCrawl (distance) {
      this.crawlPos -= distance;
      this.crawlContentStyle.top = this.crawlPos + "px";

      // if we've scrolled all content past the top edge
      // of the plane, reposition content at bottom of plane
      if (this.crawlPos < -this.crawlContent.clientHeight) {
        this.crawlPos = this.crawl.clientHeight;
      }
    }

    tick (time, step) {
        console.log(time+" "+step);
        //this.prevTime = time;
      let elapsed = time - this.prevTime;
      this.prevTime = time;

      this.moveStars(elapsed * 0.09);
 // time-scale of crawl, increase factor to go faster
      this.moveCrawl(elapsed * 0.05);
      this.clear();

      const cx = this.w / 2;
      const cy = this.h / 2;

      const count = this.stars.length;
      for (var i = 0; i < count; i++) {
        const star = this.stars[i];

        const x = cx + star.x / (star.z * 0.001);
        const y = cy + star.y / (star.z * 0.001);

        if (x < 0 || x >= this.w || y < 0 || y >= this.h) {
          continue;
        }

        const d = star.z / 1000.0;
        const b = 1 - d * d;

        this.putPixel(x, y, b, star);
       //   draw(x,y,b);
      }

      //requestAnimationFrame(this.tick);
    }

onUpdate(time,delta) {
      
     /* document.addEventListener('keydown', warpSpeed);
      function warpSpeed(e) {
          console.log(e.code);
          if ((e.code=="ShiftLeft" && !this.warp) || (e.code=="ShiftRight" && !this.warp))
          {this.warp = true;}
          else this.warp = false;
      }*/
  
    //UPDATE
  //this.prevTime = time;
    this.tick(time, delta);
 



    //requestAnimationFrame(init);
    
    }

    onDraw() {
      //DRAW
      const draw = (x,y,b) => {
      var star, n;
      for(n = 0 ; n < this.stars.length ; n++) {
      star = this.stars[n];
        this.c.fillStyle = star.color;
         this.c.beginPath();
         this.c.arc(star.x, star.y, star.size, 0, 2*Math.PI, true);
        this.c.fill();
        this.c.closePath();
       }
     this.c.fillStyle = 'white';
     this.c.fillText("dx: " + dx, 30, 40);
     this.c.fillText("dy: " + dy, 30, 50);
      };
      
    
    
    }

    



  }
  )