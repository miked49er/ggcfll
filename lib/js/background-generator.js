var blockSize = [
  {
    "size": 5,
    "class": 'block1'
  },
  {
    "size": 10,
    "class": 'block2'
  },
  {
    "size": 20,
    "class": 'block4'
  }
];

var blockColor = [
  'green',
  'orange',
  'blue',
  'silver'
];

var blockHeight = 30;

var bg = [];

// Creates a html element that can be used in appendChild
function convertToElement(html) {
  // Create a temportary div
  var temp = document.createElement('div');
  // Place the html in the div's innerhtml
  temp.innerHTML = html;
  // Then return the first node
  return temp.childNodes[0];
}

function createBlock(block) {
  var html = '<div class="' + block.size + ' ' + block.color + '"></div>';
  return convertToElement(html);
}

// Retrieve the client's window hight
function getClientHeight() {
  // return (window.innerHeight || document.body.clientHeight);
  var body = document.body,
      html = document.documentElement;

  var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );

  return height;
}

function selectSize() {
  return blockSize[Math.floor(Math.random() * blockSize.length)];
}

function selectColor() {
  return blockColor[Math.floor(Math.random() * blockColor.length)];
}

function generateRow() {
  var row = [];
  var rowSize = 100;
  while (rowSize > 0) {

    // Select a block size
    var size = selectSize();

    // Insure that size doesn't exceed the rowSize
    while (rowSize - size.size < 0) {
      size = selectSize();
    }

    // Remove size from rowSize
    rowSize -= size.size;

    // Select a block color
    color = selectColor();

    // Create a block
    var block = {
      "size": size.class,
      "color": color
    };

    // Add block to row
    row[row.length] = block;
  }

  // Add row to bg
  bg[bg.length] = row;
}

function generateRows() {
  var clientHeight = getClientHeight();
  var curHeight = 0;
  console.log(clientHeight);

  while (curHeight < clientHeight - blockHeight) {
    generateRow();
    curHeight += blockHeight;
  }
}

function generateBackground() {

  generateRows();
  var blocks = convertToElement('<div class="blocks"></div>');

  for (var i = 0; i < bg.length; i++) {
    var row = bg[i];
    var blockRow = convertToElement('<div class="row"></div>');
    for (var j = 0; j < row.length; j++) {
      var block = createBlock(row[j]);
      blockRow.appendChild(block);
    }
    blocks.appendChild(blockRow);
  }
  var nav = document.getElementsByClassName('navbar')[0];
  nav.parentNode.insertBefore(blocks, nav);
}

document.addEventListener('DOMContentLoaded', function() {
  generateBackground();
});
