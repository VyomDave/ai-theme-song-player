song="";
leftwristX = 0
leftwristY = 0
rightwristX = 0
rightwristY = 0
leftwristscore = 0
rightwristscore = 0

function preload(){
   song=loadSound("maintitles.mp3")
}
function setup(){
  canvas = createCanvas(400,400)
  canvas.center()

  video = createCapture(VIDEO)
  video.hide()
  video.size(400,400)

  posenet = ml5.poseNet(video , modelloaded)
  posenet.on("pose", gotPoses)
}
function draw(){
 image(video ,0,0,400,400)
 
 fill("red")
 stroke("red")

//code for calculating volume
if(leftwristscore>0.2){
  circle(leftwristX,leftwristY,20)
  volume = Number(leftwristY)/400
  console.log(volume)
  song.setVolume(volume)
  document.getElementById("volume").innerHTML=volume
}
if(rightwristscore>0.2){
  circle(rightwristX,rightwristY,20)
  if(rightwristY>0 && rightwristY<=100){
    document.getElementById("speed").innerHTML ="Speed = 0.5x"
    song.rate(0.5)
  }
  else if(rightwristY>100 && rightwristY<=200){
    document.getElementById("speed").innerHTML="Speed = 1.0x"
    song.rate(1)
  }
  else if(rightwristY>200 && rightwristY<=300){
    document.getElementById("speed").innerHTML="Speed = 1.5x"
    song.rate(1.5)
  }
  else if(rightwristY>300 && rightwristY<=400){
         document.getElementById("speed").innerHTML="Speed = 2.0x"
         song.rate(2)
  }
  else if(rightwristY>400 && rightwristY<=500){
      document.getElementById("speed").innerHTML="Speed = 2.5x"
      song.rate(2.5)
  }
}
}
function play(){
    song.play()
    song.rate(1)
    song.setVolume(0.8)
}
function stop(){
    song.stop()
}
function modelloaded(){
  console.log("ok")
}
function gotPoses(results){
      if(results.length>0){
        console.log(results)
        leftwristX = floor(results[0].pose.leftWrist.x)
        leftwristY = floor(results[0].pose.leftWrist.y)
        rightwristX = floor(results[0].pose.rightWrist.x)
        rightwristY = floor(results[0].pose.rightWrist.y)
        leftwristscore = results[0].pose.keypoints[9].score
        rightwristscore = results[0].pose.keypoints[10].score
        console.log("leftWristx = "+leftwristX)
        console.log("leftWristy = "+leftwristY)
        console.log("rightWristx = "+rightwristX)
        console.log("rightWristy = "+rightwristY)
        console.log("leftwristscore = "+leftwristscore)
        console.log("rightwristscore = "+rightwristscore)
      }
}