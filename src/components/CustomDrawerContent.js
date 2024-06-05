import React from "react";
import { Text } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";

export default function CustomDrawerContent (props) {
    return (
        <DrawerContentScrollView {...props} style={{ backgroundColor: '#101826'}}>
            <Text style={{fontSize: 20, fontWeight: '700', color: 'yellow'}}>
                CRYPTO APP
            </Text>
            <DrawerItemList {...props}/>
        </DrawerContentScrollView>
    )
}