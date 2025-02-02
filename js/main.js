import { buttonsData, menu } from "./db.js";
import { calculatePrice, elements } from "./helpers.js";

//! fonksiyonlar

const searchCategory= (e) => {
    //*tıkladığımız butonun data özelliklerine eriştik ve bir değişkene aktardık
    const category = e.target.dataset.category;
    
    //* Tüm dizi elemanlarından yalnızca kategori değeri butonun kategori değeri ile eşleşir.
    const filtredMenu = menu.filter((item) => item.category === category);
    
    if (category === "all") {
        renderMenuItems(menu);
    }else{
        renderMenuItems(filtredMenu);
    }

    renderButtons(category);
}

//* Ekrana menü elamanlarını aktaracak fonksiyondur
const renderMenuItems = (menuItems) => {
    
// * gönderilen verileri dönüp her bir veri için bir div etiketi oluşturur.
    let menuHTML = menuItems.map((item) => 
       `
      <a
      id="card"
      href="/productDetail.html?id=${item.id}&category=${item.category}&price=${
        item.price
      }"
      class="text-decoration-none text-black d-flex flex-column flex-md-row gap-2"
      >
          <img class="rounded shadow" src="${item.img}" alt="" />
          <div>
          <div class="d-flex justify-content-between align-items-center">
              <h5>${item.title}</h5>
              <p class="text-success">${calculatePrice(item.price)}₺</p>
          </div>
          <p class="lead">
              ${item.desc}
          </p>
          </div>
      </a>
      
      `
);
    menuHTML = menuHTML.join("");
    //* oluşturduğumuz menuHTML değişkenini ekrana aktardık
    elements.menuArea.innerHTML = menuHTML;
};

const renderButtons = (active) => {
    elements.buttonsArea.innerHTML = "";
    //* yeni butonlar oluşturmak için buttonsData içerisindeki verileri dönüp her bir veri için bir buton oluştururuz
    
    buttonsData.forEach((btn) => {
        //* her bir veri için bir HTML buton etiketi oluşturur
        const buttonEle = document.createElement("button");
        //* Oluşturduğumuz butonlara class ekledik.
        buttonEle.className = "btn btn-outline-dark filter-btn";
        //* oluşturduğumuz butonun içeriğini değiştirdik
        buttonEle.textContent = btn.text;
        //*oluşturduğumuz butonun hangi kategoride olduğu bilgisini button elementine ekledik.
        buttonEle.dataset.category = btn.value;
        if (btn.value === active) {
            buttonEle.classList.add("bg-dark", "text-light");
        }
            
        //* html'e gönderme
        elements.buttonsArea.appendChild(buttonEle);
    });
};

//! Olay izleyicileri
//* Sayfa yüklendiği anda renderMenuItems fonksiyonunu çalıştır ve menu parametresini gönder.
//* renderButtons fonksiyonunu çalıştır ve seçili olarak hepsi seçili kategorisini parametre olarak gönder.
document.addEventListener("DOMContentLoaded", () => {
    renderButtons("all");
    renderMenuItems(menu);    
});

//* butonların bulunduğu alana tıklanıldığında searchCategory fonksiyonunu çalıştırır
elements.buttonsArea.addEventListener("click", searchCategory);