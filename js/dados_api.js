
  
  var nome = ""


  function lerArquivo(nome, callback)
  {
      var req = new XMLHttpRequest();
      req.open("GET", nome, false);
      req.onreadystatechange = function ()
      {
          if(req.readyState === 4)
          {
              //verifica se a requisição foi bem sucedida
              if(req.status === 200 || req.status == 0)
              {
                  callback(req.responseText);
              }
          }
      }
      req.send(null);
  }

    
  var objects = JSON.parse(JSON.stringify(lerArquivo("./js/db.json")));
  
  objects.forEach(function(key){
      console.log(key.campus.city);
     
  })
