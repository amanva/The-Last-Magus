class Projectile{
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});

        this.spritesheet = assetMangager.getAsset("./sprites/blackFireball.png");
        this.speed = 500;
        this.damage = 10;
        this.animations = [];
        this.dead = false;
        this.animations.push(new Animator(this.spritesheet, 0, 0, 15, 15, 4, 0.3, 7, 0, false, true, false));
        this.shot = {x: this.game.click.x + this.game.camera.x, y: this.game.click.y + this.game.camera.y};
        this.dist = distanceBetween(this, this.shot);
        this.velocity = { x: (this.shot.x - this.x) / this.dist * this.speed, y: (this.shot.y - this.y) / this.dist * this.speed};
        this.angle = getAngle(this.velocity);
        this.updateBB();
    };
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x-15, this.y-15, 30, 30);
        
    };
    update(){
        const TICK = this.game.clockTick;
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
        this.updateBB();
        if(this.x < -10){
            this.removeFromWorld = true; 
        }
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if ((entity instanceof Ground || entity instanceof Wall || entity instanceof Platform || entity instanceof movingPlatforms) && that.BB.collide(entity.BB)) {
                   that.removeFromWorld = true;
                }
                if(entity instanceof fireBoss){
                    that.removeFromWorld = true;
                    entity.loseHealth(that.getDmg());
                    console.log("HIT2");
                }
                if(entity instanceof Monster){
                    that.removeFromWorld = true;
                    entity.loseHealth(that.getDmg());
                }
                if(entity instanceof Slime){
                    that.removeFromWorld = true;
                    entity.loseHealth(that.getDmg());
                    console.log("HIT2");
                }
                
            }
            
            });
            // console.log(this.dist);
            // console.log(this.velocity.x, this.velocity.y);
    };
    getDmg() {
        let dmg = this.damage;
        return dmg;
    }
    draw(ctx){
        // this.animations[0].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y , 2);
        this.animations[0].drawAngle(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, 2, this.angle);
        if(debug){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width, this.BB.height);
        }
    };

    
};


class FireBall{
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});

        this.spritesheet = assetMangager.getAsset("./sprites/FB001.png");
        this.animations = [];
        this.speed = 500;
        this.dead = false;
        this.animations.push(new Animator(this.spritesheet, 20, 5, 33, 18, 5, 0.2, 31, 0, false, true, false));
        this.shot = {x: this.game.mouse.x + this.game.camera.x, y: this.game.mouse.y + this.game.camera.y};
        var dist = distanceBetween(this, this.shot);
        this.velocity = { x: (this.shot.x - this.x) / dist * this.speed, y: (this.shot.y - this.y) / dist * this.speed};
        this.angle = getAngle(this.velocity);
        this.updateBB();
    };
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x-20, this.y-20, 30*2, 13*2);
    };
    update(){
        const TICK = this.game.clockTick;
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
        this.updateBB();
        if(this.x < -10){
            this.removeFromWorld = true; 
        }
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if ((entity instanceof Ground || entity instanceof Wall || entity instanceof Platform || entity instanceof movingPlatforms) && that.BB.collide(entity.BB)) {
                   that.removeFromWorld = true;
                }
                if(entity instanceof fireBoss){
                    that.removeFromWorld = true;
                    entity.loseHealth(50);
                }
                if(entity instanceof ChainBot){
                    that.removeFromWorld = true;
                    entity.hp -= 100;
                }
                if(entity instanceof Monster){
                    that.removeFromWorld = true;
                    entity.loseHealth(100);
                }
                if(entity instanceof Slime){
                    that.removeFromWorld = true;
                    entity.loseHealth(100);
                }
            }
            
            });
    };

    draw(ctx){
        this.animations[0].drawAngle(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, 2, this.angle);
        if(debug){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width, this.BB.height);
            }
    };

}

class Earth{
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});

        this.spritesheet = assetMangager.getAsset("./sprites/earth.png");
        this.animations = [];
        this.speed = 500;
        this.dead = false;
        this.animations.push(new Animator(this.spritesheet, 0, 10, 22, 10, 6, 0.1, 27, 0, false, true, false));
        this.shot = {x: this.game.mouse.x + this.game.camera.x, y: this.game.mouse.y + this.game.camera.y};
        var dist = distanceBetween(this, this.shot);
        this.velocity = { x: (this.shot.x - this.x) / dist * this.speed, y: (this.shot.y - this.y) / dist * this.speed};
        this.angle = getAngle(this.velocity);
        this.updateBB();
    };
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, 23, 10);
    };
    update(){
        const TICK = this.game.clockTick;
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
        this.updateBB();
        if(this.x < -10){
            this.removeFromWorld = true; 
        }
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if ((entity instanceof Ground || entity instanceof Wall || entity instanceof Platform || entity instanceof movingPlatforms) && that.BB.collide(entity.BB)) {
                   that.removeFromWorld = true;
                }
                if(entity instanceof fireBoss){
                    that.removeFromWorld = true;
                    entity.loseHealth(50);
                }
                if(entity instanceof ChainBot){
                    that.removeFromWorld = true;
                    entity.hp -= 100;
                }
                if(entity instanceof Monster){
                    that.removeFromWorld = true;
                    entity.loseHealth(100);
                }
                if(entity instanceof Slime){
                    that.removeFromWorld = true;
                    entity.loseHealth(100);
                }
            }
            
            });
    };

    
    draw(ctx){
        this.animations[0].drawAngle(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, 3, this.angle);
        if(debug){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width, this.BB.height);
            }
    };

}
// class 
