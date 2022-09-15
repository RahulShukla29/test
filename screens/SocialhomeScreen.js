import React from 'react';
import * as PublicApi from '../apis/PublicApi.js';
import * as CustomCode from '../components.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import useIsOnline from '../utils/useIsOnline';
import {
  ButtonOutline,
  Divider,
  Icon,
  IconButton,
  ScreenContainer,
  Surface,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Fetch } from 'react-request';

const SocialhomeScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  // Create postgres filter to add
  const concatFilterString = (field, value) => {
    return '&' + field + '=eq.' + value;
  };

  const { theme } = props;
  const { navigation } = props;
  const isOnline = useIsOnline();

  const publicPOSTPostsFollowPOST = PublicApi.usePOSTPostsFollowPOST();
  const publicPATCHStudentSessionPostPATCH =
    PublicApi.usePATCHStudentSessionPostPATCH();
  const publicDELETEPostsFollowDELETE = PublicApi.useDELETEPostsFollowDELETE();

  const [listExists, setListExists] = React.useState(true);
  const [listMissing, setListMissing] = React.useState(false);
  const [menuTab1, setMenuTab1] = React.useState(true);
  const [menuTab2, setMenuTab2] = React.useState(false);
  const [modalFlagFlagCount, setModalFlagFlagCount] = React.useState(0);
  const [modalFlagId, setModalFlagId] = React.useState('');
  const [modalFlagLikeCount, setModalFlagLikeCount] = React.useState(0);
  const [modalPostFlag, setModalPostFlag] = React.useState(false);
  const [noContent, setNoContent] = React.useState(false);
  const [postsJson, setPostsJson] = React.useState([]);
  const [returnAllNonUserPosts, setReturnAllNonUserPosts] =
    React.useState(true);
  const [userPostsFilter, setUserPostsFilter] = React.useState('');

  return (
    <ScreenContainer
      style={{ backgroundColor: theme.colors.background }}
      hasSafeArea={false}
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
              style={[styles.Text056f72f7, { color: theme.colors.primary }]}
            >
              {'Social'}
            </Text>
            {/* Tab details */}
            <Text style={[styles.Text95760f16, { color: theme.colors.medium }]}>
              {'Community posts'}
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
      <View
        style={[
          styles.View4e1c342f,
          { backgroundColor: theme.colors.background },
        ]}
      />
      {/* Second Navigation Frame */}
      <View
        style={[
          styles.View00e1f31b,
          { backgroundColor: theme.colors.background },
        ]}
      >
        {/* 3 Options Frame */}
        <View style={styles.View10a8e0eb}>
          {/* Option 1 Frame */}
          <View
            style={[
              styles.Viewb528ac0b,
              {
                backgroundColor: theme.colors.custom_rgb244_246_249,
                borderTopLeftRadius: 64,
                borderBottomLeftRadius: 64,
              },
            ]}
          >
            {/* Flex Frame for Touchable */}
            <>
              {!menuTab1 ? null : (
                <View>
                  <Touchable
                    onPress={() => {
                      try {
                        setMenuTab1(true);
                        setMenuTab2(false);
                        setListMissing(false);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  >
                    {/* Button Frame True */}
                    <View
                      style={[
                        styles.View8d0a03eb,
                        {
                          borderRadius: 64,
                          backgroundColor: theme.colors.secondary,
                          borderColor: theme.colors.secondary,
                        },
                      ]}
                    >
                      {/* Label */}
                      <Text
                        style={[
                          styles.Text183a65fe,
                          { color: theme.colors.strong },
                        ]}
                      >
                        {'All'}
                      </Text>
                    </View>
                  </Touchable>
                </View>
              )}
            </>
            {/* Flex Frame for Touchable */}
            <>
              {menuTab1 ? null : (
                <View
                  style={{
                    backgroundColor: theme.colors.custom_rgb244_246_249,
                    borderTopLeftRadius: 64,
                    borderBottomLeftRadius: 64,
                  }}
                >
                  <Touchable
                    onPress={() => {
                      try {
                        setMenuTab1(true);
                        setMenuTab2(false);
                        setListMissing(false);
                        setUserPostsFilter('');
                        setReturnAllNonUserPosts(true);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  >
                    {/* Button Frame False */}
                    <View
                      style={[
                        styles.Viewec82fd1d,
                        {
                          borderRadius: 64,
                          borderColor: theme.colors.mediumLight,
                        },
                      ]}
                    >
                      {/* Label */}
                      <Text
                        style={[
                          styles.Textbcbdd4b2,
                          { color: theme.colors.strong },
                        ]}
                      >
                        {'All'}
                      </Text>
                    </View>
                  </Touchable>
                </View>
              )}
            </>
          </View>
          {/* Option 2 Frame */}
          <View style={styles.View7b593d28}>
            {/* Flex Frame for Touchable */}
            <>
              {!menuTab2 ? null : (
                <View>
                  <Touchable
                    onPress={() => {
                      try {
                        setMenuTab1(false);
                        setMenuTab2(true);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  >
                    {/* Button Frame True */}
                    <View
                      style={[
                        styles.View1bb9ac8d,
                        {
                          backgroundColor: theme.colors.secondary,
                          borderRadius: 64,
                          borderColor: theme.colors.secondary,
                        },
                      ]}
                    >
                      {/* Label */}
                      <Text
                        style={[
                          styles.Text03b425ba,
                          { color: theme.colors.custom_rgb255_255_255 },
                        ]}
                      >
                        {'My posts'}
                      </Text>
                    </View>
                  </Touchable>
                </View>
              )}
            </>
            {/* Flex Frame for Touchable */}
            <>
              {menuTab2 ? null : (
                <View
                  style={{
                    backgroundColor: theme.colors.custom_rgb244_246_249,
                  }}
                >
                  <Touchable
                    onPress={() => {
                      try {
                        setMenuTab1(false);
                        setMenuTab2(true);
                        setListMissing(true);
                        const post_filter_string = concatFilterString(
                          'user',
                          Constants['USER_ID']
                        );
                        setUserPostsFilter(post_filter_string);
                        setReturnAllNonUserPosts(false);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  >
                    {/* Button Frame False */}
                    <View
                      style={[
                        styles.View08def274,
                        {
                          backgroundColor: theme.colors.custom_rgb244_246_249,
                          borderRadius: 64,
                          borderColor: theme.colors.mediumLight,
                        },
                      ]}
                    >
                      {/* Label */}
                      <Text
                        style={[
                          styles.Textbcbdd4b2,
                          { color: theme.colors.strong },
                        ]}
                      >
                        {'My posts'}
                      </Text>
                    </View>
                  </Touchable>
                </View>
              )}
            </>
          </View>
        </View>
      </View>

      <View
        style={[
          styles.View6ce095bd,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <PublicApi.FetchFUNCGetStudentSessionPostsFollowsGET
          return_all={returnAllNonUserPosts}
          type={'Like'}
          user_id={Constants['USER_ID']}
        >
          {({
            loading,
            error,
            data,
            refetchFUNCGetStudentSessionPostsFollows,
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
              <FlatList
                data={fetchData}
                listKey={'jXGgENbN'}
                keyExtractor={item => item?.id || item?.uuid || item}
                renderItem={({ item }) => {
                  const listData = item;
                  return (
                    <Surface
                      style={[
                        styles.Surface1b8cd028,
                        {
                          backgroundColor: theme.colors.white1,
                          borderRadius: 8,
                          borderColor: theme.colors.mediumLight,
                        },
                      ]}
                      elevation={0}
                    >
                      <View style={styles.View02a568ec}>
                        <Text
                          style={[
                            styles.Textaaa4c350,
                            { color: theme.colors.medium },
                          ]}
                        >
                          {listData?.post_category_label}
                        </Text>

                        <Text
                          style={[
                            styles.Text447b2508,
                            { color: theme.colors.strong },
                          ]}
                        >
                          {listData?.post_text}
                        </Text>
                      </View>

                      <View
                        style={[
                          styles.Viewfc90c419,
                          {
                            borderColor: theme.colors.divider,
                            backgroundColor: theme.colors.light,
                          },
                        ]}
                      >
                        <View style={styles.View7d6a39b7}>
                          <>
                            {listData?.followed_by_user ? null : (
                              <IconButton
                                onPress={() => {
                                  const handler = async () => {
                                    try {
                                      await publicPOSTPostsFollowPOST.mutateAsync(
                                        {
                                          follow_type: 'Like',
                                          session_id: listData?.id,
                                          user_id: Constants['USER_ID'],
                                        }
                                      );
                                      await publicPATCHStudentSessionPostPATCH.mutateAsync(
                                        {
                                          post_flag_count:
                                            listData?.post_flag_count,
                                          post_likes_count:
                                            listData?.post_likes_count + 1,
                                          session_id: listData?.id,
                                        }
                                      );
                                      await refetchFUNCGetStudentSessionPostsFollows();
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  };
                                  handler();
                                }}
                                icon={'Ionicons/heart-outline'}
                                color={theme.colors.primary}
                                size={22}
                              />
                            )}
                          </>
                          <>
                            {!listData?.followed_by_user ? null : (
                              <IconButton
                                onPress={() => {
                                  const handler = async () => {
                                    try {
                                      await publicDELETEPostsFollowDELETE.mutateAsync(
                                        {
                                          follower_user_id:
                                            Constants['USER_ID'],
                                          session_id: listData?.id,
                                        }
                                      );
                                      await publicPATCHStudentSessionPostPATCH.mutateAsync(
                                        {
                                          post_flag_count:
                                            listData?.post_flag_count,
                                          post_likes_count:
                                            listData?.post_likes_count - 1,
                                          session_id: listData?.id,
                                        }
                                      );
                                      await refetchFUNCGetStudentSessionPostsFollows();
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  };
                                  handler();
                                }}
                                icon={'Ionicons/heart'}
                                color={theme.colors.primary}
                                size={22}
                              />
                            )}
                          </>
                          <Text
                            style={[
                              styles.Textaaa4c350,
                              { color: theme.colors.medium },
                            ]}
                          >
                            {listData?.post_likes_count}
                            {' likes'}
                          </Text>
                        </View>

                        <View style={styles.View88c44c3e}>
                          <IconButton
                            onPress={() => {
                              try {
                                setModalFlagId(listData?.id);
                                setModalFlagLikeCount(
                                  listData?.post_likes_count
                                );
                                setModalFlagFlagCount(
                                  listData?.post_flag_count
                                );
                                setModalPostFlag(true);
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                            size={22}
                            icon={'Ionicons/md-flag-outline'}
                            color={theme.colors.mediumLight}
                          />
                        </View>
                      </View>
                    </Surface>
                  );
                }}
                contentContainerStyle={styles.FlatListc992f941Content}
                numColumns={1}
              />
            );
          }}
        </PublicApi.FetchFUNCGetStudentSessionPostsFollowsGET>
      </View>

      <Modal
        visible={!Constants['ONB_SOCIAL_1']}
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
              {'Social'}
            </Text>

            <Text style={[styles.Text1a190857, { color: theme.colors.medium }]}>
              {
                'Support other studiers by liking their posts!\n\nAny public messages that you share with StudyBot will also show up here'
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
                    key: 'ONB_SOCIAL_1',
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
              title={'Will do!'}
            />
          </View>
        </View>
      </Modal>

      <Modal visible={modalPostFlag} animationType={'slide'} transparent={true}>
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
              {'Flag'}
            </Text>

            <Text style={[styles.Textcc4061c5, { color: theme.colors.medium }]}>
              {
                'Do you feel this post should be flagged because it meets at least one of the following?\n\n- Rude or offensive\n- Negatively refers to someone\n- Off-topic\n- Otherwise violates the terms of StudyBot'
              }
            </Text>
            <Divider
              style={styles.Divider1594ed8a}
              color={theme.colors.secondary}
            />
            <View style={styles.View1324b9e2}>
              <ButtonOutline
                onPress={() => {
                  try {
                    setModalPostFlag(false);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={[
                  styles.ButtonOutlined51c5134,
                  {
                    borderColor: theme.colors.mediumLight,
                    color: theme.colors.mediumLight,
                  },
                ]}
                title={'No / Cancel'}
              />
              <ButtonOutline
                onPress={() => {
                  const handler = async () => {
                    try {
                      await publicPOSTPostsFollowPOST.mutateAsync({
                        follow_type: 'Flag',
                        session_id: modalFlagId,
                        user_id: Constants['USER_ID'],
                      });
                      await publicPATCHStudentSessionPostPATCH.mutateAsync({
                        post_flag_count: modalFlagFlagCount + 1,
                        post_likes_count: modalFlagLikeCount,
                        session_id: modalFlagId,
                      });
                      setModalPostFlag(false);
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
                style={[
                  styles.ButtonOutline5c5b7812,
                  {
                    color: theme.colors.success,
                    borderColor: theme.colors.success,
                  },
                ]}
                title={'Yes, flag it'}
              />
            </View>
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  ButtonOutline5c5b7812: {
    borderRadius: 8,
    borderWidth: 1,
    fontFamily: 'NotoSans_700Bold',
    fontSize: 17,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 32,
    minWidth: '50%',
    textAlign: 'center',
  },
  ButtonOutline941f5899: {
    borderRadius: 8,
    borderWidth: 1,
    fontFamily: 'NotoSans_700Bold',
    fontSize: 17,
    marginTop: 32,
    minWidth: '50%',
    textAlign: 'center',
  },
  ButtonOutlined51c5134: {
    borderRadius: 8,
    borderWidth: 1,
    fontFamily: 'NotoSans_700Bold',
    fontSize: 17,
    marginLeft: 8,
    marginRight: 8,
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
  Fetch431eb058: {
    minHeight: 40,
  },
  FlatListc992f941Content: {
    flex: 1,
  },
  Icon6728d304: {
    marginTop: 16,
  },
  Surface1b8cd028: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    marginBottom: 12,
    minHeight: 40,
    overflow: 'hidden',
    paddingTop: 12,
  },
  Text03b425ba: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 15,
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
  Text183a65fe: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 15,
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
  Text447b2508: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 15,
    marginTop: 8,
  },
  Text95760f16: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 15,
  },
  Textaaa4c350: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 13,
  },
  Textbcbdd4b2: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 15,
  },
  Textc9fab72a: {
    alignSelf: 'center',
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 32,
    marginBottom: 24,
    textAlign: 'center',
  },
  Textcc4061c5: {
    alignSelf: 'center',
    fontFamily: 'NotoSans_400Regular',
    fontSize: 17,
    marginBottom: 32,
    textAlign: 'left',
  },
  Textcced2b26: {
    fontFamily: 'NotoSans_700Bold',
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
  },
  View00e1f31b: {
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  View02a568ec: {
    paddingLeft: 12,
    paddingRight: 12,
  },
  View0419a0dc: {
    flexGrow: 1,
    flexShrink: 0,
  },
  View0838316d: {
    alignContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 6,
    paddingTop: 20,
  },
  View08def274: {
    alignItems: 'center',
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    flexGrow: 0,
    flexShrink: 0,
    justifyContent: 'center',
    paddingBottom: 9,
    paddingLeft: 9,
    paddingRight: 9,
    paddingTop: 9,
  },
  View10a8e0eb: {
    flexDirection: 'row',
    paddingTop: 12,
  },
  View1324b9e2: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  View1bb9ac8d: {
    alignItems: 'center',
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    flexGrow: 0,
    flexShrink: 0,
    justifyContent: 'center',
    paddingBottom: 9,
    paddingLeft: 9,
    paddingRight: 9,
    paddingTop: 9,
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
  View4e1c342f: {
    height: 24,
  },
  View5c7bb784: {
    alignItems: 'center',
    flex: 1,
    flexShrink: 0,
    justifyContent: 'center',
  },
  View6ce095bd: {
    marginTop: 20,
    paddingBottom: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  View7b593d28: {
    flex: 1,
    flexGrow: 1,
    flexShrink: 0,
  },
  View7d6a39b7: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  View88c44c3e: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  View8d0a03eb: {
    alignItems: 'center',
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    flexGrow: 0,
    flexShrink: 0,
    justifyContent: 'center',
    paddingBottom: 9,
    paddingLeft: 9,
    paddingRight: 9,
    paddingTop: 9,
  },
  View9cdc2c05: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  Viewb528ac0b: {
    flex: 1,
    flexGrow: 1,
    flexShrink: 0,
    justifyContent: 'center',
  },
  Viewbaaf91e2: {
    alignItems: 'center',
    flexShrink: 0,
    justifyContent: 'center',
    marginLeft: 24,
    marginRight: 24,
    marginTop: 24,
  },
  Viewec82fd1d: {
    alignItems: 'center',
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    flexGrow: 0,
    flexShrink: 0,
    justifyContent: 'center',
    paddingBottom: 9,
    paddingLeft: 9,
    paddingRight: 9,
    paddingTop: 9,
  },
  Viewfc90c419: {
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingBottom: 4,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 4,
  },
});

export default withTheme(SocialhomeScreen);
