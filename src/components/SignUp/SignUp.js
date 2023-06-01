import React, {useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

import styles from './SignUpStyles';

export default function (props) {
  const {signUpUser, profileIsLoading} = props;
  const isLoading = profileIsLoading;

  const [fullName, setFullName] = useState('test test1');
  const [gender, setGender] = useState('M');
  const [birthDate, setBirthDate] = useState();
  const [email, setEmail] = useState('test1@mail.me');
  const [password, setPassword] = useState('azerty@123');
  const [confirmation, setConfirmation] = useState('azerty@123');
  const [errorMsg, setErrorMsg] = useState('');
  const [datePickerOpen, setDatePickerOpen] = useState(false);


  return (
    <View style={styles.container}>
      <View style={styles.formItem}>
        <Text style={styles.label}>Full Name: </Text>
        <TextInput
          textContentType={'name'}
          keyboardType={'default'}
          autoCompleteType={'name'}
          style={styles.texInput}
          onChangeText={setFullName}
          value={fullName}
        />
      </View>
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
        <Text style={styles.label}>Gender: </Text>
        <View style={styles.picker}>
          <Picker
            selectedValue={gender}
            onValueChange={setGender}>
            {['M', 'F'].map((item, idx) => <Picker.Item key={idx} label={item} value={item}/>)}
          </Picker>
        </View>
      </View>
      <View style={styles.formItem}>
        <Text style={styles.label}>Birth date: {!!birthDate && moment(birthDate).format('DD MMM YYYY')}</Text>
        <Button title={'Pick date'} onPress={() => setDatePickerOpen(true)} />
        <DatePicker
          modal
          mode={'date'}
          open={datePickerOpen}
          minimumDate={new Date('1960-01-01')}
          maximumDate={new Date('2010-12-31')}
          date={birthDate ? new Date(birthDate) : new Date('2000-01-01')}
          onConfirm={date => {
            setBirthDate(date.toISOString());
            setDatePickerOpen(false);
          }}
          onCancel={() => {
            setDatePickerOpen(false);
          }}
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
        <Text style={styles.label}>Confirm: </Text>
        <TextInput
          secureTextEntry={true}
          style={styles.texInput}
          onChangeText={setConfirmation}
          value={confirmation}
        />
      </View>
      <View style={styles.formItem}>
        <Text style={[styles.label, styles.errorMessage]}>{errorMsg}</Text>
      </View>
      <Button
        disabled={isLoading}
        title={isLoading ? '...' : 'Sign Up'}
        onPress={() => {
          if (password === confirmation) {
            signUpUser({
              email,
              password,
              name: fullName,
              gender,
              birthDate,
            }).catch(setErrorMsg);
          } else {
            setErrorMsg('Password & confirmation don\'t match');
          }
        }}
      />
    </View>
  );
}
