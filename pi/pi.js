//canvas要素の大きさ
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

//変数の準備
var ctx;
const FPS = 1000;
const TIME = 1000/FPS;
var total = 0;
var In = 0;

//ベクトルクラスの実装
class vec2{
    //
    constructor(x=0, y=0){
        this.x = x;
        this.y = y;
    }

    //足し算メゾット
    add(v){
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    //ベクトルを複製するメゾット
    clone(){
        return new vec2(this.x, this.y);
    }

    //静的足し算メゾット
    static add(v1, v2){
        return v1.clone().add(v2);
    }
}

//原点の位置を定義
var origin = new vec2((CANVAS_WIDTH/2),(CANVAS_HEIGHT/2));

//bodyが読み込まれたときに実行される関数
//
function init(){
    //canvas要素を取得
    let pi = document.getElementById("pi");
    if(pi.getContext){
        ctx = pi.getContext("2d");

        //canvasのサイズを指定
        pi.width = CANVAS_WIDTH;
        pi.height = CANVAS_HEIGHT;

        //背景の描画
        draw_init();

        //点を打ちまくる
        setInterval(draw,TIME);
    }
}

//繰り返し実行される関数
function draw(){
    //文字を消す処理
    ctx.clearRect(0,360,CANVAS_WIDTH,400);

    //乱数の代入と変数の準備
    let tempX = getRandomInt(200) - 100;
    let tempY = getRandomInt(200) - 100;
    let pi;

    //円の中か外の判定
    ctx.fillStyle = "rgb(255,0,0)"
    if((tempX**2)+(tempY**2) <= 100**2){
        In++;
        ctx.fillStyle = "rgb(0,0,255)"
    }
    total++;

    //piの計算
    pi = 4*In/total;

    //点の描画処理
    let v1 = new　vec2(tempX,tempY);
    v1.y *= -1;
    let screen = vec2.add(v1,origin);
    ctx.fillRect(screen.x,screen.y,1,1);


    //piとtotalの表示
    ctx.fillStyle = "rgb(0,0,0)"
    ctx.fillText(pi,0,380);
    ctx.fillText(total,0,400);
}

//背景を描画する関数
function draw_init(){
    //x軸
    ctx.beginPath();
    ctx.moveTo(0,CANVAS_HEIGHT/2);
    ctx.lineTo(CANVAS_WIDTH,CANVAS_HEIGHT/2);
    ctx.stroke();
    ctx.font = "20px serif";
    ctx.fillText("x",CANVAS_WIDTH-20,(CANVAS_HEIGHT/2)+20);

    //y軸
    ctx.beginPath();
    ctx.moveTo(CANVAS_WIDTH/2,CANVAS_HEIGHT);
    ctx.lineTo(CANVAS_WIDTH/2,0);
    ctx.stroke();
    ctx.fillText("y",(CANVAS_WIDTH/2)+10,15);

    //原点
    ctx.fillText("O",(CANVAS_WIDTH/2)-20,(CANVAS_HEIGHT/2)+20);

    //四角形
    ctx.beginPath();
    ctx.moveTo(100,100);
    ctx.lineTo(100,300);
    ctx.lineTo(300,300);
    ctx.lineTo(300,100);
    ctx.lineTo(100,100);
    ctx.stroke();

    //円
    let t;
    for(t=0;t<=2*Math.PI;t+=0.01){
        let v2 = new vec2(100,t);
        let v1 = new vec2(v2.x*Math.cos(v2.y),v2.x*Math.sin(v2.y));
        v1.y *= -1;
        let screen = vec2.add(v1, origin);
        ctx.fillRect(screen.x, screen.y, 1, 1);
    }
}

//乱数を返す関数
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max+1));
}
