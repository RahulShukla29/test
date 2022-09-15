import React from 'react';
import * as AuthApi from '../apis/AuthApi.js';
import * as CustomCode from '../components.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import {
  ButtonOutline,
  ButtonSolid,
  Divider,
  Link,
  ScreenContainer,
  Spacer,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const AuthloginScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const checkValidEmail = emailInput => {
    // https://stackoverflow.com/a/9204568
    var re_check = /\S+@\S+\.\S+/;
    var valid_email_format = re_check.test(emailInput);

    return valid_email_format;
  };

  const { theme } = props;
  const { navigation } = props;

  const authForgotPasswordPOST = AuthApi.useForgotPasswordPOST();

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
      if (!(props.route?.params?.navEmail ?? '')) {
        return;
      }
      setEmailInputValue(props.route?.params?.navEmail ?? '');
      if (!(props.route?.params?.navPassword ?? '')) {
        return;
      }
      setPasswordInputValue(props.route?.params?.navPassword ?? '');
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  const [emailInputValue, setEmailInputValue] = React.useState('');
  const [passwordInputValue, setPasswordInputValue] = React.useState('');
  const [passwordResetSent, setPasswordResetSent] = React.useState(false);

  return (
    <ScreenContainer
      style={{ backgroundColor: theme.colors.background }}
      hasTopSafeArea={true}
      scrollable={false}
    >
      <ImageBackground
        style={styles.ImageBackground2200bac7}
        resizeMode={'cover'}
        source={Images.SignInBackground}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={styles.KeyboardAwareScrollView2b66e99eContent}
        >
          <View
            style={[
              styles.View5dd4410a,
              { backgroundColor: theme.colors.background },
            ]}
          >
            {/* Header */}
            <View style={styles.View39912261}>
              {/* Title */}
              <Text
                style={[styles.Textcdad6af3, { color: theme.colors.medium }]}
              >
                {'Welcome Back!'}
              </Text>
              {/* Subtitle */}
              <Text
                style={[styles.Text30d249af, { color: theme.colors.strong }]}
              >
                {'Sign in to your account to continue'}
              </Text>
            </View>
            {/* Login Form */}
            <View style={styles.View1e98c651}>
              {/* Email Input */}
              <TextInput
                onChangeText={newEmailInputValue => {
                  try {
                    setEmailInputValue(newEmailInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={[
                  styles.TextInput2b69957c,
                  {
                    color: theme.colors.medium,
                    borderColor: theme.colors.divider,
                    backgroundColor: theme.colors.background,
                  },
                ]}
                placeholder={'Email (.edu)'}
                value={emailInputValue}
                keyboardType={'email-address'}
                textContentType={'emailAddress'}
                autoCapitalize={'none'}
              />
              <Spacer top={12} right={8} bottom={12} left={8} />
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
                  styles.TextInputa57890d8,
                  {
                    color: theme.colors.medium,
                    borderColor: theme.colors.divider,
                    backgroundColor: theme.colors.background,
                  },
                ]}
                value={passwordInputValue}
                placeholder={'Password'}
                secureTextEntry={true}
              />
              <View style={styles.Viewe51ce41f}>
                {/* Button Forgot Valid Email */}
                <>
                  {!checkValidEmail(emailInputValue) ? null : (
                    <ButtonOutline
                      onPress={() => {
                        const handler = async () => {
                          try {
                            await authForgotPasswordPOST.mutateAsync({
                              email: emailInputValue,
                            });
                            setGlobalVariableValue({
                              key: 'ERROR_MESSAGE',
                              value: '',
                            });
                            setPasswordResetSent(true);
                          } catch (err) {
                            console.error(err);
                          }
                        };
                        handler();
                      }}
                      style={[
                        styles.ButtonOutline63f73839,
                        {
                          borderColor: theme.colors.background,
                          color: theme.colors.mediumLight,
                        },
                      ]}
                      title={'Forgot password?'}
                      disabled={false}
                    />
                  )}
                </>
                {/* Button Forgot Invalid Email */}
                <>
                  {checkValidEmail(emailInputValue) ? null : (
                    <ButtonOutline
                      onPress={() => {
                        try {
                          setGlobalVariableValue({
                            key: 'ERROR_MESSAGE',
                            value: 'Please enter a valid email address',
                          });
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      style={[
                        styles.ButtonOutline34c58eca,
                        {
                          borderColor: theme.colors.background,
                          color: theme.colors.mediumLight,
                        },
                      ]}
                      title={'Forgot password?'}
                      disabled={false}
                    />
                  )}
                </>
              </View>
              {/* Error message */}
              <Text
                style={[styles.Text345ef1d5, { color: theme.colors.error }]}
              >
                {Constants['ERROR_MESSAGE']}{' '}
              </Text>
              <Spacer right={8} left={8} bottom={16} top={16} />
              {/* Sign In Button */}
              <>
                {!checkValidEmail(emailInputValue) ? null : (
                  <ButtonSolid
                    onPress={() => {
                      const handler = async () => {
                        try {
                          const loginResponseJson = await AuthApi.loginPOST(
                            Constants,
                            {
                              loginEmail: emailInputValue,
                              loginPassword: passwordInputValue,
                            }
                          );
                          const accessToken = loginResponseJson['access_token'];
                          const message =
                            loginResponseJson['error_description'];
                          const refreshToken =
                            loginResponseJson['refresh_token'];
                          setGlobalVariableValue({
                            key: 'ERROR_MESSAGE',
                            value: message,
                          });
                          if (!accessToken) {
                            return;
                          }
                          setGlobalVariableValue({
                            key: 'AUTHORIZATION_HEADER',
                            value: 'Bearer ' + accessToken,
                          });
                          const user_id = loginResponseJson['user']['id'];
                          setGlobalVariableValue({
                            key: 'USER_ID',
                            value: user_id,
                          });
                          setGlobalVariableValue({
                            key: 'REFRESH_TOKEN',
                            value: refreshToken,
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
                      styles.ButtonSolid861c4394,
                      { backgroundColor: theme.colors.primary },
                    ]}
                    title={'Sign in'}
                  />
                )}
              </>
              {/* Sign In Button Disabled */}
              <>
                {checkValidEmail(emailInputValue) ? null : (
                  <ButtonSolid
                    style={[
                      styles.ButtonSolid9110d169,
                      { backgroundColor: theme.colors.primary },
                    ]}
                    title={'Sign in'}
                    disabled={true}
                  />
                )}
              </>
              <Spacer top={16} right={8} bottom={16} left={8} />
              <View style={styles.View8bb6a2bc}>
                <Text
                  style={[styles.Text95760f16, { color: theme.colors.medium }]}
                >
                  {'New User?'}
                </Text>
                <Spacer top={8} bottom={8} left={4} right={4} />
                {/* Sign Up Link */}
                <Link
                  onPress={() => {
                    try {
                      navigation.navigate('AuthregistrationScreen');
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={[
                    styles.Linkf8a064e4,
                    {
                      color: theme.colors.primary,
                      textDecorationColor: theme.colors.secondary,
                    },
                  ]}
                  title={'Sign up!'}
                />
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>

        <Modal
          visible={passwordResetSent}
          animationType={'slide'}
          transparent={true}
        >
          <View
            style={[
              styles.View368a790a,
              {
                backgroundColor: theme.colors.light,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              },
            ]}
          >
            <View style={styles.Viewf0da214c}>
              <Text
                style={[styles.Textc9fab72a, { color: theme.colors.strong }]}
              >
                {'Forgot password'}
              </Text>

              <Text
                style={[styles.Text6f2218c8, { color: theme.colors.medium }]}
              >
                {
                  'If an account with this email exists, an email has been sent to it to reset the password'
                }
              </Text>
              <Divider
                style={styles.Divider1594ed8a}
                color={theme.colors.secondary}
              />
              <View style={styles.View2fc75708}>
                <ButtonOutline
                  onPress={() => {
                    try {
                      setPasswordResetSent(false);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={[
                    styles.ButtonOutline7fdb24d5,
                    {
                      color: theme.colors.success,
                      borderColor: theme.colors.success,
                    },
                  ]}
                  title={'Ok'}
                />
              </View>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  ButtonOutline34c58eca: {
    borderRadius: 8,
    borderWidth: 1,
    fontFamily: 'NotoSans_400Regular',
    fontSize: 15,
    paddingRight: 0,
    textAlign: 'right',
  },
  ButtonOutline63f73839: {
    borderRadius: 8,
    borderWidth: 1,
    fontFamily: 'NotoSans_400Regular',
    fontSize: 15,
    paddingRight: 0,
    textAlign: 'right',
  },
  ButtonOutline7fdb24d5: {
    borderRadius: 8,
    borderWidth: 1,
    fontFamily: 'NotoSans_700Bold',
    fontSize: 17,
    marginLeft: 8,
    minWidth: '40%',
    textAlign: 'center',
  },
  ButtonSolid861c4394: {
    borderRadius: 8,
    fontFamily: 'NotoSans_700Bold',
    fontSize: 15,
    paddingBottom: 16,
    paddingTop: 16,
    textAlign: 'center',
  },
  ButtonSolid9110d169: {
    borderRadius: 8,
    fontFamily: 'NotoSans_700Bold',
    fontSize: 15,
    paddingBottom: 16,
    paddingTop: 16,
    textAlign: 'center',
  },
  Divider1594ed8a: {
    height: 4,
    width: '20%',
  },
  ImageBackground2200bac7: {
    height: '100%',
  },
  KeyboardAwareScrollView2b66e99eContent: {
    flex: 1,
    justifyContent: 'center',
  },
  Linkf8a064e4: {
    fontFamily: 'NotoSans_700Bold',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  Text30d249af: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 15,
    marginTop: 4,
    textAlign: 'center',
  },
  Text345ef1d5: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 17,
    marginBottom: 8,
    marginTop: 8,
    textAlign: 'center',
  },
  Text6f2218c8: {
    alignSelf: 'center',
    fontFamily: 'NotoSans_400Regular',
    fontSize: 17,
    marginBottom: 32,
    textAlign: 'center',
  },
  Text95760f16: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 15,
  },
  TextInput2b69957c: {
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
  TextInputa57890d8: {
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
  Textc9fab72a: {
    alignSelf: 'center',
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 32,
    marginBottom: 24,
    textAlign: 'center',
  },
  Textcdad6af3: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 36,
    textAlign: 'center',
  },
  View1e98c651: {
    marginTop: 24,
    paddingLeft: 36,
    paddingRight: 36,
  },
  View2fc75708: {
    flex: 1,
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'center',
    marginTop: 32,
    minWidth: '80%',
  },
  View368a790a: {
    flex: 1,
    justifyContent: 'center',
    marginTop: '50%',
  },
  View39912261: {
    alignItems: 'center',
  },
  View5dd4410a: {
    paddingBottom: 16,
    paddingTop: 16,
  },
  View8bb6a2bc: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
  Viewe51ce41f: {
    alignItems: 'flex-end',
    paddingBottom: 8,
    paddingTop: 8,
  },
  Viewf0da214c: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
  },
});

export default withTheme(AuthloginScreen);
