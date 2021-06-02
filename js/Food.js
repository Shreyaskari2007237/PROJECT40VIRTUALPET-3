class Food{
    constructor(){
        this.FoodStock=0;
        this.lastFed;
        this.image=loadImage("images/Milk.png");
    }
    getFoodStock(){
       return this.foodStock;
      }
    
      updateFoodStock(foodStock){
        this.foodStock=foodStock;
      }
    
   getFeedTime(lastFed){
     this.lastFed=lastFed;
   }
      display(){


        fill("white");
        textSize(15);
        if(lastFed>=12){
          text("Last Feed:"+lastFed%12 + "PM",40,56);
        }
        else if(lastFed==0){
          text("Last Feed:12 AM",40,56);
        }
        else{
          text("Last Feed:"+lastFed+"AM",40,56);
        }
        var x=80,y=100;
          imageMode(CENTER);
          if(this.foodStock!=0){
            for(var i=0;i<this.foodStock;i++){
              if(i%10==0){
                x=80;
                y-y+50;
              }
              image(this.image,x,y,50,50);
              x=x+30;
            }
          }
      }
      bedroom(){
        background(bedroomImg,0,0);
      }
      garden(){
        background(gardenImg,0,0);
      }
      washroom(){
        background(washroomImg,550,500);
      }
}