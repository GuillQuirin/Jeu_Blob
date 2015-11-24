<!DOCTYPE html>
<html>

  <head>
      <script src="Blob_objects.js"> </script>
      <script src="Object_functions.js"> </script>
      
      <script src="Display_functions.js"> </script>
      
      <script src="Play_functions.js"> </script>
      <script src="Move_functions.js"> </script>
      
      <script src="IA_functions.js"> </script>
      
      <script> var audio = new Audio('Overworld_song.mp3'); audio.loop=true; </script>         
     
      <style>
        BODY
        {
            height:100%;
        }
        #grid
        {
            width:100%;
            height:100%;
            z-index:-1;
        }
        .table
        {
            width:600px;
            height:0px;
        }
        .terrain_camp
        {
            background:url(r1.png);
            width:60px;
            height:60px;
        }
        .terrain_1
        {
            background:url(h1.png);
            width:60px;
            height:60px;
        }
        .terrain_2
        {
            background:url(h2.png);
            width:60px;
            height:60px;
        }
        .terrain_3
        {
            background:url(h3.png);
            width:60px;
            height:60px;
        }
        .img
        {
            z-index:10;
            width:60px;
            height:60px;
        }
		.bonus
        {
            z-index:9;
            width:23px;
            height:21px;
			margin-left:auto;
			margin-right:auto;
			display:block;
        }
        .menus
        {
        	height:200px;
        }
        .stats
        {
        	text-align: center;
        }
       </style>
      
    </head>


    <body style="width:700px;display:block;margin:auto;margin-top:50px;">
      <table border="1">
      <tr>
       <td rowspan="2">
        <div id="grid" style="min-width:600px;">
         <table border="1"  width="100%;">
					<?php
						$mapLength= 10;
						$mapWidth= 9;
						$cases= array("1","2","3");          

						for($i=0;$i<$mapLength;$i++)
						{
							echo "<tr>";
							for($j=0;$j<$mapWidth;$j++)
							{
								if($i<3 || $i+3>$mapLength-1)         
									$terrain="class=\"terrain_camp\"";               // config des classes pour image de fond de case (= type de terrain)
								else
									$terrain="class=\"terrain_".$cases[array_rand($cases, 1)]."\"";

								if (BPE($i,$j) || BRE($i,$j) || BBE($i,$j) ) 
                                {
								  echo "<td ".$terrain." id=\"".$i."_".$j."\" name=\"adverse_blob\" ";
                                    if (BPE($i,$j))
                                        echo "type=\"pink\" >";
                                    else if (BRE($i,$j))
                                        echo "type=\"red\" >";  
                                    else if (BBE($i,$j))
                                        echo "type=\"blue\" >";
                                }
								else
									echo "<td ".$terrain." id=\"".$i."_".$j."\" name=\"vide\" >";
								
								if($i>3 && $i<($mapLength-4) && $cases[array_rand($cases, 1)]==1)
									echo "<img class=\"bonus\" id=\"bonus_".$i."_".$j."\" name=\"bonus\" src=\"bonus.png\"/>";
								
								if(BPE($i,$j))                                        // configuration ennemie par defaut
									echo "<img class=\"img\" src=\"Pink_blob_a.gif\" name=\"IA_".$i."_".$j."\" onload=\"initAdverseId(1,".$i.",".$j.")\" 
											onmouseover=\"stat(".$i.",".$j.",4)\" onmouseout=\"reboot_stat(".$i.",".$j.",4)\"/>";   
								else if(BRE($i,$j))
									echo "<img class=\"img\" src=\"Red_blob_a.gif\" name=\"IA_".$i."_".$j."\" onload=\"initAdverseId(2,".$i.",".$j.")\"
											onmouseover=\"stat(".$i.",".$j.",5)\" onmouseout=\"reboot_stat(".$i.",".$j.",5)\"/>";
								else if(BBE($i,$j))
									echo "<img class=\"img\" src=\"Blue_blob_a.gif\" name=\"IA_".$i."_".$j."\" onload=\"initAdverseId(3,".$i.",".$j.")\"
											onmouseover=\"stat(".$i.",".$j.",6)\" onmouseout=\"reboot_stat(".$i.",".$j.",6)\"/>";
								
								echo "</td>";
							}
							echo "</tr>";
						}
					?>
					</table>
				</div>
			</td>
			<td class="menus">
				<p id="annonce"></p>
				<div class="stats" id="stats">
					Selectionnez un blob.
			   </div>
			   <p id="suppr"></p>
			</td>
		</tr>
		<tr>
			<td class="menus" align="center">
				<p id="options">
					
	    		</p>
				
				<img class="img" src="Pink_blob.gif" onclick="availableCases(1);"/><span id="P_quantity">5</span>
				<img class="img" src="Red_blob.gif" onclick="availableCases(2);"/><span id="R_quantity">5</span>
				<img class="img" src="Blue_blob.gif" onclick="availableCases(3);"/><span id="B_quantity">5</span>
			
            </br> <i> <h5> Musique </h5> </i>
            <input type="button" value="I>" onclick="Music(true)"/> 
            <input type="button" value="II" onclick="Music(false)"/>
            
            </td>
	   </tr>
	  </table>
    </body>
</html>



<?php
/*Position des blobs adverses*/

function BPE($i, $j)//Rose
{
	if(
		($i==0 && ($j==3 || $j==4 || $j==5)) 
			||
		($i==2 && ($j==0 || $j==8))
	  )
	{
		return 1;	
	}
	else
		return 0;
}

function BRE($i,$j)//Rouge
{
	if(
		($i==1 && ($j==0 || $j==8)) 
			||
		($i==2 && ($j==3 || $j==4 || $j==5))
	  )
	{
		return 1;	
	}
	else
		return 0;
}

function BBE($i,$j)//Bleu
{
	if(
		($i==1 && ($j==2 || $j==4 || $j==6)) 
			||
		($i==2 && ($j==1 || $j==7))
	  )
	{
		return 1;	
	}
	else
		return 0;
}
?>