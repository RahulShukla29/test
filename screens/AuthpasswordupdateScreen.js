import React from 'react';
import * as AuthApi from '../apis/AuthApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import getNavParam from '../custom/getNavParam';
import { ButtonSolid, ScreenContainer, withTheme } from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const AuthpasswordupdateScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const { theme } = props;
  const { navigation } = props;

  const authPasswordResetPUT = AuthApi.usePasswordResetPUT();

  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      setGlobalVariableValue({
        key: 'ERROR_MESSAGE',
        value: '',
      });
      const accessToken = getNavParam(
        props.route?.params?.nav_param ?? '',
        'access_token'
      );
      setGlobalVariableValue({
        key: 'AUTHORIZATION_HEADER',
        value: 'Bearer ' + accessToken,
      });
      const refreshToken = getNavParam(
        props.route?.params?.nav_param ?? '',
        'refresh_token'
      );
      setGlobalVariableValue({
        key: 'REFRESH_TOKEN',
        value: '',
      });
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  const [emailInputValue, setEmailInputValue] = React.useState('');
  const [passwordInputValue, setPasswordInputValue] = React.useState('');

  return (
    <ScreenContainer
      style={{ backgroundColor: theme.colors.background }}
      hasTopSafeArea={true}
      scrollable={false}
    >
      <ImageBackground
        style={styles.ImageBackground2200bac7}
        source={Images.SignInBackground}
        resizeMode={'cover'}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={styles.KeyboardAwareScrollView2b66e99eContent}
        >
          <View
            style={[
              styles.View4727f681,
              { backgroundColor: theme.colors.background },
            ]}
          >
            {/* Header */}
            <View style={styles.Viewc9622c95}>
              {/* Title */}
              <Text
                style={[styles.Text4dc5895c, { color: theme.colors.medium }]}
              >
                {'Password update'}
              </Text>
              {/* Subtitle */}
              <Text
                style={[styles.Text2aea8c00, { color: theme.colors.strong }]}
              >
                {'Please enter a new password for your account'}
              </Text>
            </View>
            {/* Login Form */}
            <View style={styles.Viewa12601d3}>
              {/* Password Input */}
              <TextInput
                onChangeText={newPasswordInputValue => {
                  try {
                    setPasswordInputValue(newPasswordInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={[
                  styles.TextInput5f75d374,
                  {
                    borderColor: theme.colors.divider,
                    backgroundColor: theme.colors.background,
                    color: theme.colors.medium,
                  },
                ]}
                placeholder={'New Password'}
                value={passwordInputValue}
                secureTextEntry={true}
              />
              {/* Error message */}
              <Text
                style={[styles.Textaec105ec, { color: theme.colors.error }]}
              >
                {Constants['ERROR_MESSAGE']}{' '}
              </Text>
              {/* Update password */}
              <ButtonSolid
                onPress={() => {
                  const handler = async () => {
                    try {
                      const passwordResetResponseJson =
                        await authPasswordResetPUT.mutateAsync({
                          new_password: passwordInputValue,
                        });
                      const errorMessage = passwordResetResponseJson['msg'];
                      setGlobalVariableValue({
                        key: 'ERROR_MESSAGE',
                        value: errorMessage,
                      });
                      const userId = passwordResetResponseJson['id'];
                      if (errorMessage) {
                        return;
                      }
                      if (!userId) {
                        return;
                      }
                      setGlobalVariableValue({
                        key: 'USER_ID',
                        value: userId,
                      });
                      navigation.navigate('BottomTabNavigator', {
                        screen: 'MainNavigator',
                        params: { screen: 'MainhomeScreen' },
                      });
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
                style={[
                  styles.ButtonSolid36238d69,
                  { backgroundColor: theme.colors.primary },
                ]}
                title={'Update'}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  ButtonSolid36238d69: {
    borderRadius: 8,
    fontFamily: 'NotoSans_700Bold',
    fontSize: 15,
    marginBottom: 16,
    paddingBottom: 16,
    paddingTop: 16,
    textAlign: 'center',
  },
  ImageBackground2200bac7: {
    height: '100%',
  },
  KeyboardAwareScrollView2b66e99eContent: {
    flex: 1,
    justifyContent: 'center',
  },
  Text2aea8c00: {
    alignSelf: 'center',
    fontFamily: 'NotoSans_400Regular',
    fontSize: 15,
    marginTop: 4,
    textAlign: 'center',
  },
  Text4dc5895c: {
    alignSelf: 'center',
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 36,
    textAlign: 'center',
  },
  TextInput5f75d374: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRadius: 8,
    borderRightWidth: 1,
    borderTopWidth: 1,
    fontFamily: 'NotoSans_400Regular',
    fontSize: 15,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
  },
  Textaec105ec: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 17,
    marginBottom: 8,
    marginTop: 8,
    textAlign: 'center',
  },
  View4727f681: {
    paddingBottom: 16,
    paddingTop: 16,
  },
  Viewa12601d3: {
    marginTop: 24,
    paddingBottom: 18,
    paddingLeft: 36,
    paddingRight: 36,
  },
  Viewc9622c95: {
    alignItems: 'center',
    paddingLeft: 36,
    paddingRight: 36,
  },
});

export default withTheme(AuthpasswordupdateScreen);
