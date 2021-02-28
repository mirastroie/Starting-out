 function ScrolledIntoView(x) {
    var rect = x.getBoundingClientRect();
    var xTop = rect.top;
    var xBottom = rect.bottom;
    var ok= xTop < window.innerHeight && xBottom >0;
    return ok;
    }

///Exemplu pentru ilustrearea navigarii prin arbore si a schimbarii proprietatiilor
///Schimba src-ul primei imagini din primul div din ultima sectiune
function changeSrcAttribute()
{
    var sections=document.getElementsByTagName('section');
    var lastSection=sections[sections.length-1];
    var it=lastSection.children[0].firstChild;
    
    do
    {
        it=it.nextSibling;

    }while(it.tagName!="DIV");
    
    it.children[0].src="https://images.unsplash.com/photo-1571755931207-3ede68df575a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=753&q=80";
    
}
window.onscroll=function(){

  
   var listHeadings=Array.prototype.slice.call(document.getElementsByClassName("animate-headings"));
   var listParagraphs=Array.prototype.slice.call(document.getElementsByClassName("animate-paragraphs"));
   var listElements = listHeadings.concat(listParagraphs);
   this.console.log(listElements);
   for(x of listElements)
   {
       if(ScrolledIntoView(x))
           x.classList.add("active");
       else x.classList.remove("active");
   }
   changeSrcAttribute();

}