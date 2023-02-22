const GSCALE = 1;
const WSCALE = 2;
class Ground {
    constructor(game, x, y, width, height, div) {
        Object.assign(this, { game, x, y, width, height, div});

        this.spritesheet = assetMangager.getAsset("./sprites/Lava64.png");
        // this.animations = [];
        // this.animations.push(new Animator(this.spritesheet, 0, 0, 48, 48, 1, 0.1, 0,0,false, true, false));
        this.updateBB();
    };
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
        this.leftBB = new BoundingBox(this.x, this.y, 0, this.height);
        this.rightBB = new BoundingBox(this.x + this.width, this.y, 0, this.height);
        this.bottomBB = new BoundingBox(this.x, this.y+this.height, this.width, 0);
        
    };
    update() {
    };
    draw(ctx) {
        let brickWidth = this.width / (this.div);
        for (var i = 0; i < brickWidth; i++) {
            ctx.drawImage(this.spritesheet, 0, 255, 256, 64, this.x + i * (this.div)-this.game.camera.x, this.y-this.game.camera.y, this.div, this.height);
        }
        if(debug){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width, this.BB.height);
            }
    };
};

class Wall {
    constructor(game, x, y, width, height, div) {
        Object.assign(this, { game, x, y, width, height, div});

        this.spritesheet = assetMangager.getAsset("./sprites/Lava64.png");
        this.updateBB();
    };
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
        this.leftBB = new BoundingBox(this.x, this.y, 0, this.height);
        this.rightBB = new BoundingBox(this.x + this.width, this.y, 0, this.height);
        this.bottomBB = new BoundingBox(this.x, this.y+this.height, this.width, 0);
        this.topBB = new BoundingBox(this.x, this.y, this.width, 0);
        
    };
    update() {
    };
    draw(ctx) {
        let brickHeight = this.height / this.div;
        for (var i = 0; i < brickHeight; i++) {
        ctx.drawImage(this.spritesheet, 0, 11, 192, 154, this.x - this.game.camera.x, this.y + i * this.div-this.game.camera.y, this.width, this.div);
        // ctx.drawImage(this.spritesheet, 0, 11, 192, 154, this.x +192 - this.game.camera.x, this.y - i * (154*WSCALE), (192*WSCALE), (154*WSCALE));
        // ctx.drawImage(this.spritesheet, 0, 11, 192, 154, this.x +384 - this.game.camera.x, this.y - i * (154*WSCALE), (192*WSCALE), (154*WSCALE));
        }
        if(debug){
            ctx.strokeStyle = 'Red';
            // ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width, this.BB.height);
            // ctx.strokeRect(this.leftBB.x-this.game.camera.x, this.leftBB.y-this.game.camera.y, this.leftBB.width, this.leftBB.height);
            ctx.strokeRect(this.rightBB.x-this.game.camera.x, this.rightBB.y-this.game.camera.y, this.rightBB.width, this.rightBB.height);
        }
    };
};

class BackGround {
    constructor(game, x, y, w, h, level) {
        Object.assign(this, { game, x, y, w, h, level});
        if(this.level === levelOne){
        this.spritesheet = assetMangager.getAsset(levelOne.background);
        }
        else if(this.level === levelThree){
        this.background1 = assetMangager.getAsset(levelThree.background1);
        this.background2 = assetMangager.getAsset(levelThree.background2);
        this.background3 = assetMangager.getAsset(levelThree.background3);

        }

    };

    update() {
    };
    draw(ctx) {
        if(this.level === levelOne){
        ctx.drawImage(this.spritesheet,this.x ,this.y, this.w, this.h);
        }
        else if(this.level === levelThree){
            ctx.drawImage(this.background1,this.x ,this.y, this.w, this.h);
            ctx.drawImage(this.background2,this.x ,this.y, this.w, this.h);
            ctx.drawImage(this.background3,this.x ,this.y, this.w, this.h);
           
        }
    };
};
class Platform {
    constructor(game, x, y, width, height, divisor) {
        Object.assign(this, { game, x, y, width, height, divisor});

        this.spritesheet = assetMangager.getAsset("./sprites/Lava64.png");
        this.updateBB();
    };
    updateBB() {
        
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
        this.leftBB = new BoundingBox(this.x, this.y, 0, this.height);
        this.rightBB = new BoundingBox(this.x + this.width, this.y, 0, this.height);
        this.bottomBB = new BoundingBox(this.x, this.y+this.height, this.width, 0);
        this.topBB = new BoundingBox(this.x, this.y, this.width, 0);
        
    };
    update() {
    };
    draw(ctx) {
        let brickWidth = this.width / (this.divisor);
        for (var i = 0; i < brickWidth; i++) {
            ctx.drawImage(this.spritesheet, 322, 256, 127, 31, this.x + i * (this.divisor)-this.game.camera.x, this.y-this.game.camera.y, this.divisor, this.height);
        }

        if(debug){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width, this.BB.height);
            // ctx.strokeRect(this.rightBB.x-this.game.camera.x, this.rightBB.y-this.game.camera.y, this.rightBB.width, this.rightBB.height);
            // ctx.strokeRect(this.topBB.x-this.game.camera.x, this.topBB.y-this.game.camera.y, this.topBB.width, this.topBB.height);
            }
    };
};
class Tiles {
    constructor(game, x, y, width, height, divisor) {
        Object.assign(this, { game, x, y, width, height, divisor});

        this.spritesheet = assetMangager.getAsset("./sprites/Lava64.png");
        // this.animations = [];
        // this.animations.push(new Animator(this.spritesheet, 0, 0, 48, 48, 1, 0.1, 0,0,false, true, false));
        this.updateBB();
    };
    updateBB() {
        
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
        this.leftBB = new BoundingBox(this.x, this.y, 0, this.height);
        this.rightBB = new BoundingBox(this.x + this.width, this.y, 0, this.height);
        this.bottomBB = new BoundingBox(this.x, this.y+this.height, this.width, 0);
        this.topBB = new BoundingBox(this.x, this.y, this.width, 0);
        
    };
    update() {
    };
    draw(ctx) {
        let brickWidth = this.width / (192);
        for (var i = 0; i < brickWidth; i++) {
            ctx.drawImage(this.spritesheet, 0, 191, 192, 51, this.x + i * (this.divisor)-this.game.camera.x, this.y-this.game.camera.y, this.divisor, this.height);
        }

        if(debug){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width, this.BB.height);
            // ctx.strokeRect(this.rightBB.x-this.game.camera.x, this.rightBB.y-this.game.camera.y, this.rightBB.width, this.rightBB.height);
            // ctx.strokeRect(this.topBB.x-this.game.camera.x, this.topBB.y-this.game.camera.y, this.topBB.width, this.topBB.height);
            }
    };
};
class movingPlatforms {
    constructor(game, x, y, width, height, divisor, direction, distance) {
        Object.assign(this, { game, x, y, width, height, divisor, direction, distance});

        this.spritesheet = assetMangager.getAsset("./sprites/Lava64.png");
        // this.animations = [];
        // this.animations.push(new Animator(this.spritesheet, 0, 0, 48, 48, 1, 0.1, 0,0,false, true, false));
        this.updateBB();
        this.originalX = x;
        this.originalY = y;
        this.reverse = false;
    };
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
        this.leftBB = new BoundingBox(this.x, this.y, 0, this.height);
        this.rightBB = new BoundingBox(this.x + this.width, this.y, 0, this.height);
        this.bottomBB = new BoundingBox(this.x, this.y+this.height, this.width, 0);
        this.topBB = new BoundingBox(this.x, this.y, this.width, 0);
        
    };
    update() {
        if(this.direction === "x-axis"){
            if(this.x < this.distance && this.reverse === false){
                this.x += 100* this.game.clockTick;
                this.updateBB();
                if(this.x >= this.distance){
                    this.reverse = true;
                }
            }
            else{
                    
                    this.x -= 250 * this.game.clockTick;
                    if(this.x <= this.originalX){
                        this.reverse = false;
                    }
                    this.updateBB();
                    
                
            }
    }
    else {
        if(this.y < this.distance && this.reverse === false){

            this.y += 50* this.game.clockTick;
            this.updateBB();
            if(this.y >= 400){
                this.reverse = true;
            }
            // console.log(this.y + "testing");

        }
        else{
                
                this.y -= 50 * this.game.clockTick;
                if(this.y <= this.originalY){
                    this.reverse = false;
                }
                this.updateBB();
                
            
        }
    }
        
        

    };
   
    draw(ctx) {
        let brickWidth = this.width / (256);
        for (var i = 0; i < brickWidth; i++) {
            ctx.drawImage(this.spritesheet, 322, 256, 127, 31, this.x + i * (this.divisor)-this.game.camera.x, this.y-this.game.camera.y, this.divisor, this.height);
        }

        if(debug){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width, this.BB.height);
            // ctx.strokeRect(this.rightBB.x-this.game.camera.x, this.rightBB.y-this.game.camera.y, this.rightBB.width, this.rightBB.height);
            }
    };
};


class lava {
    constructor(game, x, y, width, height) {
        Object.assign(this, { game, x, y, width, height});

        this.spritesheet = assetMangager.getAsset("./sprites/Lava64.png");
        // this.animations = [];
        // this.animations.push(new Animator(this.spritesheet, 0, 0, 48, 48, 1, 0.1, 0,0,false, true, false));
        this.updateBB();
    };
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, this.width, (64*GSCALE));
        
    };
    update() {
    };
    draw(ctx) {
        let brickWidth = this.width / ((256*GSCALE));
        for (var i = 0; i < brickWidth; i++) {
            ctx.drawImage(this.spritesheet, 188, 196, 10, 20, this.x + i * (10*GSCALE)-this.game.camera.x, this.y, (10*GSCALE), (64*GSCALE));
        }
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
    };
};

class verticalWall {
    constructor(game, x, y, width, height, divisor) {
        Object.assign(this, { game, x, y, width, height, divisor});

        this.spritesheet = assetMangager.getAsset("./sprites/Lava64.png");
        this.updateBB();
    };
    updateBB() {
        
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
        this.leftBB = new BoundingBox(this.x, this.y, 0, this.height);
        this.rightBB = new BoundingBox(this.x + this.width, this.y, 0, this.height);
        this.bottomBB = new BoundingBox(this.x, this.y+this.height, this.width, 0);
        this.topBB = new BoundingBox(this.x, this.y, this.width, 0);
        
    };
    update() {
    };
    draw(ctx) {
        let brickWidth = this.width / (this.divisor);
        for (var i = 0; i < brickWidth; i++) {
            ctx.drawImage(this.spritesheet, 448, 128, 127, 127, this.x + i * (this.divisor)-this.game.camera.x, this.y-this.game.camera.y, this.divisor, this.height);
        }

        if(debug){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width, this.BB.height);
            }
    };
};

class smallPlatforms {
    constructor(game, x, y, width, height, divisor) {
        Object.assign(this, { game, x, y, width, height, divisor});

        this.spritesheet = assetMangager.getAsset("./sprites/Lava64.png");
        this.updateBB();
    };
    updateBB() {
        
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
        this.leftBB = new BoundingBox(this.x, this.y, 0, this.height);
        this.rightBB = new BoundingBox(this.x + this.width, this.y, 0, this.height);
        this.bottomBB = new BoundingBox(this.x, this.y+this.height, this.width, 0);
        this.topBB = new BoundingBox(this.x, this.y, this.width, 0);
        
    };
    update() {
    };
    draw(ctx) {
        let brickWidth = this.width / (this.divisor);
        for (var i = 0; i < brickWidth; i++) {
            ctx.drawImage(this.spritesheet, 256, 238, 63, 17, this.x + i * (this.divisor)-this.game.camera.x, this.y-this.game.camera.y, this.divisor, this.height);
        }

        if(debug){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width, this.BB.height);
            }
    };
};

