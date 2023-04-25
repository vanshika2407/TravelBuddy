import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { collection, doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from '../../firebaseConfig';

const Messaging = (props) => {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const communityRef = collection(db, "Community");

    const sendMessage = async () => {
        let docData, messageData;
        await getDoc(doc(communityRef, "Comedy fest")).then((doc) => {
            docData = doc.data();
            if ("messages" in doc.data()) {   
                messageData = doc.data().messages;
            }
        });
        // console.log(messageData)
        setText('')
        if (messageData) {
            await setDoc(doc(communityRef, "Comedy fest"), {
                ...docData,
                messages: [...messageData, { message: text, sender: props.username }]
            });
        }
        
        else {
            await setDoc(doc(communityRef, "Comedy fest"), {
                ...docData,
                messages: [{ message: text, sender: props.username }]
            });
        }
       


    };

    useEffect(() => {
        if (db) {
            onSnapshot(doc(communityRef, "Comedy fest"), (doc) => {
                const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
                if ("messages" in doc.data()) {
                    const messageData = doc.data().messages;
                    setMessages([...messageData]);
                }
                else {
                    setMessages([]);
                }

            });
        }
    }, [db]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ backgroundColor: 'white', width: '100%', height: '10%' }}></View>
            <FlatList
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={{ alignSelf: item.sender === props.username ? 'flex-end' : 'flex-start' }}>
                        <Text style={{ backgroundColor: item.sender === props.username ? '#007aff' : 'grey', color: '#fff', padding: 10, margin: 10, borderRadius: 10 }}>
                            {`${item.sender === props.username ? "" : `${item.sender} :`} ${item.message}`}
                        </Text>
                    </View>
                )}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                <TextInput
                    value={text}
                    onChangeText={setText}
                    placeholder="Type a message..."
                    style={{ flex: 1, marginRight: 10, padding: 10, backgroundColor: '#fff', borderRadius: 10 }}
                />
                <TouchableOpacity onPress={sendMessage} style={{ backgroundColor: '#007aff', padding: 10, borderRadius: 10 }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Send</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Messaging;