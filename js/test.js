var mainScreen = document.getElementById("mainScreen");
//让背景动起来
var bg1 = document.getElementById('bg1');
var bg2 = document.getElementById('bg2');
var timerBg = setInterval(function(){
	bg1.style.top = bg1.offsetTop + 1 +'px';
	bg2.style.top = bg2.offsetTop + 1 +'px';
	if(bg1.offsetTop>=568){
		bg1.style.top = "-568px"
	}
	if(bg2.offsetTop>=568){
		bg2.style.top = "-568px"
	}
},10);
//飞机动起来
var airplane = document.getElementById("airplane");
airplane.addEventListener('mousedown',function(e){
	//鼠标按下事件
	var event = e || window.event;
	baseX = event.pageX;
	baseY = event.pageY;

	moveX = 0;
	moveY = 0;
	//鼠标移动事件
	mainScreen.addEventListener('mousemove',function(e){
		var ev = e || window.event;
		moveX = ev.pageX-baseX;
		baseX = ev.pageX;
		moveY = ev.pageY-baseY;
		baseY = ev.pageY;
		airplane.style.left = airplane.offsetLeft + moveX + "px";
		airplane.style.top = airplane.offsetTop + moveY + "px";
	},false)
},false);
//发射子弹
var timerBullet = setInterval(function(){
	var bullet = document.createElement("div");
	mainScreen.appendChild(bullet);
	bullet.className = "bullet";
	bullet.style.top = airplane.offsetTop- 12 +"px";
	bullet.style.left = airplane.offsetLeft + 31 + "px";
	var timerBulletFly = setInterval(function(){
		bullet.style.top = bullet.offsetTop -10 + "px";
		if (bullet.offsetTop<=20) {
			clearInterval(timerBulletFly);
			mainScreen.removeChild(bullet);
		}
	},50);
	bullet.timer = timerBulletFly;
},500);

//敌人下落
var timerEnemy = setInterval(function(){
	var enemy = document.createElement("div");
	mainScreen.appendChild(enemy);
	enemy.className = "enemy";
	enemy.style.top = 0;
	enemy.style.left = randomNum(0,274) + "px";
	var timerEnemyFly = setInterval(function(){
		enemy.style.top = enemy.offsetTop +5 + "px";
		if (enemy.offsetTop>=548) {
			clearInterval(timerEnemyFly);
			mainScreen.removeChild(enemy);
		}
	},5);
	enemy.timer = timerEnemyFly;
},500);
//打中检测
var timerPZJC = setInterval(function(){
	var allEnemys = document.getElementsByClassName('enemy');
	var allBullets = document.getElementsByClassName('bullet');
		for (var i = 0; i < allBullets.length; i++) {
			for (var j = 0; j< allEnemys.length;j++) {
				var b = allBullets[i];
				var e = allEnemys[j];
				if(pzjcFunc(b,e)){
					clearInterval(b.timer);
					clearInterval(e.timer);
					mainScreen.removeChild(b);
					mainScreen.removeChild(e);
					break;
				}
			}
		}
},200);
//死亡检测
var timerSW = setInterval(function(){
	var allEnemys = document.getElementsByClassName('enemy');
		for (var i = 0; i < allEnemys.length; i++) {
				var e = allEnemys[i];
				if(pzjcFunc(e,airplane)){
					for(var j = 0;j <100;j++){
						clearInterval(j);
						setTimeout(function(){
							location.reload();
						},3000)
					}
				}
			}
	
},200);
//碰撞检测
function pzjcFunc(obj1,obj2){
	var obj1Left = obj1.offsetLeft;
	var obj1Width = obj1.offsetWidth + obj1Left;
	var obj1Top = obj1.offsetTop;
	var obj1Height = obj1.offsetHeight + obj1Top;

	var obj2Left = obj2.offsetLeft;
	var obj2Width = obj2.offsetWidth + obj2Left;
	var obj2Top = obj2.offsetTop;
	var obj2Height = obj2.offsetHeight + obj2Top;

	if (!(obj1Left>obj2Width || obj1Width<obj2Left || obj1Top>obj2Height || obj1Height<obj2Top)) {
		return true;
	} else { return false;}
}

//生成从minNum到maxNum的随机数
function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 

} 

