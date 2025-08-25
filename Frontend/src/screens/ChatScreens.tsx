import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchChatHistory, sendChatMessage } from '../api/auth';
import { clearToken, getToken } from '../store/token';

interface Message {
  role: 'user' | 'bot';
  message: string;
  created_at: string;
  isTyping?: boolean;
}

export default function ChatScreen() {
  const [token, setToken] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const qc = useQueryClient();
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation();

  useEffect(() => {
    getToken().then((t) => setToken(t));
  }, []);

    const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
        { text: 'Cancel', style: 'cancel' },
        {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
            await clearToken();
            setToken(null);

            navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }], // 👈 go back to Login screen
            });
        },
        },
    ]);
    };


  const historyQuery = useQuery<Message[]>({
    queryKey: ['chatHistory'],
    queryFn: async () => {
      const res = await fetchChatHistory(token!);
      return res.data.history;
    },
    enabled: !!token,
    refetchInterval: 2000,
  });

  const mutation = useMutation({
    mutationFn: (msg: string) => {
      setIsBotTyping(true);
      return sendChatMessage({ message: msg }, token!);
    },
    onSuccess: () => {
      setMessage('');
      qc.invalidateQueries({ queryKey: ['chatHistory'] });
    },
    onSettled: () => {
      setIsBotTyping(false);
    },
  });

  const chatData: Message[] = [
    ...(historyQuery.data ?? []),
    ...(isBotTyping
      ? [
          {
            role: 'bot',
            message: 'Typing...',
            created_at: new Date().toISOString(),
            isTyping: true,
          } as Message,
        ]
      : []),
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: 'https://img.freepik.com/free-vector/ai-technology-robot-cyborg-illustrations_24640-134419.jpg?semt=ais_hybrid&w=740&q=80',
          }}
          style={styles.avatar}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>AI Assistant</Text>
          <Text style={styles.active}>Online</Text>
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Chat Messages */}
      <FlatList
        ref={flatListRef}
        data={chatData}
        keyExtractor={(_, idx) => idx.toString()}
        contentContainerStyle={styles.messagesContainer}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
        renderItem={({ item }) => {
          const isUser = item.role === 'user';
          return (
            <View
              style={[
                styles.messageWrapper,
                isUser ? styles.messageRight : styles.messageLeft,
              ]}
            >
              {!isUser && (
                <Image
                  source={{
                    uri: 'https://img.freepik.com/free-vector/ai-technology-robot-cyborg-illustrations_24640-134419.jpg?semt=ais_hybrid&w=740&q=80',
                  }}
                  style={styles.bubbleAvatar}
                />
              )}
              <View
                style={[
                  styles.bubble,
                  isUser ? styles.userBubble : styles.botBubble,
                ]}
              >
                <Text style={styles.messageText}>
                  {item.isTyping ? 'Typing...' : item.message}
                </Text>
              </View>
            </View>
          );
        }}
      />

      {/* Input Bar */}
      <View style={styles.inputBar}>
        <TextInput
          style={styles.textInput}
          placeholder="Type your message..."
          placeholderTextColor="#999"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => mutation.mutate(message)}
          disabled={!message.trim()}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: '#FF6600',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  active: {
    color: '#fff',
    fontSize: 12,
    marginTop: 2,
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 12,
  },

  messagesContainer: {
    padding: 16,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 6,
    maxWidth: '80%',
  },
  messageLeft: {
    alignSelf: 'flex-start',
  },
  messageRight: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  bubbleAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
  },
  bubble: {
    padding: 12,
    borderRadius: 12,
  },
  botBubble: {
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: 0,
  },
  userBubble: {
    backgroundColor: '#FF6600',
    borderTopRightRadius: 0,
  },
  messageText: {
    fontSize: 15,
    color: '#000',
  },

  inputBar: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#FF6600',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
    fontSize: 15,
    marginRight: 10,
    color: '#000',
  },
  sendButton: {
    backgroundColor: '#FF6600',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});
