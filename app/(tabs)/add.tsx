import { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"

type Book = {
    id: string,
    name: string,
    price: string
}

export default function Add() {
    const [bookName, setBookName] = useState("")
    const [bookPrice, setBookPrice] = useState("")
    const [allBook, setAllBook] = useState<Book[]>([])
    const [bookImge, setBookImage] = useState("")

    useEffect(() => {
        loadBook()
    }, [allBook])

    async function loadBook() {
        const data = await AsyncStorage.getItem("book")
        if (data !== null) {
            setAllBook(JSON.parse(data))
        }
    }

    async function addBook() {
        const book = {
            id: Date.now().toString(),
            name: bookName,
            price: bookPrice,
            image: bookImge
        }

        console.log(book)

        const newBook = [...allBook, book]
        await AsyncStorage.setItem("book", JSON.stringify(newBook))
        setAllBook(newBook)

        setBookName("")
        setBookPrice("")
        setBookImage("")
    }

    return (
        <View style={myStyle.container}>
            <Text style={myStyle.label1}>เพิ่มเพลง</Text>

            <Text style={myStyle.label}>ชื่อเพลง</Text>
            <TextInput
                value={bookName}
                onChangeText={setBookName}
                style={myStyle.input} />

            <Text style={myStyle.label}>ชื่อศิลปิน</Text>
            <TextInput
                value={bookPrice}
                onChangeText={setBookPrice}
                style={myStyle.input} />

            <Text style={myStyle.label}>รูป</Text>
            <TextInput
                value={bookImge}
                onChangeText={setBookImage}
                style={myStyle.input} />

            <View style={myStyle.buttonContainer}>
                <Button title="บันทึก" onPress={addBook} color="#4CAF50" />
            </View>
        </View>

    )
}

const myStyle = StyleSheet.create({
    label1: {
        fontSize: 30,
        marginBottom: 4,
        color: '#333',
        fontWeight: '600',
        textAlign: "center"
    },
    label: {
        fontSize: 17,
        marginBottom: 4,
        color: '#333',
        fontWeight: '600',
    },
    input: {
        height: 45,
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 10,
        backgroundColor: '#FFF',

    },
    buttonContainer: {
        marginTop: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },

    container: {
        flex: 1,
        backgroundColor: "#FBEFEF",
        padding: 20,

    },
})