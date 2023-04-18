let suiji = [25, 43, 6, 12, 38, 18, 11, 33, 47, 30, 16, 19, 7, 3, 44, 14, 22, 42, 29, 21, 41, 31, 27, 45, 39, 36, 9, 15, 13, 10, 4, 23, 28, 20, 37, 24, 48, 5, 46, 40, 35, 8, 49, 26, 34, 2, 1, 50, 17, 32];
let W = window.innerWidth*0.70;
let H = window.innerHeight;
//直径
let d;
let x = []//存储所有点的x坐标
let y = []//存储所有点的y坐标
let point_x ,r
let slider,slider3;
let overallTex;


//let color = 0
let n 


let xValue = 0, yValue = 0;
let prevMouseX, prevMouseY;
let axis = "none";




function setup() {
	let canvas = createCanvas(W, H);
  canvas.parent("canvas-container")
  
	slider = createSlider(1,40,1,0.001);
	slider2 = createSlider(0, 200, 0,0.001);

	slider.position(10, 10);
	slider2.position(10, 40);
	slider.hide();
	slider2.hide();
  }
  
  function draw() {
	background(255,255,255,100);
  
	// 计算滑条的值
	let range1 = [0, width/2];  // 鼠标位置x的范围
	let range2 = [0, height/1.3]; // 鼠标位置y的范围
	let targetRange1 = [1, 40];  // 滑条1的取值范围
	let targetRange2 = [0, 200]; // 滑条2的取值范围
  
	// 将鼠标位置映射到滑条1的取值范围内
	let slider1Value = map(xValue, range1[0], range1[1], targetRange1[0], targetRange1[1]);
	// 将鼠标位置映射到滑条2的取值范围内
	let slider2Value = map(yValue, range2[0], range2[1], targetRange2[0], targetRange2[1]);
  
	slider.value(slider1Value); // 设置滑条1的值
	slider2.value(slider2Value); // 设置滑条2的值
  

  
	// 判断鼠标移动的方向
	if (3*prevMouseX && 3*abs(mouseX - prevMouseX) > abs(mouseY - prevMouseY)) {
	  axis = "x";
	} else if (prevMouseY && abs(mouseY - prevMouseY) > abs(mouseX - prevMouseX)) {
	  axis = "y";
	} else {
	  axis = "none";
	}
  
	// 根据移动方向更新鼠标位置
	if (axis === "x") {
	  yValue = 0;
	  xValue += mouseX - prevMouseX;
	} else if (axis === "y") {
	  xValue = 0;
	  yValue += mouseY - prevMouseY;
	} else {
	  xValue += mouseX - prevMouseX;
	  yValue += mouseY - prevMouseY;
	}
  
	// 保存当前鼠标位置
	prevMouseX = mouseX;
	prevMouseY = mouseY;
	translate(W/2, H/2)
 
	Cell();
// }
  }
  
	

//细胞外壳
function Cell(){

	for (let i = 0; i < 5e+3; i++) {
	
		strokeWeight(1);

		CellRound(0,-50,150);

	}
	for (let i = 0; i < 1e+2; i++) {
		Bones()
	}


}

function Bones() {
    let jw =slider2.value()
	let jn = slider.value()
    for(let i = 0; i < 47-floor(map(jw,0,200,3,4)); i++) {

		let rr = (15)
		let posx = -W/2+ i*(rr+5)-i*jn/8;
		let posy =  (map( suiji[i]/15 * jn*0.5*sin(jn*posx/500),-45,20,-12,12)-25)-i*i*0.020*(jw*sqrt(jw+50-i)/280)
		//print(posy)
		if(jn>0){
			boneb(posx,posy,map(suiji[i-jw/4],1,50,rr/1.5,rr*1.2),map(suiji[i],1,50,1,5),map(suiji[45-jw/4],1,50,1,4));
		}
		 if(jw>0){
			boneb(posx,posy,map(suiji[i-jn],1,50,rr/1.5,rr*1.2),map(suiji[i],1,50,1,5),map(suiji[45-jn],1,50,1,4));
		 }
		
	}
}
   
function boneb(a,b,c,n,m){
	
	//重新声明r是半径乘以一个随机值
	let r =c*(0.2+0.8*pow(1-pow(random(random(random(random()))),1.0),0.9) )
	//randomSeed(100);
	let angle = random(TWO_PI);
	//用三角函数控制他们的形状
	let point_x = cos(angle) * (r*0.15*cos(n*angle)+r)+a;
	let point_y = sin(angle) * (r*0.25*cos(m*angle)+r)+b;
	//let point_Y =  sin(angle)* r *((-point_x/6)*0/4+4*r)*0.002+b//-100*sin(t);
	

	point(point_x, point_y);
}


//组成细胞外壳的每一个点的位置
function CellRound(i,j,d){
	let point_x;
	//stroke(0)
	//let t = slider.value();
	let m =slider2.value()
	//let n = slider3.value()
	let n = map(slider.value(),200,0,1,6)
	//print(m)
	let transitionColor
	//重新声明r是半径乘以一个随机值
	let r =d*(0.2+0.6*pow(1-pow(random(random(random(random()))),1.2),0.6) )
	//randomSeed(100);
	let angle = random(-PI);
	//用三角函数控制他们的形状
	if(m==0){
		 point_x = n * (r * cos(2* angle) + r) - 8 * r+i;
		 
		 
	}else{
		point_x = 6 * (r * cos(2* angle) + r) - 8 * r+i;
	}
	
	// let point_y = - sin(angle)* r *((point_x/6)*n/4+4*r)*0.002+j//-100*sin(t);
	let point_y = map(m,0,200,  sin(angle)* r *((point_x/6)*n/4+4*r)*0.001+j,
	
	sin(angle) * r * ((-point_x / 6) * n / 4 + 4 * r) * 0.004 + j + n*65 * sin((point_x + 12 * r - i) / (n * r) * Math.PI / 2)-100
	)
	

	let point_Y =  map(m,0,200, - sin(angle)* r *((point_x/6)*n/4+4*r)*0.004+j,
	
	-sin(angle) * r * ((-point_x / 6) * n / 4 + 4 * r) * 0.001 + j + n*65 * sin((point_x + 12 * r - i) / (n * r) * Math.PI / 2)-100
	)



	let startColor = color(150, 150, 150);
	let endColor = color(0, 250, 0);
	if (m===0){
		transitionColor = lerpColor(startColor, endColor, map(n,6.2,1,0,1))
	}else{
		transitionColor = lerpColor(startColor, endColor,m/200);
	}
	 
	stroke(transitionColor);
	point(point_x, point_y);
	point(point_x, point_Y);

	
}

