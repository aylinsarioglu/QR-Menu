// Bu yapı bir obje yapısı, daha düzenli kod yazmak için gereklidir.
export const elements = {
    menuArea: document.getElementById("menu-area"),
    buttonsArea: document.getElementById("buttons-area"),
    outlet: document.getElementById("outlet"),
};
//* Fiyat hesaplama fonksiyonu
export const calculatePrice = (price) => {
    let newPrice = price * 15;
    newPrice = newPrice.toFixed(2);
    return newPrice;
};