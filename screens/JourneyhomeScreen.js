import React from 'react';
import * as PublicApi from '../apis/PublicApi.js';
import * as CustomCode from '../components.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as Utils from '../utils';
import useIsOnline from '../utils/useIsOnline';
import {
  ButtonOutline,
  Divider,
  Icon,
  IconButton,
  ScreenContainer,
  Spacer,
  Surface,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { Modal, StyleSheet, Text, View } from 'react-native';

const JourneyhomeScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const getTodayStringLocal = () => {
    // Get the user's current time zone
    // Format in sv-SE (which is the same as ISO) and cut off the time to get the local user date
    // Just getting the date may be off when the ISO time (UTC) is not the same calendar day as user

    const currentDate = new Date();
    const timezoneOffset = currentDate.getTimezoneOffset(); // Offset in minutes and avoid using Intl
    var todayString = new Date(
      currentDate.getTime() - timezoneOffset * 60 * 1000
    )
      .toISOString()
      .slice(0, 10);

    return todayString;
  };

  const { theme } = props;
  const { navigation } = props;
  const isOnline = useIsOnline();

  const publicFUNCRpc$checkClearSessionStreakPOST =
    PublicApi.useFUNCRpc$checkClearSessionStreakPOST();

  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }
        await publicFUNCRpc$checkClearSessionStreakPOST.mutateAsync({
          local_date: getTodayStringLocal(),
          user_id: Constants['USER_ID'],
        });
        const userJson = await PublicApi.gETUserGET(Constants, {
          user_id: Constants['USER_ID'],
        });
        setGlobalVariableValue({
          key: 'USER_JSON',
          value: userJson,
        });
        const sessionStreak = userJson[0]['session_streak'];
        setSESSION_STREAK(sessionStreak);
        const sessionsCompleted = userJson[0]['sessions_completed'];
        setSESSIONS_COMPLETED(sessionsCompleted);
        const studentLevelTitle = userJson[0]['student_level_title'];
        setSTUDENT_LEVEL_TITLE(studentLevelTitle);
        const sessions = await PublicApi.gETStudentSessionsHistoryViewGET(
          Constants,
          { user_id: Constants['USER_ID'] }
        );
        setSESSIONS(sessions);
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused]);

  const [SESSIONS, setSESSIONS] = React.useState([]);
  const [SESSIONS_COMPLETED, setSESSIONS_COMPLETED] = React.useState(0);
  const [SESSION_STREAK, setSESSION_STREAK] = React.useState(0);
  const [STUDENT_LEVEL_TITLE, setSTUDENT_LEVEL_TITLE] = React.useState('-');

  return (
    <ScreenContainer
      style={{ backgroundColor: theme.colors.background }}
      hasTopSafeArea={true}
      scrollable={true}
    >
      {/* Header */}
      <View
        style={[styles.View9cdc2c05, { backgroundColor: theme.colors.white1 }]}
      >
        <View style={styles.View0838316d}>
          <View>
            {/* Tab name */}
            <Text
              style={[styles.Texta9630d5f, { color: theme.colors.primary }]}
            >
              {'Journey'}
            </Text>
            {/* Tab details */}
            <Text style={[styles.Text95760f16, { color: theme.colors.medium }]}>
              {'Keep making progress!!!'}
            </Text>
          </View>
          <IconButton
            onPress={() => {
              try {
                navigation.navigate('BottomTabNavigator', {
                  screen: 'MainNavigator',
                  params: { screen: 'SettingshomeScreen' },
                });
              } catch (err) {
                console.error(err);
              }
            }}
            size={32}
            color={theme.colors.mediumLight}
            icon={'Ionicons/menu'}
          />
        </View>
        <Divider
          style={styles.Dividerd3e9cb1c}
          color={theme.colors.secondary}
        />
      </View>
      <Spacer top={12} right={8} bottom={12} left={8} />
      <View style={styles.View202ca6e4}>
        <Text style={[styles.Text4fab986c, { color: theme.colors.medium }]}>
          {'Summary'}
        </Text>

        <Surface
          style={[
            styles.Surface430a9085,
            {
              backgroundColor: theme.colors.white1,
              borderRadius: 8,
              borderColor: theme.colors.mediumLight,
            },
          ]}
        >
          {/* Title */}
          <View style={styles.Viewc992f941}>
            <Text style={[styles.Text4cd056f6, { color: theme.colors.strong }]}>
              {STUDENT_LEVEL_TITLE}
            </Text>
          </View>

          <View style={styles.Viewc992f941}>
            <View>
              <Text
                style={[styles.Text8996d7ed, { color: theme.colors.strong }]}
              >
                {SESSION_STREAK}
              </Text>

              <Text
                style={[styles.Text8a00d6fd, { color: theme.colors.medium }]}
              >
                {'Day streak'}
              </Text>
            </View>
          </View>

          <View style={styles.Viewc992f941}>
            <View>
              <Text
                style={[styles.Text8996d7ed, { color: theme.colors.strong }]}
              >
                {SESSIONS_COMPLETED}
              </Text>

              <Text
                style={[styles.Text8a00d6fd, { color: theme.colors.medium }]}
              >
                {'Total sessions'}
              </Text>
            </View>
          </View>
        </Surface>
        <Spacer top={12} right={8} bottom={12} left={8} />
        <Text style={[styles.Text23077a1f, { color: theme.colors.medium }]}>
          {'Recent sessions'}
        </Text>

        <Surface
          style={[
            styles.Surface3b43bea2,
            {
              backgroundColor: theme.colors.white1,
              borderColor: theme.colors.mediumLight,
              borderRadius: 8,
            },
          ]}
        >
          <Utils.CustomCodeErrorBoundary>
            <CustomCode.CalendarComponent sessions={SESSIONS} />
          </Utils.CustomCodeErrorBoundary>
        </Surface>
        <Spacer top={12} right={8} bottom={12} left={8} />
        <Spacer top={12} right={8} bottom={12} left={8} />
      </View>

      <Modal
        visible={!Constants['ONB_JOURNEY_1']}
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
            <Text style={[styles.Textc9fab72a, { color: theme.colors.strong }]}>
              {'Journey'}
            </Text>

            <Text style={[styles.Text1a190857, { color: theme.colors.medium }]}>
              {'Track your promotions and session streaks!'}
            </Text>
            <Divider
              style={styles.Divider1594ed8a}
              color={theme.colors.secondary}
            />
            <ButtonOutline
              onPress={() => {
                try {
                  setGlobalVariableValue({
                    key: 'ONB_JOURNEY_1',
                    value: true,
                  });
                } catch (err) {
                  console.error(err);
                }
              }}
              style={[
                styles.ButtonOutline941f5899,
                {
                  color: theme.colors.success,
                  borderColor: theme.colors.success,
                },
              ]}
              title={'Ready'}
            />
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  ButtonOutline941f5899: {
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
  Dividerd3e9cb1c: {
    height: 4,
    width: '10%',
  },
  Icon6728d304: {
    marginTop: 16,
  },
  Surface3b43bea2: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    marginTop: 8,
    minHeight: 40,
    paddingBottom: 16,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 16,
  },
  Surface430a9085: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    flexDirection: 'row',
    marginTop: 8,
    minHeight: 40,
    overflow: 'hidden',
    paddingBottom: 8,
    paddingTop: 8,
  },
  Text05fd8236: {
    alignSelf: 'center',
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 32,
    marginBottom: 24,
    textAlign: 'center',
  },
  Text1a190857: {
    alignSelf: 'center',
    fontFamily: 'NotoSans_400Regular',
    fontSize: 17,
    marginBottom: 32,
    textAlign: 'center',
  },
  Text1aabb2e1: {
    alignSelf: 'center',
    fontFamily: 'NotoSans_400Regular',
    fontSize: 17,
    marginBottom: 32,
    textAlign: 'center',
  },
  Text23077a1f: {
    fontFamily: 'NotoSerif_400Regular',
    fontSize: 15,
    textTransform: 'uppercase',
  },
  Text26b53715: {
    fontFamily: 'NotoSans_400Regular',
    textTransform: 'uppercase',
  },
  Text4068c82a: {
    fontFamily: 'NotoSans_400Regular',
    textTransform: 'uppercase',
  },
  Text4cd056f6: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 17,
    textAlign: 'center',
  },
  Text4fab986c: {
    fontFamily: 'NotoSerif_400Regular',
    fontSize: 15,
    textTransform: 'uppercase',
  },
  Text8996d7ed: {
    fontFamily: 'NotoSans_700Bold',
    fontSize: 24,
    textAlign: 'center',
  },
  Text8a00d6fd: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 13,
    textAlign: 'center',
  },
  Text95760f16: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 15,
  },
  Texta9630d5f: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 28,
  },
  Textc9fab72a: {
    alignSelf: 'center',
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 32,
    marginBottom: 24,
    textAlign: 'center',
  },
  View0838316d: {
    alignContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 6,
    paddingTop: 20,
  },
  View202ca6e4: {
    paddingBottom: 10,
    paddingLeft: 16,
    paddingRight: 16,
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
  View9cdc2c05: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  Viewc992f941: {
    flex: 1,
  },
});

export default withTheme(JourneyhomeScreen);
