/**
 * Created by momo on 2016/8/23.
 */
'use strict';
var para={
    isStart:0,   //不开始
    isEnd:0,     //0不结束 1结束  2赢了
    canMoveR:1,
    canMoveH:1,
    combineNum:0, //每次合并的数字个数
    data:[],     //记录块的数字
    nullPlace:[[0,0]]    //为空的块位置
};

reStart();
function reStart(){

  /*  for(var i=0;i<4;i++){
        para.data[i]=[];
        for(var j=0;j<4;j++){
            para.data[i][j]=0;
        }
    }*/
    para.data=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    console.log(para.data[3][3]);
    for(var i=0;i<4;i++){
        console.log(para.data[i][0]+" "+para.data[i][1]+" "+para.data[i][2]+" "+para.data[i][3]);
    }
    $(".add").remove();
    createNum();
    createNum();
    para.isStart=1;
    document.onkeydown = keyDown;
}

function createNum() {
    checkEnd();
    if(para.isEnd==0){
        var len=para.nullPlace.length;
        if(len){
            para.nullPlace.splice(0,len);
        }
        for(var i=0;i<4;i++)
            for(var j=0;j<4;j++){
                if (para.data[i][j] ==0 ){
                    para.nullPlace.push([i,j]);
                }
            }
        var nullNum=para.nullPlace.length;
        var random=parseInt(Math.random()*nullNum);
        var randomArray=para.nullPlace[random];
        para.data[randomArray[0]][randomArray[1]]=2;
        changColor(randomArray[0],randomArray[1], 2);
        console.log("("+randomArray[0]+","+randomArray[1]+")");
    }

   /* console.log("after create number:");
    for(i=0;i<4;i++){
        console.log(para.data[i][0]+" "+para.data[i][1]+" "+para.data[i][2]+" "+para.data[i][3]);
    }*/
}

function changColor( x,y,number) {
    switch (number){
        case 0:
            $('#x'+x+'y'+y+'>.add').remove();
           /* document.getElementById('x'+x).childNodes.item(y).style.backgroundColor="#ccc0b3";*/
            break;
        case 2:
            /*document.getElementById('x'+x).childNodes.item(y).style.backgroundColor="#eee4da";*/
            $('#x'+x+'y'+y).html("<div class='add style2'>2</div>");
            break;
        case 4:
            $('#x'+x+'y'+y).html("<div class='add style4'>4</div>");
            break;
        case 8:
            $('#x'+x+'y'+y).html("<div class='add style8'>8</div>");
            break;
        case 16:
            $('#x'+x+'y'+y).html("<div class='add style16'>16</div>");
            break;
        case 32:
            $('#x'+x+'y'+y).html("<div class='add style32'>32</div>");
            break;
        case 64:
            $('#x'+x+'y'+y).html("<div class='add style64'>64</div>");
            break;
        case 128:
            $('#x'+x+'y'+y).html("<div class='add style128'>128</div>");
            break;
        case 256:
            $('#x'+x+'y'+y).html("<div class='add style256'>256</div>");
            break;
        case 512:
            $('#x'+x+'y'+y).html("<div class='add style512'>512</div>");
            break;
        case 1024:
            $('#x'+x+'y'+y).html("<div class='add style1024'>1024</div>");
            break;
        case 2048:
            $('#x'+x+'y'+y).html("<div class='add style2048'>2048</div>");
            para.isEnd=2;
            break;
        default: break;
    }
}



function keyDown(e) {
    var e=e||event;
    var currkey=e.keyCode|| e.which ||e.charCode;
    checkEnd();
    //console.log("is end? "+para.isEnd);
    if(currkey>=37 && currkey<=40 && para.isEnd==0){
        switch (currkey){
            case 37: moveLeft();break;
            case 38:moveUp();break;
            case 39:moveRight();break;
            default:moveDown();break;
        }
    }
    else if(para.isEnd==1){
        layer.msg("游戏结束！");
    }
    else  layer.msg("恭喜！您已达到2048！");
}
function checkEnd() {
    if(para.isEnd!=2){
        var nullLen=para.nullPlace.length-para.combineNum;
        console.log("nullLen:"+nullLen);
        canMove();
        if (nullLen || para.canMoveH ||para.canMoveR){
            para.isEnd=0;
        }
        else{ para.isEnd=1;
          /*  para.isEnd=1;
            for(var i=0;i<3;i++){
                for(var j=0;j<3;j++){
                    if(para.data[i][j] == para.data[i][j+1] || para.data[i][j] == para.data[i+1][j]) {
                        para.isEnd=0;
                        break;
                    }
                }
            }
            for(i=0;i<3;i++){
                if(para.data[i][3] == para.data[i+1][3] || para.data[3][i] == para.data[3][i+1]){
                    para.isEnd=0;
                    break;
                }
            }*/
        }
    }
}

function canMove() {
   para.canMoveR=0;
    for(var i=0;i<4;i++){
        for(var j=0;j<3;j++){
            if(para.data[i][j] == para.data[i][j+1]){
                para.canMoveR=1;
                break;
            }
        }
    }
    para.canMoveH=0;
    for(j=0;j<4;j++){
        for(i=0;i<3;i++){
            if(para.data[i][j] == para.data[i+1][j]){
                para.canMoveH=1;
                break;
            }
        }
    }
}

//左移+去空格
function left(i) {
    var y=0;
    while (y<4){
        if(para.data[i][y]==0){
            var yy=y;
            for(var j=yy;j<4;j++){
                if(para.data[i][j]){
                   // console.log("before:i="+i+",y="+j);
                    para.data[i][y]=para.data[i][j];
                    $('#x'+i+'y'+j+'>.add').animate({left:"-="+115*(j-y)+"px"});
                    changColor(i,y,para.data[i][j]);
                    changColor(i,j,0);
                    console.log("before left:i="+i+",y="+j);
                    para.data[i][j]=0;
                    yy=j++;
                    break;
                }
            }
        }
        y++;
    }
       // console.log(para.data[i][0]+" "+para.data[i][1]+" "+para.data[i][2]+" "+para.data[i][3]);
}
function combineLeft(i) {
    para.combineNum=0;
    for(var j=0;j<3;j++){
        if(para.data[i][j+1]==para.data[i][j] && para.data[i][j+1]!=0){
            para.data[i][j]= para.data[i][j]* 2;
            console.log("i="+i+",j="+j+"  "+para.data[i][j]);
            para.data[i][j+1]=0;
            changColor(i,j+1,0);
            changColor(i,j,para.data[i][j]);
            j++;
            para.combineNum++;
        }
    }
}

//右移+去空格
function right(i) {
    var y=3;
    while (y>=0){
        if(para.data[i][y]==0){
            var yy=y;
            for(var j=yy;j>=0;j--){
                if(para.data[i][j]){
                    // console.log("before:i="+i+",y="+j);
                    para.data[i][y]=para.data[i][j];
                    $('#x'+i+'y'+j+'>.add').animate({right:"-="+115*(y-j)+"px"});
                    changColor(i,y,para.data[i][j]);
                    changColor(i,j,0);
                    console.log("before right:x="+i+",y="+j);
                    para.data[i][j]=0;
                    yy=j--;
                    break;
                }
            }
        }
        y--;
    }
}
function combineRight(i) {
    para.combineNum=0;
    for(var j=3;j>0;j--){
        if(para.data[i][j-1]==para.data[i][j] && para.data[i][j]!=0){
            para.data[i][j]= para.data[i][j]* 2;
            console.log("i="+i+",j="+j+"  "+para.data[i][j]);
            para.data[i][j-1]=0;
            changColor(i,j-1,0);
            changColor(i,j,para.data[i][j]);
            j--;
            para.combineNum++;
        }
    }
}

//上移+去空格
function up(j) {
    var x=0;
    while (x<4){
        if(para.data[x][j]==0){
            var xx=x;
            for(var i=xx;i<4;i++){
                if(para.data[i][j]){
                    // console.log("before:i="+i+",y="+j);
                    para.data[x][j]=para.data[i][j];
                    $('#x'+i+'y'+j+'>.add').animate({top:"-="+115*(i-x)+"px"});
                    changColor(x,j,para.data[i][j]);
                    changColor(i,j,0);
                    console.log("before up:x="+i+",y="+j);
                    para.data[i][j]=0;
                    xx=i++;
                    break;
                }
            }
        }
        x++;
    }
    console.log(para.data[0][j]+" "+para.data[1][j]+" "+para.data[2][j]+" "+para.data[3][j]);
}
function combineUp(j) {
    para.combineNum=0;
    for(var i=0;i<3;i++){
        if(para.data[i+1][j]==para.data[i][j] && para.data[i][j]){
            para.data[i][j]= para.data[i][j]* 2;
            console.log("i="+i+",j="+j+"  "+para.data[i][j]);
            para.data[i+1][j]=0;
            changColor(i+1,j,0);
            changColor(i,j,para.data[i][j]);
            i++;
            para.combineNum++;
        }
    }
}

//下移+去空格
function down(j) {
    var x=3;
    while (x>=0){
        if(para.data[x][j]==0){
            var xx=x;
            for(var i=xx;i>=0;i--){
                if(para.data[i][j]){
                    // console.log("before:i="+i+",y="+j);
                    para.data[x][j]=para.data[i][j];
                    $('#x'+i+'y'+j+'>.add').animate({bottom:"-="+115*(x-i)+"px"});
                    changColor(x,j,para.data[i][j]);
                    changColor(i,j,0);
                    console.log("before down:x="+i+",y="+j);
                    para.data[i][j]=0;
                    xx=i--;
                    break;
                }
            }
        }
        x--;
    }
    console.log(para.data[0][j]+" "+para.data[1][j]+" "+para.data[2][j]+" "+para.data[3][j]);
}
function combineDown(j) {
    para.combineNum=0;
    for(var i=3;i>0;i--){
        if(para.data[i-1][j]==para.data[i][j] && para.data[i][j]){
            para.data[i][j]= para.data[i][j]* 2;
            console.log("i="+i+",j="+j+"  "+para.data[i][j]);
            para.data[i-1][j]=0;
            changColor(i-1,j,0);
            changColor(i,j,para.data[i][j]);
            i--;
            para.combineNum++;
        }
    }
}


function moveLeft() {
   /* for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(para.data[i][j]==0){
                for(var x=j;x<4;x++){
                    if(para.data[i][x])
                        slide(x,j);
                }
            }
        }
    }*/
   /* console.log("before move:");
    for(i=0;i<4;i++){
        console.log(para.data[i][0]+" "+para.data[i][1]+" "+para.data[i][2]+" "+para.data[i][3]);
    }*/
    console.log("para.canMoveR: "+para.canMoveR);
    if(para.canMoveR){
        for(var i=0;i<4;i++){
            left(i);
            combineLeft(i);
            left(i);
        }
        createNum();
        for(i=0;i<4;i++){
            left(i);
        }
    }
   /* console.log("after move:");
    for(i=0;i<4;i++){
        console.log(para.data[i][0]+" "+para.data[i][1]+" "+para.data[i][2]+" "+para.data[i][3]);
    }*/

    console.log("after create and move:");
    for(i=0;i<4;i++){
        console.log(para.data[i][0]+" "+para.data[i][1]+" "+para.data[i][2]+" "+para.data[i][3]);
    }
    console.log("");
}
function moveRight() {
    console.log("para.canMoveR: "+para.canMoveR);
    if(para.canMoveR){
        for(var i=0;i<4;i++){
            right(i);
            combineRight(i);
            right(i);
        }
        createNum();
        for(i=0;i<4;i++){
            right(i);
        }
    }
    console.log("after create and move:");
    for(i=0;i<4;i++){
        console.log(para.data[i][0]+" "+para.data[i][1]+" "+para.data[i][2]+" "+para.data[i][3]);
    }
    console.log("");
}
function moveUp() {
  /*  console.log("before moveUp:  canMoveH:"+para.canMoveH);
    for( var i=0;i<4;i++){
        console.log(para.data[i][0]+" "+para.data[i][1]+" "+para.data[i][2]+" "+para.data[i][3]);
    }*/
    if(para.canMoveH){
        for(var j=0;j<4;j++){
            up(j);
            console.log("uped:");
            combineUp(j);
            up(j);
        }
        createNum();
        for(j=0;j<4;j++){
            up(j);
        }
    }
  /*  console.log("after moveUp:");
    for(i=0;i<4;i++){
        console.log(para.data[i][0]+" "+para.data[i][1]+" "+para.data[i][2]+" "+para.data[i][3]);
    }*/
}

function moveDown() {
    if(para.canMoveH){
        for(var j=0;j<4;j++){
            down(j);
            console.log("uped:");
            combineDown(j);
            down(j);
        }
        createNum();
        for(j=0;j<4;j++){
            down(j);
        }
    }
}


