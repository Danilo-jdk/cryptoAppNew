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
                            <TouchableOpacity style={[styled.button, styled.btnConfirm]} onPress={onConfirm}>
                                <Text style={styled.textStyle}>Elimina</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
        </Modal>
    );
}

const styled = StyleSheet.create({

});

export default ConfirmModal;
