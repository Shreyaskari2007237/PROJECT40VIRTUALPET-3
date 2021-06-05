//Create variables here
var dog,dogHappy;
var database;
var foodS,foodStock;
var dogImg;
var feedDog,addFoods;
var fedTime,lastFed;
var food;
var gameState;
var bedroom,garden,washroom;
var bedroomImg,gardenImg,washroomImg;

function preload()
{
	//load images here
dogImg=loadImage("images/dogImg.png");
dogHappy=loadImage("images/dogImg1.png");

bedroomImg=loadImage("virtual pet images/Bed Room.png");
gardenImg=loadImage("virtual pet images/Garden.png");
washroomImg=loadImage("virtual pet images/Wash Room.png");
}

function setup() {
  database=firebase.database();
	createCanvas(500,500);
  dog = createSprite(250,250,5,5);
  dog.addImage(dogImg);
  dog.scale=0.2;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  food=new Food();

  feed=createButton("Feed The Dog");
  feed.position(600,90);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(750,90);
  addFood.mousePressed(addFoods)

  var fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
  lastFed= data.val();
    })

   //read gameState from database
   readState=database.ref('gameState');
   readState.on("value",function(data){
   gameState=data.val();
    })
}


function draw() {  
  background(46,139,87);
  fill("black");
  //add styles here

  food.display();

  if(gameState!="Hungry"){
    feed.hide;
    addFood.hide;
    dog.remove;
  }
  else{
    feed.show;
    addFood.show;
    dog.addImage(dogImg);
  }
  //function to update gameStates in database
  
  currentTime=hour();
  if (currentTime==(lastFed+1)){
      update("Playing");
      food.garden();
  }
  else if(currentTime==(lastFed+2)){
    update("Sleeping");
    food.bedroom();
  }
  else if(currentTime>(lastFed+2)&& currentTime<=(lastFed+4)){
    update("Bathing");
    food.washroom();
  }
  else{
    update("Hungry");
      food.display();
  }
  
  drawSprites();
}
  //Function to read values from DB
  function readStock(data){
  foodS=data.val();
  food.updateFoodStock(foodS);
  }
  //Function to write values in DB
  function writeStock(x){
    if(x<=0){
      x=0;
    }
    else{
      x=x-1;
    }
  
  }
  function addFoods(){
    foodS++
    database.ref('/').update({
    Food:foodS
    })
  }
  function feedDog(){
   // dog.addImage(dogHappy);
    food.updateFoodStock(food.getFoodStock()-1);
    database.ref('/').update({
      Food:food.getFoodStock(),
      fedTime:hour(),
      gameState:"Hungry"
    })
  }
  function update(state){
    database.ref('/').update({
      gameState:state
    })
  }
  


