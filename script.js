const products = [
  {id:1,name:"Aura Wireless Headphones",category:"Tech",price:2499,emoji:"🎧",badge:"BESTSELLER",bg:"linear-gradient(135deg,#6c4d9b,#d18bbd)",description:"Soft sound, bold style."},
  {id:2,name:"Cloud Ceramic Mug",category:"Home",price:649,emoji:"☕",badge:"NEW",bg:"linear-gradient(135deg,#b77d72,#f0c9a9)",description:"Your slow-morning essential."},
  {id:3,name:"Everyday Tote",category:"Style",price:899,emoji:"👜",badge:"LOVED",bg:"linear-gradient(135deg,#4d8e88,#a8d5c7)",description:"Room for all your little things."},
  {id:4,name:"Glow Desk Light",category:"Home",price:1599,emoji:"💡",badge:"TRENDING",bg:"linear-gradient(135deg,#d18b50,#f6d58c)",description:"A softer way to light up."},
  {id:5,name:"Pocket Speaker",category:"Tech",price:1899,emoji:"🔊",badge:"JUST IN",bg:"linear-gradient(135deg,#536eaa,#9eafe8)",description:"Big vibes, tiny package."},
  {id:6,name:"Daily Journal",category:"Lifestyle",price:499,emoji:"📓",badge:"STAFF PICK",bg:"linear-gradient(135deg,#a36c91,#e9b8c9)",description:"A fresh page, every day."},
  {id:7,name:"Retro Shades",category:"Style",price:799,emoji:"🕶️",badge:"SUMMER EDIT",bg:"linear-gradient(135deg,#667d9c,#b9c7d8)",description:"A little extra attitude."},
  {id:8,name:"Mini Plant Buddy",category:"Lifestyle",price:399,emoji:"🪴",badge:"GOOD MOOD",bg:"linear-gradient(135deg,#538b69,#b7d49d)",description:"A tiny touch of green."}
];
let activeCategory = "All";
let cart = JSON.parse(localStorage.getItem("novacart-cart") || "[]");
const $ = (selector) => document.querySelector(selector);
const money = value => new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(value);

function renderProducts(){
  const query = $("#search-input").value.trim().toLowerCase();
  let list = products.filter(p => (activeCategory==="All" || p.category===activeCategory) && (p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)));
  const sort = $("#sort-select").value;
  if(sort==="low") list.sort((a,b)=>a.price-b.price);
  if(sort==="high") list.sort((a,b)=>b.price-a.price);
  $("#product-grid").innerHTML = list.map(p=>`
    <article class="product-card">
      <div class="product-visual" style="--product-bg:${p.bg}">
        <span class="product-badge">${p.badge}</span><span class="product-emoji" aria-hidden="true">${p.emoji}</span>
      </div>
      <div class="product-info"><span class="product-category">${p.category}</span><h3>${p.name}</h3>
        <div class="product-bottom"><span class="product-price">${money(p.price)}</span><button class="add-button" data-add="${p.id}" aria-label="Add ${p.name} to bag">+</button></div>
      </div>
    </article>`).join("");
  $("#empty-state").hidden = list.length>0;
}
function saveCart(){localStorage.setItem("novacart-cart",JSON.stringify(cart));renderCart();}
function addToCart(id){const item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({id,qty:1});saveCart();showToast("Added to your bag ✦");}
function changeQty(id,delta){const item=cart.find(x=>x.id===id);if(!item)return;item.qty+=delta;if(item.qty<=0)cart=cart.filter(x=>x.id!==id);saveCart();}
function renderCart(){
  const count=cart.reduce((sum,x)=>sum+x.qty,0), subtotal=cart.reduce((sum,x)=>sum+products.find(p=>p.id===x.id).price*x.qty,0);
  $("#cart-count").textContent=count;$("#drawer-count").textContent=`(${count})`;
  $("#cart-items").innerHTML=cart.map(x=>{const p=products.find(y=>y.id===x.id);return `<div class="cart-line"><div class="cart-thumb" style="--product-bg:${p.bg}">${p.emoji}</div><div><h4>${p.name}</h4><small>${money(p.price)} each</small><div class="quantity-controls"><button data-qty="${p.id}" data-delta="-1" aria-label="Decrease quantity">−</button><span>${x.qty}</span><button data-qty="${p.id}" data-delta="1" aria-label="Increase quantity">+</button></div></div><span class="line-price">${money(p.price*x.qty)}</span></div>`}).join("");
  $("#cart-empty").hidden=count>0;$("#cart-summary").hidden=count===0;$("#cart-subtotal").textContent=money(subtotal);
}
function openCart(){ $("#cart-overlay").hidden=false;$("#cart-drawer").classList.add("open");$("#cart-drawer").setAttribute("aria-hidden","false");document.body.style.overflow="hidden"; }
function closeCart(){ $("#cart-overlay").hidden=true;$("#cart-drawer").classList.remove("open");$("#cart-drawer").setAttribute("aria-hidden","true");document.body.style.overflow=""; }
let toastTimer;
function showToast(message){const toast=$("#toast");toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2200);}

$("#filters").addEventListener("click",e=>{const btn=e.target.closest("[data-category]");if(!btn)return;activeCategory=btn.dataset.category;document.querySelectorAll(".filter-chip").forEach(x=>x.classList.toggle("active",x===btn));renderProducts();});
$("#product-grid").addEventListener("click",e=>{const btn=e.target.closest("[data-add]");if(btn)addToCart(Number(btn.dataset.add));});
$("#cart-items").addEventListener("click",e=>{const btn=e.target.closest("[data-qty]");if(btn)changeQty(Number(btn.dataset.qty),Number(btn.dataset.delta));});
$("#search-input").addEventListener("input",renderProducts);$("#sort-select").addEventListener("change",renderProducts);
$("#open-cart").addEventListener("click",openCart);$("#close-cart").addEventListener("click",closeCart);$("#cart-overlay").addEventListener("click",closeCart);$("#continue-shopping").addEventListener("click",closeCart);
$("#checkout-button").addEventListener("click",()=>showToast("Demo store: payment checkout is not connected."));
$(".search-toggle").addEventListener("click",()=>{$("#search-input").focus();$("#shop").scrollIntoView({behavior:"smooth"});});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeCart();});
$("#year").textContent=new Date().getFullYear();
renderProducts();renderCart();
