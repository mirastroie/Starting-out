
function motion()
{
    var canvas=document.getElementById("canvas");
    var main=canvas.getContext("2d");
   var originX=75;
   var originY=75;
   var radius=30;
    class Circle
    {
        constructor(x,y,angle)
        {
            this.x=x;
            this.y=y;
            this.angle=angle;
        }
   animate()
   {


      
       this.x=originX+Math.cos(this.angle * Math.PI / 180)*radius;
       this.y=originY+Math.sin(this.angle * Math.PI / 180)*radius;
       
      
       main.beginPath();
       main.arc(this.x,this.y,8,0,2*Math.PI,false);
       main.closePath();
       main.fillStyle=" #4C2882";
       main.fill();
   
       this.angle+=3;
       if(this.angle>360)this.angle=0;
   }};

  var AnimId;
  function wrap() 
  {

   var frames=20;
   main.clearRect(0,0,150,150);
   for(x of circles)
   x.animate();
   setTimeout(function(){AnimId=requestAnimationFrame(wrap);},1000/frames); 
  };

   var initAngle=0;
   var circles=[];
   for(let i=0;i<6;i++)
   {
       var obj=new Circle(0,0,initAngle);
       initAngle+=60;
       circles[i]=obj;
   }
   requestAnimationFrame(wrap);
   setTimeout(function(){cancelAnimationFrame(AnimId);},3000);
}
function loadContent()
{
   
   var xht=new XMLHttpRequest();
   xht.open("GET","http://localhost:7000/cale3");
   xht.onreadystatechange=function()
   {

    if(xht.status==200 && xht.readyState==4)
    {
           
           load(this.responseXML);
    }

   }
   xht.send();

}
function load(objDoc)
{
   

   var newContainers=document.getElementById("show-yourself").children;
   
   var reccContainer=objDoc.getElementsByTagName("reccomandation");
  
   var j=0;
   
   for(x of reccContainer)
   {
       
       var name=document.createElement("H6");
       var location=document.createElement("H6");
       var time=document.createElement("H6");
       var description=document.createElement("P");
       var link=document.createElement("A");
    
       name.innerHTML=reccContainer[j].children[0].innerHTML;
       location.innerHTML=reccContainer[j].children[1].innerHTML;
       time.innerHTML=reccContainer[j].children[2].innerHTML;
       description.innerHTML=reccContainer[j].children[3].innerHTML;
       
       const t=reccContainer[j].children[4].getAttribute("HREF");
       console.log(reccContainer[j].children[4].getAttribute("HREF"));
       link.href=t;
       link.innerHTML=reccContainer[j].children[4].innerHTML;

       newContainers[j].appendChild(name);
       newContainers[j].appendChild(location);
       newContainers[j].appendChild(time);
       newContainers[j].appendChild(description);
       newContainers[j].appendChild(link);
       j++;
   }


}
function activate(x)
{

   console.log("inside");
   x.classList.add("active");

}

function ScrolledIntoView(x) {
    var rect = x.getBoundingClientRect();
    var xTop = rect.top;
    var xBottom = rect.bottom;
    var ok= xTop < window.innerHeight && xBottom >0;
    return ok;
    }

function change(y,kids)
{
    console.log(y);
    var photos=["https://images.unsplash.com/photo-1483412919093-03a22057d0d7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1125&q=80",
    "https://www.sixsenses.com/media/2031/zighy-bay-oman-sunrise-breakfast-sense-on-the-edge3.jpg?anchor=center&mode=crop&width=648&height=405&rnd=132266541510000000",
    "https://www.sixsenses.com/media/3688/fiji-rara-restaurant.jpg?anchor=center&mode=crop&width=1337&height=836&rnd=132266537890000000"];

    kids[y].style.backgroundImage="url('"+photos[y]+"')";
    kids[y].style.backgroundColor="#909090";
    //kids[y].style.backgroundBlendMode="darken";
    kids[y].style.color="white";
   
}
function deactivate()
{
    var loading=document.getElementById("loading");
    loading.style.display='none';
    document.body.style.overflow='visible';
}
window.onload=function()
{

    loadContent();

    var x=document.getElementById("show-yourself");
  
            
            var kids=x.children;
            var time=200;
             for(let y=0;y<kids.length;y++)
               {    
                  
                   kids[y].onclick=function(){setInterval(change,time,y,kids);}
                   
               }
    motion();
    setTimeout(deactivate,3000);
        
}
window.onscroll=function()
{
       var x=document.getElementById("show-yourself");
       if(ScrolledIntoView(x))
        {
            console.log("in");
            var kids=x.children;
            var time=1000;
             for(let y=0;y<kids.length;y++)
               {    
                  
                   kids[y].classList.add("active");
                   

               }
        }
        else
        {
            console.log("delete");
            var kids=x.children;
            for(let y=0;y<kids.length;y++)
            {    
                console.log(y);
                 kids[y].classList.remove("active");

            }

        }

}