var mapWidth=9 ;
var mapLength = 10;


function availableCases(color)      // cases à mettre en surbrillance pour le placement de blobs
{
    for(var x=0; x<mapLength;x++)          //Opacité générale à 1
    {
        for(var y=0; y<mapWidth;y++)
        {
            var cases=document.getElementById(x+"_"+y);
            cases.style.opacity="1";                   
        }
    }
	for(var i=7; i<mapLength;i++)          
	{
		for(var j=0; j<mapWidth;j++)
		{
			var case_lib=document.getElementById(i+"_"+j);
			if(case_lib.getAttribute("name")=="vide")
			{
				case_lib.style.opacity="0.5";
				case_lib.setAttribute("onclick","insertion("+i+","+j+","+color+")"); 
			}
		}
	}
}



function reset()
{
    for(var i=0; i<mapLength ; i++)
    {
        for(var j=0; j<mapWidth; j++)
        {
            var cases = document.getElementById(i+"_"+j);
            cases.style.opacity="1";
            
            if(cases.getAttribute("name")=="vide")
			{
                cases.setAttribute("onclick","reset()");     
				cases.setAttribute("onmouseover","");       //Passage de la souris sur l'image
				cases.setAttribute("onmouseout","");   //Eloignement de la souris de l'image
				
				var suppr = document.getElementById("suppr");	//On fait disparaitre le bouton de suppression une fois le déplacement fait
				suppr.innerHTML="";
			}
            
            else if(cases.getAttribute("name")=="adverse_blob")
			{
                cases.setAttribute("onclick","reset()");     
				
				var suppr = document.getElementById("suppr");	//On fait disparaitre le bouton de suppression une fois le déplacement fait
				suppr.innerHTML="";
			}

			if(cases.getAttribute("onclick")!="reset()")
			{
				var color = cases.getAttribute("type");
				if(color=="pink") color=1;
				if(color=="red") color=2;
				if(color=="blue") color=3;
			}
		}
    }
}


function suppr(x,y,color)
{
	if(confirm('Voulez-vous supprimer ce blob ?'))
	{
        killBlob(x, y);
        
		var suppr = document.getElementById("suppr");	//On fait disparaitre le bouton de suppression une fois le déplacement fait
		suppr.innerHTML="";
		/*
		var td = document.getElementById(x+"_"+y);
		td.setAttribute("name", "vide");
		td.setAttribute("onclick","reset()");     
		td.setAttribute("onmouseover","");       //Passage de la souris sur l'image
		td.setAttribute("onmouseout","");   //Eloignement de la souris de l'image
		td.setAttribute("type", "");

		var blob = document.getElementsByName("img_"+x+"_"+y)[0];
		blob.parentNode.removeChild(blob);
	*/
		if(color==1)
			var compteur=document.getElementById("P_quantity");
        if(color==2)
			var compteur=document.getElementById("R_quantity");
		if(color==3)
			var compteur=document.getElementById("B_quantity");
		
        compteur.innerHTML++;
		compteur.innerHTML=compteur.innerHTML;

        for(var i=0; i<mapLength;i++)//Indication aux cases sans image qu'elles sont vides
        {
            for(var j=0; j<mapWidth;j++)
            {
                var cases=document.getElementById(i+"_"+j);
                cases.style.opacity="1";
                if(cases.getAttribute("name")=="vide")
                {
                    cases.setAttribute("onclick","reset()");     
                    cases.setAttribute("onmouseover","");       //Passage de la souris sur l'image
                    cases.setAttribute("onmouseout","");   //Eloignement de la souris de l'image
                }
            }
        }               
	}
}

function attackDisplay(i,j)
{
    var cible = document.getElementById(i+"_"+j);
    for(var x = i-1; x < i+2; x++)
    {
        for(var y = j-1; y < j+2; y++)
        {
            console.log(j + " " + i);
            if(!(y != j && x != i))
            { 
                var cases=document.getElementById(x+"_"+y);
                cases.style.opacity="0.5";  
            }           
        }
    }
}


function reboot_stat(i,j,color)
{
	var div = document.getElementById("stats");
	div.innerHTML="";
}


function stat(i,j,color)
{
    var blobId= document.getElementById(i+"_"+j).childNodes[0].getAttribute("id").slice(4);
	var div = document.getElementById("stats");
	div.innerHTML="";
	
	var nom =document.createElement("p"); // <p id="nom"></p>
		nom.setAttribute("id", "nom");
	div.appendChild(nom);
	
	var image =document.createElement("img"); //<img id="image" src=""/>
		image.setAttribute("id", "image");
        image.setAttribute("src", "");
	div.appendChild(image);
	
	var attaque=document.createElement("p"); //<p>Attaque: <span id="attaque"></span></p>
	   attaque.innerHTML ="Attaque:";
    var span= document.createElement("span");
	   span.setAttribute("id", "attaque");
    attaque.appendChild(span);
	div.appendChild(attaque);
	
	var defense=document.createElement("p"); //<p>Attaque: <span id="defense"></span></p>
		defense.innerHTML="Defense:"
    var span=document.createElement("span");
		span.setAttribute("id", "defense");
		defense.appendChild(span);
	div.appendChild(defense);
	
	var vie=document.createElement("p");   //<p>Vie: <span id="vie"></span><span id="vie_tot"></span></p>
		vie.innerHTML="Vie restante:";
    var span= document.createElement("span");
		span.setAttribute("id", "vie");
		vie.appendChild(span);		
    var span=document.createElement("span");
		span.setAttribute("id", "vie_tot");
		vie.appendChild(span);
	div.appendChild(vie);
    
    var bonus=document.createElement("p");   //<p>Bonus: <span id="vie"></span><span id="vie_tot"></span></p>
		bonus.innerHTML="Bonus:";
    var span= document.createElement("span");
		span.setAttribute("id", "bonus");
		bonus.appendChild(span);
	div.appendChild(bonus);
		
    
    if(color==1)        //Rose
    {
		nom.innerHTML="Rose";
		image.setAttribute("src", "Pink_blob.gif");
    }
    else if(color==2)           //Rouge
	{
		nom.innerHTML="Rouge";
		image.setAttribute("src", "Red_blob.gif");
    }
    else if(color==3)           // Bleu
	{
		nom.innerHTML="Bleu";
	    image.setAttribute("src", "Blue_blob.gif");
    }
    else if(color==4)        //Rose
    {
		nom.innerHTML="Blanc";
		image.setAttribute("src", "Pink_blob_a.gif");
    }
    else if(color==5)           //Rouge
	{
		nom.innerHTML="Noir";
		image.setAttribute("src", "Red_blob_a.gif");
    }
    else if(color==6)           // Bleu
	{
		nom.innerHTML="Cyan";
	    image.setAttribute("src", "Blue_blob_a.gif");
    }
    
	var statistique = document.getElementById("attaque");
        statistique.innerHTML= blobsObjetTable[blobId].attack;
	var statistique = document.getElementById("defense");
        statistique.innerHTML= blobsObjetTable[blobId].defense;
	var statistique = document.getElementById("vie");
        statistique.innerHTML= blobsObjetTable[blobId].pv;
	var statistique = document.getElementById("vie_tot");
        statistique.innerHTML=" /"+ blobsObjetTable[blobId].totalPV;
    var statistique = document.getElementById("bonus");
        statistique.innerHTML= blobsObjetTable[blobId].bonus + " /3";
}

function nb_blob()
{
	if(Limit_number()==0 && 1==1)
	{
		var annonce = document.getElementById("annonce");
		annonce.innerHTML="Veuillez placer tous les blobs sur le terrain avant de demarrer la partie.";
	}
}


function attackAnimation (target_Y, target_X)
{   
    var sound= new Audio ("SlimeSplash.mp3");
    var blob= document.getElementById(target_Y+"_"+target_X);
    var attack_effect = document.createElement("img");
    
    attack_effect.setAttribute("src", "attack.gif");
    attack_effect.setAttribute("style", "z-index:5; position:relative;");
    blob.childNodes[0].setAttribute("style", "z-index:1; position:absolute;");
    blob.appendChild(attack_effect);
    sound.play();
    
    setTimeout ( function() {
        blob.removeChild(attack_effect);
        blob.firstChild.setAttribute("style", "");
    }, 800);
}

