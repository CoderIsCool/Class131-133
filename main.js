objects = [];
pic = "";
update="";
function setup()
{
    canvas = createCanvas(650, 500);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("place").innerHTML = "Status: Detecting Objects";

}
function preload()
{
    pic = loadImage("dog_cat.jpg");
}
function draw()
{
    image(pic,0,0,650,500);
    if(update != "")
    {
      for(I = 0; I < objects.length;I++)
      {
        document.getElementById("place").innerHTML = "Status: Objects Detected!";

        fill("#f02b63");
        percent = floor(objects[I].confidence*100);
        text(objects[I].label+" "+percent+" %",objects[I].x+15,objects[I].y+15);
        noFill();
        stroke("#d42859");
        rect(objects[I].x,objects[I].y,objects[I].width, objects[I].height);
      }  
    }
    
    
    
}
function modelLoaded()
{
    console.log("Model Loaded!");
    update = true;
    objectDetector.detect(pic, gotResults);
}
function gotResults(error, results)
{
    if(error)
    {
        console.error(error);
    }else{
        console.log(results);
        objects = results;
    }

}