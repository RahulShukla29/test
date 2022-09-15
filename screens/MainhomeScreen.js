import React from 'react';
import * as PublicApi from '../apis/PublicApi.js';
import * as CustomCode from '../components.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import useIsOnline from '../utils/useIsOnline';
import {
  ButtonOutline,
  CircleImage,
  Divider,
  Icon,
  IconButton,
  ScreenContainer,
  Spacer,
  Surface,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Fetch } from 'react-request';

const MainhomeScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const getTodayStringLocal = () => {
    const currentDate = new Date();
    const timezoneOffset = currentDate.getTimezoneOffset(); // Offset in minutes and avoid using Intl
    var todayString = new Date(
      currentDate.getTime() - timezoneOffset * 60 * 1000
    )
      .toISOString()
      .slice(0, 10);

    return todayString;
  };

  // Creates string to be used in API e.g., "eq.2022-07-25"
  const filterQueryToday = () => {
    // Get the user's current time zone
    // Format in ISO and cut off the time to get the local user date
    // Just getting the date may be off when the ISO time (UTC) is not the same calendar day as user

    const currentDate = new Date();
    const timezoneOffset = currentDate.getTimezoneOffset(); // Offset in minutes and avoid using Intl
    var todayString = new Date(
      currentDate.getTime() - timezoneOffset * 60 * 1000
    )
      .toISOString()
      .slice(0, 10);

    return 'eq.' + todayString;
  };

  // Creates string to be used in API e.g., "ne.2022-07-25"
  const filterQueryNotToday = () => {
    // Get the user's current time zone
    // Format in ISO and cut off the time to get the local user date
    // Just getting the date may be off when the ISO time (UTC) is not the same calendar day as user

    const currentDate = new Date();
    const timezoneOffset = currentDate.getTimezoneOffset(); // Offset in minutes and avoid using Intl
    var todayString = new Date(
      currentDate.getTime() - timezoneOffset * 60 * 1000
    )
      .toISOString()
      .slice(0, 10);

    return 'neq.' + todayString;
  };

  // Gets the name of the day of the week
  const getDayName = Variables => {
    // https://stackoverflow.com/questions/24998624/day-name-from-date-in-js

    // Get the user's current time zone
    // Format in sv-SE (which is the same as ISO) and cut off the time to get the local user date
    // Just getting the date may be off when the ISO time (UTC) is not the same calendar day as user

    const currentDate = new Date();
    const timezoneOffset = currentDate.getTimezoneOffset(); // Offset in minutes and avoid using Intl
    var todayDateLocal = new Date(
      currentDate.getTime() - timezoneOffset * 60 * 1000
    );

    // Hard-coded workaround for Android, but be consistent in logic across all platforms
    // if (Platform.OS === 'ios'){
    //   return todayDateLocal.toLocaleString('en-US', { weekday: 'long'});
    // }
    dayOfWeek = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
    return dayOfWeek[todayDateLocal.getDay() - 1];
  };

  const { theme } = props;
  const { navigation } = props;
  const isOnline = useIsOnline();

  const publicFUNCRpc$checkClearSessionStreakPOST =
    PublicApi.useFUNCRpc$checkClearSessionStreakPOST();
  const publicPATCHUserSessionTypeSelectedPATCH =
    PublicApi.usePATCHUserSessionTypeSelectedPATCH();
  const publicPOSTStudentHabitEventPOST =
    PublicApi.usePOSTStudentHabitEventPOST();
  const publicPATCHStudentLessonHabitPATCH =
    PublicApi.usePATCHStudentLessonHabitPATCH();
  const publicDELETEStudentHabitEventDELETE =
    PublicApi.useDELETEStudentHabitEventDELETE();

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
        const userJson =
          await publicPATCHUserSessionTypeSelectedPATCH.mutateAsync({
            session_type_selected: 'chat',
            user_id: Constants['USER_ID'],
          });
        setGlobalVariableValue({
          key: 'USER_JSON',
          value: userJson,
        });
        const userCheckinDayCompletedLatest =
          userJson[0]['checkin_day_completed_latest'];
        setGlobalVariableValue({
          key: 'USER_CHECKIN_DAY_COMPLETED_LATEST',
          value: userCheckinDayCompletedLatest,
        });
        const user_uuid_val = userJson[0]['user_uuid_val'];
        setGlobalVariableValue({
          key: 'USER_UUID_VAL',
          value: user_uuid_val,
        });
        const lessonLabelCurrent = userJson[0]['lesson_label_current'];
        setGlobalVariableValue({
          key: 'LESSON_LABEL_CURRENT',
          value: lessonLabelCurrent,
        });
        if (Constants['ONB_CHAT_FIRST_LOGIN_DONE']) {
          return;
        }
        navigation.navigate('BottomTabNavigator', { screen: 'ChathomeScreen' });
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused]);

  return (
    <ScreenContainer
      style={{ backgroundColor: theme.colors.background }}
      scrollable={true}
      hasSafeArea={false}
      hasTopSafeArea={true}
    >
      {/* Header */}
      <View
        style={[styles.View9cdc2c05, { backgroundColor: theme.colors.white1 }]}
      >
        <View style={styles.View982143fe}>
          <View>
            <Text
              style={[styles.Text056f72f7, { color: theme.colors.primary }]}
            >
              {'Home'}
            </Text>

            <Text style={[styles.Text651f1ab4, { color: theme.colors.medium }]}>
              {getDayName()}
            </Text>
          </View>
          <IconButton
            onPress={() => {
              try {
                navigation.navigate('SettingshomeScreen');
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
      <View
        style={[
          styles.Viewfced85e3,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <View>
          <>
            {!(
              Constants['USER_CHECKIN_DAY_COMPLETED_LATEST'] !==
              getTodayStringLocal()
            ) ? null : (
              <View>
                <Text
                  style={[styles.Text119d3f3e, { color: theme.colors.medium }]}
                >
                  {"Today's sessions"}
                </Text>

                <Touchable
                  onPress={() => {
                    const handler = async () => {
                      try {
                        await publicPATCHUserSessionTypeSelectedPATCH.mutateAsync(
                          {
                            session_type_selected: 'checkin',
                            user_id: Constants['USER_ID'],
                          }
                        );
                        navigation.navigate('BottomTabNavigator', {
                          screen: 'ChathomeScreen',
                        });
                      } catch (err) {
                        console.error(err);
                      }
                    };
                    handler();
                  }}
                >
                  <Surface
                    style={[
                      styles.Surface14c5daf3,
                      {
                        backgroundColor: theme.colors.white1,
                        borderRadius: 8,
                        borderColor: theme.colors.mediumLight,
                      },
                    ]}
                    elevation={3}
                  >
                    <View style={styles.Viewaa50245c}>
                      <View style={styles.Viewe5589965}>
                        <CircleImage
                          style={styles.CircleImage6bf74529}
                          size={60}
                          source={Images.SessionCheckIn}
                        />
                      </View>

                      <View style={styles.View2df96209}>
                        <Text
                          style={[
                            styles.Text8657ae6c,
                            { color: theme.colors.strong },
                          ]}
                        >
                          {'Check-in'}
                        </Text>

                        <Text
                          style={[
                            styles.Textadff7b2d,
                            { color: theme.colors.medium },
                          ]}
                        >
                          {'Grow your learning abilities'}
                        </Text>
                      </View>
                    </View>
                    <Icon
                      size={24}
                      color={theme.colors.success}
                      name={'AntDesign/right'}
                    />
                  </Surface>
                </Touchable>
                <Spacer top={8} right={8} bottom={8} left={8} />
              </View>
            )}
          </>
        </View>

        <View>
          <View>
            <PublicApi.FetchGETStudentLessonHabitGET
              filterToday={filterQueryNotToday()}
              user_id={Constants['USER_ID']}
            >
              {({ loading, error, data, refetchGETStudentLessonHabit }) => {
                const fetchData = data;
                if (!fetchData || loading) {
                  return <ActivityIndicator />;
                }

                if (error) {
                  return (
                    <Text style={{ textAlign: 'center' }}>
                      There was a problem fetching this data
                    </Text>
                  );
                }

                return (
                  <>
                    <>
                      {!fetchData?.length ? null : (
                        <Text
                          style={[
                            styles.Textd8b7df48,
                            { color: theme.colors.medium },
                          ]}
                        >
                          {"Today's actions"}
                        </Text>
                      )}
                    </>
                    <>
                      {!fetchData?.length ? null : (
                        <Surface
                          style={[
                            styles.Surfaced46cf2c0,
                            {
                              backgroundColor: theme.colors.white1,
                              borderColor: theme.colors.mediumLight,
                              borderRadius: 8,
                            },
                          ]}
                        >
                          <FlatList
                            data={fetchData}
                            listKey={'TIKL5CMP'}
                            keyExtractor={item =>
                              item?.id || item?.uuid || item
                            }
                            renderItem={({ item }) => {
                              const listData = item;
                              return (
                                <View style={styles.Viewdc319ab4}>
                                  <View style={styles.Viewc15a6cd8}>
                                    <IconButton
                                      onPress={() => {
                                        const handler = async () => {
                                          try {
                                            await publicPOSTStudentHabitEventPOST.mutateAsync(
                                              {
                                                action: listData?.action_detail,
                                                habit_note: '',
                                                habit_step:
                                                  listData?.habit_step,
                                                name: 'Completed event',
                                                student_lesson_habit_id:
                                                  listData?.id,
                                                user_id: Constants['USER_ID'],
                                              }
                                            );
                                            await publicPATCHStudentLessonHabitPATCH.mutateAsync(
                                              {
                                                habit_completed_latest_date:
                                                  getTodayStringLocal(),
                                                habit_completed_previous_date:
                                                  listData?.habit_completed_latest_date,
                                                habit_step_count:
                                                  listData?.habit_step_count +
                                                  1,
                                                habit_total_count:
                                                  listData?.habit_total_count +
                                                  1,
                                                student_lesson_habit_id:
                                                  listData?.id,
                                              }
                                            );
                                          } catch (err) {
                                            console.error(err);
                                          }
                                        };
                                        handler();
                                      }}
                                      size={32}
                                      icon={
                                        'MaterialIcons/check-box-outline-blank'
                                      }
                                      color={theme.colors.primary}
                                    />
                                  </View>

                                  <View style={styles.Viewc992f941}>
                                    <Touchable
                                      onPress={() => {
                                        try {
                                          navigation.navigate(
                                            'MainactionScreen',
                                            {
                                              action_id: listData?.id,
                                              action_detail:
                                                listData?.action_detail,
                                              action_lesson_label:
                                                listData?.lesson_label,
                                              action_lesson_active:
                                                listData?.lesson_active,
                                            }
                                          );
                                        } catch (err) {
                                          console.error(err);
                                        }
                                      }}
                                    >
                                      <View style={styles.Viewfda9596b}>
                                        <View style={styles.View7210acc5}>
                                          <Text
                                            style={[
                                              styles.Textbf8cefba,
                                              { color: theme.colors.strong },
                                            ]}
                                          >
                                            {listData?.action_detail}
                                          </Text>

                                          <Text
                                            style={[
                                              styles.Textaff40344,
                                              {
                                                color: theme.colors.mediumLight,
                                              },
                                            ]}
                                          >
                                            {listData?.lesson_label}
                                          </Text>
                                        </View>
                                        <Icon
                                          size={24}
                                          color={theme.colors.success}
                                          name={'Feather/more-vertical'}
                                        />
                                      </View>
                                    </Touchable>
                                  </View>
                                </View>
                              );
                            }}
                            numColumns={1}
                          />
                        </Surface>
                      )}
                    </>
                    <>
                      {!fetchData?.length ? null : (
                        <Spacer top={8} right={8} bottom={8} left={8} />
                      )}
                    </>
                  </>
                );
              }}
            </PublicApi.FetchGETStudentLessonHabitGET>
          </View>
        </View>

        <View>
          <View>
            <PublicApi.FetchGETStudentSupportActivitiesGET
              user_id={Constants['USER_ID']}
            >
              {({
                loading,
                error,
                data,
                refetchGETStudentSupportActivities,
              }) => {
                const fetchData = data;
                if (!fetchData || loading) {
                  return <ActivityIndicator />;
                }

                if (error) {
                  return (
                    <Text style={{ textAlign: 'center' }}>
                      There was a problem fetching this data
                    </Text>
                  );
                }

                return (
                  <>
                    <>
                      {!fetchData?.length ? null : (
                        <Text
                          style={[
                            styles.Text4fab986c,
                            { color: theme.colors.medium },
                          ]}
                        >
                          {'Ongoing support'}
                        </Text>
                      )}
                    </>
                    <>
                      {!fetchData?.length ? null : (
                        <Surface
                          style={[
                            styles.Surfaced46cf2c0,
                            {
                              backgroundColor: theme.colors.white1,
                              borderColor: theme.colors.mediumLight,
                              borderRadius: 8,
                            },
                          ]}
                        >
                          <FlatList
                            data={fetchData}
                            listKey={'ebFfMEw5'}
                            keyExtractor={item =>
                              item?.id || item?.uuid || item
                            }
                            renderItem={({ item }) => {
                              const listData = item;
                              return (
                                <View style={styles.Viewdc319ab4}>
                                  <View style={styles.Viewc15a6cd8}></View>

                                  <View style={styles.Viewc992f941}>
                                    <Touchable
                                      onPress={() => {
                                        try {
                                          navigation.navigate(
                                            'MainsupportScreen',
                                            {
                                              student_support_activity_id:
                                                listData?.id,
                                              support_name: listData?.name,
                                              support_label: listData?.label,
                                              support_label_id:
                                                listData?.support_label_id,
                                            }
                                          );
                                        } catch (err) {
                                          console.error(err);
                                        }
                                      }}
                                    >
                                      <View style={styles.Viewfda9596b}>
                                        <View style={styles.View7210acc5}>
                                          <Text
                                            style={[
                                              styles.Text77e445ac,
                                              { color: theme.colors.strong },
                                            ]}
                                          >
                                            {listData?.name}
                                          </Text>

                                          <Text
                                            style={[
                                              styles.Textadff7b2d,
                                              { color: theme.colors.medium },
                                            ]}
                                          >
                                            {listData?.label}
                                          </Text>
                                        </View>
                                        <Icon
                                          size={24}
                                          color={theme.colors.success}
                                          name={'Feather/more-vertical'}
                                        />
                                      </View>
                                    </Touchable>
                                  </View>
                                </View>
                              );
                            }}
                            numColumns={1}
                          />
                        </Surface>
                      )}
                    </>
                    <Divider
                      style={styles.Divider1535eeac}
                      color={theme.colors.secondary}
                    />
                  </>
                );
              }}
            </PublicApi.FetchGETStudentSupportActivitiesGET>
          </View>
        </View>

        <View style={styles.Viewef2638f1}>
          <View>
            <Text
              style={[styles.Text720365ab, { color: theme.colors.mediumLight }]}
            >
              {'Other chat sessions'}
            </Text>

            <Touchable
              onPress={() => {
                const handler = async () => {
                  try {
                    await publicPATCHUserSessionTypeSelectedPATCH.mutateAsync({
                      session_type_selected: 'prep_session',
                      user_id: Constants['USER_ID'],
                    });
                    navigation.navigate('BottomTabNavigator', {
                      screen: 'ChathomeScreen',
                    });
                  } catch (err) {
                    console.error(err);
                  }
                };
                handler();
              }}
            >
              {/* option */}
              <View
                style={[
                  styles.View8d56f9fd,
                  {
                    borderRadius: 8,
                    backgroundColor: theme.colors.light,
                    borderColor: theme.colors.divider,
                  },
                ]}
              >
                <View style={styles.Viewaa50245c}>
                  <View style={styles.Viewe49ef939}>
                    <CircleImage
                      style={styles.CircleImage6bf74529}
                      source={Images.SessionSupportBw}
                      size={60}
                    />
                  </View>

                  <View style={styles.View2df96209}>
                    <Text
                      style={[
                        styles.Text948229db,
                        { color: theme.colors.medium },
                      ]}
                    >
                      {'Support'}
                    </Text>

                    <Text
                      style={[
                        styles.Textadff7b2d,
                        { color: theme.colors.medium },
                      ]}
                    >
                      {'Help get unstuck'}
                    </Text>
                  </View>
                </View>
                <Icon
                  size={24}
                  color={theme.colors.mediumLight}
                  name={'AntDesign/right'}
                />
              </View>
            </Touchable>

            <Touchable
              onPress={() => {
                const handler = async () => {
                  try {
                    await publicPATCHUserSessionTypeSelectedPATCH.mutateAsync({
                      session_type_selected: 'weekly_planning_session',
                      user_id: Constants['USER_ID'],
                    });
                    navigation.navigate('BottomTabNavigator', {
                      screen: 'ChathomeScreen',
                    });
                  } catch (err) {
                    console.error(err);
                  }
                };
                handler();
              }}
            >
              {/* option */}
              <View
                style={[
                  styles.View8d56f9fd,
                  {
                    borderRadius: 8,
                    backgroundColor: theme.colors.light,
                    borderColor: theme.colors.divider,
                  },
                ]}
              >
                <View style={styles.Viewaa50245c}>
                  <View style={styles.View2e0e3fdb}>
                    <CircleImage
                      style={styles.CircleImage6bf74529}
                      size={60}
                      source={Images.SessionWeeklyPlanningBw}
                    />
                  </View>

                  <View style={styles.View2df96209}>
                    <Text
                      style={[
                        styles.Text948229db,
                        { color: theme.colors.medium },
                      ]}
                    >
                      {'Weekly planning'}
                    </Text>

                    <Text
                      style={[
                        styles.Textcd90548d,
                        { color: theme.colors.medium },
                      ]}
                    >
                      {'Master your time management'}
                    </Text>
                  </View>
                </View>
                <Icon
                  size={24}
                  color={theme.colors.mediumLight}
                  name={'AntDesign/right'}
                />
              </View>
            </Touchable>
          </View>
        </View>

        <View>
          <View>
            <PublicApi.FetchGETStudentLessonHabitGET
              filterToday={filterQueryToday()}
              user_id={Constants['USER_ID']}
            >
              {({ loading, error, data, refetchGETStudentLessonHabit }) => {
                const fetchData = data;
                if (!fetchData || loading) {
                  return <ActivityIndicator />;
                }

                if (error) {
                  return (
                    <Text style={{ textAlign: 'center' }}>
                      There was a problem fetching this data
                    </Text>
                  );
                }

                return (
                  <>
                    <>
                      {!fetchData?.length ? null : (
                        <Text
                          style={[
                            styles.Texta290f449,
                            { color: theme.colors.mediumLight },
                          ]}
                        >
                          {'Completed actions!'}
                        </Text>
                      )}
                    </>
                    <>
                      {!fetchData?.length ? null : (
                        <Surface
                          style={[
                            styles.Surface72ea04e2,
                            {
                              backgroundColor: theme.colors.background,
                              borderColor: theme.colors.mediumLight,
                              borderRadius: 8,
                            },
                          ]}
                        >
                          <FlatList
                            data={fetchData}
                            listKey={'sr18U1I1'}
                            keyExtractor={item =>
                              item?.id || item?.uuid || item
                            }
                            renderItem={({ item }) => {
                              const listData = item;
                              return (
                                <View style={styles.Viewdc319ab4}>
                                  <View style={styles.Viewc15a6cd8}>
                                    <IconButton
                                      onPress={() => {
                                        const handler = async () => {
                                          try {
                                            await publicPATCHStudentLessonHabitPATCH.mutateAsync(
                                              {
                                                habit_completed_latest_date:
                                                  listData?.habit_completed_previous_date,
                                                habit_completed_previous_date:
                                                  listData?.habit_completed_previous_date,
                                                habit_step_count:
                                                  listData?.habit_step_count -
                                                  1,
                                                habit_total_count:
                                                  listData?.habit_total_count -
                                                  1,
                                                student_lesson_habit_id:
                                                  listData?.id,
                                              }
                                            );
                                            await publicDELETEStudentHabitEventDELETE.mutateAsync(
                                              {
                                                habit_completed_date:
                                                  getTodayStringLocal(),
                                                student_lesson_habit:
                                                  listData?.id,
                                              }
                                            );
                                          } catch (err) {
                                            console.error(err);
                                          }
                                        };
                                        handler();
                                      }}
                                      size={32}
                                      color={theme.colors.mediumLight}
                                      icon={
                                        'MaterialCommunityIcons/checkbox-marked'
                                      }
                                    />
                                  </View>

                                  <View style={styles.Viewc992f941}>
                                    <Touchable
                                      onPress={() => {
                                        try {
                                          navigation.navigate(
                                            'MainactionScreen',
                                            {
                                              action_id: listData?.id,
                                              action_detail:
                                                listData?.action_detail,
                                              action_lesson_label:
                                                listData?.action_detail,
                                              action_lesson_active:
                                                listData?.lesson_active,
                                            }
                                          );
                                        } catch (err) {
                                          console.error(err);
                                        }
                                      }}
                                    >
                                      <View style={styles.Viewfda9596b}>
                                        <View style={styles.View7210acc5}>
                                          <Text
                                            style={[
                                              styles.Text6234b122,
                                              {
                                                color: theme.colors.mediumLight,
                                              },
                                            ]}
                                          >
                                            {listData?.action_detail}
                                          </Text>

                                          <Text
                                            style={[
                                              styles.Textf1badbeb,
                                              {
                                                color: theme.colors.mediumLight,
                                              },
                                            ]}
                                          >
                                            {listData?.lesson_label}
                                          </Text>
                                        </View>
                                        <Icon
                                          size={24}
                                          color={theme.colors.mediumLight}
                                          name={'Feather/more-vertical'}
                                        />
                                      </View>
                                    </Touchable>
                                  </View>
                                </View>
                              );
                            }}
                            numColumns={1}
                          />
                        </Surface>
                      )}
                    </>
                  </>
                );
              }}
            </PublicApi.FetchGETStudentLessonHabitGET>
          </View>
        </View>
      </View>
      <>
        {!Constants['ONB_CHAT_FIRST_LOGIN_DONE'] ? null : (
          <Modal
            visible={!Constants['ONB_MAIN_1']}
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
                  style={[styles.Text05fd8236, { color: theme.colors.strong }]}
                >
                  {'Check-ins'}
                </Text>

                <Text
                  style={[styles.Text197e4179, { color: theme.colors.medium }]}
                >
                  {
                    'During a daily check-in chat, StudyBot will introduce you to helpful lessons and work to help you develop essential habits!\n\nIf you have any ongoing chats, those will need to be finished first'
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
                        key: 'ONB_MAIN_1',
                        value: true,
                      });
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={[
                    styles.ButtonOutlinebf916e77,
                    {
                      color: theme.colors.success,
                      borderColor: theme.colors.success,
                    },
                  ]}
                  title={'Ok!'}
                />
              </View>
            </View>
          </Modal>
        )}
      </>
      <>
        {!Constants['ONB_MAIN_1'] ? null : (
          <Modal
            visible={!Constants['ONB_MAIN_2']}
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
                  {'Other chat sessions'}
                </Text>

                <Text
                  style={[styles.Texte6a538ca, { color: theme.colors.medium }]}
                >
                  {
                    'For a support or weekly planning session, StudyBot will guide you through a helpful discussion!\n\nAny ongoing chats will first need to be wrapped up'
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
                        key: 'ONB_MAIN_2',
                        value: true,
                      });
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={[
                    styles.ButtonOutline24d4816e,
                    {
                      color: theme.colors.success,
                      borderColor: theme.colors.success,
                    },
                  ]}
                  title={'Thanks!'}
                />
              </View>
            </View>
          </Modal>
        )}
      </>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  ButtonOutline24d4816e: {
    borderRadius: 8,
    borderWidth: 1,
    fontFamily: 'NotoSans_700Bold',
    fontSize: 17,
    marginTop: 32,
    minWidth: '50%',
    textAlign: 'center',
  },
  ButtonOutlinebf916e77: {
    borderRadius: 8,
    borderWidth: 1,
    fontFamily: 'NotoSans_700Bold',
    fontSize: 17,
    marginTop: 32,
    minWidth: '50%',
    textAlign: 'center',
  },
  CircleImage6bf74529: {
    height: 40,
    width: 40,
  },
  Divider1535eeac: {
    height: 2,
  },
  Divider1594ed8a: {
    height: 4,
    width: '20%',
  },
  Dividerd3e9cb1c: {
    height: 4,
    width: '10%',
  },
  Fetch431eb058: {
    minHeight: 40,
  },
  Icon6728d304: {
    marginTop: 16,
  },
  Surface14c5daf3: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    marginTop: 8,
    minHeight: 40,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
  },
  Surface72ea04e2: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    marginBottom: 8,
    marginTop: 8,
    minHeight: 40,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
  },
  Surfaced46cf2c0: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    marginBottom: 8,
    marginTop: 8,
    minHeight: 40,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
  },
  Text056f72f7: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 28,
  },
  Text05fd8236: {
    alignSelf: 'center',
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 32,
    marginBottom: 24,
    textAlign: 'center',
  },
  Text119d3f3e: {
    fontFamily: 'NotoSerif_400Regular',
    fontSize: 15,
    textTransform: 'uppercase',
  },
  Text197e4179: {
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
  Text4fab986c: {
    fontFamily: 'NotoSerif_400Regular',
    fontSize: 15,
    textTransform: 'uppercase',
  },
  Text6234b122: {
    flex: 1,
    flexShrink: 1,
    fontFamily: 'NotoSans_400Regular',
    fontSize: 17,
    textDecorationLine: 'line-through',
  },
  Text651f1ab4: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 15,
  },
  Text720365ab: {
    fontFamily: 'NotoSerif_400Regular',
    fontSize: 15,
    textTransform: 'uppercase',
  },
  Text77e445ac: {
    flex: 1,
    flexShrink: 1,
    fontFamily: 'NotoSans_400Regular',
    fontSize: 17,
  },
  Text8657ae6c: {
    fontFamily: 'NotoSans_700Bold',
    fontSize: 17,
  },
  Text948229db: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 17,
  },
  Text955b5c98: {
    alignSelf: 'center',
    fontFamily: 'NotoSans_700Bold',
    fontSize: 32,
    marginBottom: 24,
    textAlign: 'center',
  },
  Texta290f449: {
    fontFamily: 'NotoSerif_400Regular',
    fontSize: 15,
    textTransform: 'uppercase',
  },
  Textadff7b2d: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 15,
    marginTop: 2,
  },
  Textaff40344: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 15,
    marginTop: 2,
  },
  Textbf8cefba: {
    flex: 1,
    flexShrink: 1,
    fontFamily: 'NotoSans_400Regular',
    fontSize: 17,
  },
  Textc9fab72a: {
    alignSelf: 'center',
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 32,
    marginBottom: 24,
    textAlign: 'center',
  },
  Textcd90548d: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 15,
    paddingTop: 2,
  },
  Textd8b7df48: {
    fontFamily: 'NotoSerif_400Regular',
    fontSize: 15,
    textTransform: 'uppercase',
  },
  Texte6a538ca: {
    alignSelf: 'center',
    fontFamily: 'NotoSans_400Regular',
    fontSize: 17,
    marginBottom: 32,
    textAlign: 'center',
  },
  Textf1badbeb: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 15,
    marginTop: 2,
    textDecorationLine: 'line-through',
  },
  View2df96209: {
    alignItems: 'flex-start',
    marginRight: 24,
  },
  View2e0e3fdb: {
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginRight: 14,
    maxHeight: 32,
    maxWidth: 32,
    minHeight: 32,
    minWidth: 32,
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
  View7210acc5: {
    alignItems: 'flex-start',
    flex: 1,
    flexShrink: 1,
    marginRight: 8,
  },
  View8d56f9fd: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    marginTop: 4,
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
  },
  View982143fe: {
    alignContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 6,
    paddingTop: 20,
  },
  View9cdc2c05: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  Viewaa50245c: {
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  Viewc15a6cd8: {
    alignContent: 'center',
    justifyContent: 'space-around',
    marginRight: 14,
    maxHeight: 32,
    maxWidth: 32,
    minHeight: 32,
    minWidth: 32,
  },
  Viewc992f941: {
    flex: 1,
  },
  Viewdc319ab4: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingBottom: 8,
    paddingTop: 8,
  },
  Viewe49ef939: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginRight: 14,
    maxHeight: 32,
    maxWidth: 32,
    minHeight: 32,
    minWidth: 32,
  },
  Viewe5589965: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginRight: 14,
    maxHeight: 32,
    maxWidth: 32,
    minHeight: 32,
    minWidth: 32,
  },
  Viewef2638f1: {
    marginTop: 16,
    paddingBottom: 16,
  },
  Viewfced85e3: {
    flex: 1,
    paddingBottom: 48,
    paddingLeft: 16,
    paddingRight: 16,
  },
  Viewfda9596b: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default withTheme(MainhomeScreen);
