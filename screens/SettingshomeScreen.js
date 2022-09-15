import React from 'react';
import * as CustomCode from '../components.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import {
  Divider,
  Icon,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, Text, View } from 'react-native';

const SettingshomeScreen = props => {
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

  const { theme } = props;

  return (
    <ScreenContainer
      style={[styles.screen, { backgroundColor: theme.colors.light }]}
      hasTopSafeArea={true}
      scrollable={false}
      hasSafeArea={false}
    >
      {/* Header Wrapper */}
      <View style={styles.Viewa48bc20d}>
        <View
          style={[
            styles.View520face7,
            { backgroundColor: theme.colors.secondary },
          ]}
        >
          {/* Settings */}
          <Text style={[styles.Textfd49dc44, { color: theme.colors.strong }]}>
            {'Settings'}
          </Text>
        </View>
      </View>
      {/* Content Wrapper */}
      <View style={styles.View3583ce37}>
        <Touchable>
          {/* Row Wrapper */}
          <View style={styles.View17bd5ed9}>
            {/* Left Aligned */}
            <View style={styles.View7d6a39b7}>
              <Icon
                size={24}
                color={theme.colors.mediumLight}
                name={'Ionicons/person-circle-outline'}
              />
              <Text
                style={[
                  styles.Texta4365741,
                  { color: theme.colors.mediumLight },
                ]}
                allowFontScaling={true}
                ellipsizeMode={'tail'}
                textBreakStrategy={'highQuality'}
              >
                {'Account Settings'}
              </Text>
            </View>
            {/* Right Aligned */}
            <View style={styles.View7d6a39b7}>
              <Icon
                name={'MaterialIcons/chevron-right'}
                color={theme.colors.mediumLight}
                size={24}
              />
            </View>
          </View>
          <Divider
            style={styles.Dividerde11d607}
            height={1}
            color={theme.colors.divider}
          />
        </Touchable>

        <Touchable>
          {/* Row Wrapper */}
          <View style={styles.View17bd5ed9}>
            {/* Left Aligned */}
            <View style={styles.View7d6a39b7}>
              <Icon
                size={24}
                color={theme.colors.mediumLight}
                name={'Ionicons/notifications-outline'}
              />
              <Text
                style={[
                  styles.Texta4365741,
                  { color: theme.colors.mediumLight },
                ]}
                allowFontScaling={true}
                ellipsizeMode={'tail'}
                textBreakStrategy={'highQuality'}
              >
                {'Notifications'}
              </Text>
            </View>
            {/* Right Aligned */}
            <View style={styles.View7d6a39b7}>
              <Icon
                name={'MaterialIcons/chevron-right'}
                color={theme.colors.mediumLight}
                size={24}
              />
            </View>
          </View>
          <Divider
            style={styles.Dividerde11d607}
            height={1}
            color={theme.colors.divider}
          />
        </Touchable>

        <Touchable
          onPress={() => {
            try {
              Linking.openURL(
                'mailto:support@studybot.io?subject=App%20support'
              );
            } catch (err) {
              console.error(err);
            }
          }}
        >
          {/* Row Wrapper */}
          <View style={styles.View17bd5ed9}>
            {/* Left Aligned */}
            <View style={styles.View7d6a39b7}>
              <Icon
                size={24}
                name={'Ionicons/mail-outline'}
                color={theme.colors.primary}
              />
              <Text
                style={[styles.Text179a7128, { color: theme.colors.strong }]}
                allowFontScaling={true}
                textBreakStrategy={'highQuality'}
              >
                {'Support (support@studybot.io)'}
              </Text>
            </View>
            {/* Right Aligned */}
            <View style={styles.View7d6a39b7}>
              <Icon
                color={theme.colors.success}
                name={'MaterialIcons/chevron-right'}
                size={24}
              />
            </View>
          </View>
          <Divider
            style={styles.Dividerde11d607}
            height={1}
            color={theme.colors.divider}
          />
        </Touchable>

        <Touchable>
          {/* Row Wrapper */}
          <View style={styles.View17bd5ed9}>
            {/* Left Aligned */}
            <View style={styles.View7d6a39b7}>
              <Icon
                size={24}
                color={theme.colors.mediumLight}
                name={'Ionicons/help'}
              />
              <Text
                style={[
                  styles.Texta4365741,
                  { color: theme.colors.mediumLight },
                ]}
                allowFontScaling={true}
                ellipsizeMode={'tail'}
                textBreakStrategy={'highQuality'}
              >
                {'FAQ'}
              </Text>
            </View>
            {/* Row Aligned */}
            <View style={styles.View7d6a39b7}>
              <Icon
                name={'MaterialIcons/chevron-right'}
                color={theme.colors.mediumLight}
                size={24}
              />
            </View>
          </View>
          <Divider
            style={styles.Dividerde11d607}
            height={1}
            color={theme.colors.divider}
          />
        </Touchable>

        <Touchable
          onPress={() => {
            const handler = async () => {
              try {
                await WebBrowser.openBrowserAsync('https://www.studybot.io');
              } catch (err) {
                console.error(err);
              }
            };
            handler();
          }}
        >
          {/* Row Wrapper */}
          <View style={styles.View17bd5ed9}>
            {/* Left Aligned */}
            <View style={styles.View7d6a39b7}>
              <Icon
                size={24}
                color={theme.colors.primary}
                name={'Ionicons/information-circle-outline'}
              />
              <Text
                style={[styles.Textfa9aea59, { color: theme.colors.strong }]}
                allowFontScaling={true}
                ellipsizeMode={'tail'}
                textBreakStrategy={'highQuality'}
              >
                {'About'}
              </Text>
            </View>
            {/* Right Aligned */}
            <View style={styles.View7d6a39b7}>
              <Icon
                name={'MaterialIcons/chevron-right'}
                color={theme.colors.success}
                size={24}
              />
            </View>
          </View>
          <Divider
            style={styles.Dividerde11d607}
            height={1}
            color={theme.colors.divider}
          />
        </Touchable>
      </View>
      {/* Footer Wrapper */}
      <View style={styles.View4f6009be}>
        <Touchable
          onPress={() => {
            try {
              logUserOut(setGlobalVariableValue);
            } catch (err) {
              console.error(err);
            }
          }}
        >
          {/* Button Wrapper */}
          <View style={styles.View9684d82f}>
            {/* Sign Out Text */}
            <Text
              style={[
                styles.Text394ae6ef,
                {
                  color: theme.colors.strong,
                  textDecorationColor: theme.colors.success,
                },
              ]}
            >
              {'Sign Out'}
            </Text>
          </View>
        </Touchable>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  Dividerde11d607: {
    height: 1,
  },
  Text179a7128: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 15,
    marginLeft: 12,
  },
  Text394ae6ef: {
    fontFamily: 'NotoSans_700Bold',
    fontSize: 17,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  Text95760f16: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 15,
  },
  Texta4365741: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 15,
    marginLeft: 12,
  },
  Textd60f53f5: {
    fontFamily: 'NotoSans_700Bold',
    fontSize: 15,
    paddingBottom: 8,
  },
  Textfa9aea59: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 15,
    marginLeft: 12,
  },
  Textfd49dc44: {
    fontFamily: 'NotoSerif_400Regular',
    fontSize: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  View17bd5ed9: {
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
  },
  View3583ce37: {
    flexShrink: 0,
    marginLeft: 24,
    marginRight: 24,
  },
  View4f6009be: {
    flexGrow: 1,
    flexShrink: 0,
    justifyContent: 'center',
  },
  View520face7: {
    justifyContent: 'center',
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
  },
  View5e74b6c8: {
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
  },
  View7d6a39b7: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  View9684d82f: {
    flexGrow: 1,
    flexShrink: 0,
    justifyContent: 'center',
    minHeight: 54,
  },
  Viewa48bc20d: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 60,
  },
  screen: {
    paddingTop: 80,
  },
});

export default withTheme(SettingshomeScreen);
