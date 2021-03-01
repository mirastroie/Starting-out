# Starting-out---WebDev-Project

A project for the Introduction to Web Development Course (second term, the first year of college). We studied HTML, CSS, JavaScript, Node.js and Ajax.
For my project, I chose to redesign the website of the [Six Senses Yao Noi Resort](https://www.sixsenses.com/en/resorts/yao-noi). Six Senses Yao Noi is a resort in Thailand, a perfect holiday destination for those who want to reconnect with themselves and nature.

<img src="sixSenses.gif"/>

Part 1 - HTML and CSS

Tasks:
- use semantic and non-semantic tags
- the site must be responsive (media query, relative length units, display property);
```css
.nav-line a
{
font-size: 1rem;
width: 100%;
height: 100%;
display: block;
}
@media (max-width: 800px) {
html { background:black }
#page-content h1, #page-content p, #page-content a,
#page-content h2, #page-content h3, #page-content h4
{
color:white;
}
}
```
- use CSS selectors (id, class, tag,  child element, :nth-child)
- use the following properties: width, height, color, background, font-size, border, padding, margin, display;
- use FLEX and GRID
```css
/* Constructing the main grid */
.main-container{

display: grid;

grid-template-rows: auto auto auto;
grid-template-columns: 10vw auto 10vw;
grid-template-areas:
"header header header"
"page-content page-content page-content"
"footer footer footer"
;

}
.video-container
{

min-height: 60vw;
overflow: hidden;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
}
```
- drop-down menu, figure gallery with figcaption
- transform, transition, animation
```css
.animate-paragraphs
{
transform: translate3d(-50px, 0, 0);
transition: all .7s ease-out;
opacity: 0;
}
.slide-container
{
width:300vw;
height:var(--slider-height);
animation: carusel 15s ease infinite;
padding:0;

}
```
- position(relative, absolute,sticky),z-index
```css
#slideshow
{

width:100vw;
height: var(--slider-height);
overflow: hidden;
z-index:-1;
position: absolute;

}
```
Part 2 - JavaScript

Tasks:
- change the style of an element or group of elements;
```javascript
var container=msg.parentElement;
container.style.visibility="hidden";
```
- DOM (selection by id, tag, class, CSS selector);
- create and remove elements
```javascript
var elem = document.createElement('div');
elem.style.top = event.pageY + Math.ceil(Math.random() * j) + 'px';
elem.style.left = event.pageX + Math.ceil(Math.random() * j) + 'px';
elem.className="particle";
document.body.appendChild(elem);
```
```javascript
function removeNode(elem)
{
document.body.removeChild(elem);
}
```
- change properties
- inputs (textbox/range/number/radio/checkbox, select, textarea);
- setTimeout, setInterval;
```javascript
var AnimateOff=setInterval(unnote,13000,msg);
setTimeout(stopAnimation,30000,AnimateOn,AnimateOff);
```
- use localStorage (keep in localStorage a collection of elements), JSON(parse, stringify)
```javascript
if(localStorage.getItem("surveyEvaluation")==null)
{

var evaluation=Object.create({});
evaluation.evalScore=score;
evaluation.nrResponses=1;
var jEvaluation=JSON.stringify(evaluation);
localStorage.setItem('surveyEvaluation',jEvaluation);
}
else
{
var oldEvaluation=JSON.parse(localStorage.getItem('surveyEvaluation'));
oldEvaluation.nrResponses++;
oldEvaluation.evalScore=Math.trunc((oldEvaluation.evalScore*(oldEvaluation.nrResponses-1)+score)/oldEvaluation.nrResponses);
var newEvaluation=JSON.stringify(oldEvaluation);
localStorage.setItem('surveyEvaluation',newEvaluation);
}
```
- events -properties(target, key, pageX)
-methods (stopPropagation, preventDefault)
- addEventListener
```javascript
///Capturing
ParentBtn2.addEventListener("click",sizeOnParent,false);
ParentBtn2.children[0].addEventListener("click",redirectFb,false);
```
- innerHTML
```javascript
var txt="
"; txt=txt.concat("Thank you for your feedback. We really appreciate your time."+"" +"So far, you gave us a score of "+score+" /18"+" That's great!"+""+ "And,this time, it only took you almost "+m+" minutes"+" to finish our survey."+"
");
y.innerHTML=txt;
```
- this, navigation in the tree (children, parentElement, ..)
```javascript
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
```
- window- open, close
```javascript
var newsWindow=window.open("https://www.nytimes.com/news-event/coronavirus?action=click&module=Spotlight&pgtype=Homepage");
setTimeout(closeW,10000,newsWindow);
...
function closeW(myWindow)
{
myWindow.close();
}
```

Part 3 - Node.js
- form

For this task, I created a survey (`survey.html`). A customer can take the survey multiple times. Each question in the survey has a predefined score and after each time a customer takes the survey, the grade (the average score of the survey results for that given customer) is updated in localStorage.
- xml and json files
- Ajax (xmlhttprequest)
```javascript
var x=new XMLHttpRequest();
...
var JSONData=JSON.stringify(data);

x.open("POST","http://localhost:7000/cale2");
x.onreadystatechange=function()
{
if(x.status==200 && x.readyState==4)
{
alert(this.responseText);
currentForm.parentNode.innerHTML='
'+this.responseText+'
';
}

}
x.send(JSONData);
```
- http,fs,url modules; using these modules, create a server, send a request from an HTML file to the previously mentioned server and receive the answer from the server

For this task, I chose to simulate the registration and authentication.
 <img src="https://i.imgur.com/UgjcGtX.png"/>
```javascript
var server = http.createServer(function(request, response){
var path=url.parse(request.url,true).pathname;
if (request.method === 'POST' && path=="/cale1")
{
collectRequestData(request, function(result){
//code for log in
}
}
else if (request.method === 'POST' && path=="/cale2")
{
collectRequestData(request, function(result) {
//code for register
}
}
else if (request.method === 'GET' && path=="/cale3")
{
///code for displaying recommendation info in user.html
}
...
server.listen(7000);

```
Part 4

For the final part of the project, I created a page (`measuresandpolicy.html`) with the following functionalities:
- the page has several sections, and the user can skip to the next section (without having to scroll through it) by clicking on the `next section` button;
- in each section of the page, through the use of regular expressions, the user can view the first 10 keywords (`show key words`); if he clicks on CTRL + `show key words`,
the first keyword will be changed with the next keyword that was not shown previously
- by clicking `ok`, the keywords become highlighted in the text of the section
- a user can change the size of the font; his preference will be saved in localStorage

<img src="https://i.imgur.com/EHMK1Qg.png" />


References:
- https://codepen.io/incompl/pen/skpGa
- https://codepen.io/daysahead/pen/mJqBge
- https://css-tricks.com/snippets/css/a-guide-to-flexbox/
- https://css-tricks.com/snippets/css/complete-guide-grid/
- https://www.w3schools.com/

Copyright Disclaimer: The media content is owned by Six Senses, IHG® Hotels & Resorts, and Four Seasons Hotel & Resort.
This content is used for educational and learning purposes ('fair use').
