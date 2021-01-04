import React, {useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { UserContext } from '../../contexts/UserContext';

import {
  Container,
  InputArea,
  CustomButtom,
  CustomButtomText,
  SignMessageButtom,
  SignMessageButtomText,
  SignMessageButtomTextBold
} from './styles';

import Api from '../../Api';

import BarberLogo from '../../../assets/barber.svg';
import SignInput from '../../components/SignInput';
import EmailIcon from '../../../assets/email.svg';
import LockIcon from '../../../assets/lock.svg';
import PersonIcon from '../../../assets/person.svg'

export default () => {
  const { dispatch: userDispatch } = useContext(UserContext);
  const navigation = useNavigation();
  
  const [nameField, setNameField] = useState('');
  const [emailField, setEmailField] = useState('suporte@barber.com.br');
  const [passwordField, setPasswordField] = useState('');
  
  const handleSignClick = async () => {

    if (nameField != '' && passwordField != '' && emailField != '') {
      let json = await Api.signUp(nameField, emailField, passwordField);
      if (json.token) {
        await AsyncStorage.setItem('token', json.token);

        userDispatch({
          type: 'setAvatar',
          payload:{
            avatar: json.data.avatar
          }
        });

        navigation.reset({
          routes: [{name: 'MainTab'}]
        });

      }
    } else {
      alert("Preencha os campos corretamente!");
    }
  }


  const handleMessageButtonClick = () => {
    navigation.reset({
      routes: [{name: 'SignIn'}]
    });
  }

  return (
    <Container>
      <BarberLogo width="100%" height="160" />
      
      <InputArea>
        <SignInput 
          IconSvg={PersonIcon} 
          placeholder="Digite seu nome"
          value={nameField}
          onChangeText={t=>setNameField(t)}
        />

        <SignInput 
          IconSvg={EmailIcon} 
          placeholder="Digite seu e-mail"
          value={emailField}
          onChangeText={t=>setEmailField(t)}
        />
        <SignInput 
          IconSvg={LockIcon} 
          placeholder="Digite sua senha"
          value={passwordField}
          onChangeText={t=>setPasswordField(t)}
          password={true} /> 
        <CustomButtom onPress={handleSignClick}>
          <CustomButtomText>Login</CustomButtomText>
        </CustomButtom>
      </InputArea>

      <SignMessageButtom onPress={handleMessageButtonClick}>
        <SignMessageButtomText>Já possui uma conta?</SignMessageButtomText>
        <SignMessageButtomTextBold> Faça login </SignMessageButtomTextBold>
      </SignMessageButtom>
    </Container>
  );
};
