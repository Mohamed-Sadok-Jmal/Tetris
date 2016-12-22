//Initialisation

//nombre de lignes
var ROWS = 20;
//nombre de colonnes
var COLS = 10;
//La taille de chaque carreau
var SIZE = 30;

//Nos couleurs
//var couleur = [couleur du background, couleur de la bordure]
var blueColor   = [ "#5E70F9", "#000000"];
var greenColor  = [ "#47B934", "#000000"];
var yellowColor = [ "#F7E849", "#000000"];
var orangeColor = [ "#F9AD3F", "#000000"];
var violetColor = [ "#963EB7", "#000000"];
var pinkColor   = [ "#F877EE", "#000000"];
var redColor    = [ "#C43B3B", "#000000"];
//Liste des couleurs
var colors = [blueColor, greenColor, yellowColor, orangeColor, violetColor, pinkColor, redColor];
//couleur de la grille
var gridColor    = [ "#2B2B31", "#6E6E7B"];
//Notre canvas
var canvas;
//La pièce suivante
var next;
//le contexte
var ctx;
//Bouton play
var play;
//La pièce actuelle
var currentPiece;
//Notre grille
var surface;
//temps précédant
var prevTime;
//temps actuel
var currentTime;
//Gérer la vitesse selon le score
var speed = 500;
//Est ce que la partie est terminée ou pas
var isGameOver;
//Le score
var score;

//Exécuter JavaScript immédiatement après le chargement de la page
window.onload = onReady;

function onReady()
{	
	//récupérer l'élément html dont l'ID est game
	canvas = document.getElementById('game');
	////récupérer l'élément html dont l'ID est nextPiece
	next = document.getElementById('nextPiece');
	//getContext () renvoie un objet qui fournit des méthodes et des propriétés pour le dessin sur le canevas
	ctx = canvas.getContext('2d');
	//récupérer l'élément html dont l'ID est lines
	score = document.getElementById('lines');
	//récupérer l'élément html dont l'ID est play
	play = document.getElementById('play');
	//Initialisation à zéro
	prevTime = currentTime = 0;
	//initialiser le jeur
	drawGrid();
	//nextPiece
	ctxNext = nextPiece.getContext('2d');
	drawNext();
	next = getRandomPiece();
	drawNextPiece(next);
	//fin nextPiece
	play.addEventListener("click", function(){
		initGame();
	});
	//Exécuter getInput lorsqu'un utilisateur appuie sur une touche
	document.onkeydown = getInput;
}

function getInput(e)
{
	//Internet Explorer ne passe pas l'événement au handler. donc on utilise l'objet window.event qui est mis à jour immédiatement après le déclenchement de l'événement
	if(!e) { var e = window.event; }
	
	e.preventDefault();
	//Si la partie n'est pas encore terminée, on effectue un traitement suite à l'appuie sur la touche
	if(isGameOver != true)
	{
		//Selon le code de la touche appuyée
		switch(e.keyCode)
		{
			//Flèche gauche
			case 37:
			{
				//Voulez-vous savoir si on peut se déplacer d'un pas à gauche ou pas? décrémenter l'abcisse et vérifier.
				if( tryToMove(currentPiece.gridx - 1, currentPiece.gridy, currentPiece.currentState) )
					currentPiece.gridx--;
			}
			break;
			//Flèche droite
			case 39:
			{
				//Voulez-vous savoir si on peut se déplacer d'un pas à gauche ou pas? incrémenter l'abcisse et vérifier.
				if( tryToMove(currentPiece.gridx + 1, currentPiece.gridy, currentPiece.currentState) )
					currentPiece.gridx++;
			}
			break;
			//Flèche vers le haut qui change l'état de la pièce courante
			case 38:
			{
				//On récupère l'état suivant
				var newState = currentPiece.currentState - 1;
				//Si l'état courant est le premier dans la liste des états, alors l'état suivant c'est le dernier de celle-ci
				if(newState < 0)
					newState = currentPiece.states.length - 1;
				//Maintenant on peut vérifier	
				if( tryToMove(currentPiece.gridx, currentPiece.gridy, newState) )
					currentPiece.currentState = newState;
			}
			break;
			//Flèche vers le bas
			case 40:
			{
				//Un peu de vitesse
				if( tryToMove(currentPiece.gridx, currentPiece.gridy + 1, currentPiece.currentState) )
					currentPiece.gridy++;
			}
			break;
		}
	}
	//Sinon on débute une nouvelle partie
	else
	{
		initGame();
	}
}

//La fonction dessiner un rectangle(abcisse x, ordonnée y, la couleur du background, la couleur de la bordure)
function draw (context, x, y, size, backgroundColor, borderColor) {
	//On va mettre la taille de la bordure toujurs à 1
    context.lineWidth = 1;
    //background
    context.fillStyle = backgroundColor;
    //dessiner le rectangle
    context.fillRect(x, y, size, size);
    //affecter une couleur à la bordure
    context.strokeStyle = borderColor;
    //dessiner la bordure
    context.strokeRect(x, y, size, size);
}

//dessiner la grille
function drawGrid(){
	var x = 0;
	var y = 0;
	for (var i = 0; i < ROWS; i++) {
		for (var j = 0; j < COLS; j++) {
			draw(ctx, x, y, SIZE, gridColor[0], gridColor[1]);
			x += SIZE;
		}
		x = 0;
		y += SIZE;
	}
}

//dessiner la pièce suivante
function drawNext(){
	var x = 0;
	var y = 0;
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			draw(ctxNext, x, y, SIZE, gridColor[0], gridColor[1]);
			x += SIZE;
		}
		x = 0;
		y += SIZE;
	}
}

//initialiser le jeu
function initGame(){
	//vider le texte "tryAgain"
	document.getElementById('tryAgain').innerHTML = "";
	//dessiner la grille
	drawGrid();
	//r représente la ligne et c représente la colonne
	var r, c;
	//initialiser le score à zéro
	curLines = 0;
	//La partie est en cours
	isGameOver = false;
	//On initialise la matrice à zéro
	surface = new Array();
	for(r = 0; r < ROWS; r++) {
		//pour chaque ligne surface[nombreDeLigne], on associe une liste de colonnes
		surface[r] = new Array();
		for(c = 0; c < COLS; c++){
			surface[r].push(0);
		}
	}
	//Choisir une pièce aléatoire
	currentPiece = next;
	next = getRandomPiece();
	//Renvoyer le score à l'élément html "score"
	score.innerHTML = curLines.toString();
	//Changer la valeur du bouton
	play.innerHTML = "Recommencer le jeu";
	
	var requestAnimFrame = 	window.requestAnimationFrame // Firefox 23 / IE 10 / Chrome / Safari 7 (incl. iOS)
							|| window.mozRequestAnimationFrame // Firefox < 23
							|| window.webkitRequestAnimationFrame // Anciennes versions de Safari / Chrome
							|| window.msRequestAnimationFrame; // version 10 of Internet Explorer
							
	window.requestAnimationFrame = requestAnimFrame;

	//La méthode window.requestAnimationFrame () indique au navigateur que vous souhaitez effectuer une animation
	//et demande que le navigateur appelle une fonction spécifiée pour mettre à jour une animation avant le prochain repeint.
	//La méthode prend comme argument un callback à appeler lorsque votre animation va être rafraîchie lors du prochain rafraîchissement.
	//Le callback ne prend qu'un seul argument, un DOMHighResTimeStamp, qui est le temps à partir duquel requestAnimationFrame va commencer à appeler les callbacks.
	requestAnimationFrame(update);
}

function update()
{
	//On augmente la vitesse chaque fois que le score augmente
	//Pour tester, essayez de gangner juste 4 lignes et vous allez voir la vitesse de folie
	switch(curLines)
	{
		case 1: speed = 450;	break;
		case 2: speed = 400;	break;
		case 3: speed = 350;	break;
		case 4: speed = 300;	break;
		case 5: speed = 250;	break;
		case 6: speed = 200;	break;
		case 7: speed = 150;	break;
		case 8: speed = 100;	break;
	}
	//Récupérer le temps actuel
	currentTime = new Date().getTime();
	// Chaque 500 millisecondes
	if(currentTime - prevTime > speed)
	{
		// Vérifier si la pièce peut avancer d'un pas
		if( tryToMove(currentPiece.gridx, currentPiece.gridy + 1, currentPiece.currentState) )
		{
			//La pièce avance d'un pas
			currentPiece.gridy += 1;
		}
		else
		{
			//On ne peut plus avancer, donc on place la pièce
			placePiece(currentPiece);
			//On fait sortir une nouvelle pièce
			currentPiece = next;
			next = getRandomPiece();
			drawPiece(next, ctxNext);
		}
		
		// mettre à jour le temps
		prevTime = currentTime;
	}
	
	drawBoard();
	drawPiece(currentPiece, ctx);
	
	//Si le jeu n'est pas terminé, on refait le traitement
	if(isGameOver == false)
	{
		drawNext();
		drawNextPiece(next);
		requestAnimationFrame(update);
	}
	//sinon on affiche game over
	else{
		speed = 500;
		ctx.fillStyle = "red";
	    ctx.font = "30pt sans-serif";
	    ctx.fillText("Game Over!", 50, 100);
	    document.getElementById('tryAgain').innerHTML = "Appuyer sur n'importe quelle touche pour jouer!";
	}
}//Placer la pièce
function placePiece(p)
{
	//La pièce est placée dans la surface au point (p.gridx, p.gridy) on prend un exemple de la composante t qui est à la position (4, 5)
	//donc on récupère ces valeurs et l'état actuel
	var xpos = p.gridx; //pour l'exemple choisi x = 4
	var ypos = p.gridy; //pour l'exemple choisi y = 5
	var state = p.currentState;
	
	//On boucle sur les composants de la pièce commme d'habitude
	for(var r = 0, len = p.states[state].length; r < len; r++)
	{
		for(var c = 0, len2 = p.states[state][r].length; c < len2; c++)
		{
			//On change la couleur de cette position pour la marquée commme occupée si la pièce est totalement visible et que la composante de la pièce = 1
			if(p.states[state][r][c] == 1 && ypos >= 0)
			{
				surface[ypos][xpos] = (p.color + 1);
			}
			//On incrèmente l'abcisse (par exemple si on a vérifié la postion (4,5) on passe à vérifier la position (4,6) puis (4,7))
			xpos += 1;
		}
		//On reprend l'abcisse dès le début (x = 4)
		xpos = p.gridx;
		//Et on passe à traiter la composante suivante de la pièce (y = 5+1 donc 6)
		ypos += 1;
	}
	//On vérifie si on peut supprimer des lignes pleines
	removeFullRows();
	//On est à la sommeil. Non c'est pas bien, on a perdu
	if(p.gridy < 0)
	{
		isGameOver = true;
	}
}

function removeFullRows()
{
	//On n'a pas encore trouvé une ligne pleine
	var lineFound = false;
	//
	var fullRow = true;
	//On commence à tester du bas de la surface
	//Le haut de la surface c'est 0 et le bas c'est 32-1=31
	var r = ROWS - 1;
	//on parcourt la surface du droite à gauche
	var c = COLS - 1;
	
	//Tant qu'on est pas à la sommeil
	while(r >= 0)
	{
		//On parcourt toute la ligne colonne par colonne
		while(c >= 0)
		{
			//Si on trouve une collonne vide, on s'arrête
			if(surface[r][c] == 0)
			{
				fullRow = false;
				c = -1;
			}
			c--;
		}
		//Si on trouve une ligne pleine on incrémente le nombre de lignes qu'on va supprimer
		if(fullRow == true)
		{
			//Vider la ligne r et décaler les lignes qui se trouvent au-dessus de la ligne r
			removeRows(r);
			r++;
			lineFound = true;
			//On incrèmente le score
			curLines++;
		}
		//On passe à ligne suivante même si la ligne précédante n'est pleine car peut trouver d'autres lignes pleines
		fullRow = true;
		c = COLS - 1;
		r--;
	}
	//On met à jour le score si on a trouvé des lignes pleines
	if(lineFound)
	{
		score.innerHTML = curLines.toString();
	}
}

//Supprimer une ligne pleine et faire descendre les lignes qui se trouvent au-dessus
function removeRows(row)
{
	var r = row;
	var c = 0;
	
	//On commence à supprimer à partir de la ligne r
	while(r >= 0)
	{
		while(c < COLS)
		{
			//Si on n'est pas au sommeil de la surface, on fait descendre la ligne adjacente
			if(r > 0)
				surface[r][c] = surface[r-1][c];
			//Si on est au sommeil, on n'a rien à décaler. Donc on va juste supprimer la ligne
			else
				surface[r][c] = 0;
				
			c++;
		}
		
		c = 0;
		r--;
	}
}

//On re-dessine la grille après chaque mouvement
function drawBoard()
{
	//dessiner la grille
	drawGrid();	
	//
	for(var r = 0; r < ROWS; r++)
	{
		for(var c = 0; c < COLS; c++)
		{
			//On garde les pièces qui sont déja placées
			if(surface[r][c] != 0)
			{
				//chaque carreau est de taille SIZE*SIZE
				//donc pour dessiner le carreau (4,3) on fait (3*SIZE, 4*SIZE, couleur background, couleur bordure)
				draw(ctx, c * SIZE, r * SIZE, SIZE, colors[surface[r][c] - 1][0], colors[surface[r][c] - 1][1]);
			}
		}
	}
}

//dessiner la pièce après chaque mouvement
function drawPiece(p) {
	var drawX = p.gridx;
	var drawY = p.gridy;
	var state = p.currentState;
	
	for(var r = 0, len = p.states[state].length; r < len; r++) {
		for(var c = 0, len2 = p.states[state][r].length; c < len2; c++) {
			//Si le composant de la pièce n'est pas vide
			if(p.states[state][r][c] == 1 && drawY >= 0) {
				//chaque carreau est de taille SIZE*SIZE
				//draw (contexte, x*SIZE, y*SIZE, couleur background, couleur bordure)
				draw(ctx, drawX * SIZE, drawY * SIZE, SIZE, colors[p.color][0], colors[p.color][1]);
			}
			
			drawX += 1;
		}
		
		drawX = p.gridx;
		drawY += 1;
	}
}

//dessiner la pièce suivante
function drawNextPiece(p) {
	for(var r = 0, len = next.states[0].length; r < len; r++) {
		for(var c = 0, len2 = next.states[0][r].length; c < len2; c++) {
			if(p.states[0][r][c] == 1) {
				draw(ctxNext, r * SIZE, c * SIZE, SIZE, colors[next.color][0], colors[next.color][1]);
			}
		}
	}
}

function tryToMove(xpos, ypos, newState)
{
	//Par défaut, on dit que la pièce peut avancer
	var result = true;
	//récupérer l'abcisse
	var newx = xpos;
	//récupérer l'ordonnée
	var newy = ypos;
	//Fonctionnement de la boucle :
	//Chaque pièce occupe x lignes dans la surface. Donc chaque ligne représente une partie de la pièce
	//pour chaque ligne (ou partie de la pièce) , on va tester si elle peut avancer ou pas
	//Si une partie de la pièce peut avancer, on passe à tester la partie suivante de la pièce

	//on commence par parcourir les parties qui compose la pièce
	for(var r = 0, len = currentPiece.states[newState].length; r < len; r++)
	{
		//on boucle maintenant sur chaque partie de la pièce qui elle elle même composée de x colonne(s)
		for(var c = 0, len2 = currentPiece.states[newState][r].length; c < len2; c++)
		{
			//Si la pièce dépasse les extrémités (gauche ou droite) de la surface, on marque que le mouvement est impossible
			if(newx < 0 || newx >= COLS)
			{
				result = false;
				c = len2;
				r = len;
			}
			
			//Pour dire que le mouvement est impossible, il faut que la position est occupée dans la surface et la partie de la pièce n'est pas un zéro
			if(surface[newy] != undefined && surface[newy][newx] != 0
				&& currentPiece.states[newState][r] != undefined && currentPiece.states[newState][r][c] != 0)
			{
				result = false;
				c = len2;
				r = len;
			}
			//Tout est bon? La pièce avance? Bien sur que non! On n'a vérifié qu'une colonne, peut être que les autres ont une autre chose à dire.
			newx += 1;
		}
		
		// Ouf! La pièce avance.
		newx = xpos;
		newy += 1;
		
		//On est en bas de la surface!
		if(newy > ROWS)
		{
			r = len;
			result = false;
		}
	}

	return result;
}