class SeaMonster{ 

    constructor(game, x, y){
     Object.assign(this, { game, x, y });
     this.velocity = { x: 0, y: 0 };
     this.hp = 100;
     this.maxHP = 100;
     this.healthBar = new HealthBar(this.game, this);
     this.fallAcc = 200;        
     this.spritesheetLeftAttack = assetMangager.getAsset("./sprites/seaMonster/monsterLeft.png");
     this.spritesheetRightAttack = assetMangager.getAsset("./sprites/seaMonster/monster-Riight-Attack.png");
     this.spritesheetLeftFly = assetMangager.getAsset("./sprites/seaMonster/monster-Left-Swim.png");
     this.spritesheetIdle = assetMangager.getAsset("./sprites/seaMonster/monster-idle.png");
     this.spritesheetRightFly = assetMangager.getAsset("./sprites/seaMonster/monster-Right-Swim.png");
     this.speed = 100;
     this.state = 1;
     this.facing = 0;
     this.playerHit = false;
     this.dead = false;
     this.xOff = 0;
     this.yOff = 0;
     this.updateBB();
     this.loadAnimations();
     this.attackCoolDown = 0;
 }; 

 loadAnimations() {
    this.animations = [];

    for (var i = 0; i < 5; i++) { 
        this.animations.push([]);
        for (var j = 0; j < 2; j++) { 
           this.animations[i].push([]);
        }
    }

    // idle
    this.animations[0][0] = new Animator(this.spritesheetIdle, 0, 0, 48, 47, 5, 0.10, 0, 0, false, true, false);
    // swim
    this.animations[1][0] = new Animator(this.spritesheetLeftFly, 0, 0, 48, 47, 15, 0.10, 0, 0, false, true, false);
    // left attack
    this.animations[2][0] = new Animator(this.spritesheetRightAttack, 0, 0, 49, 51, 5, 0.07, 3, 0, true, true, false);
    // idle
    this.animations[0][1] = new Animator(this.spritesheetIdle, 0, 0, 48, 47, 5, 0.10, 0, 0, false, true, false);
    // swim
    this.animations[1][1] = new Animator(this.spritesheetLeftFly, 0, 0, 48, 47, 15, 0.10, 0, 0, false, true, false);
    // left attack
    this.animations[2][1] = new Animator(this.spritesheetRightAttack, 0, 0, 52, 51, 5, 0.07, 3, 0, true, true, false);

    //death
    this.animations[3][0] = new Animator(this.spritesheetRightFly, 0, 0, 48, 47, 15, 0.1, 0, 0, true, true, false);
            
    this.animations[3][1] = new Animator(this.spritesheetRightFly, 0, 0, 48, 47, 15, 0.1, 0, 0, true, true, false);

    for(var l = 0; l <= 3; l++){
        this.animations[l][1].flipped = true;
    }
 }; 

   updateBB() {
      this.lastBB = this.BB;
      //this.BB = new BoundingBox(this.x+65, this.y+60, 60, 100);
      this.BB = new BoundingBox(this.x+55, this.y+30, 80, 110);
      this.MageDetection = new BoundingBox(this.x-500, this.y-200, 1300, 700);
      if(this.facing == 0){
      this.AttackBB = new BoundingBox(this.x+90, this.y+30, 50, 110);
      }
      else{
      this.AttackBB = new BoundingBox(this.x+10, this.y+30, 70, 110);
      }
     
                   
 // };
 //updateBB() {
   //  this.BB = new BoundingBox(this.x + 45-this.game.camera.x, this.y + 35, 70, 90, "red");
     // this.BB = new BoundingBox(this.x + 60-this.game.camera.x, this.y + 35, 70, 110, "red");
     
 }
//  updateOffset(){
//     if(this.facing  === 1){
//     if((this.state === 0) || (this.state === 1)){
//         this.xOff = 40;
//     } 
// }
// else{
//     this.xOff = 0;
// }
//  };
 update() {
    this.elapsedTime += this.game.clockTick;
    const TICK = this.game.clockTick;
    this.x += this.velocity.x * TICK;
    this.y += this.velocity.y * TICK;
    this.updateBB();


    if(!this.dead){
        if (this.hp <= 0) {
            this.state = 3; // death
            this.velocity.x = 0;
            this.dead = true;
            // this.removeFromWorld = true;                      
        }
     this.PlatformCollision();
     this.mageCollide(TICK);
    }
    else{
        this.velocity.x = 0;
        this.velocity.y = 0;;
        if(this.animations[3][this.facing].isAlmostDone(TICK)){
        this.game.mage.getMana();
        this.game.camera.potionDrop(this.BB.x+this.BB.width/2, this.BB.y);
        this.removeFromWorld = true;
               }
    }
//     else{
//         let frame = this.animations[3][this.facing].currentFrame();
//         console.log(frame);
//        if(frame >= 3){
//         this.removeFromWorld = true;
//        }
//     }
//      //console.log(this.velocity.x, this.velocity.y);
       };
 mageCollide(TICK){
    let that = this;
    this.game.entities.forEach(function (entity) {   
        
        if (entity instanceof Mage) {
            const middleMage = { x: entity.BB.left + entity.BB.width / 2, y: entity.BB.top + entity.BB.height / 2 };
            const middleMonster = { x: that.BB.left + that.BB.width / 2, y: that.BB.top + that.BB.height / 2 };
            const xDis = middleMage.x - middleMonster.x;
            const yDis = middleMage.y - middleMonster.y;
            const distance = distanceBetween(middleMage,middleMonster);
            let mageDB = entity.BB && that.MageDetection.collide(entity.BB);
            let mageAB = entity.BB && that.AttackBB.collide(entity.BB);
            let frame = that.animations[that.state][that.facing].currentFrame();
            that.attackCoolDown += TICK;
            if(mageDB){
                if(that.state !== 2){
                if(mageDB && !mageAB)
                    that.state = 1;
                if (xDis > 0 ) {
                    that.facing = 0;
                }
                else if (xDis < 0) {
                    that.facing = 1;
                }
                if (that.state == 1) {
                    that.velocity.x = 200 * xDis / distance;
                    that.velocity.y = 200 * yDis / distance;
                }
            }
                if(mageDB && mageAB){
                    if((that.attackCoolDown >= 2)){
                    that.state = 2;
                }
                    that.velocity.x = 0;
                    that.velocity.y = 0;
                }
            }
        
            else if(!mageDB){
                that.velocity.x = 0
                that.velocity.y = 0;
            }
            if(that.state === 2){
                if(mageAB && !that.playerHit){
                    that.playerHit = true;
                    entity.removeHealth(10); 
                }
                if(that.animations[2][that.facing].isAlmostDone(TICK)){
                    that.state = 1;
                    that.animations[2][that.facing].elapsedTime = 0;
                    that.playerHit = false;
                    that.attackCoolDown = 0;
                }
            }
        };
        });
    
 }
 PlatformCollision(){
    var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (that.velocity.y > 0) { 
                    if (((entity instanceof Ground) || (entity instanceof Platform) || (entity instanceof Wall) || (entity instanceof Tiles || (entity instanceof smallPlatforms))) && (that.lastBB.bottom <= entity.BB.top)){
                        that.velocity.y = 0;
                        that.y = entity.BB.top - that.BB.height -30;
                        that.updateBB();
                    }
                    if ((entity instanceof movingPlatforms) && (that.lastBB.bottom < entity.BB.top+6)){
                        that.y = entity.BB.top - that.BB.height;
                        that.velocity.y = 0;
                        that.updateBB();
                    }
                    } 
                    if(that.velocity.y < 0){
                        if ((entity instanceof Ground || entity instanceof Wall || entity instanceof Platform || entity instanceof movingPlatforms || (entity instanceof Tiles) || entity instanceof smallPlatforms) && (that.lastBB.top >= entity.BB.bottom)){
                            that.velocity.y = 0;
                            that.y = entity.BB.bottom-30;
                            that.updateBB();
                        }
                    }
                    if (((entity instanceof Wall) || (entity instanceof Ground) || (entity instanceof Platform) || (entity instanceof smallPlatforms)) && that.BB.collide(entity.leftBB) && (that.lastBB.top < entity.BB.bottom-5)){
                                that.x = entity.leftBB.left - that.BB.width-55;
                                that.velocity.x = 0;
                                that.updateBB();
                    }
                    if (((entity instanceof Wall) || (entity instanceof Ground) || (entity instanceof Platform) || (entity instanceof Tiles) || (entity instanceof smallPlatforms)) && that.BB.collide(entity.rightBB) && (that.lastBB.top < entity.BB.bottom-5)){               
                                that.x = entity.rightBB.right-55;
                                that.velocity.x = 0; 
                                that.updateBB(); 
                    }
                    if (((entity instanceof movingPlatforms)) && (that.lastBB.left >= entity.BB.right) && (that.lastBB.top < entity.BB.bottom-5)){               
                        that.x = entity.rightBB.right - that.xBBOffset;
                        that.velocity.x = 0; 
                        that.updateBB(); 
                    }
                    if (((entity instanceof movingPlatforms)) && (that.lastBB.right <= entity.BB.left) && (that.lastBB.top < entity.BB.bottom-5)){               
                        that.x = entity.leftBB.left - PARAMS.PLAYERWIDTH-that.xBBOffset;
                        that.velocity.x = 0; 
                        that.updateBB(); 
                    }
                }
                });
}
loseHealth(damageRecieved){
    this.hp -= damageRecieved;

};
 draw(ctx) {
    if(this.hp >= 0){
    this.healthBar.draw(ctx);
    }
    if(this.state === 2 && this.facing  === 1){
    this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x-30, this.y-this.game.camera.y, 3);
    }
    else if(this.facing  === 1){
    this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x + 30, this.y-this.game.camera.y, 3);
    }
    else{
    this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, 3);
    }
    // this.animations[0][0].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, 1 );
    // this.animations[0][1].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x+30, this.y-this.game.camera.y, 1 );
    if(debug){
          ctx.strokeStyle = 'Red';
          ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width , this.BB.height);
          ctx.strokeStyle = 'blue';
          ctx.strokeRect(this.MageDetection.x - this.game.camera.x, this.MageDetection.y - this.game.camera.y, this.MageDetection.width, this.MageDetection.height);
          ctx.strokeStyle = 'yellow';
          ctx.strokeRect(this.AttackBB.x - this.game.camera.x, this.AttackBB.y - this.game.camera.y, this.AttackBB.width, this.AttackBB.height);   
    }     
       }; 3
 

}; 

class Snake {

    constructor(game, x, y){
        Object.assign(this, { game, x, y });
        this.velocity = { x: 0, y: 0 };
        this.hp = 80;
        this.maxHP = 80;
        this.spritesheet = assetMangager.getAsset("./sprites/enemies/snake.png");
        this.enemHealthBar = new HealthBar(this.game, this);
        this.fallAcc = 300;
        this.state = 0;
        this.facing = 0;
        this.dead = false;
        this.updateBB();
        this.loadAnimations();
        this.isHit = false;
        
    }; // end of constructor

    loadAnimations() {
        this.animations = [];
        for (var i = 0; i < 6; i++) { 
            this.animations.push([]);
            for (var j = 0; j < 2; j++) { 
                this.animations[i].push([]);
             }
        }
//(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePaddingX, framePaddingY, reverse, loop, verticalSprite)
        // idle
        this.animations[0][0] = new Animator(this.spritesheet, 50, 0, 70, 65, 4, 0.20, -6, 0, false, true, false);
        // right run
        this.animations[1][0] = new Animator(this.spritesheet, 689, 0, 70, 65, 3, 0.20, -6, 0, false, true, false);
        // attack
        this.animations[2][0] = new Animator(this.spritesheet, 960, 0, 65, 65, 5, 0.20, -1, 0, false, true, false);
        // death
        this.animations[3][0] = new Animator(this.spritesheet, 1338, 0, 65, 65, 1, 0.20, 0, 0, false, true, false);

        this.animations[0][1] = new Animator(this.spritesheet, 50, 0, 70, 65, 4, 0.20, -6, 0, false, true, false);
        // right run
        this.animations[1][1] = new Animator(this.spritesheet, 689, 0, 70, 65, 3, 0.20, -6, 0, false, true, false);
        // attack
        this.animations[2][1] = new Animator(this.spritesheet, 960, 0, 65, 65, 5, 0.20, -1, 0, false, true, false);

        this.animations[3][1] = new Animator(this.spritesheet, 1338, 0, 65, 65, 1, 0.20, 0, 0, false, true, false);
        for(var l = 0; l <= 3; l++){
            this.animations[l][1].flipped = true;
        }
    }; 



    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x+50, this.y+20, 30, 110 );
            this.BB = new BoundingBox(this.x+50, this.y+20, 30, 110 );
        this.lastAttackBB = this.AttackBB;
        this.detectionAttackBB = new BoundingBox(this.x-500, this.y-200, 1300, 700);

        if(this.facing === 0){
            this.AttackBB = new BoundingBox(this.x+55,this.y+55,100,50);
        }
        else if(this.facing === 1){
            this.AttackBB = new BoundingBox(this.x-15,this.y+55,100,50);
        }
    };

    update() {
        this.elapsedTime += this.game.clockTick;
        const TICK = this.game.clockTick;
        this.velocity.y += this.fallAcc * TICK;
        
        // update position

        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
        this.updateBB();
        
        /** chainBot behaviour and collisions */ 
        // TODO this works, but need to ajust duration for the hit state.
        if(!this.dead){
            if(this.hp <= 0){
                this.state = 3;
                // this.animations[3][this.facing].elapsedTime = 7;
                this.dead = true;
            }
            this.PlatformCollision();
            this.mageCollide(TICK);
            }
            else{
                this.velocity.x = 0;
                this.velocity.y = 0;;
               if(this.animations[3][this.facing].isAlmostDone(TICK)){
                this.game.mage.getMana();
                this.game.camera.potionDrop(this.BB.x+this.BB.width/2, this.BB.y);
                this.removeFromWorld = true;
               }
            }
    };//end update() chainBot behavior and collisions
    mageCollide(TICK){
        let that = this;
        this.game.entities.forEach(function (entity) {   
            if(!that.dead){     
            if (entity instanceof Mage) {
                let middleMage = { x: entity.BB.left + entity.BB.width / 2, y: entity.BB.top + entity.BB.height / 2 };
                let middleMonster = { x: that.BB.left + that.BB.width / 2, y: that.BB.top + that.BB.height / 2 };
                let xDis = middleMage.x - middleMonster.x;
                let distance = distanceBetween(middleMage,middleMonster);
                let mageDB = entity.BB && that.detectionAttackBB.collide(entity.BB);
                let mageAB = entity.BB && that.AttackBB.collide(entity.BB);
                // let frame = that.animations[that.state][that.facing].currentFrame();
                if(mageDB){
                    if(that.state !== 2){
                        // console.log(that.velocity.x);
                    if(mageDB && !mageAB){
                    if (xDis > 0 ) {
                        that.state = 1;
                        that.facing = 0;
                    }
                    else if (xDis < 0) {
                        that.state = 1;
                        that.facing = 1;
                    }
                    if (that.state === 1) {
                        that.velocity.x = 200 * xDis / distance;
                    }
                }
                }
                    if(mageDB && mageAB){
                        that.state = 2;
                        that.velocity.x = 0;
                    }
                }
                else if(!mageDB){
                    that.state = 0;
                    that.velocity.x = 0;
                }
                if(that.state === 2){
                    if(mageAB && !that.playerHit){
                        that.playerHit = true;
                        entity.removeHealth(10); 
                    }
                    if(that.animations[2][that.facing].isAlmostDone(TICK)){
                        that.state = 0;
                        that.animations[2][that.facing].elapsedTime = 0;
                        that.playerHit = false;
                    }
                }
            };
        }
            });
     }
     PlatformCollision(){
        var that = this;
            this.game.entities.forEach(function (entity) {
                if (entity.BB && that.BB.collide(entity.BB)) {
                    if (that.velocity.y > 0) { 
                        if (((entity instanceof Ground) || (entity instanceof Platform) || (entity instanceof Wall) || (entity instanceof Tiles || (entity instanceof smallPlatforms))) && (that.lastBB.bottom <= entity.BB.top)){
                            that.velocity.y = 0;
                            that.y = entity.BB.top - that.BB.height-20;
                            that.updateBB();
                        }
                        if ((entity instanceof movingPlatforms) && (that.lastBB.bottom < entity.BB.top+6)){
                            that.y = entity.BB.top - that.BB.height;
                            that.velocity.y = 0;
                            that.updateBB();
                        }
                        } 
                        if(that.velocity.y < 0){
                            if ((entity instanceof Ground || entity instanceof Wall || entity instanceof Platform || entity instanceof movingPlatforms || (entity instanceof Tiles) || entity instanceof smallPlatforms) && (that.lastBB.top >= entity.BB.bottom)){
                                that.velocity.y = 0;
                                that.y = entity.BB.bottom-50;
                                that.updateBB();
                            }
                        }
                        if (((entity instanceof Wall) || (entity instanceof Ground) || (entity instanceof Platform) || (entity instanceof smallPlatforms)) && that.BB.collide(entity.leftBB) && (that.lastBB.top < entity.BB.bottom-5)){
                                    that.x = entity.leftBB.left - that.BB.width-50;
                                    that.velocity.x = 0;
                                    that.updateBB();
                        }
                        if (((entity instanceof Wall) || (entity instanceof Ground) || (entity instanceof Platform) || (entity instanceof Tiles) || (entity instanceof smallPlatforms)) && that.BB.collide(entity.rightBB) && (that.lastBB.top < entity.BB.bottom-5)){               
                                    that.x = entity.rightBB.right-50;
                                    that.velocity.x = 0; 
                                    that.updateBB(); 
                        }
                        if (((entity instanceof movingPlatforms)) && (that.lastBB.left >= entity.BB.right) && (that.lastBB.top < entity.BB.bottom-5)){               
                            that.x = entity.rightBB.right;
                            that.velocity.x = 0; 
                            that.updateBB(); 
                        }
                        if (((entity instanceof movingPlatforms)) && (that.lastBB.right <= entity.BB.left) && (that.lastBB.top < entity.BB.bottom-5)){               
                            that.x = entity.leftBB.left - PARAMS.PLAYERWIDTH-that.xBBOffset;
                            that.velocity.x = 0; 
                            that.updateBB(); 
                        }
                    }
                    });
    }
    loseHealth(damageRecieved){
        this.hp -= damageRecieved;
    
    };
    draw(ctx) {
        if(this.hp >= 0) this.enemHealthBar.draw(ctx);
        
        if(this.state === 2 && this.facing === 0){
        this.animations[2][0].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x+25, this.y-this.game.camera.y, 2);
        }
        else if(this.state === 2 && this.facing === 1){
        this.animations[2][1].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x-15, this.y-this.game.camera.y, 2);
    }
    else {
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, 2);
    }
    // this.animations[3][this.facing].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, 2);
            if(debug){
                //draw the boundingBox
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width , this.BB.height);
                ctx.strokeStyle = 'yellow';
                ctx.strokeRect(this.AttackBB.x - this.game.camera.x, this.AttackBB.y-this.game.camera.y, this.AttackBB.width , this.AttackBB.height);
                ctx.strokeStyle = 'green';
                ctx.strokeRect(this.detectionAttackBB.x - this.game.camera.x, this.detectionAttackBB.y-this.game.camera.y, this.detectionAttackBB.width , this.detectionAttackBB.height);
                // // TEST draw text to canvas
                // ctx.font = "20px Arial";
                // ctx.fillStyle = "white";
                // ctx.fillText("X: " + Math.round(this.x), 510, 50);
                // ctx.fillText("ChainBot BB Width: " + Math.round(this.BB.width), 660, 50);
                // ctx.fillText("ChainBot BB bottom: " + Math.round(this.BB.bottom), 660, 70);
                
                // ctx.fillText("Y: " + Math.round(this.y), 510, 70);
                // ctx.fillText("Speed: " + this.velocity.x, 510, 90);
                // ctx.fillText("State: " + this.state, 510, 110);
                // ctx.fillText("hitPoints: " + this.hp, 510, 130);

            }
            


                         
    }; // End draw method

};

