import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import { AppDispatch } from '@/store/store';
import { setUser, setToken } from '@/store/authSlice';

const AuthScreen: React.FC = ({ navigation }: any) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Ошибка', 'Заполните все обязательные поля');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      Alert.alert('Ошибка', 'Пароли не совпадают');
      return;
    }

    try {
      const mockUser = {
        id: Date.now().toString(),
        email,
        name: isLogin ? email.split('@')[0] : name || 'Пользователь',
        registeredEvents: [],
        favoriteEvents: [],
        notificationsEnabled: true,
      };

      const mockToken = `mock-jwt-token-${Date.now()}`;

      dispatch(setUser(mockUser));
      dispatch(setToken(mockToken));

      Alert.alert(
        'Успешно',
        isLogin ? 'Вы вошли в систему' : 'Регистрация завершена',
        [{ 
          text: 'OK', 
          onPress: () => {
            // ✅ ПРАВИЛЬНО: переходим на Main, а не на Home
            navigation.replace('Main');
          } 
        }]
      );
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось выполнить вход');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <MaterialIcons name="event" size={60} color="#4A6FA5" />
          <Text style={styles.title}>События Гродно</Text>
          <Text style={styles.subtitle}>
            {isLogin ? 'Войдите в аккаунт' : 'Создайте аккаунт'}
          </Text>
        </View>

        <View style={styles.form}>
          {!isLogin && (
            <View style={styles.inputContainer}>
              <MaterialIcons name="person" size={20} color="#666" />
              <TextInput
                style={styles.input}
                placeholder="Имя"
                value={name}
                onChangeText={setName}
              />
            </View>
          )}

          <View style={styles.inputContainer}>
            <MaterialIcons name="email" size={20} color="#666" />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialIcons name="lock" size={20} color="#666" />
            <TextInput
              style={styles.input}
              placeholder="Пароль"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <MaterialIcons 
                name={showPassword ? 'visibility' : 'visibility-off'} 
                size={20} 
                color="#666" 
              />
            </TouchableOpacity>
          </View>

          {!isLogin && (
            <View style={styles.inputContainer}>
              <MaterialIcons name="lock" size={20} color="#666" />
              <TextInput
                style={styles.input}
                placeholder="Подтвердите пароль"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showPassword}
              />
            </View>
          )}

          <TouchableOpacity style={styles.authButton} onPress={handleAuth}>
            <Text style={styles.authButtonText}>
              {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.switchButton}
            onPress={() => setIsLogin(!isLogin)}
          >
            <Text style={styles.switchText}>
              {isLogin
                ? 'Нет аккаунта? Зарегистрироваться'
                : 'Уже есть аккаунт? Войти'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  authButton: {
    backgroundColor: '#4A6FA5',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  authButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  switchButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  switchText: {
    color: '#4A6FA5',
    fontSize: 16,
  },
});

export default AuthScreen;