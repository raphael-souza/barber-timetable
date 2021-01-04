import React, {useEffect, useContext} from 'react';
import {Container, LoadingIcon} from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import BarberLogo from '../../../assets/barber.svg';

import Api from '../../Api';
import { UserContext } from '../../contexts/UserContext';

export default () => {
  const navigation = useNavigation();
  const { dispatch: userDispatch } = useContext(UserContext);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        let res = await Api.checkToken(token);
        if (res.token) {
          await AsyncStorage.setItem('token', res.token);

          userDispatch({
            type: 'setAvator',
            payload:{
              avatar: res.data.avatar
            }
          });

          navigation.reset({
            routes:[{name: "mainTab"}]
          });
        } else {
          // se deu erro no token direciona pra login
          navigation.navigate('SignIn');
        }
      } else {
        // redireciona p/ login
        navigation.navigate('SignIn');
      }
    };

    checkToken();
  }, []);

  return (
    <Container>
      <BarberLogo width="100%" height="160" />
      <LoadingIcon size="large" color="#FFFFFF" />
    </Container>
  );
};
