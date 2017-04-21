/*
 * Copyright (c) 2011-2012 Taner Mansur
 *
 * Redistribution or commercial use is prohibited
 * without the author's written permission.
 *
 */
(function () {
    "use strict";
    var lBoard;
    var vBoard;
    var currentBlock;
    var nextBlock;
    var cE;
    var gE;
    var dropBlock;
    var processTile;
    var processBlock;
    var shiftDown;
    var drawNextBlock;
    var insertNewBlock;
    var blocksArray;
    var moveSide;
    var moveDown;
    var rotateBlock;
    var checkBrokenBlocks;
    var isBlocked;
    var endGame;
    var drawBoard;
    var loop = true;
    var speed = 500;
    var level = 1;
    var paused = false;

    blocksArray = [{
        blockType: 0,
        tileArr: [[1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0]],
        color: 0xEE2222,
        backgroundColor: 0xFF2222,
        nextBlock: 1
    }, {
        blockType: 1,
        tileArr: [[1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        color: 0xEE2222,
        backgroundColor: 0xFF2222,
        nextBlock: 0
    }, {
        blockType: 2,
        tileArr: [[1, 1, 0, 0], [1, 1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        color: 0x1100CC,
        backgroundColor: 0x1100DD,
        nextBlock: 2
    }, {
        blockType: 3,
        tileArr: [[0, 1, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        color: 0x11CC00,
        backgroundColor: 0x11DD00,
        nextBlock: 4
    }, {
        blockType: 4,
        tileArr: [[1, 0, 0, 0], [1, 1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 0]],
        color: 0x11CC00,
        backgroundColor: 0x11DD00,
        nextBlock: 5
    }, {
        blockType: 5,
        tileArr: [[1, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        color: 0x11CC00,
        backgroundColor: 0x11DD00,
        nextBlock: 6
    }, {
        blockType: 6,
        tileArr: [[0, 1, 0, 0], [1, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]],
        color: 0x11CC00,
        backgroundColor: 0x11DD00,
        nextBlock: 3
    }, {
        blockType: 7,
        tileArr: [[1, 0, 0, 0], [1, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]],
        color: 0x11CCCC,
        backgroundColor: 0x11DDDD,
        nextBlock: 8
    }, {
        blockType: 8,
        tileArr: [[0, 1, 1, 0], [1, 1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        color: 0x11CCCC,
        backgroundColor: 0x11DDDD,
        nextBlock: 7
    }, {
        blockType: 9,
        tileArr: [[0, 1, 0, 0], [1, 1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 0]],
        color: 0xCC00CC,
        backgroundColor: 0xDD00DD,
        nextBlock: 10
    }, {
        blockType: 10,
        tileArr: [[1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        color: 0xCC00CC,
        backgroundColor: 0xDD00DD,
        nextBlock: 9
    }, {
        blockType: 11,
        tileArr: [[1, 1, 1, 0], [1, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        color: 0xCCCC00,
        backgroundColor: 0xDDDD00,
        nextBlock: 12
    }, {
        blockType: 12,
        tileArr: [[1, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]],
        color: 0xCCCC00,
        backgroundColor: 0xDDDD00,
        nextBlock: 13
    }, {
        blockType: 13,
        tileArr: [[0, 0, 1, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        color: 0xCCCC00,
        backgroundColor: 0xDDDD00,
        nextBlock: 14
    }, {
        blockType: 14,
        tileArr: [[1, 0, 0, 0], [1, 0, 0, 0], [1, 1, 0, 0], [0, 0, 0, 0]],
        color: 0xCCCC00,
        backgroundColor: 0xDDDD00,
        nextBlock: 11
    }, {
        blockType: 15,
        tileArr: [[1, 0, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        color: 0x8E00CC,
        backgroundColor: 0xB200FF,
        nextBlock: 16
    }, {
        blockType: 16,
        tileArr: [[1, 1, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0], [0, 0, 0, 0]],
        color: 0x8E00CC,
        backgroundColor: 0xB200FF,
        nextBlock: 17
    }, {
        blockType: 17,
        tileArr: [[1, 1, 1, 0], [0, 0, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        color: 0x8E00CC,
        backgroundColor: 0xB200FF,
        nextBlock: 18
    }, {
        blockType: 18,
        tileArr: [[0, 1, 0, 0], [0, 1, 0, 0], [1, 1, 0, 0], [0, 0, 0, 0]],
        color: 0x8E00CC,
        backgroundColor: 0xB200FF,
        nextBlock: 15
    }];

    cE = function (elem) {
        return document.createElement(elem);
    };

    gE = function (id) {
        return document.getElementById(id);
    };

    dropBlock = function (block) {
        processBlock(block, true);
        block.top += 1;
        processBlock(block, false);
    };

    processTile = function (y, x, erase, color, bgColor) {
        var tile = vBoard.childNodes[y].childNodes[x];

        if (erase) {
            tile.style.backgroundColor = "#000000";
            tile.style.borderStyle = "none";
            tile.style.borderWidth = 0;
            tile.style.borderColor = "#000000";
        } else {
            tile.style.backgroundColor = color;
            tile.style.borderStyle = "outset";
            tile.style.borderWidth = "2px";
            tile.style.borderColor = bgColor;
        }
    };

    processBlock = function (block, erase) {
        block.tileArr.forEach(function (currentValue, i) {
            currentValue.forEach(function (currentValue, j) {
                if (1 === currentValue) {
                    processTile(block.top + i + 1, block.left + j + 1, erase, "#" + block.color.toString(16), "#" + block.backgroundColor.toString(16));
                }
            });
        });
    };

    shiftDown = function (row) {
        var i;
        var j;

        for (i = row; i > 0; i -= 1) {
            for (j = lBoard[i].length - 1; j !== -1; j -= 1) {
                lBoard[i][j] = lBoard[i - 1][j];
                processTile(i + 1, j + 1, 0 === lBoard[i][j], vBoard.childNodes[i].childNodes[j + 1].style.backgroundColor, vBoard.childNodes[i].childNodes[j + 1].style.borderColor);
            }
        }
    };

    drawBoard = function () {
        var cRow0;
        var cRow1;
        var cCol00;
        var cCol01;
        var cCol11;
        var rBoard;
        var board;
        var i;
        var j;
        var row;
        var col;
        var rNext;
        var next;
        var nRow;
        var nCol;
        var lScore;
        var vScore;
        var lBlocks;
        var vBlocks;
        var lLevel;
        var vLevel;
        var rCanvas = cE("table");
        var canvas = cE("tbody");

        rCanvas.cellPadding = "0";
        rCanvas.cellSpacing = "5px";

        cRow0 = cE("tr");
        cRow1 = cE("tr");
        cCol00 = cE("td");
        cCol01 = cE("td");
        cCol11 = cE("td");

        cCol00.rowSpan = 2;

        rBoard = cE("table");
        board = cE("tbody");

        rBoard.cellPadding = "0";
        rBoard.cellSpacing = "0";

        lBoard = [];
        for (i = 0; i < 20; i += 1) {
            lBoard[i] = [];
            for (j = 0; j < 10; j += 1) {
                lBoard[i][j] = 0;
            }
        }

        for (i = 0; i < 22; i += 1) {
            row = cE("tr");

            for (j = 0; j < 12; j += 1) {
                col = cE("td");

                col.style.width = "15px";
                col.style.height = "17px";

                if (0 === i || 21 === i || 0 === j || 11 === j) {
                    col.style.backgroundColor = "#777777";
                    col.style.borderStyle = "outset";
                    col.style.borderWidth = "2px";
                    col.style.borderColor = "#AAAAAA";
                } else {
                    col.style.backgroundColor = "#000000";
                }

                row.appendChild(col);
            }

            board.appendChild(row);
        }

        vBoard = board;

        rBoard.appendChild(board);
        cCol00.appendChild(rBoard);
        cRow0.appendChild(cCol00);

        rNext = cE("table");
        next = cE("tbody");

        rNext.id = "cNextBlock";

        rNext.cellSpacing = "0";
        rNext.cellPadding = "0";

        for (i = 0; i < 6; i += 1) {
            nRow = cE("tr");
            for (j = 0; j < 6; j += 1) {
                nCol = cE("td");

                nCol.style.width = "15px";
                nCol.style.height = "17px";

                if (0 === i || 5 === i || 0 === j || 5 === j) {
                    nCol.style.backgroundColor = "#777777";
                    nCol.style.borderStyle = "outset";
                    nCol.style.borderWidth = "2px";
                    nCol.style.borderColor = "#AAAAAA";
                } else {
                    nCol.style.backgroundColor = "#000000";
                }

                nRow.appendChild(nCol);
            }

            next.appendChild(nRow);
        }

        rNext.appendChild(next);
        cCol01.appendChild(rNext);
        cRow0.appendChild(cCol01);

        lScore = cE("span");
        lScore.innerHTML = "Score";

        cCol11.appendChild(lScore);
        cCol11.appendChild(cE("br"));

        vScore = cE("span");
        vScore.id = "sScore";
        vScore.innerHTML = "0";

        cCol11.appendChild(vScore);
        cCol11.appendChild(cE("br"));

        lBlocks = cE("span");
        lBlocks.innerHTML = "Blocks";

        cCol11.appendChild(lBlocks);
        cCol11.appendChild(cE("br"));

        vBlocks = cE("span");
        vBlocks.id = "sBlocks";
        vBlocks.innerHTML = "0";

        cCol11.appendChild(vBlocks);
        cCol11.appendChild(cE("br"));

        lLevel = cE("span");
        lLevel.innerHTML = "Level";

        cCol11.appendChild(lLevel);
        cCol11.appendChild(cE("br"));

        vLevel = cE("span");
        vLevel.id = "sLevel";
        vLevel.innerHTML = "1";

        cCol11.appendChild(vLevel);
        cCol11.appendChild(cE("br"));

        cCol11.style.fontFamily = "Courier";
        cCol11.style.verticalAlign = "top";

        cRow1.appendChild(cCol11);

        canvas.appendChild(cRow0);
        canvas.appendChild(cRow1);

        rCanvas.appendChild(canvas);

        document.body.appendChild(rCanvas);
    };

    isBlocked = function (block, side) {
        var i;
        var j;
        var x;
        var y;
        var offsetX = 0;
        var offsetY = 0;

        switch (side) {
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

        for (i = 0; i < block.tileArr.length; i += 1) {
            for (j = 0; j < block.tileArr[i].length; j += 1) {
                if (1 === block.tileArr[i][j]) {
                    y = block.top + i + offsetY;
                    x = block.left + j + offsetX;

                    if (0 > y || 0 > x || 19 < y || 9 < x) {
                        return true;
                    }

                    if (1 === lBoard[y][x]) {
                        return true;
                    }
                }
            }
        }

        return false;
    };

    moveSide = function (side) {
        var offset = (1 === side)
            ? -1
            : 1;

        if (loop && !isBlocked(currentBlock, side)) {
            processBlock(currentBlock, true);
            currentBlock.left += offset;
            processBlock(currentBlock, false);
        }
    };

    moveDown = function (instant) {
        if (loop) {
            if (instant) {
                while (!isBlocked(currentBlock, 0)) {
                    dropBlock(currentBlock);
                }
            } else {
                speed = 50;
            }
        }
    };

    rotateBlock = function () {
        var lNextBlock;

        if (loop) {
            lNextBlock = blocksArray[currentBlock.nextBlock];
            lNextBlock.left = currentBlock.left;
            lNextBlock.top = currentBlock.top;

            if (!isBlocked(lNextBlock)) {
                processBlock(currentBlock, true);
                currentBlock = lNextBlock;
                processBlock(currentBlock, false);
            }
        }
    };

    window.mainLoop = function () {
        if (!paused) {
            if (currentBlock) {
                if (isBlocked(currentBlock, 0)) {
                    checkBrokenBlocks();
                    loop = insertNewBlock();
                } else {
                    dropBlock(currentBlock);
                }
            } else {
                loop = insertNewBlock();
            }
        }

        if (loop) {
            setTimeout("mainLoop()", speed);
        }
    };

    checkBrokenBlocks = function () {
        var i;
        var j;
        var y;
        var x;
        var blocks;
        var complete;

        for (i = 0; i < currentBlock.tileArr.length; i += 1) {
            for (j = 0; j < currentBlock.tileArr[i].length; j += 1) {
                y = currentBlock.top + i;
                x = currentBlock.left + j;

                if (1 === currentBlock.tileArr[i][j]) {
                    lBoard[y][x] = 1;
                }
            }
        }

        for (i = 0; i < lBoard.length; i += 1) {
            complete = true;
            for (j = 0; j < lBoard[i].length; j += 1) {
                if (0 === lBoard[i][j]) {
                    complete = false;
                }
            }

            if (complete) {
                for (j = 0; j < lBoard[i].length; j += 1) {
                    lBoard[i][j] = 0;
                    processTile(i + 1, j + 1, true);
                }

                shiftDown(i);

                gE("sScore").innerHTML = parseInt(gE("sScore").innerHTML) + 100;
                blocks = parseInt(gE("sBlocks").innerHTML) + 1;
                gE("sBlocks").innerHTML = blocks;

                if (blocks < 91 && (0 === blocks % 10)) {
                    level = (blocks / 10) + 1;
                    speed = 550 - (level * 50);

                    gE("sLevel").innerHTML = level;
                }
            }
        }
    };

    endGame = function () {
        vBoard.childNodes[4].childNodes[4].innerHTML = "G";
        vBoard.childNodes[4].childNodes[4].style.color = "#FFFFFF";
        vBoard.childNodes[4].childNodes[4].style.fontSize = "10px";

        vBoard.childNodes[4].childNodes[5].innerHTML = "A";
        vBoard.childNodes[4].childNodes[5].style.color = "#FFFFFF";
        vBoard.childNodes[4].childNodes[5].style.fontSize = "10px";

        vBoard.childNodes[4].childNodes[6].innerHTML = "M";
        vBoard.childNodes[4].childNodes[6].style.color = "#FFFFFF";
        vBoard.childNodes[4].childNodes[6].style.fontSize = "10px";

        vBoard.childNodes[4].childNodes[7].innerHTML = "E";
        vBoard.childNodes[4].childNodes[7].style.color = "#FFFFFF";
        vBoard.childNodes[4].childNodes[7].style.fontSize = "10px";

        vBoard.childNodes[6].childNodes[4].innerHTML = "O";
        vBoard.childNodes[6].childNodes[4].style.color = "#FFFFFF";
        vBoard.childNodes[6].childNodes[4].style.fontSize = "10px";

        vBoard.childNodes[6].childNodes[5].innerHTML = "V";
        vBoard.childNodes[6].childNodes[5].style.color = "#FFFFFF";
        vBoard.childNodes[6].childNodes[5].style.fontSize = "10px";

        vBoard.childNodes[6].childNodes[6].innerHTML = "E";
        vBoard.childNodes[6].childNodes[6].style.color = "#FFFFFF";
        vBoard.childNodes[6].childNodes[6].style.fontSize = "10px";

        vBoard.childNodes[6].childNodes[7].innerHTML = "R";
        vBoard.childNodes[6].childNodes[7].style.color = "#FFFFFF";
        vBoard.childNodes[6].childNodes[7].style.fontSize = "10px";
    };

    drawNextBlock = function () {
        var i;
        var j;
        var tile;
        var container = gE("cNextBlock").firstChild;

        for (i = 1; i < container.childNodes.length - 1; i += 1) {
            for (j = 1; j < container.childNodes[i].childNodes.length - 1; j += 1) {
                tile = container.childNodes[i].childNodes[j];

                if (1 === nextBlock.tileArr[i - 1][j - 1]) {
                    tile.style.backgroundColor = "#" + nextBlock.color.toString(16);
                    tile.style.borderStyle = "outset";
                    tile.style.borderWidth = "2px";
                    tile.style.borderColor = "#" + nextBlock.backgroundColor.toString(16);
                } else {
                    tile.style.backgroundColor = "#000000";
                    tile.style.borderStyle = "none";
                    tile.style.borderWidth = 0;
                    tile.style.borderColor = "#000000";
                }
            }
        }
    };

    insertNewBlock = function () {
        var running = nextBlock;
        if (running) {
            currentBlock = nextBlock;
            currentBlock.left = 4;
            currentBlock.top = 0;
        }

        nextBlock = blocksArray[Math.floor(Math.random() * 19)];
        nextBlock.left = 4;
        nextBlock.top = 0;

        drawNextBlock();

        if (!running) {
            currentBlock = blocksArray[Math.floor(Math.random() * 19)];
            currentBlock.left = 4;
            currentBlock.top = 0;
        }

        processBlock(currentBlock, false);

        if (isBlocked(currentBlock)) {
            endGame();
            return false;
        }

        return true;
    };

    window.main = function () {
        drawBoard();

        document.body.onkeydown = function () {
            if (currentBlock) {
                var keyDefined = false;
                var code = window.event.keyCode;

                if (37 === code) {
                    moveSide(1);
                    keyDefined = true;
                } else if (38 === code) {
                    rotateBlock();
                    keyDefined = true;
                } else if (39 === code) {
                    moveSide(2);
                    keyDefined = true;
                } else if (40 === code) {
                    moveDown();
                    keyDefined = true;
                } else if (loop && 80 === code) {
                    paused = !paused;

                    if (paused) {
                        vBoard.childNodes[4].childNodes[3].innerHTML = "P";
                        vBoard.childNodes[4].childNodes[3].style.color = "#FFFFFF";
                        vBoard.childNodes[4].childNodes[3].style.fontSize = "10px";

                        vBoard.childNodes[4].childNodes[4].innerHTML = "A";
                        vBoard.childNodes[4].childNodes[4].style.color = "#FFFFFF";
                        vBoard.childNodes[4].childNodes[4].style.fontSize = "10px";

                        vBoard.childNodes[4].childNodes[5].innerHTML = "U";
                        vBoard.childNodes[4].childNodes[5].style.color = "#FFFFFF";
                        vBoard.childNodes[4].childNodes[5].style.fontSize = "10px";

                        vBoard.childNodes[4].childNodes[6].innerHTML = "S";
                        vBoard.childNodes[4].childNodes[6].style.color = "#FFFFFF";
                        vBoard.childNodes[4].childNodes[6].style.fontSize = "10px";

                        vBoard.childNodes[4].childNodes[7].innerHTML = "E";
                        vBoard.childNodes[4].childNodes[7].style.color = "#FFFFFF";
                        vBoard.childNodes[4].childNodes[7].style.fontSize = "10px";

                        vBoard.childNodes[4].childNodes[8].innerHTML = "D";
                        vBoard.childNodes[4].childNodes[8].style.color = "#FFFFFF";
                        vBoard.childNodes[4].childNodes[8].style.fontSize = "10px";
                    } else {
                        vBoard.childNodes[4].childNodes[3].innerHTML = "";
                        vBoard.childNodes[4].childNodes[4].innerHTML = "";
                        vBoard.childNodes[4].childNodes[5].innerHTML = "";
                        vBoard.childNodes[4].childNodes[6].innerHTML = "";
                        vBoard.childNodes[4].childNodes[7].innerHTML = "";
                        vBoard.childNodes[4].childNodes[8].innerHTML = "";
                    }

                    keyDefined = true;
                } else if (32 === code) {
                    moveDown(true);
                    keyDefined = true;
                }

                if (keyDefined) {
                    if (window.event.preventDefault) {
                        window.event.preventDefault();
                    } else if (window.event.stopPropagation) {
                        window.event.stopPropagation();
                    }
                }
            }
        };

        document.body.onkeyup = function () {
            if (40 === window.event.keyCode) {
                speed = 550 - (level * 50);
            }
        };

        window.mainLoop();
    };
}());
