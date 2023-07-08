import React, { useState, useEffect } from 'react'




function App(){

    const [valorReal, setValorReal] = useState('')
    const [tipoMoeda, setTipoMoeda] = useState('')

    const [dadoConversao, setDadoConversao] = useState('')
    const [conversao, setConversao] = useState()


    function pegarValorReal(txt){

        setValorReal(txt.target.value)

    }


    function limpar(){
        setValorReal('')
    }

    
    function pegarTipoMoeda(txt){

        setTipoMoeda(txt.target.value)

    }


    useEffect(() => {

        if (valorReal !== '' && tipoMoeda !== '') {
          fetch(`https://api.frankfurter.app/latest?from=BRL&to=${tipoMoeda}`)
            .then((response) => response.json())
            .then((data) => {
              setDadoConversao(data.rates[tipoMoeda])
            })
        }

      }, [valorReal, tipoMoeda])

    

      useEffect(() => {

        if (valorReal !== '' && dadoConversao !== '') {

          const valorFormatado = (valorReal * dadoConversao).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })

          setConversao(valorFormatado)
        }

      }, [valorReal, dadoConversao])



    return(

        <div id="container">

        <div id="tituloEsubtitulo">

            <p>CONVERTOR DE MOEDAS</p>

            <p>Digite um valor em reais, escolha a moeda que quer fazer a conversão, e clique no botçao "Converter"!</p>

        </div>

        <div id="inputNum">

            <form>

                <input type="number" class="input" onChange={ pegarValorReal } value={ valorReal } />

            </form>

            <button class="botao" onClick={ limpar }>Limpar</button>

        </div>


        <div id="radios">

            <div><input type="radio" name="moeda" id="moeda1" value="USD" onChange={ pegarTipoMoeda } />
            <label for="moeda1">Dólar americano</label></div><br />

            <div><input type="radio" name="moeda" id="moeda2" value="CAD" onChange={ pegarTipoMoeda } />
            <label for="moeda2">Dólar canadense</label></div><br />

            <div><input type="radio" name="moeda" id="moeda3" value="AUD" onChange={ pegarTipoMoeda } />
            <label for="moeda3">Dólar australiano</label></div><br />

            <div><input type="radio" name="moeda" id="moeda4" value="EUR" onChange={ pegarTipoMoeda } />
            <label for="moeda4">Euro</label></div><br />

            <div><input type="radio" name="moeda" id="moeda5" value="JPY" onChange={ pegarTipoMoeda } />
            <label for="moeda5">Iene </label></div><br /> 

            <div><input type="radio" name="moeda" id="moeda6" value="CNY" onChange={ pegarTipoMoeda } />
            <label for="moeda6">Renminbi </label></div><br />
            
        </div>


        <div id="botoesEresultado">

            <form>

                <input type="text" placeholder="Resultado" class="input" readOnly  value={conversao} />

            </form>
            
        </div>

    </div>
    
    )

}


export default App