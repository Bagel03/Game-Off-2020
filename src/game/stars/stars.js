    let layers = [
      { percent:  30, size: { min: 0.4, max: 1.0 }, speed: { min:   1, max:   2 }, colors: ['#111', '#111', '#811'] }, // 1 in 3 get a tint of red
      { percent:  25, size: { min: 0.6, max: 1.2 }, speed: { min:   2, max:   4 }, colors: ['#333', '#333', '#833'] }, // 1 in 3 get a tint of red
      { percent:  15, size: { min: 0.8, max: 1.4 }, speed: { min:   4, max:   8 }, colors: ['#555', '#555', '#855'] }, // 1 in 3 get a tint of red
      { percent:  15, size: { min: 1.0, max: 1.6 }, speed: { min:   8, max:  16 }, colors: ['#777'] },
      { percent:   8, size: { min: 1.2, max: 1.8 }, speed: { min:  16, max:  32 }, colors: ['#999'] },
      { percent:   4, size: { min: 1.4, max: 2.0 }, speed: { min:  32, max:  64 }, colors: ['#BBB'] },
      { percent:   2, size: { min: 1.6, max: 2.2 }, speed: { min:  64, max: 128 }, colors: ['#DDD'] },
      { percent:   1, size: { min: 1.8, max: 2.4 }, speed: { min: 128, max: 256 }, colors: ['#FFF'] }
                ];
    let dx=0;
    let dy=0;
    const canvas = document.querySelector("canvas");
    const c = canvas.getContext("2d");

    let w;
    let h;

    const setCanvasExtents = () => {
      w = document.body.clientWidth;
      h = document.body.clientHeight;
        console.log(w+" / "+h);
      canvas.width = w;
      canvas.height = h;
    };

    setCanvasExtents();

    window.onresize = () => {
      setCanvasExtents();
    };


    const crawl = document.getElementById("crawl");
    const crawlContent = document.getElementById("crawl-content");
    const crawlContentStyle = crawlContent.style;

    // start crawl at bottom of 3d plane
    let crawlPos = crawl.clientHeight;
    console.log(crawlPos);

  const repositionStar = (star) => {
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
  };

  const randomLayer = () => {
    var i, n = Math.random()*30;
    for(i = 0 ; i < layers.length ; i++) {
        //console.log(layers[i].max);
      if (n <= layers[i].max)
        return layers[i];
    }
  };

  const initLayers = (layers) => {
    var n, sum = 0, l;
    for(n = 0 ; n < layers.length ; n++) {
      l = layers[n];
      l.min = sum;
      l.max = sum + l.percent;
      sum = l.max;
    }
    return layers;
  };

    const makeStars = count => {
      /*
        const out = [];
      for (let i = 0; i < count; i++) {
        const s = {
          x: Math.random() * 1600 - 800,
          y: Math.random() * 900 - 450,
          z: Math.random() * 1000
        };
        out.push(s);
      }
      return out;
     */   
            var n, layer, count;// = (this.height/2); // good ballpark for sensible number of stars based on screensize
    const out = [];
    for(n = 0 ; n < count ; n++) {
        var seed = Math.floor(Math.random()*8);
      layer = layers[seed];//randomLayer();
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
    };
    initLayers(layers);
    let stars = makeStars(20000);
    let warp = false;
    
     // document.addEventListener('keyup', warpSpeed);
     document.addEventListener('keydown', warpSpeed);
    function warpSpeed(e) {
        console.log(e.code);
        if ((e.code=="ShiftLeft" && !warp) || (e.code=="ShiftRight" && !warp))
        {warp = true;}
        else warp = false;
    }

    const clear = () => {
      c.fillStyle = "black";
      
          
    if(!warp)
      c.fillRect(0, 0, canvas.width, canvas.height);
    };
//DRAW
  const draw = (x,y,b) => {
    var star, n;
    for(n = 0 ; n < stars.length ; n++) {
      star = stars[n];
      c.fillStyle = star.color;
      c.beginPath();
      c.arc(star.x, star.y, star.size, 0, 2*Math.PI, true);
      c.fill();
      c.closePath();
    }
    c.fillStyle = 'white';
    c.fillText("dx: " + dx, 30, 40);
    c.fillText("dy: " + dy, 30, 50);
  };
    const putPixel = (x, y, brightness, star) => {
      const intensity = brightness * 255;
        
      const rgb = "rgb(" + intensity/1.85 + "," + intensity + "," + intensity/1.1 + ")";
      c.fillStyle = rgb;
        var ss = Math.random()*100;
      c.fillRect(x, y, star.size, star.size);
    };
//UPDATE
    const moveStars = distance => {
      const count = stars.length;
      for (var i = 0; i < count; i++) {
        const s = stars[i];
        
      //s.x = s.x + (dx * s.speed );
     // s.y = s.y + (dy * s.speed );
     // if ((s.x < 0) || (s.y < 0) || (s.x > innerWidth) || (s.y > innerHeight))
     // repositionStar(s);
        s.z -= distance;
        while (s.z <= 1) {
          s.z += 1000;
        }
      }
    };

    
    const moveCrawl = distance => {
      crawlPos -= distance;
      crawlContentStyle.top = crawlPos + "px";

      // if we've scrolled all content past the top edge
      // of the plane, reposition content at bottom of plane
      if (crawlPos < -crawlContent.clientHeight) {
        crawlPos = crawl.clientHeight;
      }
    };

    let prevTime;
    const init = time => {
      prevTime = time;
      requestAnimationFrame(tick);
    };

    const tick = time => {
      let elapsed = time - prevTime;
      prevTime = time;

      moveStars(elapsed * 0.09);
 // time-scale of crawl, increase factor to go faster
      moveCrawl(elapsed * 0.05);
      clear();

      const cx = w / 2;
      const cy = h / 2;

      const count = stars.length;
      for (var i = 0; i < count; i++) {
        const star = stars[i];

        const x = cx + star.x / (star.z * 0.001);
        const y = cy + star.y / (star.z * 0.001);

        if (x < 0 || x >= w || y < 0 || y >= h) {
          continue;
        }

        const d = star.z / 1000.0;
        const b = 1 - d * d;

        putPixel(x, y, b, star);
       //   draw(x,y,b);
      }

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(init);