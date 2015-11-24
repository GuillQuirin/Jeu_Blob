var mapWidth = 9 ;
var mapLength = 10;
var NB_BLOBS_START = 2;

function insertion(i,j,color)
{
    for(var x=0; x<mapLength;x++)          //Opacité générale à 1
    {
        for(var y=0; y<mapWidth;y++)
        {
            var cases=document.getElementById(x+"_"+y);
            cases.style.opacity="1";                   
        }
    }
    
    var case_lib=document.getElementById(i+"_"+j);
    var picture = document.createElement("img");
	
    if(color==1)    // Rose
    {
        case_lib.setAttribute("type", "pink");
        picture.setAttribute("src", "Pink_blob.gif");
		picture.setAttribute("name", "img_"+i+"_"+j);
        picture.setAttribute("id", createBlobObject(1));
        var compteur=document.getElementById("P_quantity");
    }
        
    if(color==2)    // Rouge
    {
        case_lib.setAttribute("type", "red");
        picture.setAttribute("src", "Red_blob.gif");
        picture.setAttribute("name", "img_"+i+"_"+j);
        picture.setAttribute("id", createBlobObject(2));
        var compteur=document.getElementById("R_quantity");
    }
        
    if(color==3)    // Bleu
    {
        case_lib.setAttribute("type", "blue");
        picture.setAttribute("src", "Blue_blob.gif");
        picture.setAttribute("name", "img_"+i+"_"+j);
        picture.setAttribute("id", createBlobObject(3));
        var compteur=document.getElementById("B_quantity");
    }

    if(compteur.innerHTML-1>=0)//Si la case ciblée ne contient pas d'image
    {
        picture.setAttribute("class", "img");
        case_lib.appendChild(picture);
        case_lib.setAttribute("name","player_blob");
        case_lib.setAttribute("onclick","selectMoveCondition("+i+","+j+","+color+")");      //Enregistrement de la position de l'image pour la zone d'action
        case_lib.setAttribute("onmouseover","stat("+i+","+j+","+color+")");       //Passage de la souris sur l'image
        case_lib.setAttribute("onmouseout","reboot_stat("+i+","+j+","+color+")");   //Eloignement de la souris de l'image
        compteur.innerHTML=compteur.innerHTML-1;
    }

    for(var x=0; x<mapLength;x++)       //Indication aux cases sans image qu'elles sont vides
    {
        for(var y=0; y<mapWidth;y++)
        {
            var cases=document.getElementById(x+"_"+y);
            cases.style.opacity="1";
            if(cases.getAttribute("name")=="vide")
			{
                cases.setAttribute("onclick","reset()");                    
				cases.setAttribute("onmouseover","");       //Passage de la souris sur l'image
				cases.setAttribute("onmouseout","");   //Eloignement de la souris de l'image
			}
		}
    }
   
    if(Limit_number()==1)
    {
        alert("Lancement de la partie !");
        var jeu = play();
    }
    return 1;
}


function changePosition (x_cible, y_cible, x_ancien, y_ancien, color)     //Déplacement d'un blob d'une case à une autre
{
    var goalCase = document.getElementById(x_cible+"_"+y_cible);
    var startCase = document.getElementById(x_ancien+"_"+y_ancien);

    if (goalCase.childNodes[0] != undefined && goalCase.childNodes[0].getAttribute("class")=="bonus") //Si présence d'un bonus sur la case
        addBonusToBlob(x_cible, y_cible, x_ancien, y_ancien);
    
    var image=document.createElement("img");
    
        if(color==1) {
            image.setAttribute("src", "Pink_blob.gif");
            
			
            goalCase.setAttribute("type", "pink");
        }
        if(color==2) {
            image.setAttribute("src", "Red_blob.gif");
            goalCase.setAttribute("type", "red");
        }
        if(color==3) {
            image.setAttribute("src", "Blue_blob.gif");
            goalCase.setAttribute("type", "blue");
        }
        else if(color==4) {         // blob rose ennemi
            image.setAttribute("src", "Pink_blob_a.gif");
            goalCase.setAttribute("type", "pink");
        }
        else if(color==5) {         // blob rouge ennemi
            image.setAttribute("src", "Red_blob_a.gif");
            goalCase.setAttribute("type", "red");
        }
        else if(color==6) {         // blob bleu ennemi
            image.setAttribute("src", "Blue_blob_a.gif");
            goalCase.setAttribute("type", "blue");
        }
        image.setAttribute("id", startCase.childNodes[0].getAttribute("id"));
        image.setAttribute("name", "img_"+x_cible+"_"+y_cible);
        image.setAttribute("class", "img");

        startCase.setAttribute("name","vide");
        startCase.setAttribute("onclick","reset()");
		startCase.setAttribute("type","");
        startCase.innerHTML="";
    
        goalCase.appendChild(image);
        if (color < 4)
        {
            goalCase.setAttribute("onclick","selectMoveCondition("+x_cible+","+y_cible+","+color+")");
            goalCase.setAttribute("name","player_blob");
        }
        else
            goalCase.setAttribute("name","adverse_blob");
        		goalCase.setAttribute("onmouseover","stat("+x_cible+","+y_cible+","+color+")");       //Passage de la souris sur l'image
        goalCase.setAttribute("onmouseout","reboot_stat("+x_cible+","+y_cible+","+color+")");   //Eloignement de la souris de l'image
		
		var suppr = document.getElementById("suppr");	//On fait disparaitre le bouton de suppression une fois le déplacement fait
		//suppr.innerHTML="";
	
		var td = document.getElementById(x_cible+"_"+y_cible);
		
    for(var x=0; x<mapLength;x++)//Indication aux cases sans image qu'elles sont vides
    {
        for(var y=0; y<mapWidth;y++)
        {
            var cases=document.getElementById(x+"_"+y);
            cases.style.opacity="1";
            if(cases.getAttribute("name")=="vide")
			{
                cases.setAttribute("onclick","reset()");     
				cases.setAttribute("onmouseover","");       //Passage de la souris sur l'image
				cases.setAttribute("onmouseout","");   //Eloignement de la souris de l'image
			}
		}
    }
    
    attackMode();
}


function selectMoveCondition (i,j,color)
    //Champ d'action d'un blob d'une case à une autre
{
    for(var x=0; x<mapLength;x++)       //Mise à niveau de l'opacité de la grille à 1 
    {
        for(var y=0; y<mapWidth;y++)
        {
            var cases=document.getElementById(x+"_"+y);
            cases.style.opacity="1";                   
        }
    }
	var suppr = document.getElementById("suppr");	//Lors de la sélection d'un blob, on fait apparaitre un bouton de suppression
		suppr.innerHTML="";
		var button = document.createElement("button");
		button.setAttribute("onclick", "suppr("+i+","+j+","+color+");");
		button.innerHTML="Supprimer ce blob";
		suppr.appendChild(button);
		
    var cible = document.getElementById(i+"_"+j);
    
    if (i==0)           // Bordure haute
    {
        move(i, j, color, i, i+2, j-2, j+2);
    }
    
    else if(j==0)           //Bordure gauche
    {
        move(i, j, color, i-2, i+2, j, j+2);
    }
    
    else if(j==mapWidth-1)       //Bordure droite
    {
        move(i, j, color, i-2, i+2, j-2, j);
        
    }
    
    else if(i==mapLength-1)         //Bordure basse
    {
        move(i, j, color, i-2, i, j-2, j+2);

    }
    else            //Entourage d'une case n'étant pas en bordure de grille
    {
        move(i, j, color, i-2, i+2, j-2, j+2);
    }
	
}



function move(i, j, color, xMin, xMax, yMin, yMax) 
{
    var cible = document.getElementById(i+"_"+j);
    
    for(var x=xMin; x<=xMax; x++)       //Opacité de 0,5 pour les cases entourant le blob ciblé 
	{
		for(var y=yMin; y<=yMax; y++)	//Attention: x est la hauteur, y la largeur de la grille
		{
			var cases= document.getElementById(x+"_"+y);
			if(cases == null)
				continue;

			if((x>=0 && x<=mapLength-1) || (y>=0 && y<=mapWidth-1))
			{
				if( (x==i && y==j) || cases.getAttribute("name")=="player_blob" || cases.getAttribute("name")=="adverse_blob" || !((i-x)*(j-y)>=-1 && (i-x)*(j-y)<=1) )        
				{
					cible.style.opacity="1";  
					cases.style.opacity="1"; 
				}        
				else if(Limit_number()==0) // Seconde fonction de vérification après le lancement du jeu
				{
					if(x>=mapLength-3)
					{
						cases.style.opacity="0.5"; 
						cases.setAttribute("onclick","changePosition("+x+","+y+","+i+","+j+","+color+")");	
					}
				}
				else        
				{ 
					cases.style.opacity="0.5"; 
					cases.setAttribute("onclick","changePosition("+x+","+y+","+i+","+j+","+color+")");
				} 
			}
		}
	}
}



function Limit_number()
{
    var nb_blob = document.getElementsByName("player_blob");
    Limit_number.i = Limit_number.i || 1    //Limit_number.i vaut 2 lorsque la partie se déclenche
    
    if (nb_blob.length == NB_BLOBS_START && Limit_number.i == 1)    // Valeur par défaut : 15
    {
        var depl = "<input type='button' value='Sauter le deplacement' onclick='attackMode()' align='center'/><br/>";
        var saut = "<input type='button' value='Terminer le tour' onclick='play()' align='center'/>";
        var options = document.getElementById("options");

        options.innerHTML=depl+saut;

        lol=Music(1);
        Limit_number.i=2;
        return 1;
    }
    else if(Limit_number.i==2)
    {
        Limit_number.i=2;
        return 1;
    }
    else 
    {
        return 0;
    }
}


function addBonusToBlob(x_cible, y_cible, x_ancien, y_ancien)
{
    var blobId= document.getElementById(x_ancien+"_"+y_ancien).childNodes[0].getAttribute("id").slice(4);
    var bonusCase= document.getElementById(x_cible+"_"+y_cible);        //Emplacement de la case contenant le bonus
    var bonusPicture= document.getElementById("bonus_"+x_cible+"_"+y_cible);
    
    blobsObjetTable[blobId].bonus++;
 
    
    if ( blobsObjetTable[blobId].bonus >2)
    {
        blobsObjetTable[blobId].bonus = 0;
        
        alert( "DUPLICATAAA !");
        
        var color=document.getElementById(x_ancien+"_"+y_ancien).getAttribute("type");
        var blobName = document.getElementById(x_ancien+"_"+y_ancien).getAttribute("name");
        var bonus = 0;
        var yMin=y_cible-1;
        var yMax=y_cible+1;

        if(y_cible==0)           //Bordure gauche
        {
            yMin=y_cible;
        }

        else if(y_cible==mapWidth-1)       //Bordure droite
        {
            yMax=y_cible;
        }

        for(i=x_cible-1;i<=x_cible+1;i++)
        {
            for(j=yMin;j<=yMax;j++)
            {
                var case_lib=document.getElementById(i+"_"+j);
                var picture = document.createElement("img");

                if((i==x_cible && j==y_cible) || (case_lib.childNodes.length!=0) )
                {
                    //aucune idée de pourquoi ça marche pas quand je met une condition pour i!=x_cible && j!=y_cible
                }
                else if(case_lib.getAttribute("name")=="vide" && bonus==0 && (i==x_cible || j==y_cible))
                {
                    if(color=="pink")    // Rose
                    {
                        case_lib.setAttribute("type", "pink");
                        picture.setAttribute("id", createBlobObject(1));
                        if (blobName == "player_blob")
                        {   picture.setAttribute("src", "Pink_blob.gif");
                            color=1;
                        }
                        else
                        {   picture.setAttribute("src", "Pink_blob_a.gif");
                            color=4;
                        }
                    }

                    else if(color=="red")    // Rouge
                    {
                        case_lib.setAttribute("type", "red");
                        picture.setAttribute("id", createBlobObject(2));
                        if (blobName == "player_blob")
                        {   picture.setAttribute("src", "Red_blob.gif");
                            color=2;
                        }
                        else
                        {   picture.setAttribute("src", "Red_blob_a.gif");
                            color=5;
                        }
                    }

                    else if(color=="blue")    // Bleu
                    {
                        case_lib.setAttribute("type", "blue");
                        picture.setAttribute("id", createBlobObject(3));
                        if (blobName == "player_blob")
                        {   picture.setAttribute("src", "Blue_blob.gif");
                            color=3;
                        }
                        else
                        {   picture.setAttribute("src", "Blue_blob_a.gif");
                            color=6;
                        }
                    }

                    if(case_lib.getAttribute("name")=="vide")//Si la case ciblée ne contient pas d'image
                    {
                        picture.setAttribute("name", "img_"+i+"_"+j);
                        picture.setAttribute("class", "img");
                        case_lib.appendChild(picture);
                        
                        if (blobName == "player_blob")
                        {   case_lib.setAttribute("name","player_blob");
                            case_lib.setAttribute("onclick","selectMoveCondition("+i+","+j+","+color+")");      //Enregistrement de la position de l'image pour la zone d'action
                        }
                        else        case_lib.setAttribute("name","adverse_blob");
                        case_lib.setAttribute("onmouseover","stat("+i+","+j+","+color+")");       //Passage de la souris sur l'image
                        case_lib.setAttribute("onmouseout","reboot_stat("+i+","+j+","+color+")");       //Eloignement de la souris de l'image
                        bonus=1;
                    } 
                }
            }
        }
    }
    
    bonusCase.removeChild(bonusPicture);
}