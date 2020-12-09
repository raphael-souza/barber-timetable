import React, {useState} from 'react';

import {
  Container,
  InputArea,
  CustomButtom,
  CustomButtomText,
  SignMessageButtom,
  SignMessageButtomText,
  SignMessageButtomTextBold
} from './styles';

import BarberLogo from '../../../assets/barber.svg';
import SignInput from '../../../components/SignInput';
import EmailIcon from '../../../assets/email.svg';
import LockIcon from '../../../assets/lock.svg';
export default () => {

  const [emailField, setEmailField] = useState('suporte@barber.com.br');
  const [passwordField, setPasswordField] = useState('');
  return (
    <Container>
      <BarberLogo width="100%" height="160" />
      
      <InputArea>

        <SignInput 
          IconSvg={EmailIcon} 
          placeholder="Digite seu e-mail!"
          value={emailField}
          onChangeText={t=>setEmailField(t)}
        />
        <SignInput 
          IconSvg={LockIcon} 
          placeholder="Digite sua senha"
          value={passwordField}
          onChangeText={t=>setPasswordField(t)}
          password={true} /> 
        <CustomButtom>
          <CustomButtomText>Login</CustomButtomText>
        </CustomButtom>
      </InputArea>

      <SignMessageButtom>
        <SignMessageButtomText>Ainda não possui uma conta?</SignMessageButtomText>
        <SignMessageButtomTextBold> Cadastre-se </SignMessageButtomTextBold>
      </SignMessageButtom>
    </Container>
  );
};
