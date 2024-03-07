# Node Base Interface

This code is an empty base, to create a program with a full screen web interface. As if it were a desktop program.
It behaves like a website, which allows you to create scenes in HTML5

# Release
# Simple
> version only interface in blanck
>## Libs depends 
>* electron
>* electron-packager
> ejample: npm install electron electron-packager
>## Build
>Windows: npm run build
>## Developer
>npm run dev
>## icon Folder
>./Base/icon.ico
>## config
>package.json add port key with port number 
>example:
>	...
>	"main": "index.js",
>	"port": 9034,
>	...
# Express
>Base express, para crear un código web encima de una estructura existente de express 
>start in /src/index.js
>and html web /src/www/spartan/views/index.ejs
>## Libs depends 
>* electron
>* electron-packager
>* express
>* ejs
> ejample: npm install electron electron-packager express ejs
>## Build
>Windows: npm run build
>## Developer
>npm run dev
>## icon Folder
>./Base/icon.ico
>##express 
>using ejs render 
> ### theme structure
> path theme : .../src/www/{name}/...
>  into folder {name} theme
> - ...public/**    public static folder container for css, img, video...
> - .../views/*.ejs
>## class window public Methods
> ### Port 
> example: window.port(port)
> example: window.port(port,'https://mi.domain.online')
> Default URL is a localhost:{port}  and port is a random execution.
> ### router
> Variable -> express().router 
> ### render 
> example:  window.render( theme,fileEjs,VarEjs);
> Return promise and value return Html

    window.router.get('/', function(req,res){	
        window.render('newFolder/newWeb', {
    		title:  superTitle,
        }).then( (result)=>{
    		res.send(result);
        });
    });
> ### setVar 
> example: window.setVar(title, value)  
> | title | value |
> |-------|-------------|
> | env | environment value['dev'|none] |
> | webtheme | is a name of folder /src/www/{value}/** | 
> | name | title window |
> | version | name version* |
> \* Only for render example
> 
# Express+socket.IO
>Base express, para crear un código web encima de una estructura existente de express 
>start in /src/index.js
>and html web /src/www/spartan/views/index.ejs
>## Libs depends 
>* electron
>* electron-packager
>* express
>* ejs
>* socket.io
>* http
> ejample: npm install electron electron-packager express ejs socket.io http
>## Build
>Windows: npm run build
>## Developer
>npm run dev
>## icon Folder
>./Base/icon.ico
>##express 
>using ejs render 
> ### theme structure
> path theme : .../src/www/{name}/...
>  into folder {name} theme
> - ...public/**    public static folder container for css, img, video...
> - .../views/*.ejs
>## class window public Methods
> ### Port 
> example: window.port(port)
> example: window.port(port,'https://mi.domain.online')
> Default URL is a localhost:{port}  and port is a random execution.
> ### Vars globals
> window.route -> express().router 
> window.io -> io(server)
> ### render 
> example:  window.render( theme,fileEjs,VarEjs);
> Return promise and value return Html

    window.router.get('/', function(req,res){	
        window.render('newFolder/newWeb', {
    		title:  superTitle,
        }).then( (result)=>{
    		res.send(result);
        });
    });
> ### setVar 
> example: window.setVar(title, value)  
> | title | value |
> |-------|-------------|
> | env | environment value['dev'|none] |
> | webtheme | is a name of folder /src/www/{value}/** | 
> | name | title window |
> | version | name version* |
> \* Only for render example
> 