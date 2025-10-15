import React, { useState, useMemo } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';

const COLORS = {
  primary: '#26C24C', // verde do logo
  navy: '#1E2B3C', // azul do texto do logo
  bg: '#F7F8FA',
  label: '#111827',
  hint: '#6B7280',
};

// máscaras simples
const maskCPF = (v) =>
  v
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

const maskPhone = (v) => {
  const d = v.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 10) {
    return d.replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{4})(\d)/, '$1-$2');
  }
  return d.replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2');
};

export default function RegisterPage({ navigation }) {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [pais, setPais] = useState('');
  const [telefone, setTelefone] = useState('');
  const [loading, setLoading] = useState(false);

  const cpfValido = useMemo(() => cpf.replace(/\D/g, '').length === 11, [cpf]);
  const telValido = useMemo(
    () => telefone.replace(/\D/g, '').length >= 10,
    [telefone]
  );
  const nomeOk = nome.trim().length >= 3;
  const paisOk = pais.trim().length >= 2;
  const formOk = nomeOk && cpfValido && paisOk && telValido;

  const handleSubmit = () => {
    if (!formOk) {
      Alert.alert(
        'Campos obrigatórios',
        'Preencha todos os campos corretamente.'
      );
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      // navegação depois do cadastro
      // navigation.navigate("HomePage");
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <View style={styles.container}>
        {/* Logo */}
        <Image
          source={require('../assets/logo-saldo-simples.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Cadastro</Text>
        <Text style={styles.subtitle}>Preencha seus dados para continuar</Text>

        <Text style={styles.label}>Nome:</Text>
        <TextInput
          label="Nome completo"
          value={nome}
          onChangeText={setNome}
          style={[styles.input, { borderRadius: 16, backgroundColor: '#fff' }]} // 👈 bordas + fundo branco
          mode="outlined"
          theme={{ roundness: 16 }} // 👈 arredonda o contorno
        />

        <Text style={styles.label}>CPF:</Text>
        <TextInput
          mode="outlined"
          placeholder="000.000.000-00"
          value={cpf}
          onChangeText={(t) => setCpf(maskCPF(t))}
          style={styles.input}
          keyboardType="numeric"
        />

        <Text style={styles.label}>País:</Text>
        <TextInput
          mode="outlined"
          placeholder="Ex: Brasil"
          value={pais}
          onChangeText={setPais}
          style={styles.input}
        />

        <Text style={styles.label}>Telefone:</Text>
        <TextInput
          mode="outlined"
          placeholder="(00) 00000-0000"
          value={telefone}
          onChangeText={(t) => setTelefone(maskPhone(t))}
          style={styles.input}
          keyboardType="phone-pad"
        />

        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={loading}
          disabled={loading}
          style={[styles.button, { borderRadius: 16, overflow: 'hidden' }]} // <<< arredonda
          contentStyle={{ height: 52 }} // <<< altura
          theme={{ colors: { primary: COLORS.primary } }}
          textColor="#fff" // <<< cor do texto
          uppercase={false} // opcional: evita CAIXA ALTA
        >
          Cadastrar
        </Button>

        <Text style={styles.footer}>
          Já possui uma conta?{' '}
          <Text
            style={styles.link}
            onPress={() => navigation?.navigate?.('Login')}>
            Fazer login
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  logo: {
    width: 220,
    height: 80,
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.navy,
  },
  subtitle: {
    textAlign: 'center',
    color: COLORS.hint,
    marginBottom: 20,
  },
  label: {
    color: COLORS.label,
    marginBottom: 4,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 20,
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
  },
  footer: {
    textAlign: 'center',
    color: COLORS.hint,
    marginTop: 14,
  },
  link: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});
