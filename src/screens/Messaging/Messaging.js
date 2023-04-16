import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList,SafeAreaView } from 'react-native';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  const sendMessage = () => {
    setMessages([...messages, { text, sender: 'me' }]);
    setText('');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={{backgroundColor:'white',width:'100%',height:'10%'} }></View>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ alignSelf: item.sender === 'me' ? 'flex-end' : 'flex-start' }}>
            <Text style={{ backgroundColor: item.sender === 'me' ? '#007aff' : 'grey', color: '#fff', padding: 10, margin: 10, borderRadius: 10 }}>
              {item.text}
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

export default ChatScreen;
