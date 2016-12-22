//Pièce sous la forme d'un L
function lPiece()
{
	//La pièce occupe 3 lignes et 2 colonnes
	this.state1 = [ [1, 0],		//3ème ligne : la colonne de gauche est à 1 et la colonne de droite est à 0
					[1, 0],		//2ème ligne : la colonne de gauche est à 1 et la colonne de droite est à 0
					[1, 1] ];	//1ère ligne : la colonne de gauche est à 1 et la colonne de droite est à 1

	//On renverse la pièce une fois, la pièce occupera 2 lignes et 3 colonnes			
	this.state2 = [ [0, 0, 1],	//2ème ligne
					[1, 1, 1] ];//1ère ligne
	
	//On renverse la pièce une autre fois, la pièce occupera 3 lignes et 2 colonnes				
	this.state3 = [ [1, 1],		//3ème ligne
					[0, 1],		//2ème ligne
					[0, 1] ];	//1ère ligne
	
	//Dernière possibilité, la pièce occupera 2 lignes et 3 colonnes
	this.state4 = [ [1, 1, 1],	//2ème ligne
					[1, 0, 0] ];//1ère ligne
		
	//On affecte ces 4 états à l'attribut states de la pièce			
	this.states = [ this.state1, this.state2, this.state3, this.state4 ];
	//On initialise l'état courant à 0 (le premier état de la pièce)
	this.currentState = 0;
	//On intialise la couleur à 0 mais on va modifier ça à l'instantiation de chaque pièce
	this.color = 0;
	//L'attribut gridx=4 signifie que la nouvelle pièce va apparaitre à la colonne 4
	this.gridx = 4;
	//Mais pourquoi la composante y est négative?
	//parcequ'on veut que la pièce soit invisible au début. Elle va descendre pas à pas.
	//Et pourquoi -3? Parceque la longueur de la pièce L est 3.
	this.gridy = -3;
}

//C'est la même composante L avec une rotation de 180°
function reverseLPiece()
{
	this.state1 = [ [0, 1],
					[0, 1],
					[1, 1] ];
					
	this.state2 = [ [1, 1, 1],
					[0, 0, 1] ];
					
	this.state3 = [ [1, 1],
					[1, 0],
					[1, 0] ];
	
	this.state4 = [ [1, 0, 0],
					[1, 1, 1] ];
					
	this.states = [ this.state1, this.state2, this.state3, this.state4 ];
	this.currentState = 0;
	
	this.color = 0;
	this.gridx = 4;
	this.gridy = -3;
}

//C'est la pièce carreau
function blockPiece()
{
	this.state1 = [ [1, 1],
					[1, 1] ];
					
	this.states = [ this.state1 ];
	this.currentState = 0;
	
	this.color = 0;
	this.gridx = 4;
	//La longueur de cette pièce est 2
	this.gridy = -2;
}

//La pièce baguette
function linePiece()
{
	this.state1 = [ [1],
					[1],
					[1],
					[1] ];
					
	this.state2 = [ [1,1,1,1] ];
					
	this.states = [ this.state1, this.state2 ];
	this.currentState = 0;
	
	this.color = 0;
	this.gridx = 4;
	//Cette pièce est vraiment une girafe. Elle occupe 4 lignes
	this.gridy = -4;
}

//C'est la pièce avec le nez
function tPiece()
{
	this.state1 = [ [1, 1, 1],
					[0, 1, 0] ];
					
	this.state2 = [ [1, 0],
					[1, 1],
					[1, 0] ];
	
	this.state3 = [ [0, 1, 0],
					[1, 1, 1] ];
					
	this.state4 = [ [0, 1],
					[1, 1],
					[0, 1] ];
					
	this.states = [ this.state1, this.state2, this.state3, this.state4 ];
	this.currentState = 0;
	
	this.color = 0;
	this.gridx = 4;
	this.gridy = -2;
}

//La pièce Z => -|_
function zPiece()
{
	this.state1 = [ [1, 1, 0],
					[0, 1, 1] ];
					
	this.state2 = [ [0, 1],
					[1, 1],
					[1, 0] ];
					
	this.states = [ this.state1, this.state2 ];
	this.currentState = 0;
	
	this.color = 0;
	this.gridx = 4;
	this.gridy = -2;
}

//La pièce Z avec une rotation de 180°
function reverseZPiece()
{
	this.state1 = [ [0, 1, 1],
					[1, 1, 0] ];
					
	this.state2 = [ [1, 0],
					[1, 1],
					[0, 1] ];
					
	this.states = [ this.state1, this.state2 ];
	this.currentState = 0;
	
	this.color = 0;
	this.gridx = 4;
	this.gridy = -2;
}

//L'initiqlisation d'une pièce aléatoire et une couleur aléatoire à l'instantiation
function getRandomPiece()
{
	//7 pièces possibles. result contient un nombre de entre 0 et 6
	var result = Math.floor( Math.random() * 7 );
	var piece;
	
	switch(result)
	{
		case 0: piece = new lPiece();			break;
		case 1: piece = new blockPiece();		break;
		case 2: piece = new zPiece();			break;
		case 3: piece = new tPiece();			break;
		case 4: piece = new reverseLPiece();	break;
		case 5: piece = new reverseZPiece();	break;
		case 6: piece = new linePiece();		break;
	}	
	//7 couleurs possibles
	piece.color = Math.floor(Math.random() * 7);
	//On retourne la pièce
	return piece;
}