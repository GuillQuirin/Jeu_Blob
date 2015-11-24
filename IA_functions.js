var mapWidth=9 ;
var mapLength = 10;


function IAfoundLine() 
{
    var potentialBlobs = new Array();
    var currentCase;
    var LineFound= false;
    
    for (var i=mapLength-1; i>-1 && !LineFound; i--)
    {
        for (j=0; j<mapLength; j++)
        {
            currentCase= document.getElementById(i+"_"+j);
            if (currentCase != null && currentCase.getAttribute("name") == "adverse_blob" )
            {
                if (potentialBlobs.length == 0)
                    potentialBlobs[0]= currentCase.getAttribute("id");
                else 
                    potentialBlobs[potentialBlobs.length] =  currentCase.getAttribute("id");
                LineFound= true;
            }
        }
    }
    
    IAsetBlobsPriority (potentialBlobs);
}



function IAsetBlobsPriority (potentialBlobs)
{
    var blobsPriority = new Array();        // Pour chaque blob de la ligne, on associe une valeur de priorité (100 -> attaque directe, 10 -> déplacement suivie d'une attaque, 1 -> déplacement + bonus)
    var targetCoordsByPotentialBlob = new Array();
    var currentBlob;
    
    for (var i=0; i<potentialBlobs.length; i++)     // Initialisation du tableau de priorité d'action
    {
        blobsPriority[i]=0;
        targetCoordsByPotentialBlob[i] = "0_0";
    }
    
    
    for (var i=0; i<potentialBlobs.length; i++)
    {
        var Y = Number(potentialBlobs[i].slice(0,1));
        var X = Number(potentialBlobs[i].slice(2));
         
        blobsPriority[i] += 100 * IAtestDirectAttack(X, Y);        // Si blob adverse est sur une case directement adjacente 
        
        blobsPriority[i] += Number( countBonusAndBlobsArround(X, Y, false).split("_")[0]) * 10;         // S'il y a des blobs adverses attaquable en se déplaçant (ou non)
        targetCoordsByPotentialBlob[i] = countBonusAndBlobsArround(X, Y, false).split("_")[1] +"_"+ countBonusAndBlobsArround(X, Y, false).split("_")[2];        // Coordonnées du blob à attaquer
        
        blobsPriority[i] += Number( countBonusAndBlobsArround(X, Y, true).split("_")[2]);   // S'il y a des bonus à prendre
        if (blobsPriority[i] < 10)
            targetCoordsByPotentialBlob[i] = countBonusAndBlobsArround(X, Y, true).split("_")[0] +"_"+ countBonusAndBlobsArround(X, Y, true).split("_")[1]     // coordonnées du bonus à prendre
          
    }
    
    IAactBlob(potentialBlobs, blobsPriority, targetCoordsByPotentialBlob);  
}
            
            
function IAtestDirectAttack(X, Y)
{
    var adjacentCases = new Array();
    
    adjacentCases[0] = document.getElementById((++Y)+"_"+X);
    Y--;
    adjacentCases[1] = document.getElementById(Y+"_"+(--X));
    X++;
    adjacentCases[2] = document.getElementById(Y+"_"+(++X));
    X--;
    adjacentCases[3] = document.getElementById((--Y)+"_"+X);
    Y++;
    for (var i=0; i<4; i++)
    {
        if (adjacentCases[i] != null && adjacentCases[i].getAttribute("name")  == "player_blob")
            return (i+1);
    }
    return 0;
}


function countBonusAndBlobsArround (X, Y, bonus)
{
    var bonusCounter=0;
    var i_bonus=0, j_bonus=0;
    
    for (var i=X-3; i<= X+3; i++)
    {
        for (var j=Y-3; j<= Y+3; j++)
        {
            var currentCase= document.getElementById(j+"_"+i);
                        
            if (currentCase != null && ((X-i)*(Y-j)>-3 && (X-i)*(Y-j)<3))
            {
                if ((bonus != true) && (currentCase.getAttribute("name") == "player_blob"))      // détection d'un blob allié accesible
                {
                    if ((i == X) && (j<Y))          // Si est derrière sur la même colonne
                        return (4+"_"+i+"_"+j);
                    else if ((i == X) && (j>Y))     // si est devant sur la même colonne
                        return (1+"_"+i+"_"+j);
                    else if (i<X)                   // si dans la moitié gauche du champ d'action
                        return (2+"_"+i+"_"+j);
                    else if (i>X)
                        return (3+"_"+i+"_"+j);     // si dans la moitié droite du champ d'action
                }
                else if (currentCase.childNodes[0] != null && currentCase.childNodes[0].getAttribute("class") == "bonus")       // détection d'un bonus
                {
                    bonusCounter++;
                    i_bonus= i;
                    j_bonus= j;
                }
            }
        }
    }
    
    if (bonus == true)
        return (i_bonus+"_"+j_bonus+"_"+bonusCounter);
    else 
        return 0+"_";
}


function IAactBlob (potentialBlobs, blobsPriority, targetCoords)
{
    var max=0, rightBlob= potentialBlobs[0];
    var target_y= Number(targetCoords[0].split("_")[0]), target_x= Number(targetCoords[0].split("_")[1]);
    
    for (var i=0; i<potentialBlobs.length; i++)
    {
        if (blobsPriority[i] >= max)
        {
            max = blobsPriority[i];
            rightBlob = potentialBlobs[i];
            target_y= Number(targetCoords[i].split("_")[0]);
            target_x= Number(targetCoords[i].split("_")[1]);
        }
    }
    // alert (document.getElementById(rightBlob).childNodes[0].getAttribute("id")+"  max="+max+" et x:"+target_x+", y:"+target_y); 
    
    var j= Number( document.getElementById(rightBlob).getAttribute("id").slice(0,1));
    var i= Number( document.getElementById(rightBlob).getAttribute("id").slice(2));
    var color=  (document.getElementById(rightBlob).getAttribute("type") == "pink") ? 4 : (document.getElementById(rightBlob).getAttribute("type") == "red") ? 5 : 6 ;
    
                    // Cas de l'attaque directe
    if (max >= 400)          
    { setDamage(j-1, i, j, i); }//   alert("Il attaque");}     // derrière
    else if (max >= 300)
    {   setDamage(j, i+1, j, i);}//   alert("Il attaque");}     // à droite
    else if (max >= 200)
    {   setDamage(j, i-1, j, i); }//alert("Il attaque");}       // à gauche
    else if (max >= 100)
    {setDamage(j+1, i, j, i); }//   alert("Il attaque");}    // devant
        
    else if (max >= 10)                 // Cas de déplacement puis d'une attaque
    {    IAmoveAndAttack (max, target_x, target_y, i, j, color);
     //alert("Il bouge");
    }
    
    else if (i != 0 && j != 0) 
        changePosition (target_x, target_y, j, i, color);       // Sinon déplacement vers un bonus accessible
    
}


function IAmoveAndAttack (max, target_x, target_y, i, j, color)
{
    target_x= Number(target_x);
    target_y= Number(target_y);
    i= Number(i);
    j= Number(j);
    
    if (max >= 40)
    {
        changePosition (Number(target_x+1), target_y, j, i, color); 
        setDamage (target_x, target_y, Number(target_x+1), target_y);
    }
    else if (max >= 30)
    {
        changePosition (target_x, (target_y-1), j, i, color); 
        setDamage (target_x, target_y, target_x, (target_y-1));
    }    
        
    else if (max >= 20)
    {
        changePosition (target_x, Number(target_y+1), j, i, color); 
        setDamage (target_x, target_y, target_x, Number(target_y+1));
    }    
    else if (max >= 10)
    {
        changePosition (Number(target_x-1), target_y, j, i, color); 
        setDamage (target_x, target_y, (target_x-1), target_y);
    }
}