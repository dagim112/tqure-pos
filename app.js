let users=[{username:"admin",pin:"1234",role:"admin"},{username:"staff",pin:"1111",role:"staff"}];
let currentUser=null; let inventory=[]; let cart=[];

function loginUser(){
  const username=document.getElementById("username").value;
  const pin=document.getElementById("pin").value;
  const lang=document.getElementById("langSelect").value;
  setLanguage(lang);
  const user=users.find(u=>u.username===username&&u.pin===pin);
  if(user){ currentUser=user; window.location.href="index.html"; }
  else{ document.getElementById("errorMsg").textContent="Invalid login / PIN"; }
}

function logout(){ currentUser=null; window.location.href="login.html"; }

function addProduct(){
  const barcode=document.getElementById("barcodeInput").value;
  const name=document.getElementById("nameInput").value;
  const price=parseFloat(document.getElementById("priceInput").value);
  const quantity=parseInt(document.getElementById("quantityInput").value);
  if(!barcode||!name||!price||!quantity) return alert("All fields required");
  inventory.push({barcode,name,price,quantity}); renderInventory();
}

function renderInventory(){
  const tbody=document.querySelector("#inventoryTable tbody"); tbody.innerHTML="";
  inventory.forEach((item,index)=>{
    const tr=document.createElement("tr");
    tr.innerHTML=`<td>${item.barcode}</td><td>${item.name}</td><td>${item.price}</td><td>${item.quantity}</td><td><button onclick="deleteProduct(${index})">Delete</button></td>`;
    tbody.appendChild(tr);
  });
}
function deleteProduct(index){ inventory.splice(index,1); renderInventory(); }

function addToCart(){
  const barcode=document.getElementById("scanInput").value;
  const product=inventory.find(i=>i.barcode===barcode);
  if(!product) return alert("Product not found");
  let cartItem=cart.find(c=>c.barcode===barcode);
  if(cartItem) cartItem.quantity++; else cart.push({...product});
  renderCart();
}

function renderCart(){
  const tbody=document.querySelector("#cartTable tbody"); tbody.innerHTML="";
  let total=0;
  cart.forEach((item,index)=>{
    const itemTotal=item.price*item.quantity; total+=itemTotal;
    const tr=document.createElement("tr");
    tr.innerHTML=`<td>${item.barcode}</td><td>${item.name}</td><td>${item.price}</td><td>${item.quantity}</td><td>${itemTotal}</td><td><button onclick="removeFromCart(${index})">Remove</button></td>`;
    tbody.appendChild(tr);
  });
  document.getElementById("totalDisplay").textContent=`Total: ${total}`;
}
function removeFromCart(index){ cart.splice(index,1); renderCart(); }

function checkout(){ alert("Sale Completed!"); cart.forEach(item=>{ const inventoryItem=inventory.find(i=>i.barcode===item.barcode); if(inventoryItem) inventoryItem.quantity-=item.quantity; }); cart=[]; renderInventory(); renderCart(); }

// Add to Cart and Print
function addToCartAndPrint(){
  addToCart();
  const lastItem=cart[cart.length-1];
  printLabel(lastItem.barcode, lastItem.name);
  document.getElementById("scanInput").value='';
}

function printLabel(barcode, productName){
  const printWindow=window.open('', '', 'width=300,height=200');
  printWindow.document.write(`<p>Product: ${productName}</p>`);
  printWindow.document.write(`<p>Barcode: ${barcode}</p>`);
  printWindow.document.write(`<img src='https://barcode.tec-it.com/barcode.ashx?data=${barcode}&code=Code128&translate-esc=true' />`);
  printWindow.document.close();
  printWindow.print();
}

// Scanner input auto-add on Enter
document.addEventListener('DOMContentLoaded', ()=>{
  const scanInput=document.getElementById('scanInput');
  if(scanInput){
    scanInput.focus();
    scanInput.addEventListener('keypress', e=>{if(e.key==='Enter'){ addToCartAndPrint(); }});
  }
});
