import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, ActivityIndicator, Image } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const Register = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false); 

    const auth = getAuth();

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
            return;
        }

        setLoading(true); 
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            Alert.alert('Registro exitoso', 'Usuario registrado correctamente', [
                { text: 'OK', onPress: () => navigation.navigate('Login') },
            ]);
        } catch (error) {
            console.error('Error al registrar el usuario', error);
            Alert.alert('Error', 'Falló el registro. Por favor verifica los datos e intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={{ uri: 'https://example.com/logo.png' }} style={styles.logo} />
                <Text style={styles.title}>Registro de usuario</Text>
            </View>
            <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color="#555" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Email"
                    keyboardType='email-address'
                    autoCapitalize='none'
                    placeholderTextColor="#aaa"
                />
            </View>
            <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#555" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Contraseña"
                    secureTextEntry={true}
                    autoCapitalize='none'
                    placeholderTextColor="#aaa"
                />
            </View>
            <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#555" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    onChangeText={setConfirmPassword}
                    value={confirmPassword}
                    placeholder="Confirmar Contraseña"
                    secureTextEntry={true}
                    autoCapitalize='none'
                    placeholderTextColor="#aaa"
                />
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#fff" />
            ) : (
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Registrar</Text>
                </TouchableOpacity>
            )}
        </LinearGradient>
    );
};

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 25,
        marginBottom: 20,
        paddingHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        color: '#333',
    },
    button: {
        backgroundColor: '#3b5998',
        padding: 15,
        borderRadius: 25,
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
