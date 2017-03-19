/*Copyright (c) 2011-2012 Taner Mansur Redistribution or commercial use is prohibited without the author's permission.*/var lBoard;
var vBoard;
var currentBlock;
var speed = 500;
var level = 1;
var nextBlock;
var paused = false;

function Block(blockType, tileArr, color, backgroundColor, nextBlock){ this.blockType = blockType; this.tileArr = tileArr; this.color = color; this.backgroundColor = backgroundColor; this.nextBlock = nextBlock};

const block00 = new Block( 0, [[1,0,0,0], [1,0,0,0], [1,0,0,0], [1,0,0,0]], 0xEE2222, 0xFF2222,  1);
const block01 = new Block( 1, [[1,1,1,1], [0,0,0,0], [0,0,0,0], [0,0,0,0]], 0xEE2222, 0xFF2222,  0);
const block02 = new Block( 2, [[1,1,0,0], [1,1,0,0], [0,0,0,0], [0,0,0,0]], 0x1100CC, 0x1100DD,  2);
const block03 = new Block( 3, [[0,1,0,0], [1,1,1,0], [0,0,0,0], [0,0,0,0]], 0x11CC00, 0x11DD00,  4);
const block04 = new Block( 4, [[1,0,0,0], [1,1,0,0], [1,0,0,0], [0,0,0,0]], 0x11CC00, 0x11DD00,  5);
const block05 = new Block( 5, [[1,1,1,0], [0,1,0,0], [0,0,0,0], [0,0,0,0]], 0x11CC00, 0x11DD00,  6);
const block06 = new Block( 6, [[0,1,0,0], [1,1,0,0], [0,1,0,0], [0,0,0,0]], 0x11CC00, 0x11DD00,  3);
const block07 = new Block( 7, [[1,0,0,0], [1,1,0,0], [0,1,0,0], [0,0,0,0]], 0x11CCCC, 0x11DDDD,  8);
const block08 = new Block( 8, [[0,1,1,0], [1,1,0,0], [0,0,0,0], [0,0,0,0]], 0x11CCCC, 0x11DDDD,  7);
const block09 = new Block( 9, [[0,1,0,0], [1,1,0,0], [1,0,0,0], [0,0,0,0]], 0xCC00CC, 0xDD00DD, 10);
const block10 = new Block(10, [[1,1,0,0], [0,1,1,0], [0,0,0,0], [0,0,0,0]], 0xCC00CC, 0xDD00DD,  9);
const block11 = new Block(11, [[1,1,1,0], [1,0,0,0], [0,0,0,0], [0,0,0,0]], 0xCCCC00, 0xDDDD00, 12);
const block12 = new Block(12, [[1,1,0,0], [0,1,0,0], [0,1,0,0], [0,0,0,0]], 0xCCCC00, 0xDDDD00, 13);
const block13 = new Block(13, [[0,0,1,0], [1,1,1,0], [0,0,0,0], [0,0,0,0]], 0xCCCC00, 0xDDDD00, 14);
const block14 = new Block(14, [[1,0,0,0], [1,0,0,0], [1,1,0,0], [0,0,0,0]], 0xCCCC00, 0xDDDD00, 11);
const block15 = new Block(15, [[1,0,0,0], [1,1,1,0], [0,0,0,0], [0,0,0,0]], 0x8E00CC, 0xB200FF, 16);
const block16 = new Block(16, [[1,1,0,0], [1,0,0,0], [1,0,0,0], [0,0,0,0]], 0x8E00CC, 0xB200FF, 17);
const block17 = new Block(17, [[1,1,1,0], [0,0,1,0], [0,0,0,0], [0,0,0,0]], 0x8E00CC, 0xB200FF, 18);
const block18 = new Block(18, [[0,1,0,0], [0,1,0,0], [1,1,0,0], [0,0,0,0]], 0x8E00CC, 0xB200FF, 15);

const blocksArray = [block00, block01, block02, block03, block04, block05, block06, block07, block08, block09, block10, block11, block12, block13, block14, block15, block16, block17, block18];

function cE(elem)
{
	return document.createElement(elem);
}

function gE(id)
{
	return document.getElementById(id);
}

function dropBlock(block)
{
	processBlock(block, true);
	block.top += 1;
	processBlock(block, false);
}

function processTile(y, x, erase, color, bgColor)
{
	var tile = vBoard.childNodes[y].childNodes[x];

	if(erase)
	{
		tile.style.backgroundColor = '#000000';
		tile.style.borderStyle = 'none';
		tile.style.borderWidth = 0;
		tile.style.borderColor = '#000000';
	}
	else
	{
		tile.style.backgroundColor = color;
		tile.style.borderStyle = 'outset';
		tile.style.borderWidth = '2px';
		tile.style.borderColor = bgColor;
	}
}

function processBlock(block, erase)
{
	for(var i = 0; i < block.tileArr.length; i++)
	{
		for(var j = 0; j < block.tileArr[i].length; j++)
		{
			if(block.tileArr[i][j] == 1)
			{
				processTile(block.top + i + 1, block.left + j + 1, erase, '#' + block.color.toString(16), '#' + block.backgroundColor.toString(16));
			}
		}
	}
}

function shiftDown(row)
{
	for(var i = row; i > 0; i--)
	{
		for(var j = lBoard[i].length - 1; j != -1; j--)
		{
			lBoard[i][j] = lBoard[i - 1][j];

			processTile(i + 1, j + 1, lBoard[i][j] == 0, vBoard.childNodes[i].childNodes[j + 1].style.backgroundColor, vBoard.childNodes[i].childNodes[j + 1].style.borderColor);
		}
	}
}

function drawBoard()
{
	var rCanvas = cE('table');
	var canvas = cE('tbody');
	
	rCanvas.cellPadding = '0';
	rCanvas.cellSpacing = '5px';

	var cRow0 = cE('tr');
	var cRow1 = cE('tr');
	var cCol00 = cE('td');
	var cCol01 = cE('td');
	var cCol11 = cE('td');

	cCol00.rowSpan = 2;

	var rBoard = cE('table');
	var board = cE('tbody');

	rBoard.cellPadding = '0';
	rBoard.cellSpacing = '0';

	lBoard = new Array();
	for(var i = 0; i < 20; i++)
	{
		lBoard[i] = new Array();
		for(var j = 0; j < 10; j++)
		{
			lBoard[i][j] = 0;
		}
	}

	for(var i = 0; i < 22; i++)
	{
		var row = cE('tr');

		for(var j = 0; j < 12; j++)
		{
			var col = cE('td');
			col.style.width = '15px';
			col.style.height = '17px';

			if(i == 0 || i == 21 || j == 0 || j == 11)
			{
				col.style.backgroundColor = '#777777';
				col.style.borderStyle = 'outset';
				col.style.borderWidth = '2px';
				col.style.borderColor = '#AAAAAA';
			}
			else
			{
				col.style.backgroundColor = '#000000';
			}

			row.appendChild(col);
		}

		board.appendChild(row);
	}

	vBoard = board;

	rBoard.appendChild(board);

	cCol00.appendChild(rBoard);

	cRow0.appendChild(cCol00);

	var rNext = cE('table');
	var next = cE('tbody');

	rNext.id = 'cNextBlock';

	rNext.cellSpacing = '0';
	rNext.cellPadding = '0';

	for(var i = 0; i < 6; i++)
	{
		var nRow = cE('tr');
		for(var j = 0; j < 6; j++)
		{
			var nCol = cE('td');

			nCol.style.width = '15px';
			nCol.style.height = '17px';

			if(i == 0 || i == 5 || j == 0 || j == 5)
			{
				nCol.style.backgroundColor = '#777777';
				nCol.style.borderStyle = 'outset';
				nCol.style.borderWidth = '2px';
				nCol.style.borderColor = '#AAAAAA';
			}
			else
			{
				nCol.style.backgroundColor = '#000000';
			}

			nRow.appendChild(nCol);
		}

		next.appendChild(nRow);
	}

	rNext.appendChild(next);

	cCol01.appendChild(rNext);

	cRow0.appendChild(cCol01);

	var lScore = cE('span');
	lScore.innerHTML = 'Score';

	cCol11.appendChild(lScore);
	cCol11.appendChild(cE('br'));

	var vScore = cE('span');
	vScore.id = 'sScore';
	vScore.innerHTML = '0';

	cCol11.appendChild(vScore);
	cCol11.appendChild(cE('br'));

	var lBlocks = cE('span');
	lBlocks.innerHTML = 'Blocks';

	cCol11.appendChild(lBlocks);
	cCol11.appendChild(cE('br'));

	var vBlocks = cE('span');
	vBlocks.id = 'sBlocks';
	vBlocks.innerHTML = '0';

	cCol11.appendChild(vBlocks);
	cCol11.appendChild(cE('br'));

	var lLevel = cE('span');
	lLevel.innerHTML = 'Level';

	cCol11.appendChild(lLevel);
	cCol11.appendChild(cE('br'));

	var vLevel = cE('span');
	vLevel.id = 'sLevel';
	vLevel.innerHTML = '1';

	cCol11.appendChild(vLevel);
	cCol11.appendChild(cE('br'));

	cCol11.style.fontFamily = 'Courier';
	cCol11.style.verticalAlign = 'top';

	cRow1.appendChild(cCol11);

	canvas.appendChild(cRow0);
	canvas.appendChild(cRow1);

	rCanvas.appendChild(canvas);
	
	document.body.appendChild(rCanvas);
}

function isBlocked(block, side)
{
	var offsetX = 0;
	var offsetY = 0;

	switch(side)
	{
	// down
	case 0:
		offsetY = 1;
		break;
	// left
	case 1:
		offsetX = -1;
		break;
	// right
	case 2:
		offsetX = 1;
		break;
	}

	for(var i = 0; i < block.tileArr.length; i++)
	{
		for(var j = 0; j < block.tileArr[i].length; j++)
		{
			if(block.tileArr[i][j] == 1)
			{
				var y = block.top + i + offsetY;
				var x = block.left + j + offsetX;

				if(y < 0 || x < 0 || y > 19 || x > 9)
				{
					return true;
				}

				if(lBoard[y][x] == 1)
				{
					return true;
				}
			}
		}
	}

	return false;
}

function moveSide(side)
{
	var offset = (side == 1) ? -1 : 1;

	if(!isBlocked(currentBlock, side))
	{
		processBlock(currentBlock, true);
		currentBlock.left += offset;
		processBlock(currentBlock, false);
	}
}

function moveDown(instant)
{
	if(instant)
	{
		while(!isBlocked(currentBlock, 0))
		{
			dropBlock(currentBlock);
		}
	}
	else
	{
		speed = 50;
	}
}

function turnBlock()
{
	var nextBlock = blocksArray[currentBlock.nextBlock];
	nextBlock.left = currentBlock.left;
	nextBlock.top = currentBlock.top;

	if(!isBlocked(nextBlock))
	{
		processBlock(currentBlock, true);
		currentBlock = nextBlock;
		processBlock(currentBlock, false);
	}
}

function mainLoop()
{
	var loop = true;

	if(!paused)
	{
		if(currentBlock)
		{
			if(isBlocked(currentBlock, 0))
			{
				checkBrokenBlocks();
				loop = insertNewBlock();
			}
			else
			{
				dropBlock(currentBlock);
			}
		}
		else
		{
			loop = insertNewBlock();
		}
	}
	
	if(loop)
	{
		setTimeout('mainLoop()', speed);
	}
}

function checkBrokenBlocks()
{
	for(var i = 0; i < currentBlock.tileArr.length; i++)
	{
		for(var j = 0; j < currentBlock.tileArr[i].length; j++)
		{
			var y = currentBlock.top + i;
			var x = currentBlock.left + j;

			if(currentBlock.tileArr[i][j] == 1)
			{
				lBoard[y][x] = 1;
			}
		}
	}

	for(var i = 0; i < lBoard.length; i++)
	{
		var complete = true;
		for(var j = 0; j < lBoard[i].length; j++)
		{
			if(lBoard[i][j] == 0)
			{
				complete = false;
			}
		}

		if(complete)
		{
			for(var j = 0; j < lBoard[i].length; j++)
			{
				lBoard[i][j] = 0;
				processTile(i + 1, j + 1, true);
			}

			shiftDown(i);

			gE('sScore').innerHTML = parseInt(gE('sScore').innerHTML) + 100;
			var blocks = parseInt(gE('sBlocks').innerHTML) + 1;
			gE('sBlocks').innerHTML = blocks;

			if(blocks < 101 && (blocks % 10 == 0))
			{
				level = (blocks / 10) + 1;
				speed = 550 - (level * 50);

				gE('sLevel').innerHTML = level;
			}
		}
	}
}

function endGame()
{
	vBoard.childNodes[4].childNodes[4].innerHTML = 'G';
	vBoard.childNodes[4].childNodes[4].style.color = '#FFFFFF';
	vBoard.childNodes[4].childNodes[4].style.fontSize = '10px';

	vBoard.childNodes[4].childNodes[5].innerHTML = 'A';
	vBoard.childNodes[4].childNodes[5].style.color = '#FFFFFF';
	vBoard.childNodes[4].childNodes[5].style.fontSize = '10px';

	vBoard.childNodes[4].childNodes[6].innerHTML = 'M';
	vBoard.childNodes[4].childNodes[6].style.color = '#FFFFFF';
	vBoard.childNodes[4].childNodes[6].style.fontSize = '10px';

	vBoard.childNodes[4].childNodes[7].innerHTML = 'E';
	vBoard.childNodes[4].childNodes[7].style.color = '#FFFFFF';
	vBoard.childNodes[4].childNodes[7].style.fontSize = '10px';

	vBoard.childNodes[6].childNodes[4].innerHTML = 'O';
	vBoard.childNodes[6].childNodes[4].style.color = '#FFFFFF';
	vBoard.childNodes[6].childNodes[4].style.fontSize = '10px';

	vBoard.childNodes[6].childNodes[5].innerHTML = 'V';
	vBoard.childNodes[6].childNodes[5].style.color = '#FFFFFF';
	vBoard.childNodes[6].childNodes[5].style.fontSize = '10px';

	vBoard.childNodes[6].childNodes[6].innerHTML = 'E';
	vBoard.childNodes[6].childNodes[6].style.color = '#FFFFFF';
	vBoard.childNodes[6].childNodes[6].style.fontSize = '10px';

	vBoard.childNodes[6].childNodes[7].innerHTML = 'R';
	vBoard.childNodes[6].childNodes[7].style.color = '#FFFFFF';
	vBoard.childNodes[6].childNodes[7].style.fontSize = '10px';
}

function drawNextBlock()
{
	var container = gE('cNextBlock').firstChild;

	for(var i = 1; i < container.childNodes.length - 1; i++)
	{
		for(var j = 1; j < container.childNodes[i].childNodes.length - 1; j++)
		{
			var tile = container.childNodes[i].childNodes[j];

			if(nextBlock.tileArr[i - 1][j - 1] == 1)
			{
				tile.style.backgroundColor = '#' + nextBlock.color.toString(16);
				tile.style.borderStyle = 'outset';
				tile.style.borderWidth = '2px';
				tile.style.borderColor = '#' + nextBlock.backgroundColor.toString(16);
			}
			else
			{
				tile.style.backgroundColor = '#000000';
				tile.style.borderStyle = 'none';
				tile.style.borderWidth = 0;
				tile.style.borderColor = '#000000';
			}
		}
	}
}

function insertNewBlock()
{
	var running = nextBlock;
	if(running)
	{
		currentBlock = nextBlock;
		currentBlock.left = 4;
		currentBlock.top = 0;
	}

	nextBlock = blocksArray[Math.floor(Math.random()*19)];
	nextBlock.left = 4;
	nextBlock.top = 0;

	drawNextBlock();

	if(!running)
	{
		currentBlock = blocksArray[Math.floor(Math.random()*19)];
		currentBlock.left = 4;
		currentBlock.top = 0;
	}

	processBlock(currentBlock, false);

	if(isBlocked(currentBlock))
	{
		endGame();
		return false;
	}
	
	return true;
}

function main()
{
	drawBoard();

	document.body.onkeydown = function()
	{
		if(currentBlock)
		{
			var code = window.event.keyCode;
			var keyDefined = false;

			if(code == 37)
			{
				moveSide(1);
				keyDefined = true;
			}
			else if(code == 38)
			{
				turnBlock();
				keyDefined = true;
			}
			else if(code == 39)
			{
				moveSide(2);
				keyDefined = true;
			}
			else if(code == 40)
			{
				moveDown();
				keyDefined = true;
			}
			else if(code == 80) // pause
			{
				paused = !paused;

				if(paused)
				{
					vBoard.childNodes[4].childNodes[3].innerHTML = 'P';
					vBoard.childNodes[4].childNodes[3].style.color = '#FFFFFF';
					vBoard.childNodes[4].childNodes[3].style.fontSize = '10px';

					vBoard.childNodes[4].childNodes[4].innerHTML = 'A';
					vBoard.childNodes[4].childNodes[4].style.color = '#FFFFFF';
					vBoard.childNodes[4].childNodes[4].style.fontSize = '10px';

					vBoard.childNodes[4].childNodes[5].innerHTML = 'U';
					vBoard.childNodes[4].childNodes[5].style.color = '#FFFFFF';
					vBoard.childNodes[4].childNodes[5].style.fontSize = '10px';

					vBoard.childNodes[4].childNodes[6].innerHTML = 'S';
					vBoard.childNodes[4].childNodes[6].style.color = '#FFFFFF';
					vBoard.childNodes[4].childNodes[6].style.fontSize = '10px';

					vBoard.childNodes[4].childNodes[7].innerHTML = 'E';
					vBoard.childNodes[4].childNodes[7].style.color = '#FFFFFF';
					vBoard.childNodes[4].childNodes[7].style.fontSize = '10px';

					vBoard.childNodes[4].childNodes[8].innerHTML = 'D';
					vBoard.childNodes[4].childNodes[8].style.color = '#FFFFFF';
					vBoard.childNodes[4].childNodes[8].style.fontSize = '10px';
				}
				else
				{
					vBoard.childNodes[4].childNodes[3].innerHTML = '';
					vBoard.childNodes[4].childNodes[4].innerHTML = '';
					vBoard.childNodes[4].childNodes[5].innerHTML = '';
					vBoard.childNodes[4].childNodes[6].innerHTML = '';
					vBoard.childNodes[4].childNodes[7].innerHTML = '';
					vBoard.childNodes[4].childNodes[8].innerHTML = '';
				}

				keyDefined = true;
			}
			else if(code == 32)
			{
				moveDown(true);
				keyDefined = true;
			}

			if(keyDefined)
			{
				if(window.event.preventDefault)
				{
					window.event.preventDefault();
				}
				else if(window.event.stopPropagation)
				{
					window.event.stopPropagation();
				}
			}
		}
	}

	document.body.onkeyup = function()
	{
		if(window.event.keyCode == 40)
		{
			speed = 550 - (level * 50);
		}
	}

	mainLoop();
}

