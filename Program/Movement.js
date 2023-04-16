let n;
let nn = 0;
let W = window.innerWidth*0.7;
let H = window.innerHeight;
let bugs = []; // array of Jitter objects
let count = 70;
let time = 100;
let targetX = 0;
let targetY = 0;

let firstClick = true;
let radius = H / 2.5;
function setup() {
  let canvas = createCanvas(W, H);
  canvas.parent("canvas-container")

slider = createSlider(0,10,0,0.001)
slider.position(10,10);
slider.hide();
  // Create objects
	//background(50, 89, 100);
  for (let i = 0; i < 100; i++) {
    bugs.push(new Jitter());
  }
}

function draw() {

	// 时间间隔为1000毫秒
	
	  nn -= 0.08; // 每次间隔时间减少1
	  if (nn < 0) { // 如果时间小于0，将其设置为0
		nn = 0;
	  }
	//   slider.value(nn); // 更新滑块的值

	slider.value(nn); 
  

	let startColor = color('rgba(180,180, 180,50)');  // 初始颜色
	let targetColor = color(0, 255, 0);     // 目标颜色，绿色
	
	
	

	//blendMode(BLEND)
  background(255,255,255,5)

  let currentColor = lerpColor(startColor, targetColor, slider.value() / 10.0);
	stroke(currentColor);

  strokeWeight(1.5)
  CellRound(W/2,H/2,radius)
  for (let i = 0; i < count; i++) {
    bugs[i].move();
    bugs[i].display();
		bugs[i].edges();
  }
	
}
function mouseClicked() {
	nn+=1;
  //count += 1;
  targetX = mouseX;
  targetY = mouseY;
  if (firstClick) {
    firstClick = false;
  }
}
// Jitter class
class Jitter {
	constructor() {
	  
	  let angle = random(TWO_PI);
	  let distance = random(radius);
	  this.x = cos(angle) * distance + width / 2;
	  this.y = sin(angle) * distance + height / 2;
	  while (dist(this.x, this.y, width / 2, height / 2) > radius) {
		angle = random(TWO_PI);
		distance = random(radius);
		this.x = cos(angle) * distance + width / 2;
		this.y = sin(angle) * distance + height / 2;
	  }
	  this.diameter = 15 * noise(this.x) + 6;
	  this.speed = noise(this.x, this.y);
	}
	

	 move() {
		let n = slider.value();
		
		
		// 计算小球需要逃离的目标位置和逃逸速度
		let distance = dist(targetX, targetY, this.x, this.y);
		let angle = atan2(this.y - targetY, this.x - targetX);

		let escapeSpeed = firstClick ? 0.3 : map(distance, 0, width, 1, 0);
		print(targetX)
		print(escapeSpeed)
		
		// 按照逃逸速度和随机扰动计算小球的移动方向和距离
		if (distance<100){
		let dx = 2*cos(angle) * random(escapeSpeed) + 2*random(-0.6,0.5) +n * (random(-0.5, 0.5) * noise(this.x) * 2);
		let dy = 2*sin(angle) * random(escapeSpeed) + 2*random(-0.6,0.5)+n * (random(-0.5, 0.5) * noise(this.y) * 2);
		
		// 更新小球的位置
		this.x += dx;
		this.y += dy;
		}else{
			let dx =  2*random(-0.5,0.5) +n * (random(-0.5, 0.5) * noise(this.x) * 2);
		let dy =  2*random(-0.5,0.5)+n * (random(-0.5, 0.5) * noise(this.y) * 2);
		
		// 更新小球的位置
		this.x += dx;
		this.y += dy;
		}
	  }
	  
  
  

  display() {
		noFill();
		strokeWeight(1);
		//stroke(0, 0, 0, 50*noise(this.x + this.y));
    //ellipse(this.x, this.y, this.diameter, this.diameter);
	CellRound(this.x, this.y,this.diameter)
	//rect(50,50,200,200)
  }
	
  edges() {
	//let radius = height/2.5; // 圆的半径为宽度和高度中的较小值的一半
	let distance = dist(this.x, this.y, width / 2, height / 2); // 计算当前点到圆心的距离
	if (distance + this.diameter / 2 > radius) { // 如果当前点与圆心的距离再加上直径一半超过圆的半径
	  let angle = atan2(this.y - height / 2, this.x - width / 2); // 计算当前点与圆心的角度
	  this.x = cos(angle) * (radius - this.diameter / 2) + width / 2; // 将当前点的x坐标限制在圆的内部
	  this.y = sin(angle) * (radius - this.diameter / 2) + height / 2; // 将当前点的y坐标限制在圆的内部
	}
  }
  
}

function CellRound(a,b,c){
	//stroke(0)
	//let d = 50
	//let t = slider.value();
	//let m = slider2.value()
	//let n = slider3.value()

	for (let i = 0; i < 1.3e+2; i++) {
	//重新声明r是半径乘以一个随机值
	let r =c*(0.2+0.8*pow(1-pow(random(random(random(random()))),1.0),0.9) )
	//randomSeed(100);
	let angle = random(TWO_PI);
	//用三角函数控制他们的形状
	let point_x = 1 * (r * cos( angle)) +a;
	let point_y = - sin(angle)* r +b//-100*sin(t);
	//let point_Y =  sin(angle)* r *((-point_x/6)*0/4+4*r)*0.002+b//-100*sin(t);
	

	point(point_x, point_y);
	
		}	//return point_x;
}
