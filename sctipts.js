const dolar = 5.2
const euro = 5.9 
const button = document.getElementById('convert-button')
const select = document.getElementById('currency-select')

const convetValue = () => {
    const inputReais = document.getElementById('input-real').value
    const realValueText = document.getElementById('real-value-text')
    const currencyValueText = document.getElementById('currency-value-text')
    //formataçaõ de moeda reais
    realValueText.innerHTML = new Intl.NumberFormat('pt-BR', { 
        style: 'currency',
        currency: 'BRL',
    }).format(inputReais);
    if(select.value === 'US$ Dólar americano'){
        //formataçaõ de moeda dolar
        currencyValueText.innerHTML = new Intl.NumberFormat('en-SU', { 
            style: 'currency',
            currency: 'USD',
        }).format(inputReais / dolar);
    }
    if(select.value === '€ Euro'){
        //formataçaõ de moeda euro
        currencyValueText.innerHTML = new Intl.NumberFormat('de-DE', { 
            style: 'currency',
            currency: 'EUR',
        }).format(inputReais / euro);
    }
};



const changerCurrency = () =>{
    const currencyName = document.getElementById('currency-name')
    const currencyImg = document.getElementById('currency-img')
    console.log(select.value)

    if(select.value === '€ Euro'){
        currencyName.innerHTML = "Euro"
        currencyImg.src = "./assets/euro.png"
    }
    if(select.value === 'US$ Dólar americano'){
        currencyName.innerHTML = "Dolar"
        currencyImg.src = "./assets/eua.png"
    }
    convetValue();
}

button.addEventListener('click', convetValue);
select.addEventListener('change', changerCurrency);