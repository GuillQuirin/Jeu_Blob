var blobsObjetTable = new Array();

function createBlobObject(color)
{
    if (blobsObjetTable.length == 0)
        blobsObjetTable[0]=0;   // la première case contient le nombre de blob déjà crées
    
    var i= blobsObjetTable[0];

    switch(color)
    {
        case 1:         // Rose    
            blobsObjetTable[i+1]= new pinkBlob();
            blobsObjetTable[0]++;
            break;
        
        case 2 :        // Rouge
            blobsObjetTable[i+1]= new redBlob();
            blobsObjetTable[0]++;
            break;
        
        case 3:         // Bleu
            blobsObjetTable[i+1]= new blueBlob();
            blobsObjetTable[0]++;        
            break;
    }

    return ("blob"+blobsObjetTable[0]);   
}



///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

        // FONCTION DE MUSIQUE //

function Music(play)
{
    if(play) //Lecture
    {
        audio.play();
    }
    else     // Pause
    {
        audio.pause();
    }
    return 1;
}
