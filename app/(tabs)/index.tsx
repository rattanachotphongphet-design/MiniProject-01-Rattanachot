import { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"

type Book = {
    id: string,
    name: string,
    price: string,
    image: string
}

export default function Home() {

    const [allBook, setAllBook] = useState<Book[]>([])


    useEffect(() => {
        loadBook()
    }, [allBook])

    async function loadBook() {
        const data = await AsyncStorage.getItem("book")
        if (data !== null) {
            setAllBook(JSON.parse(data))
        }
    }
    async function removeBook(id: string) {
        const newBook = allBook.filter((_, i) => _.id != id)
        await AsyncStorage.setItem("book", JSON.stringify(newBook))
        setAllBook(newBook)
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={allBook}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.text}>รหัส : {item.id}</Text>
                        <Text style={styles.title}>ชื่อเพลง : {item.name}</Text>
                        <Text style={styles.price}>ชื่อศิลปิน : {item.price}</Text>
                        <Image
                            source={{ uri: item.image }}
                            style={styles.bookImge}
                        />
                    </View>
                )}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FBEFEF",
        padding: 10,
    },
    card: {
        backgroundColor: "#F9DFDF",
        padding: 15,
        borderRadius: 10,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    text: {
        fontSize: 16,
        color: "#555",
        marginBottom: 4,
        fontWeight: "bold",
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#213448",
        marginBottom: 6,
    },
    price: {
        fontSize: 16,
        color: "#547792",
        marginBottom: 10,
        fontWeight: "bold",
    },
    bookImge: {
        width: "100%",
        height: 200,
        marginTop: 10,
        borderRadius: 8,
        alignSelf: "center"

    },
});
