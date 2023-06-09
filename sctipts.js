const bitcoin = 138640.1

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

const convetValue = async () => {
    //console.log(inputReais.value); //saida:R$ 1.000,00
    const realValueText = document.getElementById('real-value-text')
    const currencyValueText = document.getElementById('currency-value-text')
    const inputNumericValue = parseFloat(inputReais.value.replace(/\./g, '').replace(/,/g, '.').replace(/[^\d.-]/g, ''));
    //console.log(inputNumericValue); //saida: 1000.00
    
    //CONSUMIR API PARA A CONVERÇÃO SER VALORES DINAMICOS ATUALIZADOS
    const data = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL').then(response => response.json())
    //console.log(data)
    const dolar = data.USDBRL.high
    const euro = data.EURBRL.high
    
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
inputReais.addEventListener('keyup', convetValue);
select.addEventListener('change', changerCurrency);