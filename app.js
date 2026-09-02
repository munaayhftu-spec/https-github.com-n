const pages=document.querySelectorAll('.page');function show(id){pages.forEach(p=>p.classList.toggle('active',p.id===id));if(id==='designs')render()}
const c=document.getElementById('canvas'),x=c.getContext('2d');function reset(){x.fillStyle='#ffdce9';x.fillRect(0,0,c.width,c.height);x.textAlign='center';x.fillStyle='#a7356c';x.font='bold 34px sans-serif';x.fillText('تصميمي منوش',180,340);x.font='50px sans-serif';x.fillText('🌸',180,275)}reset();
function addText(){let t=prompt('اكتب النص:');if(t){x.fillStyle='#8f315f';x.font='bold 26px sans-serif';x.fillText(t,180,420)}}function addHeart(){x.font='65px sans-serif';x.fillText('💗',180,500)}function changeBg(){let color=prompt('لون الخلفية، مثال #ffdce9','#ffdce9');if(color){x.fillStyle=color;x.fillRect(0,0,c.width,c.height)}}function clearCanvas(){if(confirm('مسح التصميم؟'))reset()}
document.getElementById('image').onchange=e=>{let f=e.target.files[0];if(!f)return;let im=new Image();im.onload=()=>{let s=Math.min(300/im.width,250/im.height,1);x.drawImage(im,180-im.width*s/2,120,im.width*s,im.height*s)};im.src=URL.createObjectURL(f)};
function saveDesign(){let n=prompt('اسم التصميم:','تصميم جديد');if(n===null)return;let a=JSON.parse(localStorage.getItem('designs')||'[]');a.unshift({name:n,data:c.toDataURL('image/png'),date:new Date().toLocaleString('ar-SA')});localStorage.setItem('designs',JSON.stringify(a.slice(0,30)));alert('✅ تم حفظ التصميم');render()}
function download(){let a=document.createElement('a');a.download='tasmeemi-manoush.png';a.href=c.toDataURL('image/png');a.click()}function render(){let a=JSON.parse(localStorage.getItem('designs')||'[]'),box=document.getElementById('list');box.innerHTML=a.length?a.map((d,i)=>`<article class="card"><img class="thumb" src="${d.data}"><b>${d.name}</b><small>${d.date}</small><button onclick="openD(${i})">✏️ فتح</button><button onclick="delD(${i})">🗑️ حذف</button></article>`).join(''):'<div class="card">🌸 لا توجد تصاميم محفوظة بعد.</div>'}window.openD=i=>{let d=JSON.parse(localStorage.getItem('designs')||'[]')[i],im=new Image();im.onload=()=>{x.clearRect(0,0,c.width,c.height);x.drawImage(im,0,0,c.width,c.height);show('editor')};im.src=d.data};window.delD=i=>{let a=JSON.parse(localStorage.getItem('designs')||'[]');a.splice(i,1);localStorage.setItem('designs',JSON.stringify(a));render()};render();
const searchBox=document.createElement('div');
searchBox.innerHTML='<h3>🔍 ابحثي عن صورة</h3><input id="imageSearch" placeholder="مثلاً: ورد، قطة، فراشة"><button id="searchBtn">بحث 🔍</button><div id="searchResults"></div>';
document.getElementById('editor').prepend(searchBox);

document.getElementById('searchBtn').onclick=async()=>{
 const q=document.getElementById('imageSearch').value.trim();
  const r=document.getElementById('searchResults');
   if(!q)return;
    r.innerHTML='جاري البحث... 🔎';
     const d=await fetch('https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch='+encodeURIComponent(q)+'&gsrnamespace=6&gsrlimit=12&prop=imageinfo&iiprop=url&iiurlwidth=180&format=json&origin=*').then(x=>x.json());
      r.innerHTML=Object.values(d.query?.pages||{}).map(p=>'<img src="'+p.imageinfo[0].thumburl+'" style="width:90px;height:90px;object-fit:cover;margin:5px;border-radius:10px">').join('')||'ما لقينا نتائج 😅';
      };h