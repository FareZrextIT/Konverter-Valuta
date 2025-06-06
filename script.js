const BASE_URL=" https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns){
    for(currency in countryList){
        
        let newOption = document.createElement("option");
        newOption.innerText = currency;
        newOption.value = currency;

        if (select.name === "from" && currency === "BAM"){
            newOption.selected = "selected";
        } else if (select.name === "to" && currency === "EUR"){
            newOption.selected = "selected";

        }
        select.append(newOption);


    }
    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    });
}

const updateExchangeRate = async () =>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1 ){
        amtVal = 1;
        amount.value="1";

    }
    const URL =`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

};

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    let.src = newSrc;

};

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", ()=>{
    updateExchangeRate();


});

// ovo je komentar!!!!!!!
