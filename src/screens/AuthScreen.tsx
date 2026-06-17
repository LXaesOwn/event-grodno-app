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
  ActivityIndicator,
} from 'react-native';

import { useDispatch } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';

import { AppDispatch } from '@/store/store';
import { setUser, setToken } from '@/store/authSlice';
import {
  loginUser,
  registerUser,
} from '@/services/authService';

const AuthScreen: React.FC = ({ navigation }: any) => {
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Ошибка', 'Заполните email и пароль');
      return;
    }

    if (!isLogin && !name) {
      Alert.alert('Ошибка', 'Введите имя пользователя');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      Alert.alert('Ошибка', 'Пароли не совпадают');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Ошибка', 'Пароль должен быть не менее 6 символов');
      return;
    }

    try {
      setIsLoading(true);

      const user = isLogin
        ? await loginUser(email, password)
        : await registerUser(email, password, name);

      dispatch(setUser(user));
      dispatch(setToken('firebase-auth'));

      navigation.replace('Main');

      if (Platform.OS !== 'web') {
        Alert.alert(
          'Успешно',
          isLogin ? 'Вы вошли в систему' : 'Регистрация завершена'
        );
      }
    } catch (error: any) {
      console.log(error);

      let message = 'Не удалось выполнить действие';

      if (error.code === 'auth/email-already-in-use') {
        message = 'Пользователь с таким email уже существует';
      }

      if (error.code === 'auth/invalid-email') {
        message = 'Некорректный email';
      }

      if (error.code === 'auth/user-not-found') {
        message = 'Пользователь не найден';
      }

      if (error.code === 'auth/wrong-password') {
        message = 'Неверный пароль';
      }

      if (error.code === 'auth/invalid-credential') {
        message = 'Неверный email или пароль';
      }

      if (error.code === 'auth/weak-password') {
        message = 'Слишком слабый пароль';
      }

      Alert.alert('Ошибка', message);
    } finally {
      setIsLoading(false);
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

          <TouchableOpacity
            style={styles.authButton}
            onPress={handleAuth}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.authButtonText}>
                {isLogin ? 'Войти' : 'Зарегистрироваться'}
              </Text>
            )}
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