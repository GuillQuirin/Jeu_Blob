var mapWidth=9 ;
var mapLength = 10;


function play() // Vérificateur du gameplay
{
    /*
        Une fois l'insertion terminée, le jeu se lance, les blobs peuvent se déplacer et un système de tour par tour est mis en place
        entre le joueur et l'IA.
        Tour du joueur:
            Chaque action décisive équivaut à un tour (attaque, déplacement, déplacement + duplication du bonus)
            à la fin de l'action est rappelée la fonction play qui va modifier la variable statique invitant l'IA à jouer.
        Tour de l'IA:
            L'IA base ses choix selon 3 situations:
                -Rencontre d'un ennemi à proximité => Attaque
                -Rencontre d'un bonus à proximité => Duplication
                -Par défaut: descente progressive vers le bas de la grille
        La partie se termine lorsque l'un des 2 joueurs n'a plus de blobs sur le terrain
    */
    
    play.i = ++play.i || 1 //Incrémentation de départ pour la variable statique

    end =false;

     if(scanGrid()==1)
    {
        alert("Gagné !");
        lol=Musique(0);
        return 1;
    }   
    else if(scanGrid()==2)
    {
        alert("Perdu");
        lol=Music(0);
        return 2;
    }
    else
    {
        if(play.i!=0)       // Cas du joueur, play() arrivant après l'action, c'est au tour de l'IA
        {
            play.i=0;
        }
        if(play.i==0)       //Configuration de l'IA
        {
            // alert("Tour de l'IA.....");
            /*
            var portee = IARange();

            si(portee==null && document.getElementsByName("bonus").length>0) // Direction vers le bonus
            {
                 selection_et_deplacement_ia_proche_de_cible(valeur_bonus); //determination du chemin le plus court entre un bonus et un blob IA 
                 dedoublement_bonus //fonction classique déjà créé
            }
            sinon si(portee!=null) // Attaque
            {
                selection_et_deplacement_ia_proche_de_cible(portee[0],portee[1],portee[2],portee[3]);// IA(y;x) et Cible(y;x)
            }
            sinon si(portee==null && document.getElementsByName("bonus").length==0) // Direction vers le bas de la grille
            {
                localisation_plus_court_chemin_vers_blob();
                selection_ia_proche_de_cible //cible aura un parametre qui le representera en tant que bonus
                deplacement_ia_vers_cible 
            }
            */
            
            IAfoundLine();
            moveMode();
            play.i=1;
        }
    }
}

/*
function IARange() 
{
    for(var y = mapLength; y>0; y--)
    {
        for(var x = mapWidth; x>0; x--)
        {
            if(document.getElementsByName("IA_"+y+"_"+x)[0] != null) // Si une IA est sur la grille
            {
                for(var i=y-2; i<y+2; i++)
                {
                    for(var j=x-2; j<x+2; j++)
                    {
                        if(document.getElementsByName("img_"+i+"_"+j+"")[0] != null) // Si une image de blob allié est sur cette case
                            return [y,x,i,j];
                    }
                }
            }
        }
    }
    return null;
}
*/

function scanGrid()     // Analyse des élèments restants sur la grille
{
    var nbennemis = document.getElementsByName("adverse_blob");
    var nballies= document.getElementsByName("player_blob");

    if(nbennemis.length==13)    //Par défaut 0
        return 1; 
    if(nballies.length==0)
        return 2;
    else
        return 0;
}





function attackMode() //Mise en mode attaque des cases adjacentes 
{
    var blobCases = document.getElementsByName("player_blob");
    var x, y;
    
    for (var i=0; i<blobCases.length; i++)
    {   
        x= blobCases[i].getAttribute("onclick").split("(")[1].split(",")[0];   
            y= blobCases[i].getAttribute("onclick").split("(")[1].split(",")[1];
        
        if (blobCases[i].getAttribute("type") == "pink")
            blobCases[i].setAttribute("onclick", "selectAttack("+x+","+y+",1)");
        else if(blobCases[i].getAttribute("type") == "red")
            blobCases[i].setAttribute("onclick", "selectAttack("+x+","+y+",2)");
        else if(blobCases[i].getAttribute("type") == "blue")
            blobCases[i].setAttribute("onclick", "selectAttack("+x+","+y+",3)");
    }
}


function moveMode()     // Remise en mode déplacement des cases adjacentes après attaque
{
    var blobCases = document.getElementsByName("player_blob");
    var x, y;
    
    for (var i=0; i<blobCases.length; i++)
    {   
        x= blobCases[i].getAttribute("onclick").split("(")[1].split(",")[0];   
            y= blobCases[i].getAttribute("onclick").split("(")[1].split(",")[1];
        
        if (blobCases[i].getAttribute("type") == "pink")
            blobCases[i].setAttribute("onclick", "selectMoveCondition("+x+","+y+",1)");
        else if(blobCases[i].getAttribute("type") == "red")
            blobCases[i].setAttribute("onclick", "selectMoveCondition("+x+","+y+",2)");
        else if(blobCases[i].getAttribute("type") == "blue")
            blobCases[i].setAttribute("onclick", "selectMoveCondition("+x+","+y+",3)");
    }
}


function selectAttack(i, j, color)      //Portée d'attaque d'un blob d'une case à une autre
{
    for(var x=0; x<mapLength;x++)       //Mise à niveau de l'opacité de la grille à 1 
    {
        for(var y=0; y<mapWidth;y++)
        {
            var cases=document.getElementById(x+"_"+y);
            cases.style.opacity="1";                   
        }
    }
    var cible = document.getElementById(i+"_"+j);
    
    if (i==0)           // Bordure haute
        attack(i, j, i, i+1, j-1, j+1);
    
    else if(j==0)           //Bordure gauche
        attack(i, j, i-1, i+1, j, j+1);
    
    else if(j==mapWidth-1)       //Bordure droite
        attack(i, j, i-1, i+1, j-1, j);
    
    else if(i==mapLength-1)         //Bordure basse
        attack(i, j, i-1, i, j-1, j+1);

    else            //Entourage d'une case n'étant pas en bordure de grille
        attack(i, j, i-1, i+1, j-1, j+1);
}


function attack(i, j, xMin, xMax, yMin, yMax)   //Intermediaire entre la selection de la cible et le retrait des points de vie
{
    var cible = document.getElementById(i+"_"+j);
    
    for(var x=xMin; x<=xMax; x++) 
    {
        for(var y=yMin; y<=yMax; y++)
        {
            var cases= document.getElementById(x+"_"+y);
            if(cases == null)
                continue;

            if((x>=0 && x<=mapLength-1) || (y>=0 && y<=mapWidth-1))
            {
                if( (x==i && y==j) || !((i-x)*(j-y)==0 ) || cases.getAttribute("name")=="player_blob" )  
                {
                    cible.style.opacity="1";  
                    cases.style.opacity="1"; 
                }          
                else   //Mise en surbrillance des cibles à proximité  
                { 
                    cases.style.opacity="0.5"; 
                    if(cases.getAttribute("name")!="vide")
                        cases.setAttribute("onclick","setDamage("+x+","+y+","+i+","+j+")");
                } 
            }
        }
    }
}
 


function setDamage(target_Y, target_X, attacker_Y, attacker_X)          //Retrait des PV de la cible
{ 
    target_Y= Number(target_Y);
    target_X= Number(target_X);
    
    var hurtedBlobId= document.getElementById(target_Y+"_"+target_X).childNodes[0].getAttribute("id").slice(4);
    var attackerBlobId= document.getElementById(attacker_Y+"_"+attacker_X).childNodes[0].getAttribute("id").slice(4);
        
    var resultat= blobsObjetTable[hurtedBlobId].pv -= blobsObjetTable[attackerBlobId].attack - blobsObjetTable[hurtedBlobId].defense;
    
    if(blobsObjetTable[hurtedBlobId].pv < 1)      // suppression du blob si PV à 0
    {
        killBlob(target_Y, target_X);
    }

    for (var thisCase= null, i=attacker_Y-1; i<= (attacker_Y+1); i++)
    {       
        for (var j=attacker_X-1; j<= (attacker_X+1); j++)
        {
            if(thisCase= document.getElementById(i+"_"+j), thisCase == null)
				continue;
            thisCase.style.opacity="1";
        }
    }
    
    attackAnimation (target_Y, target_X);
    
    if (document.getElementById(target_Y+"_"+target_X).childNodes[0] != null && document.getElementById(target_Y+"_"+target_X).getAttribute("name") == "adverse_blob")
        var jeu = play();       // appel au tour de l'IA

}




function killBlob(target_Y, target_X)   //Suppression de la cible
{
    var sound= new Audio ("Yahou.mp3");
    var blobCase= document.getElementById(target_Y+"_"+target_X);
 
    var NbrBlob= blobsObjetTable[0];
    var blobId= Number(blobCase.childNodes[0].getAttribute("id").slice(4)); 
   
    sound.play();
    if ((blobId)!=NbrBlob)
    {
        for(var i=blobId; i<=NbrBlob; i++)   // réattribution des id des images blob
            document.getElementById("blob"+i).setAttribute("id","blob"+(i-1));
    }
    blobsObjetTable[0]--;
       
    blobsObjetTable.splice(blobId, 1);  // suppression dans le tableau de Blobs 
        
    blobCase.setAttribute("name","vide");
    blobCase.setAttribute("onclick","reset()");
    blobCase.setAttribute("onmouseover","");
    blobCase.setAttribute("onmouseout","");
    blobCase.setAttribute("type","");
    blobCase.innerHTML="";  
}



function initAdverseId (color, i, j) // Insertion des stats dans une IA
{
    var img= document.getElementById(i+"_"+j).childNodes[0];

    if (color == "1")
        img.setAttribute("id", createBlobObject(1));
    else if (color == "2")
        img.setAttribute("id", createBlobObject(2));
    else if (color == "3")
        img.setAttribute("id", createBlobObject(3));  
}



