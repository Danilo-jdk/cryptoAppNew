import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, TextInput, Button, ScrollView, TouchableOpacity } from "react-native";
import { GlobalStyles } from "../../GlobalStyle";
import { Picker } from "@react-native-picker/picker";
import { useCrypto } from "../../Context/CryptoContext";
import { Ionicons } from "@expo/vector-icons";

import ConfirmModal from "../../components/ConfirmModal";

export default function Portfolio() {
    const { cryptos, getCryptos, portfolio, setPortfolio, salvaPortfolio, rimuoviPortfolio  } = useCrypto();

    const [valoriSelect, setValoriSelect] = useState([]);

    const [quantita, setQuantita] = useState('');
    const [ selectedCrypto, setSelectedCrypto] = useState('');

    const [isButtonEnabled, setIsButtonEnabled] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const showModal = (item) => {
      setItemToDelete(item);
      setModalVisible(true);
    }

    const confirmDelete = (item) => {
      setModalVisible(false);
      removeCrypto(item);
    }

    function filtraCrypto() {
        const cryptoFiltrate = cryptos.map((moneta) => moneta.symbol);
        setValoriSelect(cryptoFiltrate);
    }

    function aggiungiAlPortfolio(){
        const indiceEsistente = portfolio.findIndex( moneta => moneta.crypto === selectedCrypto);

        if (indiceEsistente >= 0) {
            // la crypto esiste già nel portfolio, dobbiamo aggiornare la qtà
                const nuovoPortfolio = portfolio.map((item, index) => {
                    if (index === indiceEsistente) {
                        return {
                            ...item,
                            quantita: (parseFloat(item.quantita.replace(',', '.')) + parseFloat(quantita.replace(',', '.'))).toString().replace('.',',')
                        }
                    }

                    return item;
                });

                salvaPortfolio(nuovoPortfolio);
        } else {
            // la crytpo non c'è nel portfolio10
            salvaPortfolio([...portfolio, { crypto: selectedCrypto, quantita}]);
        }
        // resetto 
        setSelectedCrypto('');
        setQuantita('');
    }

    function removeCrypto(crypto) {
      // console.log('dentro remove', crypto)
      const indiceEsistente = portfolio.findIndex(moneta => moneta.crypto === crypto);

      let portfolioAggiornato = [...portfolio];
      portfolioAggiornato.splice(indiceEsistente, 1);
    
      setPortfolio(portfolioAggiornato);
      salvaPortfolio(portfolioAggiornato);
    }

    useEffect(() => {
        getCryptos;
        if(cryptos.length){
            filtraCrypto();
        }
    }, [cryptos, getCryptos]);

    useEffect(() => {
        setIsButtonEnabled(quantita.length > 0 && selectedCrypto !== '');
    }, [quantita, selectedCrypto])

    return (
        <>
        <View style={[styled.container, styled.bordo]}>
        <View style={styled.contenitorePortfolio}>
          <View style={styled.contenitorePortfolioTitolo}>
            <Ionicons name={"wallet-outline"} size={50} color={"white"} />
            <Text style={[styled.testoGrande, styled.testoBianco]}>
              Portfolio
            </Text>
          </View>

          <ScrollView>
            {portfolio.map((moneta, index) => (
              <View key={index} style={styled.containerMonetaPortfolio}>
                <Text style={[styled.testoMedioGrande, styled.testoBianco]}>
                  {moneta.quantita} {moneta.crypto}
                </Text>
                    <TouchableOpacity style={styled.containerMonetaPortfolio.btnTrash} onPress={() => showModal(moneta.crypto)}>
                        <Ionicons name={"trash-outline"} size={30} color={"white"} />
                    </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
      <View style={[styled.contenitoreInsert, styled.bordo]}>
        <Text style={[styled.testoBianco, { fontWeight: "700" }]}>Qtà:</Text>
        <TextInput
          style={[styled.input]}
          keyboardType="numeric"
          value={quantita}
          onChangeText={(text) => {
            // Consenti solo numeri (e, opzionalmente, un punto per i decimali)
            const filteredText = text.replace(/[^0-9.]/g, "");
            setQuantita(filteredText);
          }}
        />
        {/* <View style={styled.pickerContainer}> */}
            <Picker
            selectedValue={selectedCrypto}
            onValueChange={(itemValue, itemIndex) => setSelectedCrypto(itemValue)}
            // style={styled.picker}
            mode="dropdown"
            >
            <Picker.Item label="Seleziona crypto" value="" color="black" />
            {valoriSelect.map((crypto) => (
                <Picker.Item key={crypto} label={crypto} value={crypto} color="black" />
            ))}
            </Picker>
        {/* </View> */}
        <TouchableOpacity
          onPress={aggiungiAlPortfolio}
          style={[styled.btn, {opacity: isButtonEnabled ? 1 : 0.3}]}
          disabled={!isButtonEnabled}
        >
          <Text style={styled.btn.testo}>Aggiungi Crypto</Text>
        </TouchableOpacity>
        <View>
        <TouchableOpacity onPress={rimuoviPortfolio} style={styled.btnDelete}>
          <Text style={styled.btn.testo}>Svuota portfolio</Text>
        </TouchableOpacity>
      </View>
      </View>

        <ConfirmModal 
          isVisible={modalVisible}
          onConfirm={confirmDelete}
          onCancel={() => setModalVisible(false)}
          item={itemToDelete}
        />
      </>
    )
}

const styled = StyleSheet.create({
    container: {
        backgroundColor: "#1D2A3D",
        color: "#ffff",
        flex: 1
      },
      contenitorePortfolio: {
        padding: 0,
        backgroundColor: "#1D2A3D",
        width: "100%",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 10,
      },
      contenitorePortfolioTitolo: {
        paddingHorizontal: 50,
        paddingTop:10,
        backgroundColor: "#264775",
        width: "100%",
        justifyContent: "space-evenly",
        flexDirection: "row",
        alignItems: "flex-start",
        height: 70,
        marginBottom: 5,
      },
      contenitoreInsert: {
        flex: 1.5,
        backgroundColor: "#1D2A3D",
        padding: 10,
        paddingHorizontal:20,
        justifyContent: "center",
      },
      containerMonetaPortfolio: {
        flexDirection: "row",
        marginBottom: 5,
        justifyContent: "space-between",
    
        btnTrash: {
          marginLeft: 20,
        },
      },
      testoBianco: {
        color: "white",
        marginRight: 10,
      },
      testoGrigio: {
        color: "grey",
        marginRight: 10,
        fontWeight: "500",
      },
      testoPiccolo: {
        fontSize: 13,
        fontWeight: "700",
      },
      testoMedio: {
        fontSize: 16,
        fontWeight: "700",
        marginTop: 10,
      },
      testoMedioGrande: {
        fontSize: 19,
        fontWeight: "700",
        marginTop: 2,
      },
      testoGrande: {
        marginTop: 3,
        fontSize: 23,
        fontWeight: "600",
      },
      testoVerde: {
        color: "green",
      },
      testoRosso: {
        color: "red",
      },
      bordo: {
        borderColor: "red",
        borderWidth: 0,
      },
      input: {
        color: "#fff",
        fontSize: 20,
        backgroundColor: "#0F141E",
        paddingHorizontal: 5,
        marginBottom: 10,
        height:50
      },
      pickerContainer: {
        height: 85, // Imposta l'altezza desiderata qui
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom:20
      },
      picker: {
        position: 'relative',
        top: -80,
        color: 'white', // Imposta il colore del testo del Picker
      },
      inputPicker: {
        color: "#fff",
        fontSize: 20,
        backgroundColor: "#0F141E",
        paddingHorizontal: 5,
        marginBottom: 10,
      },
      btn: {
        backgroundColor: "#F7A619",
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
    
        testo: {
          color: "#fff",
          fontSize: 15,
          fontWeight: "bold",
        },
      },
      btnDelete: {
        marginTop: 20,
        backgroundColor: "#8E5D16",
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
    
        testo: {
          color: "#fff",
          fontSize: 15,
          fontWeight: "bold",
        },
      },
    });
    