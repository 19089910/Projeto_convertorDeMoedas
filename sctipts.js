const dolar = 5.2
const euro = 5.9 
const bitcoin = 138640.1
const button = document.getElementById('convert-button')
const select = document.getElementById('currency-select')
const inputReais = document.getElementById('input-real')
//responsavel pela formatação da caixa input: formato de saida e R$ 0.000,00
const formatNumberToCurrency = (number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(number);
  };
  const updateInputValue = () => {
    const inputValue = Number(inputReais.value.replace(/\D/g, '')) / 100;
    inputReais.value = formatNumberToCurrency(inputValue);
  };
  const handleInputBlur = () => {
    const inputValue = Number(inputReais.value.replace(/\D/g, '')) / 100;
    inputReais.value = formatNumberToCurrency(inputValue);
  };


updateInputValue(); // formata o valor padrão ao carregar a página

const convetValue = () => {
    //console.log(inputReais.value)
    const realValueText = document.getElementById('real-value-text')
    const currencyValueText = document.getElementById('currency-value-text')
    //converte a string para um número, trocando vírgula por ponto, e retirando todos os caracter
    //const inputNumericValue = parseFloat(inputReais.value.replace(',', '.'));
    //const inputNumericValue = parseFloat(inputReais.value.replace(/[^0-9-]+/g,"").replace(",", "."));
    //const inputNumericValue = parseFloat(inputReais.value.replace(/,/g, ".").replace(/[^\d.-]/g, ''));
    const inputNumericValue = parseFloat(inputReais.value.replace(/\./g, '').replace(/,/g, '.').replace(/[^\d.-]/g, ''));
    //console.log(inputNumericValue);

    //formataçaõ de moeda reais
    realValueText.innerHTML = new Intl.NumberFormat('pt-BR', { 
        style: 'currency',
        currency: 'BRL',
    }).format(inputNumericValue);
    if(select.value === 'US$ Dólar americano'){
        //formataçaõ de moeda dolar
        currencyValueText.innerHTML = new Intl.NumberFormat('en-SU', { 
            style: 'currency',
            currency: 'USD',
        }).format(inputNumericValue / dolar);
    }
    if(select.value === '€ Euro'){
        //formataçaõ de moeda euro
        currencyValueText.innerHTML = new Intl.NumberFormat('de-DE', { 
            style: 'currency',
            currency: 'EUR',
        }).format(inputNumericValue / euro);
    }
    if(select.value == 'Bitcoin'){
        currencyValueText.innerHTML = new Intl.NumberFormat('en-US', { 
            style: 'currency',
            currency: 'BTC',
        }).format(inputNumericValue / bitcoin);
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
    if(select.value === 'Bitcoin'){
        currencyName.innerHTML = "Bitcoin"
        currencyImg.src = "./assets/bitcoin.png"
    }
    convetValue();//corrige no evento change
}
//eventos de ciclo de vida do input:
inputReais.addEventListener('input', updateInputValue);
inputReais.addEventListener('blur', handleInputBlur);
//eventos de clicks:
button.addEventListener('click', convetValue);
select.addEventListener('change', changerCurrency);