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

const AuthregistrationScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  // Ensures that the new account form is filled out properly before enabling the account creation button
  const newAccountCheck = (formEmail, formPassword, formName) => {
    // https://stackoverflow.com/a/9204568
    var re_check = /\S+@\S+\.\S+/;
    var valid_email_format = re_check.test(formEmail);

    // Don't mandate the edu email address
    // var valid_edu_email = formEmail.substring(formEmail.length - 4) === '.edu';
    var valid_edu_email = true;

    var valid_password_length = formPassword.length >= 6;

    var valid_name_length = formName.length > 0;

    return (
      valid_email_format &&
      valid_edu_email &&
      valid_password_length &&
      valid_name_length
    );
  };

  // Get the domain name from the email (xyz.edu)
  const getEmailDomainName = formEmail => {
    return formEmail.substring(formEmail.lastIndexOf('@') + 1);
  };

  const { theme } = props;
  const { navigation } = props;

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
      setPasswordInputValue('');
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  const [emailInputValue, setEmailInputValue] = React.useState('');
  const [modalEmailValidation, setModalEmailValidation] = React.useState(false);
  const [nameInputValue, setNameInputValue] = React.useState('');
  const [passwordInputValue, setPasswordInputValue] = React.useState('');

  return (
    <ScreenContainer scrollable={true} hasTopSafeArea={true}>
      <ImageBackground
        style={styles.ImageBackground2200bac7}
        resizeMode={'cover'}
        source={Images.SignInBackground}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={styles.KeyboardAwareScrollView2b66e99eContent}
        >
          <View style={{ backgroundColor: theme.colors.background }}>
            {/* Header */}
            <View>
              {/* Title */}
              <Text
                style={[styles.Textde937405, { color: theme.colors.strong }]}
              >
                {'Welcome!'}
              </Text>
              {/* Subtitle */}
              <Text
                style={[styles.Text69d492d4, { color: theme.colors.strong }]}
              >
                {'Create an account to get started'}
              </Text>
            </View>
            {/* Register Form */}
            <View style={styles.View1e98c651}>
              {/* Error Message */}
              <Text
                style={[styles.Text6789b8ec, { color: theme.colors.error }]}
              >
                {null}
              </Text>
              {/* Name Input */}
              <TextInput
                onChangeText={newNameInputValue => {
                  try {
                    setNameInputValue(newNameInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={[
                  styles.TextInput3508480f,
                  {
                    color: theme.colors.medium,
                    borderColor: theme.colors.divider,
                    backgroundColor: theme.colors.background,
                  },
                ]}
                placeholder={'First name'}
                value={nameInputValue}
                spellcheck={true}
                autoCapitalize={'words'}
              />
              <Spacer top={12} right={8} bottom={12} left={8} />
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
                  styles.TextInput4cdcf2f8,
                  {
                    borderColor: theme.colors.divider,
                    backgroundColor: theme.colors.background,
                    color: theme.colors.medium,
                  },
                ]}
                placeholder={'Email (.edu)'}
                value={emailInputValue}
                spellcheck={true}
                autoCapitalize={'none'}
                keyboardType={'email-address'}
                textContentType={'emailAddress'}
              />
              <Spacer top={12} right={8} bottom={8} left={8} />
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
                  styles.TextInput09340b30,
                  {
                    borderColor: theme.colors.divider,
                    backgroundColor: theme.colors.background,
                    color: theme.colors.medium,
                  },
                ]}
                placeholder={'Password (min 6 characters)'}
                value={passwordInputValue}
                spellcheck={true}
                secureTextEntry={true}
                autoCapitalize={'none'}
                textContentType={'password'}
              />
              {/* Details */}
              <Text
                style={[styles.Text767ca09d, { color: theme.colors.medium }]}
              >
                {
                  'Please use a .edu email address so we can customize your experience to your university'
                }
              </Text>
              {/* Error message */}
              <Text
                style={[styles.Text5b7688f1, { color: theme.colors.error }]}
              >
                {Constants['ERROR_MESSAGE']}{' '}
              </Text>
              <Spacer top={24} right={8} bottom={24} left={8} />
              {/* Sign Up Button */}
              <>
                {!newAccountCheck(
                  emailInputValue,
                  passwordInputValue,
                  nameInputValue
                ) ? null : (
                  <ButtonSolid
                    onPress={() => {
                      const handler = async () => {
                        try {
                          const signupResponseJson = await AuthApi.signupPOST(
                            Constants,
                            {
                              emailDomain: getEmailDomainName(emailInputValue),
                              firstName: nameInputValue,
                              signupEmail: emailInputValue,
                              signupPassword: passwordInputValue,
                            }
                          );
                          const message = signupResponseJson.msg;
                          setGlobalVariableValue({
                            key: 'ERROR_MESSAGE',
                            value: message,
                          });
                          if (message) {
                            return;
                          }
                          setModalEmailValidation(true);
                        } catch (err) {
                          console.error(err);
                        }
                      };
                      handler();
                    }}
                    style={[
                      styles.ButtonSolida2f2b3ce,
                      { backgroundColor: theme.colors.primary },
                    ]}
                    disabled={false}
                    title={'Sign up'}
                  />
                )}
              </>
              {/* Sign Up Button Disabled */}
              <>
                {newAccountCheck(
                  emailInputValue,
                  passwordInputValue,
                  nameInputValue
                ) ? null : (
                  <ButtonSolid
                    style={[
                      styles.ButtonSolida2f2b3ce,
                      { backgroundColor: theme.colors.primary },
                    ]}
                    title={'Sign up'}
                    disabled={true}
                  />
                )}
              </>
              <Spacer top={16} right={8} bottom={16} left={8} />
              <View style={styles.View863e7c01}>
                <Text
                  style={[
                    styles.Text50887299,
                    {
                      color: theme.colors.strong,
                      textDecorationColor: theme.colors.strong,
                    },
                  ]}
                >
                  {'Have an account?'}
                </Text>
                <Spacer top={8} right={2} bottom={8} left={2} />
                {/* Sign In Link */}
                <Link
                  onPress={() => {
                    try {
                      navigation.navigate('AuthloginScreen');
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={[
                    styles.Linkec0c6a79,
                    {
                      color: theme.colors.primary,
                      textDecorationColor: theme.colors.secondary,
                    },
                  ]}
                  title={'Sign in.'}
                />
              </View>
              <Spacer top={24} right={8} bottom={24} left={8} />
            </View>
          </View>
        </KeyboardAwareScrollView>

        <Modal
          visible={modalEmailValidation}
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
            <View style={styles.View4baefe14}>
              <Text
                style={[styles.Textc9fab72a, { color: theme.colors.strong }]}
              >
                {'Email sent'}
              </Text>

              <Text
                style={[styles.Text1aabb2e1, { color: theme.colors.medium }]}
              >
                {
                  'Please go to your email to confirm your address before you can log in\n\nContact support@studybot.io if needed'
                }
              </Text>
              <Divider
                style={styles.Divider1594ed8a}
                color={theme.colors.secondary}
              />
              <ButtonOutline
                onPress={() => {
                  try {
                    setModalEmailValidation(false);
                    navigation.navigate('AuthloginScreen', {
                      navEmail: emailInputValue,
                      navPassword: passwordInputValue,
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={[
                  styles.ButtonOutlinef491cece,
                  {
                    color: theme.colors.success,
                    borderColor: theme.colors.success,
                  },
                ]}
                title={'Confirmed'}
              />
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  ButtonOutlinef491cece: {
    borderRadius: 8,
    borderWidth: 1,
    fontFamily: 'NotoSans_700Bold',
    fontSize: 17,
    marginTop: 32,
    minWidth: '50%',
    textAlign: 'center',
  },
  ButtonSolida2f2b3ce: {
    borderRadius: 8,
    fontFamily: 'NotoSans_700Bold',
    fontSize: 15,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
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
  Linkec0c6a79: {
    fontFamily: 'NotoSans_700Bold',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  Text1aabb2e1: {
    alignSelf: 'center',
    fontFamily: 'NotoSans_400Regular',
    fontSize: 17,
    marginBottom: 32,
    textAlign: 'center',
  },
  Text50887299: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 15,
    marginRight: 2,
  },
  Text5b7688f1: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 17,
    marginBottom: 8,
    marginTop: 8,
  },
  Text6789b8ec: {
    fontSize: 12,
    marginBottom: 16,
    textAlign: 'center',
  },
  Text69d492d4: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 15,
    marginTop: 4,
    textAlign: 'center',
  },
  Text767ca09d: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 13,
    marginTop: 8,
    textAlign: 'center',
  },
  TextInput09340b30: {
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
  TextInput3508480f: {
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
  TextInput4cdcf2f8: {
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
  Textde937405: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 36,
    textAlign: 'center',
  },
  View1e98c651: {
    marginTop: 24,
    paddingLeft: 36,
    paddingRight: 36,
  },
  View368a790a: {
    flex: 1,
    justifyContent: 'center',
    marginTop: '50%',
  },
  View4baefe14: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
  },
  View863e7c01: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default withTheme(AuthregistrationScreen);
