var frequency=[];
frequency[0]=new Object();
frequency[1]=new Object();
var start=[];
start[0]=0;
start[1]=0;
var modify=[];
modify[0]=[];
modify[1]=[];
var words=[];

// Creating the list with frequent words and highlighting them
function freq(i)
{

   
   var cont=document.getElementsByClassName("paragraph-container")[i+1];
   var kids=cont.children;
   for(x of kids)
   {
       var txt=x.innerHTML;
       var common=['and','of','the','a','as','by','on','at','to','in','for','which','be','that','have','it','you','your','we','up','with','or'];
       var pattern=/\w+/g; ///folosim expresia 
       ///regulata ca sa cautam cuvinte - acele stringuri
       ///care contin cel putin o litera
       var result=txt.match(pattern);
      
       for(var y of result)
       {
           var word=y.toLowerCase();
           if(!common.includes(word))
           {if(word in frequency[i])
              frequency[i][word]++;
            else frequency[i][word]=1;
           }
       }
   }
   words[i]=Object.keys(frequency[i]);
   words[i].sort(function compare(a,b){return -frequency[i][a]+frequency[i][b];});
   console.log(words[i]);


}
function ctrl(but, i)
{
     
    var parent=but.nextElementSibling;
    //prima oara stergem primul element
    parent.removeChild(parent.children[0]);
    start[i]++;
    modify[i]=words[i].slice(start[i],start[i]+10);
    var x=document.createElement("li");
    x.innerHTML=modify[i][9]+' '+'<span class="circle">'+frequency[i][modify[i][9].toLowerCase()]+'</span';
    console.log(x);
    parent.appendChild(x);
     
}
function show(t,event, j)
{
    ///trebuie sa verificam daca lista nu a fost deja afisata
    if(!t.nextElementSibling.classList.contains("active"))
     {
       t.nextElementSibling.classList.add('active');
       var parent=t.nextElementSibling;
       for(let i=0;i<10;i++) ///la inceput evident ca o sa avem fix primele cuvinte din pct de vedere a frecventei
       {  
           var x=document.createElement("li");
           x.innerHTML=words[j][i]+' '+'<span class="circle">'+frequency[j][words[j][i].toLowerCase()]+'</span';
           console.log(x);
           parent.appendChild(x);

        }
        var bnext=t.nextElementSibling.nextElementSibling;
        bnext.style.display="inline-block";

    }
    ///in cazul in care a fost deja afisata, actionam doar in cazul in care se apasa si ctrl
    else
    {
         if(event.ctrlKey)
             ctrl(t,j);

    }
   
}
function highlight(i)
{
    var cont=document.getElementsByClassName("paragraph-container")[i+1];
    var kids=cont.children;
    modify[i]=words[i].slice(start[i],start[i]+10);
    for(x of kids)
    {
        var txt=x.innerHTML;
        for(y of modify[i])
        {
            var pattern=new RegExp(y.toString(),'gi');
           var pattern2=new RegExp('\\W'+y.toString()+'\\W','gi');
           var found=txt.search(pattern2);
           if(found)
              txt=txt.split(pattern2).join(txt[found]+'<span class="highlight">'+txt.slice(found+1,found+y.length+1).bold()+'</span>'+txt[found+y.length+1]);
 
        }
        x.innerHTML=txt;
    }
}
// Animating the custom scroll
function ScrolledIntoView(x) 
{
    var rect = x.getBoundingClientRect();
    var xTop = rect.top;
    var xBottom = rect.bottom;
    var ok= xTop < window.innerHeight && xBottom >0;
    return ok;

}
function intoView()
{
    var select=document.getElementById("font-size");
    if(window.scrollY>window.innerHeight)
       {
          
           select.style.visibility='visible';
       }
    else   select.style.visibility='hidden';
}
function sectionScroll()
{
    var button=document.getElementById("scroll");
    var s1=document.getElementById("s1");
    var s2=document.getElementById("s2");
    var s3=document.getElementById("s3");

    /// in momentul in care user-ul apasa butonul, trebuie sa vedem in ce sectiune suntem
    /// ca sa putem sa ne mutam la urmatoare
    if(ScrolledIntoView(s1) &&  button.href!="#s2")
       button.href="#s2";     
    if(ScrolledIntoView(s2) &&  button.href!="#s3")
     { button.href="#s3"; console.log("in");}
    if(ScrolledIntoView(s3) &&  button.href!="#s1")
        button.href="#s1";

}
// Animating the title
function activate2(x,y)
    {
      
        x.classList.add('active-title');
        y.classList.add('active-title');

    }
    function activate(x)
    {
        x.classList.add('active-title');
    }
    function clear2(x,y)
    {
        x.classList.remove('active-title');
        y.classList.remove('active-title');

    }
    function clear1(x)
    {
        x.classList.remove('active-title');
    }
    function clear(x)
    {
        var kids=x.children;
        var timer=50;
        for(let i=0;i<Math.floor(kids.length/2);i++)
        {
            setTimeout(clear2,timer,kids[i],kids[kids.length-i-1]);
            timer+=50;
        }
        if(kids.length%2!=0)
        {
            setTimeout(clear1,timer,kids[Math.floor(kids.length/2)]);
        }
    }
    function Animate()
    {

        var title=document.getElementById("animate-title");
        var kids=title.children;
        var timer=100;
        for(let i=0;i<Math.floor(kids.length/2);i++)
        {
            setTimeout(activate2,timer,kids[i],kids[kids.length-i-1]);
            timer+=100;
        }
        if(kids.length%2!=0)
        {
            setTimeout(activate,timer,kids[Math.floor(kids.length/2)]);
        }
        setTimeout(clear,timer+800,title);
    }
// Setting the custom font-size
function clearStorage()
{
  
    localStorage.removeItem('fontSize');
    var elements=document.getElementsByClassName("paragraph-container");
    for(item of elements)
        item.style.fontSize='100%';
    var select=document.getElementById("font-size");
        for(x of select.children)
           x.selected='false';
    select.children[0].selected='true';
    

}
function verifyFont()
{
   if(localStorage.getItem('fontSize'))
   {
     var  Size=JSON.parse(localStorage.getItem('fontSize'));
     var elements=document.getElementsByClassName("paragraph-container");
      for(item of elements)
      item.style.fontSize=Size.size+'px';

      var select=document.getElementById("font-size");
      if(Size.size=='14')
          select.children[1].selected='true';
      else if(Size.size=='18')
      select.children[2].selected='true';
      else if(Size.size=='24')
      select.children[3].selected='true';
   }

}
    function remember(x)
    {
          ///se schimba
         
          var elements=document.getElementsByClassName("paragraph-container");
          for(item of elements)
            item.style.fontSize=x.toString()+'px';
           ///se memoreaza in localStorage
            var Size=Object.create({});
            Size.size=x.toString();
            var jFontSize=JSON.stringify(Size);
            localStorage.setItem('fontSize',jFontSize);
    }
    function fontChange()
    {
    
       var select=document.getElementById("font-size");
       select.addEventListener("change", function()
       {
           console.log(select.value);
          if(select.value=="small")remember(14);
          if(select.value=="medium")remember(18);
          if(select.value=="large")remember(24);
          if(select.value=="initial")clearStorage();

       })
       
    }
window.onload=function()
{
    verifyFont();
    freq(0);
    freq(1);
    Animate();
    setInterval(Animate,2500);
    var b1=document.getElementById("b1");
    var b12=document.getElementById("b12");
    b1.addEventListener("click",function(){show(this,event,0,b1);});
    b12.onclick=function(){highlight(0);};

    var b2=document.getElementById("b2");
    var b22=document.getElementById("b22");
    b2.addEventListener("click",function(){show(this,event,1,b2);});
    b22.onclick=function(){highlight(1);};
    fontChange();
}
window.onscroll=function()
{
    sectionScroll();
    intoView();
}