import React, {useEffect, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

import styles from './SignUpStyles';
import {Button as PaperButton, Colors} from 'react-native-paper';
import navigationService from '../../services/navigationService';

export default function CompleteSignUp(props) {
  const {
    startup,
    updateProfile,
    profileIsLoading,
    profile: {profileData},
  } = props;
  const isLoading = profileIsLoading;


  const [fullName, setFullName] = useState(profileData?.name);
  const [gender, setGender] = useState('M');
  const [birthDate, setBirthDate] = useState();
  const [errorMsg, setErrorMsg] = useState('');
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const updateHandler = () => {
    if (isLoading || !birthDate) {
      return;
    }

    updateProfile({
      name: fullName,
      gender,
      birthDate,
    })
      .then(() => {
        startup();
      })
      .catch(setErrorMsg);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{'One more step...'}</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.formItem}>
          <Text style={styles.label}>{'Name: '}</Text>
          <View style={styles.texInput}>
            <TextInput
              textContentType={'name'}
              keyboardType={'default'}
              autoCompleteType={'name'}
              onChangeText={setFullName}
              value={fullName}
            />
          </View>
        </View>

        <View style={styles.formItem}>
          <Text style={styles.label}>{'Gender: '}</Text>
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
          <PaperButton
            mode={'text'}
            color={Colors.blue500}
            onPress={() => setDatePickerOpen(true)}
            uppercase={false}
          >
            {'Pick date'}
          </PaperButton>
          <DatePicker
            modal
            textColor={'#000'}
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
          <Text style={[styles.label, styles.errorMessage]}>{errorMsg}</Text>
        </View>
      </View>

      <PaperButton
        style={styles.submitButton}
        color={(isLoading || !birthDate) ? Colors.grey300 : Colors.blue500}
        loading={isLoading}
        mode={'contained'}
        uppercase={false}
        onPress={updateHandler}
      >
        {'Complete signup'}
      </PaperButton>
    </View>
  );
}
