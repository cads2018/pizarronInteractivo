var socket;
let p1=0
let y=0
let m=0
let b=0
let mm=0,bb=0;
let x;
let figuras = [];
let xx,yy=0;
let aux=0,aux2=0;
let x1,x2,y1,y2;
let cont1=0;
let seleccion=0;
let tam1=0,tam2=0;
let color = [];
let nombres = [];
let colPre="#000000";
var color0="#4F597A",color1="#681717",color2="#3725B8",color3="#4B3268",color4="#CCCD5E",color5="#FDFF1B",color6="#FF0202",color7="#AD5353",color8="#680606",color9="#680665";
//programado por: juan carlos estrada corral
//semestre 8.
//carrera: Lic. en computasao.
function setup(){
	createCanvas(windowWidth-50,500);
	frameRate(60);
	background('#E2E1E1');
	//ip especial reservada para local
	socket= io.connect('http://localhost:3000');
	//para que el mensaje regrese al cliente
	socket.on('mouse',puntoPendiente2);
	socket.on('mouse',rectangulo2);
	strokeWeight(5);
	nombres[0]=color0;
		nombres[1]=color1;
		nombres[2]=color2;
		nombres[3]=color3;
		nombres[4]=color4;
		nombres[5]=color5;
		nombres[6]=color6;
		nombres[7]=color7;
		nombres[8]=color8;
		nombres[9]=color9;

}

/*function newDrawing(data){
	fill(255,0,100);
	//ellipse(data.x,data.y,60,60);
	
	puntoPendiente(data.x1,data.y1,data.x2,data.y2);
}*/

/*function mouseDragged(){
	console.log('Sending:' + mouseX + ',' + mouseY);

	var data = {
		x: mouseX,
		y:mouseY
	}

	socket.emit('mouse',data);

	noStroke();
	fill(255);
	ellipse(mouseX,mouseY,60,60);
}*/

function draw(){
	
	//puntoPendiente(x5, y5,x6, y6);
	
	rect(0,0,windowWidth-50,80);
	opciones();
	colores();
	if(figuras.length>0){
	for (var i = 0; i < figuras.length; i++) {
		push();
		fill('#4F597A');
		rect(figuras[i].x,figuras[i].y,80,80);
		pop();

		if(i==0){
			push();
		fill(255,10,0,128);
		ellipse(figuras[i].x+80/2,figuras[i].y+80/2,70,70);
		pop();
		}

		if(i==1){
			push();
		line(figuras[i].x,figuras[i].y,figuras[i].x+80,figuras[i].y+80);
		pop();
		}

		if(i==2){
			push();
		rect(figuras[i].x+10,figuras[i].y+24,60,35);
		pop();
		}

	}
}

	if(color.length>0){
		for (var i = 0; i < color.length; i++) {
			push();
			fill(color[i].col);
		rect(color[i].x,color[i].y,color[i].tam,color[i].tam);
		pop();
		}
	}
}


function opciones(){
	if(figuras.length<3){
		for(let i=0; i<3; i++){
		let op={
						x:900+aux,
						y:0,
						tam: 80
				}
				figuras.push(op);
				aux+=81;
	}

	}
	

	
	
}

function colores(){
		

	if(color.length<10){
		for(let i=0; i<10; i++){
		let colt={
						x:200+aux2,
						y:0,
						tam: 20,
						col:nombres[i]
				}
				color.push(colt);
				aux2+=21;
	}

	}
}

function  mouseClicked(){
		console.log(color[5].col);
		if(mouseX>=figuras[1].x&&mouseX<=figuras[1].x+figuras[1].tam&&mouseY>=figuras[1].y&&mouseY<=figuras[1].y+figuras[1].tam){
			seleccion=2;
		}

		if(mouseX>=figuras[0].x&&mouseX<=figuras[0].x+figuras[0].tam&&mouseY>=figuras[0].y&&mouseY<=figuras[0].y+figuras[0].tam){
			seleccion=1;
		}

		if(mouseX>=figuras[2].x&&mouseX<=figuras[2].x+figuras[2].tam&&mouseY>=figuras[2].y&&mouseY<=figuras[2].y+figuras[2].tam){
			seleccion=3;
			tam1=prompt("ingresa el ancho");
			tam2=prompt("ingresa la altura");
		}

		if(color.length>0){
			for(let i=0; i<10; i++){
				if(mouseX>=color[i].x&&mouseX<=color[i].x+color[i].tam&&mouseY>=color[i].y&&mouseY<=color[i].y+color[i].tam){
			 	colPre=color[i].col;
			  	console.log("entro a un color");
			}
			}
			
			
	
		}
			
	if(mouseY>80&&seleccion==2){
		cont1++;
	if(cont1==1){
		x1=mouseX;
		y1=mouseY;	
	}
	if(cont1==2){
		x2=mouseX;
		y2=mouseY;
	}

	if(cont1==2){
		cont1=0;
		
		puntoPendiente(x1,y1,x2,y2,colPre);
	}
	}

	if(mouseY>80&&seleccion==3){

		if(tam1>0&&tam2>0){
			rectangulo(tam1,tam2,mouseX,mouseY,colPre);
		}
		
	}
	
	
}

function rectangulo(largo,ancho,x,y,colPre){
	var data2 = {
		largo:0,
		ancho:0,
		x:0,
		y:0,
		col:colPre

	}
	data2.largo=largo;
	data2.ancho=ancho;
	data2.x=x;
	data2.y=y;
	data2.col=colPre;
	socket.emit('mouse',data2);
	push();
	fill(colPre);
	rect(x,y,largo,ancho);
	pop();
}

function rectangulo2(data){
	push();
	fill(data.col);
	rect(data.x,data.y,data.largo,data.ancho);
	pop();
}


 function puntoPendiente2(data)
{
	console.log("x1="+data.x1+ "y1="+data.y1+  "x2="+data.x2+ "y2="+data.y2)
	mm=(data.y2 - data.y1) / (data.x2 - data.x1)
	bb= data.y1 - (mm*data.x1)
	xx=data.x1
	if (data.x1 < data.x2){
		while(xx<=data.x2){
			
			yy=(mm*xx)+bb
			xx++
			//console.log("x="+x+" y="+y);
			//stroke(#336699);
			push();
			stroke(data.col);
			point(xx, yy);
			pop();
		}
	}else{
		if(data.x2<data.x1){
			while(xx>=data.x2){
			
			yy=(mm*xx)+bb
			xx--;
			//console.log("x="+x+" y="+y);
			push();
			stroke(data.col);
			point(xx, yy);
			pop();
		}
		}else{
			if(data.x1==data.x2||data.x2==data.x1){
				while(data.y1<=data.y2){
					//console.log("x="+x+" y="+y);
					push();
					stroke(data.col);
					point(xx, data.y1);
					pop();
					data.y1++
				}
			}
		}
	}
}

const puntoPendiente = function(x1,y1,x2,y2,colPre)
{
	//console.log('Sending:' + mouseX + ',' + mouseY);
	var data = {
		x1:0,
		y1:0,
		x2:0,
		y2:0,
		col:""
	}
	data.x1=x1;
	data.y1=y1;
	data.x2=x2;
	data.y2=y2;
	data.col=colPre;
	socket.emit('mouse',data);
	m=(y2 - y1) / (x2 - x1)
	b= y1 - (m*x1)
	x=x1
	if (x1 < x2){
		while(x<=x2){
			
			y=(m*x)+b
			x++
			//console.log("x="+x+" y="+y);
			push();
			stroke(colPre);
			point(x, y);
			pop();
		}
	}else{
		if(x2<x1){
			while(x>=x2){
			
			y=(m*x)+b
			x--;
			//console.log("x="+x+" y="+y);
			push();
			stroke(colPre);
			point(x, y);
			pop();
		}
		}else{
			if(x1==x2||x2==x1){
				while(y1<=y2){
					//console.log("x="+x+" y="+y);
					push();
					stroke(colPre);
					point(x, y1);
					pop();
					y1++
				}
			}
		}
	}
}
