const template = {
  init: function(){
    return` 
    <!DOCTYPE html>
    <html lang="ko">
      <head>
        <title>Mine Sweeper</title>
        <meta charset="utf-8">
        <script src = 'createButton.js'></script>
        <script src = 'asyncCommunication.js'></script>
        <link rel="stylesheet"  type="text/css" href = "/public/button.css">
      </head>
      <body>
        <div id="minediv">
          <div id = buttonGroup>
            <button>test</button>
          </div>
        </div>
      </body>
    </html>`; 
  }
}

module.exports = template;

