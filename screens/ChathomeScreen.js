import React from 'react';
import * as CustomCode from '../components.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as Utils from '../utils';
import useIsOnline from '../utils/useIsOnline';
import {
  ButtonOutline,
  Divider,
  Icon,
  ScreenContainer,
  withTheme,
} from '@draftbit/ui';
import { Modal, StyleSheet, Text, View } from 'react-native';

const ChathomeScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const { theme } = props;

  const isOnline = useIsOnline();

  return (
    <ScreenContainer
      style={[styles.screen, { backgroundColor: theme.colors.background }]}
      hasSafeArea={false}
      scrollable={false}
      hasTopSafeArea={true}
      hasBottomSafeArea={false}
    >
      <>
        {!isOnline ? null : (
          <Utils.CustomCodeErrorBoundary>
            <CustomCode.ChatWebViewView />
          </Utils.CustomCodeErrorBoundary>
        )}
      </>
      {/* Offline */}
      <>
        {isOnline ? null : (
          <View
            style={[
              styles.View7fd69692,
              { backgroundColor: theme.colors.light },
            ]}
          >
            <View style={styles.View4baefe14}>
              <Text
                style={[styles.Text05fd8236, { color: theme.colors.strong }]}
              >
                {'Offline'}
              </Text>

              <Text
                style={[styles.Textc329822a, { color: theme.colors.medium }]}
              >
                {'Your device is not currently connected to the internet'}
              </Text>
              <Divider
                style={styles.Divider1594ed8a}
                color={theme.colors.secondary}
              />
              <Icon
                style={styles.Icon6728d304}
                name={'Ionicons/cloud-offline-outline'}
                size={48}
                color={theme.colors.primary}
              />
            </View>
          </View>
        )}
      </>
      <Modal
        visible={!Constants['ONB_CHAT_FIRST_LOGIN_DONE']}
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
            <Text style={[styles.Text05fd8236, { color: theme.colors.strong }]}>
              {'Welcome!'}
            </Text>

            <Text style={[styles.Texted011454, { color: theme.colors.medium }]}>
              {
                "Let's start by chatting with StudyBot to get your account set up"
              }
            </Text>
            <Divider
              style={styles.Divider1594ed8a}
              color={theme.colors.secondary}
            />
            <ButtonOutline
              onPress={() => {
                try {
                  setGlobalVariableValue({
                    key: 'ONB_CHAT_FIRST_LOGIN_DONE',
                    value: true,
                  });
                } catch (err) {
                  console.error(err);
                }
              }}
              style={[
                styles.ButtonOutlineff73505f,
                {
                  color: theme.colors.success,
                  borderColor: theme.colors.success,
                },
              ]}
              title={'Got it!'}
            />
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  ButtonOutlineff73505f: {
    borderRadius: 8,
    borderWidth: 1,
    fontFamily: 'NotoSans_700Bold',
    fontSize: 17,
    marginTop: 32,
    minWidth: '50%',
    textAlign: 'center',
  },
  Divider1594ed8a: {
    height: 4,
    width: '20%',
  },
  Icon6728d304: {
    marginTop: 16,
  },
  Text05fd8236: {
    alignSelf: 'center',
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 32,
    marginBottom: 24,
    textAlign: 'center',
  },
  Textc329822a: {
    alignSelf: 'center',
    fontFamily: 'NotoSans_400Regular',
    fontSize: 17,
    marginBottom: 32,
    textAlign: 'center',
  },
  Texted011454: {
    alignSelf: 'center',
    fontFamily: 'NotoSans_400Regular',
    fontSize: 17,
    marginBottom: 32,
    textAlign: 'center',
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
  View7fd69692: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: '40%',
  },
  screen: {
    height: '100%',
    width: '100%',
  },
});

export default withTheme(ChathomeScreen);
