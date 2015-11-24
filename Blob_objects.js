                /* CLASSIC BLOBS */

var pinkBlob = function() {
    this.src= "Pink_blob.gif";
    this.isAdverse= false;
    this.attack= 60;
    this.defense= 15;
    this.pv= 250;
    this.totalPV= 250;
    this.bonus=0;
}
    
var redBlob = function() {
    this.src= "Red_blob.gif";
    this.isAdverse= false;
    this.attack= 70;
    this.defense= 15;
    this.pv= 200;
    this.totalPV= 200;
    this.bonus=0;
}

var blueBlob = function() {
    this.src= "Blue_blob.gif" ;
    this.isAdverse= false;
    this.attack= 60;
    this.defense= 25;
    this.pv= 200;
    this.totalPV= 200;
    this.bonus=0;
}



/////////////////////////////////////////////////////////
                    /* SPECIAL BLOBS */


var fatBlob = function() {
    this.src= "";
    this.isAdverse= false;
    this.attack= 100;
    this.defense = 45;
    this.pv= 500;
    this.bonus=0;
    this.move= 1;
    this.mash = function() {
    }
}
    
var wallBlob = function() {
    this.src= "Wall_blob.png";
    this.isAdverse= false;
    this.attack= 60;
    this.defense = 55;
    this.pv= 400;
    this.bonus=0;
    this.move= 2;
}
    
var shootingBlob = function() {
    this.src= "Shooting_blob.png";
    this.isAdverse= false;
    this.attack= 80;
    this.defense = 30;
    this.pv= 300;
    this.bonus=0;
    this.move= 2;
    this.shoot = function(adv_attack) {       
    }
}
    
