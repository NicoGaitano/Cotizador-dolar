import React, { useState, useEffect } from "react";
import "./App.css"
function App() {
  const [inputValor, setInputValor] = useState(0);
  const [div, setDiv] = useState(0);
  const [multi, setMulti] = useState(0);
  const [compra, setCompra] = useState(0);
  const [venta, setVenta] = useState(0);
  const [actualizado, setActualizado] = useState("");

  useEffect(() => {
    fetch("https://api.bluelytics.com.ar/v2/latest")
      .then((response) => response.json())
      .then((data) => {
        setCompra(data.blue.value_buy);
        setVenta(data.blue.value_sell);
        let actualizacionValor = data.last_update;
        let fechaHora = actualizacionValor.split("", 19);
        setActualizado(fechaHora);
      });
  }, []);

  const handleInputChange = (e) => {
    const inputNumero = Number(e.target.value);
    const divResultado = inputNumero / venta;
    const divisionFormato = new Intl.NumberFormat().format(
      divResultado.toFixed(2),
    );
    const multiResultado = inputNumero * compra;
    const multiplicacionFormato = new Intl.NumberFormat().format(
      multiResultado,
    );
    setDiv(divisionFormato);
    setMulti(multiplicacionFormato);
    setInputValor(inputNumero);
  };
  return (
    <>
      <h1 className="titulo_contenedor">COTISAZION DEL DÓLAR BLUE</h1>
      <h2 className="titulo_contenedor">
        ¿Qué es y cuánto está el Dólar Blue hoy?
      </h2>
      <p className="parrafo_contenedor">
        El Dólar Blue (también conocido como Dólar Paralelo o Dólar Informal) es
        la moneda Estadounidense del mercado Argentino. En este sitio podras
        encontrar el precio de la cotización del Dólar Blue en Argentina
        actualizado al día de hoy. Utiliza el conversor online para convertir
        rápidamente de pesos a dólares blue y viceversa, el mismo utiliza el
        precio del dólar paralelo actualizado al dia de hoy.
      </p>
      <div className="contenedor_compra_venta">
        <h2 className="titulo_dolar">DÓLAR BLUE</h2>
        <div>
          <p className="contenedor_texto">compra: {compra}</p>
          <p className="contenedor_texto">venta: {venta}</p>
          <hr></hr>
          <h3 className="texto_conversor">Conversor Online</h3>
          <p className="texto_convertir">ingrese un monto a convertir</p>
          <input
            type="number"
            onChange={handleInputChange}
            className="contenedor_input"
          />
          <p className="texto_cotizador">
            ARS {inputValor} =
            <strong className="texto_cotizador_valor">USD {div}</strong>
            (compra)
          </p>
          <p className="texto_cotizador">
            USD {inputValor} = 
            <strong className="texto_cotizador_valor">ARS {multi}</strong>
            (venta)
          </p>
          <strong className="Actualizacion">
            Actualizacion : {actualizado}
          </strong>
        </div>
      </div>
    </>
  );
}

export default App;
