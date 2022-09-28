import { StyleSheet } from "react-native";
import {  fonts, colors } from "../../configs";

export const styles = StyleSheet.create({
    rootContainer: {
      marginHorizontal: 10,
      height:"100%"
    },
    parentContainer: {
        marginTop: 5,
        flexDirection: "row",
        justifyContent:"center"
    },
    childContainer: {
        marginVertical:2,
        margin: 10,
        width: "30%",
        justifyContent: "space-between",
        alignItems: "center"
    },
    inputBox: {
        width: "80%",
        height: 40,
        borderWidth: 1,
        borderColor: colors.black,
        borderRadius: 10,
        padding: 10
    },
    imgBtn: {
        height: 25,
        width: 25,
        margin: 10,
        paddingVertical: 10
    }
});