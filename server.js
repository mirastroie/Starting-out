var http = require('http');
var x = require('querystring');
var fs=require('fs');
var url=require('url');


var server = http.createServer(function(request, response){

                        var path=url.parse(request.url,true).pathname;
                        
                        if (request.method === 'POST' && path=="/cale1")
                            {
                                
                               collectRequestData(request, function(result) {
                                var ok=0;
                                var fs=require('fs');
                                console.log(result);
                                console.log("next");
                                fs.readFile('protectedData.json',function(err,res)
                                {   
                                     
                                            
                                            var obj=JSON.parse(res);
                                            
                                            for(x of obj)
                                               if(result.numeL==x.nume && result.passL==x.password)
                                                 ok=1;

                                            if(ok==1)
                                            {
                                                var filePath = 'user.html';
                                                fs.readFile(filePath,
                                                    function(err, data) { 
                                                        response.statusCode=200;
                                                        response.end(data);
                                                    });


               
                                            }
                                            else
                                            {
                                                response.writeHead(200,{'Content-Type':'text/html','Access-Control-Allow-Origin':null});  
                                                response.write("this is an error");  
                                                response.end();  
                                            }
                               });
                            }
                            );} 

                            else if (request.method === 'POST' && path=="/cale2")
                            {
                              collectRequestData(request, function(result) {
                            
                                console.log(result);
                                console.log("next");
                                if(result!=null)
                                {
                                        var fs=require('fs');
                                        fs.readFile('protectedData.json','utf-8',function(error,res)
                                        {   
                                            
                                                console.log(result.name);
                                                var obj=JSON.parse(res);
                                                var ok=1;
                                                console.log(obj);
                                                for(var x of obj)
                                                { 
                                                   
                                                    if(result.name==x.nume)
                                                        {ok=0;}
            
                                                }
                                                if(ok==1)
                                                {   
                                                    
                                                    var temp={nume:0,password:0};
                                                    temp.nume=result.name;
                                                    temp.password=result.password;
                                                    obj.push(temp);
                                                    newJSON=JSON.stringify(obj);
                                                    fs.writeFile('protectedData.json',newJSON,function(error)
                                                    {
                                                        var msg='Successful Registration! Please log in now.';
                                                response.writeHead(200,{'Content-Type':'text/html','Access-Control-Allow-Origin':null});  
                                                response.write(msg);  
                                                response.end();  
              
                                                    });

                                                
                                            
                                                }
                                                else
                                                {
                                                    console.log("in");
                                                    response.writeHead(200,{'Content-Type':'text/html','Access-Control-Allow-Origin':null});  
                                                    response.write("Mai exista un utilizator cu acest nume");  
                                                    response.end();  
                                                }
                                            }
                                        
                                        );
                                    }

                            });

                            }
                            else if (request.method === 'GET' && path=="/cale3")
                            {
                                
                                var fs=require('fs')
                                fs.readFile('info.xml','utf-8',function(error,data)
                                {

                                   
                                    response.writeHead(200,{'Content-Type':'text/xml','Access-Control-Allow-Origin': '*'});  
                                    response.write(data);
                                    response.end();

                                })
 
                                
                            }
                            else
                            {
                                response.statusCode=404;
                                response.end("something");
                            }
                            
                        });
                        
                            


server.listen(7000);

function collectRequestData(request, callback) {
const type1 = 'application/x-www-form-urlencoded';
const type2 = 'text/plain;charset=UTF-8';
if(request.headers['content-type']===type1 )
     {
       
        var x=require('querystring');
        let body = '';
        request.on('data', function(chunk) {
                            body += chunk.toString();
                            
                            });

        request.on('end', function(){
                        callback(x.parse(body));
                            });
        }
else 
if(request.headers['content-type']===type2)
     {
       
        let body = '';
        request.on('data', function(chunk) {
                            body += chunk.toString();
                            
                            });

        request.on('end', function(){
                        
                        callback(JSON.parse(body));
                            });
        }

else
{
callback(null);
}
}