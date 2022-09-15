import React from 'react';
import * as CustomCode from '../components.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import { ScreenContainer, withTheme } from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { StatusBar, StyleSheet } from 'react-native';

const LaunchScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const logUserOut = setGlobalVariableValue => {
    loggedOutScreen = 'AuthNavigator';

    setGlobalVariableValue({
      key: 'AUTHORIZATION_HEADER',
      value: '',
    });
    setGlobalVariableValue({
      key: 'USER_JSON',
      value: [],
    });
    setGlobalVariableValue({
      key: 'USER_ID',
      value: '-',
    });
    setGlobalVariableValue({
      key: 'USER_UUID_VAL',
      value: '-',
    });
    setGlobalVariableValue({
      key: 'REFRESH_TOKEN',
      value: '',
    });

    setTimeout(() => props.navigation.navigate(loggedOutScreen));

    return;
  };

  const checkRefreshTokenNav = setGlobalVariableValue => {
    // All checks to ensure AUTHORIZATION_HEADER is set
    if (
      !Constants['AUTHORIZATION_HEADER'] ||
      Constants['AUTHORIZATION_HEADER'] === '' ||
      Constants['AUTHORIZATION_HEADER'] === '-'
    ) {
      logUserOut(setGlobalVariableValue);
      return false;
    }

    // All checks to ensure REFRESH_TOKEN is set
    if (
      !Constants['REFRESH_TOKEN'] ||
      Constants['REFRESH_TOKEN'] === '' ||
      Constants['REFRESH_TOKEN'] === '-'
    ) {
      logUserOut(setGlobalVariableValue);
      return false;
    }

    // All checks to ensure USER_ID is set
    if (
      !Constants['USER_ID'] ||
      Constants['USER_ID'] === '' ||
      Constants['USER_ID'] === '-'
    ) {
      logUserOut(setGlobalVariableValue);
      return false;
    }

    // const newRefreshTokenJson = await AuthApi.refreshTokenPOST(Constants, {
    //     refresh_token: Constants['REFRESH_TOKEN'],
    // });

    refreshTokenJson = {};

    // Verify return refreshTokenJson object created refreshed auth
    if (refreshTokenJson == null) {
    } else if (
      refreshTokenJson['access_token'] &&
      refreshTokenJson['refresh_token']
    ) {
      setGlobalVariableValue({
        key: 'AUTHORIZATION_HEADER',
        value: 'Bearer ' + refreshTokenJson['access_token'],
      });
      setGlobalVariableValue({
        key: 'REFRESH_TOKEN',
        value: refreshTokenJson['refresh_token'],
      });
      setTimeout(() =>
        props.navigation.navigate('BottomTabNavigator', {
          screen: 'MainNavigator',
          params: { screen: 'MainhomeScreen' },
        })
      );
      return true;
    }

    // Else, the refresh token did not return the right values, so go to logged out
    logUserOut(setGlobalVariableValue);
    return false;
  };

  const { theme } = props;

  React.useEffect(() => {
    StatusBar.setBarStyle('dark-content');
  }, []);

  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      const refreshTokenNav = checkRefreshTokenNav(setGlobalVariableValue);
      console.log('test');
      if (refreshTokenNav) {
        return;
      }
      logUserOut(setGlobalVariableValue);
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer
      style={{ backgroundColor: theme.colors.primary }}
      hasSafeArea={false}
      scrollable={false}
    />
  );
};

export default withTheme(LaunchScreen);
