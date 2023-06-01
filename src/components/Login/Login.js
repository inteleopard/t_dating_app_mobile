import React, { useState } from 'react';
import {SafeAreaView, Text, TextInput, View } from 'react-native';

import styles from './LoginStyles';
import NavigationService from 'src/services/navigationService';
import { Button as PaperButton, Colors } from 'react-native-paper';

export default function Login(props) {
  const {
    loginUser,
    startup,
  } = props;
  const { loading: isLoading } = startup;

  const [email, setEmail] = useState('admin@mail.me');
  const [password, setPassword] = useState('azerty@123');
  const [errorMsg, setErrorMsg] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formItem}>
        <Text style={styles.label}>Email: </Text>
        <TextInput
          textContentType={'emailAddress'}
          keyboardType={'email-address'}
          autoCompleteType={'email'}
          style={styles.texInput}
          onChangeText={setEmail}
          value={email}
        />
      </View>
      <View style={styles.formItem}>
        <Text style={styles.label}>Password: </Text>
        <TextInput
          secureTextEntry={true}
          style={styles.texInput}
          onChangeText={setPassword}
          value={password}
        />
      </View>
      <View style={styles.formItem}>
        <Text style={[styles.label, styles.errorMessage]}>{errorMsg}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <PaperButton
          contentStyle={{ paddingHorizontal: 13 }}
          style={styles.button}
          color={Colors.blue500}
          mode="contained"
          uppercase={false}
          onPress={() => NavigationService.navigate('SignUp')}
        >
          {'SignUp'}
        </PaperButton>

        <PaperButton
          contentStyle={{ paddingHorizontal: 13 }}
          style={styles.button}
          color={Colors.blue500}
          mode="contained"
          uppercase={false}
          onPress={() => loginUser(email, password).catch(setErrorMsg)}
        >
          {isLoading ? '...' : 'Login'}
        </PaperButton>
      </View>

    </SafeAreaView>
  );
}
