const languages = {
    en: { appName:"Tqure / ጥቁሬ", inventory:"Inventory", pos:"POS", barcode:"Barcode", product:"Product", price:"Price", quantity:"Quantity", actions:"Actions", addProduct:"Add Product", addToCart:"Add to Cart", checkout:"Checkout", total:"Total", totalAmount:"Total: " },
    am: { appName:"Tqure / ጥቁሬ", inventory:"እቃዎች", pos:"ሽያጭ", barcode:"ባርኮድ", product:"ምርት", price:"ዋጋ", quantity:"ብዛት", actions:"እርምጃ", addProduct:"ምርት አክል", addToCart:"ወደ ጋራ ጨምር", checkout:"ሽያጭ", total:"ጠቅላላ", totalAmount:"ጠቅላላ: " },
    om: { appName:"Tqure / ጥቁሬ", inventory:"Qabeenya", pos:"Gurgurtaa", barcode:"Barcode", product:"Product", price:"Gatii", quantity:"Baay'ina", actions:"Dalagaa", addProduct:"Product ida'i", addToCart:"Galchii gara cart", checkout:"Checkout", total:"Waliigala", totalAmount:"Waliigala: " }
};
function setLanguage(lang){ document.querySelectorAll("[data-lang]").forEach(el=>{ const key=el.getAttribute("data-lang"); if(languages[lang][key]) el.textContent=languages[lang][key]; }); }
