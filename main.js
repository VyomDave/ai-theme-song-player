song1 = ""
song2 = ""
leftwristX = 0
leftwristY = 0
rightwristX = 0
rightwristY = 0
leftwristscore = 0
rightwristscore = 0
song1status = ""
song2status = ""

function preload() {
    song1 = loadSound("maintitles.mp3")
    song2 = loadSound("music.mp3")
}

function setup() {
    canvas = createCanvas(400, 400)
    canvas.center()

    video = createCapture(VIDEO)
    video.hide()

    posenet = ml5.poseNet(video, modelloaded)
    posenet.on("pose", gotPoses)
}
function draw() {
    image(video, 0, 0, 400, 400)
    song1status = song1.isPlaying()
    song2status - song2.isPlaying()
    fill("red")
 stroke("red")
 if(leftwristscore>0.2){
  circle(leftwristX,leftwristY,20) 
  song1.stop()
  if(song2status == false){
     song2.play()
     document.getElementById("song").innerHTML = "Song - Harry Potter song is playing"
  }
 }

 if(rightwristscore>0.2){
  circle(rightwristX,rightwristY,20) 
  if(song1status == false){
    song1.play()
    document.getElementById("song").innerHTML = "Song - Charlie and the chocolate factory song is playing"

  }
 }
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