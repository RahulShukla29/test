import React from 'react';
import * as AirtableLessonPagesApi from '../apis/AirtableLessonPagesApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import getImageUrl from '../custom/getImageUrl';
import {
  Divider,
  Link,
  ScreenContainer,
  Spacer,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Fetch } from 'react-request';

const LearndetailsScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const { theme } = props;

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={true}
      hasTopSafeArea={false}
    >
      <AirtableLessonPagesApi.FetchGETONELessonSummaryGET
        lesson_label_id={
          props.route?.params?.lesson_label_id ?? 'growth_mindset'
        }
      >
        {({ loading, error, data, refetchGETONELessonSummary }) => {
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
              data={fetchData?.records}
              listKey={'R16z88zS'}
              keyExtractor={item => item?.id || item?.uuid || item}
              renderItem={({ item }) => {
                const listData = item;
                return (
                  <>
                    <View style={styles.View8b12cbb4}>
                      <ImageBackground
                        style={styles.ImageBackground8f6ed0a5}
                        source={{
                          uri: `${getImageUrl(
                            listData?.fields?.main_image,
                            'thumbnails_large'
                          )}`,
                        }}
                        resizeMode={'cover'}
                      />
                    </View>

                    <View>
                      <View style={styles.View4a223bd5}>
                        <Text
                          style={[
                            styles.Text8196c440,
                            { color: theme.colors.strong },
                          ]}
                        >
                          {listData?.fields?.category}
                        </Text>
                        <Spacer top={4} right={8} bottom={4} left={8} />
                        <Text
                          style={[
                            styles.Text920c76ee,
                            { color: theme.colors.primary },
                          ]}
                          textBreakStrategy={'highQuality'}
                          ellipsizeMode={'head'}
                          allowFontScaling={true}
                          numberOfLines={4}
                        >
                          {listData?.fields?.title}
                        </Text>
                        <Divider
                          style={styles.Dividerd3e9cb1c}
                          color={theme.colors.secondary}
                        />
                        <Spacer right={8} left={8} />
                        <View
                          style={[
                            styles.View358df241,
                            {
                              backgroundColor: theme.colors.light,
                              borderColor: theme.colors.secondary,
                            },
                          ]}
                        >
                          <View style={styles.Viewdebd3207}>
                            <View
                              style={[
                                styles.Viewd08718c1,
                                { backgroundColor: theme.colors.secondary },
                              ]}
                            >
                              <Text
                                style={[
                                  styles.Text785bf791,
                                  { color: theme.colors.strong },
                                ]}
                              >
                                {'Summary'}
                              </Text>
                            </View>
                          </View>

                          <Text
                            style={[
                              styles.Texte9f32114,
                              { color: theme.colors.medium },
                            ]}
                          >
                            {listData?.fields?.summary}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.View55c7dbd3}>
                        <Text
                          style={[
                            styles.Textef9c9051,
                            { color: theme.colors.medium },
                          ]}
                        >
                          {'Details'}
                        </Text>
                        <Spacer right={8} left={8} top={4} bottom={4} />
                        <Text
                          style={[
                            styles.Texta8ac79f9,
                            { color: theme.colors.medium },
                          ]}
                        >
                          {listData?.fields?.details}
                        </Text>
                      </View>
                    </View>
                  </>
                );
              }}
              contentContainerStyle={styles.FlatListc992f941Content}
              numColumns={1}
            />
          );
        }}
      </AirtableLessonPagesApi.FetchGETONELessonSummaryGET>
      <Spacer right={8} left={8} />
      <AirtableLessonPagesApi.FetchGETLessonDetailsGET
        method={'GET'}
        lesson_label_id={
          props.route?.params?.lesson_label_id ?? 'growth_mindset'
        }
      >
        {({ loading, error, data, refetchGETLessonDetails }) => {
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
            <View>
              <View
                style={[
                  styles.Viewad8c7a1c,
                  { backgroundColor: theme.colors.light },
                ]}
              >
                {/* View - Prompts */}
                <View>
                  <Text
                    style={[
                      styles.Text4fab986c,
                      { color: theme.colors.medium },
                    ]}
                  >
                    {'Prompts'}
                  </Text>
                  <Spacer right={8} left={8} top={4} bottom={4} />
                  <FlatList
                    data={fetchData?.records}
                    listKey={'RaiVhtxb'}
                    keyExtractor={item => item?.id || item?.uuid || item}
                    renderItem={({ item }) => {
                      const listData = item;
                      return (
                        <>
                          {!listData?.fields?.published_prompt ? null : (
                            <View>
                              <Link
                                style={[
                                  styles.Link651f1ab4,
                                  { color: theme.colors.medium },
                                ]}
                                title={`${listData?.fields?.detail_text}`}
                              />
                              <Divider
                                style={styles.Divider22627dc6}
                                color={theme.colors.mediumLight}
                              />
                            </View>
                          )}
                        </>
                      );
                    }}
                    contentContainerStyle={styles.FlatListc992f941Content}
                    numColumns={1}
                  />
                </View>
                <Spacer right={8} left={8} />
                {/* View - Sources */}
                <View>
                  <Text
                    style={[
                      styles.Text23077a1f,
                      { color: theme.colors.medium },
                    ]}
                  >
                    {'Sources'}
                  </Text>
                  <Spacer right={8} left={8} top={4} bottom={4} />
                  <FlatList
                    data={fetchData?.records}
                    listKey={'3Apdz5Vc'}
                    keyExtractor={item => item?.id || item?.uuid || item}
                    renderItem={({ item }) => {
                      const listData = item;
                      return (
                        <>
                          {!listData?.fields?.published_source ? null : (
                            <View>
                              <Link
                                onPress={() => {
                                  const handler = async () => {
                                    try {
                                      await WebBrowser.openBrowserAsync(
                                        `${listData?.fields?.url}`
                                      );
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  };
                                  handler();
                                }}
                                style={[
                                  styles.Link205ceb5f,
                                  {
                                    color: theme.colors.medium,
                                    textDecorationColor: theme.colors.success,
                                  },
                                ]}
                                title={`${listData?.fields?.detail_text}`}
                              />
                              <Divider
                                style={styles.Divider22627dc6}
                                color={theme.colors.mediumLight}
                              />
                            </View>
                          )}
                        </>
                      );
                    }}
                    contentContainerStyle={styles.FlatListc992f941Content}
                    numColumns={1}
                  />
                </View>
              </View>
            </View>
          );
        }}
      </AirtableLessonPagesApi.FetchGETLessonDetailsGET>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  Divider22627dc6: {
    height: 1,
    marginBottom: 12,
    marginTop: 12,
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
  ImageBackground8f6ed0a5: {
    height: '100%',
    justifyContent: 'flex-end',
    width: '100%',
  },
  Link205ceb5f: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  Link651f1ab4: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 15,
  },
  Text23077a1f: {
    fontFamily: 'NotoSerif_400Regular',
    fontSize: 15,
    textTransform: 'uppercase',
  },
  Text4fab986c: {
    fontFamily: 'NotoSerif_400Regular',
    fontSize: 15,
    textTransform: 'uppercase',
  },
  Text785bf791: {
    fontFamily: 'NotoSerif_400Regular',
    fontSize: 15,
    textTransform: 'uppercase',
  },
  Text8196c440: {
    fontFamily: 'NotoSerif_400Regular',
    fontSize: 15,
    textTransform: 'uppercase',
  },
  Text920c76ee: {
    fontFamily: 'NotoSans_700Bold',
    fontSize: 24,
    marginBottom: 6,
  },
  Texta8ac79f9: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 15,
    lineHeight: 20,
    textAlign: 'left',
  },
  Texte9f32114: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 15,
    lineHeight: 20,
    marginTop: 8,
    textAlign: 'left',
  },
  Textef9c9051: {
    fontFamily: 'NotoSerif_400Regular',
    fontSize: 15,
    textTransform: 'uppercase',
  },
  View358df241: {
    borderTopWidth: 2,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
  },
  View4a223bd5: {
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
  },
  View55c7dbd3: {
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
  },
  View8b12cbb4: {
    height: 200,
    width: '100%',
  },
  Viewad8c7a1c: {
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
  },
  Viewd08718c1: {
    flexDirection: 'row',
    paddingBottom: 2,
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 2,
  },
  Viewdebd3207: {
    flexDirection: 'row',
  },
});

export default withTheme(LearndetailsScreen);
