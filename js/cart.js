function add(x) {
  var product = x.parentElement.parentElement;
  var img = product.querySelector("img").src;
  var name = product.querySelector(".dell_text").innerText;
  var price = product.querySelector(".price_text").innerText;

  addcart(price, img, name);
}

function addcart(price, img, name) {
  var cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const tontai = cartItems.findIndex((item) => item.name === name);

  if (tontai !== -1) {
    cartItems[tontai].SL += 1;
  } else {
    cartItems.push({
      name: name,
      price: price,
      img: img,
      SL: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cartItems));
}

function loadCart() {
  var cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const output = document.querySelector(".outputcard");
  const total = document.querySelector(".tong span");
  output.innerHTML = "";
  let totalPrice = 0;

  cartItems.forEach((SP) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td class="anhsp" style="align-items: center">
            <img  style="width: 25px,font-size: 14px;" src="${SP.img}" alt="product" />
          </td>
          <td style="color: black"><p><span >${SP.price}</span><sup>đ</sup></p></td>
          <td>
            <input type="number" min="1" value="${SP.SL}" style="width: 30px" onchange="updateSL('${SP.name}', this.value)">
          </td>
          <td><button onclick="xoa('${SP.name}')" style="background-color: transparent; padding: 10px 20px;border: none;color: #black;cursor: pointer;">Xoá</button></td>`;
    output.appendChild(row);
    let a = SP.price;
    while (a.includes(".")) {
      a = a.replace(".", "");
    }
    totalPrice += parseInt(a) * SP.SL;
  });
  let tran = totalPrice.toString();
  let kq = "";
  let dem = 0;
  for (let i = tran.length - 1; i >= 0; i--) {
    kq = tran[i] + kq;
    dem++;
    if (dem % 3 === 0 && i !== 0) {
      kq = "." + kq;
    }
  }
  total.innerText = kq + " đ";
  return totalPrice;
}

function xoa(name) {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems = cartItems.filter((item) => item.name !== name);

  localStorage.setItem("cart", JSON.stringify(cartItems));
  loadCart();
}

function updateSL(name, SL) {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const vitri = cartItems.findIndex((item) => item.name === name);

  if (vitri !== -1) {
    cartItems[vitri].SL = parseInt(SL);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    loadCart();
  }
}

window.onload = function () {
  loadCart();
};
window.onload = function () {
  const totalPrice = loadCart();
  const qr = document.querySelector(".hienthiqr");
  qr.innerHTML = `<img
          src="https://img.vietqr.io/image/MB-141020066789-qr_only.png?amount=${totalPrice}&addInfo=Tien%20mua%20hang&accountName=LE%20DUY%20MANH"
          alt="Mã QR ngân hàng"
        />`;
};
