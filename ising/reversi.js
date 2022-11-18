//=============================
// reversi.js
// リバーシができるプログラム
//=============================

// 定数
//====================================================
const SPACE = 0;  // 空白
const BLACK = 1;  // 黒石
const WHITE = -1; // 白石

const L = 300;  // マス目の数
const N = L*L;
// const J = 1; 
const BOARD_PX_SIZE = 600;              // 盤面のサイズ
const CELL_PX_SIZE = BOARD_PX_SIZE / L; // マスのサイズ
const CELL_PX_R = CELL_PX_SIZE * 0.45;   // マスの半径
const CHAR_SIZE = 25; // 文字の大きさ

const BLACK_COLOR = "rgb(50,50,50)";
const WHITE_COLOR = "rgb(200,200,200)";
// const BLACK_COLOR = "rgb(41,37,34)";
// const WHITE_COLOR = "rgb(79,172,135)";
//====================================================

// グローバル変数
//====================================================
var array = [];
for(i=0;i<L;i++){
	array[i] = [];
	for(j=0;j<L;j++){
		array[i][j] = 1;
	}
}
var loop_num; // ループの回数を記録する変数
var kt; // 熱浴の温度
var J = 1; // 交換相互作用

var cs;
var ctx;
//====================================================

// 関数
//====================================================

// 盤面を書く関数
function drawBW(x, y){
	if(array[x][y] == BLACK){
		writeBlackCell(y, x);
	}else if(array[x][y] == WHITE){
		writeWhiteCell(y, x);
	}
}

function spin_random(){
	for(i=0;i<L;i++){
		array[i] = [];
		for(j=0;j<L;j++){
			if(Math.random() < 0.5){
				array[i][j] = 1;
			}else{
				array[i][j] = -1;
			}
		}
	}
    printBoard();
}

function spin_kougo(){
	for(i=0;i<L;i++){
		array[i] = [];
		for(j=0;j<L;j++){
			if((i+j)%2 == 0){
				array[i][j] = 1;
			}else{
				array[i][j] = -1;
			}
		}
	}
    printBoard();
}

function spin_black(){
	for(i=0;i<L;i++){
		array[i] = [];
		for(j=0;j<L;j++){
			array[i][j] = BLACK;
		}
	}
    printBoard();
}

function spin_white(){
	for(i=0;i<L;i++){
		array[i] = [];
		for(j=0;j<L;j++){
			array[i][j] = WHITE;
		}
	}
    printBoard();
}

function getRandomInt(max) {
  return Math.floor(Math.random()*max);
}

function diffEnergy(x, y){
    var sum;
    sum = array[(x+1)%L][y] + array[Math.abs((x-1)%L)][y] + array[x][(y+1)%L] + array[x][Math.abs((y-1)%L)];
    return 2*J*array[x][y]*sum;
}

function metropolis2D(){
    var x, y;
    var diffen;
    loop_num += 1;
    // ランダムに選択した1点を反転させた時のエネルギーの差を計算する処理
    x = getRandomInt(L);
    y = getRandomInt(L);
    diffen = diffEnergy(x, y);

    // メトロポリス法によるスピンが反転するかの判定
    if((diffen<=0) || (Math.exp(-diffen/kt) >= Math.random())){
        array[x][y] *= -1;
        drawBW(x, y);
    }
    ctx.clearRect(0, BOARD_PX_SIZE, cs.width, cs.height);
    printSTR1("loop:" + String((loop_num/N)-(loop_num/N)%1));
}

function energy2D(){
    var ans = 0;
    var sum;
    for(i=0;i<L;i++){
        for(j=0;j<L;j++){
            sum = array[(x+1)%L][y] + array[Math.abs((x-1)%L)][y] + array[x][(y+1)%L] + array[x][Math.abs((y-1)%L)];
            ans = -J*array[i][j]
        }
    }
    return ans;
}

function loop_metropolis(){
    for(i=0;i<L;i++){
        metropolis2D();
    }
}

var flag = false;
function stop(){
    flag = true;
}

function main(){
    flag = false;
    loop_num = 0;
	const loop = setInterval(() =>{
        loop_metropolis();
        if(flag == true) clearInterval(loop);
    },1);
}
//====================================================



//=========================================
// 雑に作ったUI
//=========================================

//盤面を表示するエリアの定義


//盤面を描写する関数
function initBoard(){
    //盤面を表示するエリアの定義
    cs = document.getElementById('canvas');
    ctx = cs.getContext('2d');
    cs.width = BOARD_PX_SIZE;
    cs.height = BOARD_PX_SIZE+(CHAR_SIZE);

    // printSTR1("kt:" + document.getElementById("kt").value);
	// printSTR2("loop:");
    printSTR1("loop:");

	printBoard();
}

// 配列のマスを描画する関数
function printBoard(){
	for(i=0;i<L;i++){
		for(j=0;j<L;j++){
			drawBW(i,j)
		}
	}
}

// 入力された文字を表示する関数
function printSTR1(text){
    ctx.font = '18px serif';
    ctx.fillStyle = "black"
    ctx.fillText(text, 0, BOARD_PX_SIZE+CHAR_SIZE-5);
}
function printSTR2(text){
    ctx.font = '18px serif';
    ctx.fillStyle = "black"
    ctx.fillText(text, 0, BOARD_PX_SIZE+(2*CHAR_SIZE)-5);
}

//canvasを消す関数
function remove(){
    ctx.clearRect(0, 0, cs.width, cs.height);
    // ctx.fillStyle = "green";
    // ctx.fillRect(0, 0, BOARD_PX_SIZE, BOARD_PX_SIZE);
}

//黒色のセルを書く関数
function writeBlackCell(y, x){
    console.log("get:"+y+","+x);
    ctx.fillStyle = BLACK_COLOR;
    // ctx.beginPath();
    // ctx.arc(y*CELL_PX_SIZE + (CELL_PX_SIZE/2), x*CELL_PX_SIZE + (CELL_PX_SIZE/2), CELL_PX_R, 0, Math.PI*2, true);
    // ctx.fill();
    ctx.fillRect(y*CELL_PX_SIZE, x*CELL_PX_SIZE, CELL_PX_SIZE, CELL_PX_SIZE);
    console.log("put black cell");
}

//白色のセルを書く関数
function writeWhiteCell(y, x){
    console.log("get:"+y+","+x);
    ctx.fillStyle = WHITE_COLOR;
    // ctx.beginPath();
    // ctx.arc(y*CELL_PX_SIZE + (CELL_PX_SIZE/2), x*CELL_PX_SIZE + (CELL_PX_SIZE/2), CELL_PX_R, 0, Math.PI*2, true);
    // ctx.fill();
    ctx.fillRect(y*CELL_PX_SIZE, x*CELL_PX_SIZE, CELL_PX_SIZE, CELL_PX_SIZE);
    console.log("put white cell");
}

//指定されたラジオボタンの値を取得
function getRadioValue(name){
    var result = "";
    var elems = document.getElementsByName(name);

    //ラジオボタンを走査し、チェック状態にあるかを確認
    for(var i=0, len = elems.length; i < len; i++){
        var elem = elems.item(i);
        //チェックされている項目の値を配列に追加
        if(elem.checked){
            result = elem.value;
            break;
        }
    }
    return result;
}

//盤面をクリックされた時にセルを配置する関数
document.addEventListener("DOMContentLoaded", function(){
    document.querySelector("canvas").addEventListener("click", function(e) {
        //canvas要素の始点の値を取得
        var rect = e.target.getBoundingClientRect();

        //canvas上でのマウスの座標を取得
        var mouseY = e.clientX - rect.left;
        var mouseX = e.clientY - rect.top;

        //セルの位置の取得
        var dataX = Math.floor(mouseX/CELL_PX_SIZE);
        var dataY = Math.floor(mouseY/CELL_PX_SIZE);
        var color = getRadioValue("color");

        if(color == "black"){
            writeBlackCell(dataY, dataX);
			array[dataX][dataY] = BLACK;
        }else{
            writeWhiteCell(dataY, dataX);
			array[dataX][dataY] = WHITE;
        }
    }, false);
}, false);

function kt_view(){
    const elem = document.getElementById('kt');
    const target = document.getElementById('kt_value');
    var rangeValue = function (elem, target){
        return function(e){
            J = getRadioValue("J");
            kt = elem.value;
            target.innerHTML = elem.value;
        }
    }
    elem.addEventListener('input', rangeValue(elem, target));
}

function j_load(){
    const elem = document.getElementByName('j');
    var jValue = function (){
        J = getRadioValue("J");
    }
    elem.addEventListener('input', jValue());
}