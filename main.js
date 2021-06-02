Webcam.set({
    width: 350,
    height: 300,
    img_format: 'png',
    png_quality: 90
});
 
camera=document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(dataurl){
        document.getElementById("result").innerHTML="<img id='captured_image' src='"+dataurl+"'/>"
    });
}

console.log('ml5 version',ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/urPkyUx8d/',modelLoaded);
function modelLoaded(){
    console.log("Model Loaded!");
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1= "1st prediction ="+prediction_1;
    speak_data_2= "2st prediction ="+prediction_2;
    var utterThis= new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis);

    

}

function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}
function gotResult(error, results){
    if (error){
        console.log(error);
    }else{
        console.log(result);
        document.getElementById("result_emotion_name").innerHTML=result[0].label;
        document.getElementById("result_emotion_name").innerHTML=result[1].label;
        prediction_1=result[0].label;
        prediction_2=result[1].label;
        speak();
        if (result[0].label=="happy") {
            doucment.getElementById("update_emoji").innerHTML="&#128522"
        }
        if (result[0].label=="sad") {
            doucment.getElementById("update_emoji").innerHTML="&#128532"
        }
        if (result[0].label=="angry") {
            doucment.getElementById("update_emoji").innerHTML="&#128548"
        }
        if (result[1].label=="happy") {
            doucment.getElementById("update_emoji").innerHTML="&#128522"
        }
        if (result[1].label=="sad") {
            doucment.getElementById("update_emoji").innerHTML="&#128532"
        }
        if (result[1].label=="angry") {
            doucment.getElementById("update_emoji").innerHTML="&#128548"
        }
    }
}