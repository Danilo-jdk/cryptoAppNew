import React, {createContext, useContext, useState, useEffect} from "react";
import CryptoApi from "../Api/CryptoApi";
import AsyncStorage from '@react-native-async-storage/async-storage';

const CryptoContext = createContext();

export const useCrypto = () => useContext(CryptoContext);

export const CryptoProvider = ({ children }) => {
    const [cryptos, setCryptos] = useState([]);
    const [portfolio, setPortfolio ] = useState([]);

    const caricaPortfolioSalvato = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('portfolio');
        if (jsonValue !== null) {
          setPortfolio(JSON.parse(jsonValue))
        }
      } catch (error) {
        console.error("Errore nel caricamento del portfolio ", error)
      }
    }

    const salvaPortfolio = async (nuovoPortfolio) => {
      setPortfolio(nuovoPortfolio);

      try {
        const jsonValue = JSON.stringify(nuovoPortfolio);
        await AsyncStorage.setItem('portfolio', jsonValue);
      } catch (error) {
        console.error("Errore nel salvataggio del portfolio ", error)
      }
    }

    const rimuoviPortfolio = async () => {
      setPortfolio([]);

      try {
        await AsyncStorage.removeItem('portfolio');
      } catch (error) {
        console.error("errore nella rimozione del portfolio ", error)
      }
    }

  async function getCryptos() {
    try {
      const response = await CryptoApi.getCrypto();
      if (response) {
        setCryptos(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    caricaPortfolioSalvato()
  }, []);

  return (
    <CryptoContext.Provider value={{ cryptos, getCryptos, portfolio, setPortfolio, salvaPortfolio, rimuoviPortfolio }}>
        {children}
    </CryptoContext.Provider>
  )
}