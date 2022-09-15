import React from 'react';
import * as AirtableLessonPagesApi from '../apis/AirtableLessonPagesApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import getImageUrl from '../custom/getImageUrl';
import useIsOnline from '../utils/useIsOnline';
import {
  ButtonOutline,
  Divider,
  Icon,
  IconButton,
  ScreenContainer,
  Spacer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Fetch } from 'react-request';

const LearnhomeScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const { theme } = props;
  const { navigation } = props;
  const isOnline = useIsOnline();

  return (
    <ScreenContainer
      style={{ borderRadius: 12, backgroundColor: theme.colors.background }}
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
              style={[styles.Texta9630d5f, { color: theme.colors.primary }]}
            >
              {'Learn'}
            </Text>

            <Text style={[styles.Text95760f16, { color: theme.colors.medium }]}>
              {'Lesson summaries'}
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
            color={theme.colors.mediumLight}
            size={32}
            icon={'Ionicons/menu'}
          />
        </View>
        <Divider
          style={styles.Dividerd3e9cb1c}
          color={theme.colors.secondary}
        />
      </View>
      <Spacer top={12} right={8} bottom={12} left={8} />
      {/* All Lesson Summaries */}
      <AirtableLessonPagesApi.FetchGETLessonSummariesGET>
        {({ loading, error, data, refetchGETLessonSummaries }) => {
          const allLessonSummariesData = data;
          if (!allLessonSummariesData || loading) {
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
              {/* Current Lesson */}
              <>
                {!Constants['LESSON_LABEL_CURRENT'] ? null : (
                  <View style={styles.View9fa86917}>
                    <View>
                      {/* Current Lesson Heading */}
                      <Text
                        style={[
                          styles.Textcba0cc78,
                          { color: theme.colors.strong },
                        ]}
                        ellipsizeMode={'tail'}
                        textBreakStrategy={'highQuality'}
                        allowFontScaling={true}
                      >
                        {'Current lesson'}
                      </Text>
                    </View>
                    <Spacer top={4} bottom={4} />
                    {/* CurrentLessonList */}
                    <FlatList
                      data={allLessonSummariesData?.records}
                      listKey={'NP4MHycU'}
                      keyExtractor={item => item?.id || item?.uuid || item}
                      renderItem={({ item }) => {
                        const currentLessonListData = item;
                        return (
                          <>
                            {/* Article */}
                            <>
                              {!(
                                currentLessonListData?.fields
                                  ?.lesson_label_id ===
                                Constants['LESSON_LABEL_CURRENT']
                              ) ? null : (
                                <View>
                                  <Touchable
                                    onPress={() => {
                                      try {
                                        navigation.navigate(
                                          'LearndetailsScreen',
                                          {
                                            lesson_label_id:
                                              currentLessonListData?.fields
                                                ?.lesson_label_id,
                                            lesson_summary:
                                              currentLessonListData?.fields,
                                          }
                                        );
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    }}
                                  >
                                    <View
                                      style={[
                                        styles.Viewfc8ceb39,
                                        {
                                          borderRadius: 8,
                                          borderColor: theme.colors.mediumLight,
                                          backgroundColor: theme.colors.white2,
                                        },
                                      ]}
                                    >
                                      <View>
                                        <Image
                                          style={styles.Image6ba238f9}
                                          source={{
                                            uri: `${getImageUrl(
                                              currentLessonListData?.fields
                                                ?.main_image,
                                              'thumbnails_large'
                                            )}`,
                                          }}
                                          resizeMode={'cover'}
                                        />
                                        <View style={styles.View92841ded}>
                                          {/* Title */}
                                          <Text
                                            style={[
                                              styles.Textcd3903d5,
                                              { color: theme.colors.strong },
                                            ]}
                                            numberOfLines={3}
                                            ellipsizeMode={'tail'}
                                          >
                                            {
                                              currentLessonListData?.fields
                                                ?.title
                                            }
                                          </Text>
                                        </View>
                                        <Divider
                                          style={styles.Dividerde11d607}
                                          color={theme.colors.divider}
                                        />
                                        {/* More */}
                                        <View
                                          style={[
                                            styles.Viewb28a284b,
                                            {
                                              backgroundColor:
                                                theme.colors.light,
                                            },
                                          ]}
                                        >
                                          <Text
                                            style={[
                                              styles.Text95760f16,
                                              { color: theme.colors.medium },
                                            ]}
                                          >
                                            {
                                              currentLessonListData?.fields
                                                ?.category
                                            }
                                          </Text>
                                          {/* More Button */}
                                          <IconButton
                                            icon={'Feather/more-vertical'}
                                            size={24}
                                            color={theme.colors.mediumLight}
                                          />
                                        </View>
                                      </View>
                                    </View>
                                  </Touchable>
                                </View>
                              )}
                            </>
                          </>
                        );
                      }}
                      numColumns={1}
                    />
                    <Spacer top={16} right={8} bottom={16} left={8} />
                  </View>
                )}
              </>
              {/* All Lessons */}
              <View style={{ backgroundColor: theme.colors.background }}>
                <View style={styles.View9fa86917}>
                  {/* All Lessons Heading */}
                  <Text
                    style={[
                      styles.Text88cb08a6,
                      { color: theme.colors.strong },
                    ]}
                    textBreakStrategy={'highQuality'}
                    allowFontScaling={true}
                  >
                    {'ALL LESSONS'}
                  </Text>
                </View>
                <Spacer top={4} bottom={4} />
                {/* AllLessonsList */}
                <FlatList
                  data={allLessonSummariesData?.records}
                  listKey={'tgW6Cbre'}
                  keyExtractor={item => item?.id || item?.uuid || item}
                  renderItem={({ item }) => {
                    const allLessonsListData = item;
                    return (
                      <>
                        {/* Article */}
                        <View style={styles.View3424aab2}>
                          <Touchable
                            onPress={() => {
                              try {
                                navigation.navigate('LearndetailsScreen', {
                                  lesson_label_id:
                                    allLessonsListData?.fields?.lesson_label_id,
                                  lesson_summary: allLessonsListData?.fields,
                                });
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            <View
                              style={[
                                styles.Viewfc8ceb39,
                                {
                                  borderRadius: 8,
                                  borderColor: theme.colors.mediumLight,
                                  backgroundColor: theme.colors.white2,
                                },
                              ]}
                            >
                              <View>
                                <Image
                                  style={styles.Imageaa4c2214}
                                  source={{
                                    uri: `${getImageUrl(
                                      allLessonsListData?.fields?.main_image,
                                      'thumbnails_large'
                                    )}`,
                                  }}
                                  resizeMode={'cover'}
                                />
                                <View style={styles.Viewf3ed85fb}>
                                  {/* Title */}
                                  <Text
                                    style={[
                                      styles.Textee7fc2b4,
                                      { color: theme.colors.strong },
                                    ]}
                                    numberOfLines={4}
                                    ellipsizeMode={'tail'}
                                  >
                                    {allLessonsListData?.fields?.title}
                                  </Text>
                                </View>
                                {/* More */}
                                <View
                                  style={[
                                    styles.Viewc39ff27d,
                                    {
                                      backgroundColor: theme.colors.light,
                                      borderColor: theme.colors.divider,
                                    },
                                  ]}
                                >
                                  <View
                                    style={[
                                      styles.Viewd8eca576,
                                      { borderRadius: 64 },
                                    ]}
                                  >
                                    {/* Category */}
                                    <Text
                                      style={[
                                        styles.Textbd3fb2f5,
                                        { color: theme.colors.medium },
                                      ]}
                                    >
                                      {allLessonsListData?.fields?.category}
                                    </Text>
                                  </View>
                                  <Icon
                                    size={18}
                                    name={'Feather/more-vertical'}
                                    color={theme.colors.mediumLight}
                                  />
                                </View>
                              </View>
                            </View>
                          </Touchable>
                        </View>
                        <Spacer top={10} right={8} left={8} />
                      </>
                    );
                  }}
                  contentContainerStyle={styles.FlatListf980efe8Content}
                  numColumns={2}
                />
              </View>
            </>
          );
        }}
      </AirtableLessonPagesApi.FetchGETLessonSummariesGET>
      <Modal
        visible={!Constants['ONB_LEARN_1']}
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
              {'Learn'}
            </Text>

            <Text style={[styles.Texte6a538ca, { color: theme.colors.medium }]}>
              {
                'The learn page contains summaries of the lessons that StudyBot will discuss with you'
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
                    key: 'ONB_LEARN_1',
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
              title={'Cool'}
            />
          </View>
        </View>
      </Modal>
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
  Divider1594ed8a: {
    height: 4,
    width: '20%',
  },
  Dividerd3e9cb1c: {
    height: 4,
    width: '10%',
  },
  Dividerde11d607: {
    height: 1,
  },
  Fetch431eb058: {
    minHeight: 40,
  },
  FlatListf980efe8Content: {
    paddingLeft: 16,
  },
  Icon6728d304: {
    marginTop: 16,
  },
  Image6ba238f9: {
    height: 250,
    width: '100%',
  },
  Imageaa4c2214: {
    height: 160,
    width: '100%',
  },
  Text1aabb2e1: {
    alignSelf: 'center',
    fontFamily: 'NotoSans_400Regular',
    fontSize: 17,
    marginBottom: 32,
    textAlign: 'center',
  },
  Text88cb08a6: {
    fontFamily: 'NotoSerif_400Regular',
    fontSize: 15,
  },
  Text95760f16: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 15,
  },
  Texta9630d5f: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 28,
  },
  Textbd3fb2f5: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 13,
  },
  Textc9fab72a: {
    alignSelf: 'center',
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 32,
    marginBottom: 24,
    textAlign: 'center',
  },
  Textcba0cc78: {
    fontFamily: 'NotoSerif_400Regular',
    fontSize: 15,
    textTransform: 'uppercase',
  },
  Textcd3903d5: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 20,
  },
  Texte6a538ca: {
    alignSelf: 'center',
    fontFamily: 'NotoSans_400Regular',
    fontSize: 17,
    marginBottom: 32,
    textAlign: 'center',
  },
  Textee7fc2b4: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 17,
  },
  View3424aab2: {
    flex: 1,
    marginBottom: 10,
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
  View92841ded: {
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
  View9fa86917: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  Viewb28a284b: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  Viewc39ff27d: {
    alignItems: 'center',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 6,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 6,
  },
  Viewd8eca576: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Viewf3ed85fb: {
    flex: 1,
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
  },
  Viewfc8ceb39: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    overflow: 'hidden',
  },
});

export default withTheme(LearnhomeScreen);
