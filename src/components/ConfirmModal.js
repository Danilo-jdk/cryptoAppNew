import React from "react";
import { Modal, Text, View, TouchableOpacity, StyleSheet } from "react-native";

const ConfirmModal = ({ isVisible, onConfirm, onCancel, item }) => {
    return (
        <Modal 
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onCancel}
            >
                <View style={styled.centeredView}>
                    <View style={styled.modalView}>
                        <Text style={styled.modalText}>
                            Sei sicuro di voler eliminare {item}?
                        </Text>
                        <View style={styled.btnContainer}>
                            <TouchableOpacity style={[styled.button, styled.btnCancella]} onPress={onCancel}>
                                <Text style={styled.textStyle}>Annulla</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styled.button, styled.btnConfirm]} onPress={() => onConfirm(item)}>
                                <Text style={styled.textStyle}>Elimina</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
        </Modal>
    );
}

const styled = StyleSheet.create({
    centeredView: {
        backgroundColor: 'black',
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center'
    },
    modalView: {
        backgroundColor: 'white',
        width: '70%',
        margin: 'auto',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        paddingVertical: 20
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20
    },
    button: {

        width: 100,
        alignItems: 'center',
        height:40,
        justifyContent: 'center',
        borderRadius: 10,
        marginHorizontal:5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation:5
    },
    btnCancella: {
        backgroundColor: 'grey',
        
    },
    btnConfirm: {
        backgroundColor: 'orange',
    },
    textStyle: {
        color: 'white',
        fontWeight: '800'
    }

});

export default ConfirmModal;
