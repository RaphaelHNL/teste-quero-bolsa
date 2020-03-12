var data = "";
  
  function response(teste){
    data = teste;
  }
 

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

  lerArquivo("./js/db.json",response);
  var objects = JSON.parse(JSON.stringify(data));
  
  
console.log(objects);