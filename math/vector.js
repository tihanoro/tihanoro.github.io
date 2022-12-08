class vec2 {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    set(x, y){
        this.x = x;
        this.y = y;
    }
  
    setArg(r, theata){
      this.x = r*Math.cos(theata);
      this.y = r*Math.sin(theata);
    }

    abs(){
        return Math.sqrt(this.x**2 + this.y**2);
    }

    norm(){
        return new vec2(this.x/this.abs(), this.y/this.abs());
    }

    ver(){
        return new vec2(this.y, -this.x);
    }

    arg(){
        var dir = this.y/this.x;
        if(dir<0){
          return Math.atan(dir);
        }else{
          return -Math.atan(dir);
        }
        
    }
  
    add(v1){
      return new vec2(this.x + v1.x, this.y + v1.y);
    }
  
    add(v1, v2){
      return new vec2(v1.x + v2.x, v1.y + v2.y);
    }
  
    diff(v1, v2){
      return new vec2(v1.x - v2.x, v1.y - v2.y);
    }
  
  scalar(k){
    return new vec2(k*this.x, k*this.y);
  }

}

var d = 10;

var lx1 = -d;
var lx2 = d;
var ly1 = -d;
var ly2 = d;

function vectorField(v1, t){
    var v2 = new vec2();
    var x,y;
    x = Math.sin(v1.x*t);
    y = Math.cos(v1.y*t);
    v2.set(x, y);
    return v2;
}

function vectorField2(vector, pos){
  var abs = (1/((new vec2().diff(pos, vector).abs())));
  var dir = new vec2().diff(vector, pos).norm();
  return dir.scalar(abs);
}

function vectorField3(vector, pos){
  var abs = (-1/((new vec2().diff(pos, vector).abs())));
  var dir = new vec2().diff(vector, pos).norm();
  return dir.scalar(abs);
}

function vectorField4(vector, pos){
  var abs = (-1/((new vec2().diff(pos, vector).abs())));
  var dir = new vec2().diff(vector, pos).ver().norm();
  return dir.scalar(abs);
}

function vectorField5(vector, pos){
    var abs = (-1/((new vec2().diff(pos, vector).abs())));
    var dir = new vec2().diff(vector, pos).ver().scalar(-1).norm();
    return dir.scalar(abs);
  }

function L2V(vector){
  var x, y;
  x = (vector.x - lx1)*(500/(lx2-lx1));
  y = (vector.y - ly1)*(500/(ly2-ly1));
  return new vec2(x, y);
}

function Line(i, j, vector){
  var l1 = new vec2(i,j);
  var l2 = new vec2().add(l1,vector);
  var v1 = L2V(l1);
  var v2 = L2V(l2);
  stroke(0,0,0);
  line(v1.x, v1.y, v2.x, v2.y);
}

function Circle(pos, d){
  var vpos = L2V(pos);
  circle(vpos.x, vpos.y, d);
}

function setup() {
  createCanvas(500, 500);
  
}

var t = 0;

function draw() {
  background(255, 255, 255);
  var i,j;
  t += 0.01;
  var pos1 = new vec2(5*Math.cos(t), 5*Math.sin(t));
  var pos2 = new vec2(5*Math.cos(t+Math.PI), 5*Math.sin(t+Math.PI));
  var pos3 = new vec2(5*Math.cos(t+Math.PI/2), 5*Math.sin(t+Math.PI/2));
  var pos4 = new vec2(5*Math.cos(t+Math.PI*(3/2)), 5*Math.sin(t+Math.PI*(3/2)));
  var vector = new vec2();
  for(i=lx1;i<=lx2;i++){
    for(j=ly1;j<=ly2;j++){
      vector.set(i,j);
      if((1<vector.diff(vector,pos1).abs()) && (1<vector.diff(vector, pos2).abs()) && (1<vector.diff(vector,pos3).abs()) && (1<vector.diff(vector,pos4).abs())){
        Line(i, j, vector.add(vector.add(vectorField2(vector, pos1), vectorField3(vector, pos2)), vector.add(vectorField4(vector, pos3), vectorField5(vector, pos4))).scalar(1));
        // Line(i, j, vectorField4(vector, new vec2(0,0)));
      }
      // Circle(vector, 3);
    }
  }
  Circle(pos1, 500/(lx2-lx1));
  Circle(pos2, 500/(lx2-lx1));
  Circle(pos3, 500/(lx2-lx1));
  Circle(pos4, 500/(lx2-lx1));
}
