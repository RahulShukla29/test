import React from 'react';
import * as AirtableSupportToDoListsApi from '../apis/AirtableSupportToDoListsApi.js';
import * as PublicApi from '../apis/PublicApi.js';
import * as CustomCode from '../components.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
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
  Modal,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Fetch } from 'react-request';

const MainsupportScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  // Looks through the object array of completed support activities to determine if the step has been performed by the user
  const searchSupportChecked = (
    student_support_activity_step_id,
    student_support_activity_steps
  ) => {
    // student_support_activity_step_id - The Airtable record ID for this step
    // student_support_activity_steps - Returned value from API for all the steps the user has already completed for this activity

    // console.log(student_support_activity_step_id);

    let compare_id = student_support_activity_steps.filter(
      i =>
        i['student_support_activity_step_id'] ===
        student_support_activity_step_id
    ).length;

    //console.log(compare_id);
    return compare_id;
  };

  const { theme } = props;
  const { navigation } = props;

  const publicPOSTStudentSupportActivityStepPOST =
    PublicApi.usePOSTStudentSupportActivityStepPOST();
  const publicDELETEStudentSupportActivityStepDELETE =
    PublicApi.useDELETEStudentSupportActivityStepDELETE();
  const publicPATCHStudentSupportActivityPATCH =
    PublicApi.usePATCHStudentSupportActivityPATCH();

  const [modal_mark_as_complete, setModal_mark_as_complete] =
    React.useState(false);
  const [
    student_support_activity_step_data,
    setStudent_support_activity_step_data,
  ] = React.useState([]);

  return (
    <ScreenContainer
      style={{ backgroundColor: theme.colors.background }}
      hasSafeArea={false}
      scrollable={true}
      hasTopSafeArea={false}
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
              {props.route?.params?.support_name ?? 'Test name'}
            </Text>
            {/* Tab details */}
            <Text style={[styles.Text95760f16, { color: theme.colors.medium }]}>
              {props.route?.params?.support_label ?? 'Test label'}
            </Text>
          </View>
        </View>
        <Divider
          style={styles.Dividerd3e9cb1c}
          color={theme.colors.secondary}
        />
      </View>
      <Spacer top={12} right={8} bottom={12} left={8} />
      <View
        style={[styles.View257547ec, { backgroundColor: theme.colors.white2 }]}
      >
        <View style={styles.View88c44c3e}>
          <Text style={[styles.Text23077a1f, { color: theme.colors.medium }]}>
            {'Tasks'}
          </Text>

          <Text
            style={[
              styles.Text7d3e9940,
              {
                color: theme.colors.medium,
                textDecorationColor: theme.colors.success,
              },
            ]}
          >
            {'Select to see details'}
          </Text>
        </View>

        <View>
          <View>
            <PublicApi.FetchGETStudentSupportActivityStepsGET
              student_support_activity_id={
                props.route?.params?.student_support_activity_id ??
                'f50077d0-7dc3-4fba-917b-468df9f7a86a'
              }
              onData={fetchData => {
                try {
                  setStudent_support_activity_step_data(fetchData);
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              {({
                loading,
                error,
                data,
                refetchGETStudentSupportActivitySteps,
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

                return null;
              }}
            </PublicApi.FetchGETStudentSupportActivityStepsGET>
            <AirtableSupportToDoListsApi.FetchGETSupportTemplateStepsGET
              support_label_id={
                props.route?.params?.support_label_id ?? 'core_practices'
              }
            >
              {({ loading, error, data, refetchGETSupportTemplateSteps }) => {
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
                    listKey={'gWaae1Kp'}
                    keyExtractor={item => item?.id || item?.uuid || item}
                    renderItem={({ item }) => {
                      const listData = item;
                      return (
                        <>
                          <>
                            {listData?.fields
                              ?.support_template_step_id ? null : (
                              <View style={styles.View4c4a4b78}>
                                <View style={styles.Viewa118bcdb}>
                                  <IconButton
                                    onPress={() => {
                                      const handler = async () => {
                                        try {
                                          await publicPOSTStudentSupportActivityStepPOST.mutateAsync(
                                            {
                                              details:
                                                listData?.fields?.details,
                                              label: listData?.fields?.label,
                                              order: listData?.fields?.order,
                                              student_support_activity:
                                                props.route?.params
                                                  ?.student_support_activity_id ??
                                                'f50077d0-7dc3-4fba-917b-468df9f7a86a',
                                              student_support_activity_step_id:
                                                listData?.fields
                                                  ?.support_template_step_id,
                                              user_id: Constants['USER_ID'],
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
                                      'MaterialCommunityIcons/checkbox-blank-outline'
                                    }
                                    color={theme.colors.primary}
                                  />
                                </View>

                                <View style={styles.Viewc992f941}>
                                  <Touchable
                                    onPress={() => {
                                      try {
                                        navigation.navigate(
                                          'MainsupportdetailsScreen',
                                          {
                                            support_step_details:
                                              listData?.fields?.details,
                                            support_name:
                                              props.route?.params
                                                ?.support_name ?? 'Test name',
                                            support_label:
                                              props.route?.params
                                                ?.support_label ?? 'Test label',
                                            support_label_id:
                                              props.route?.params
                                                ?.support_label_id ??
                                              'core_practices',
                                            support_step_label:
                                              listData?.fields?.label,
                                            student_support_activity_id:
                                              props.route?.params
                                                ?.student_support_activity_id ??
                                              'f50077d0-7dc3-4fba-917b-468df9f7a86a',
                                            support_template_step_id:
                                              listData?.fields
                                                ?.support_template_step_id,
                                          }
                                        );
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    }}
                                  >
                                    <View style={styles.Viewdebd3207}>
                                      <View style={styles.View2e322f82}>
                                        <Text
                                          style={[
                                            styles.Text414e2683,
                                            { color: theme.colors.strong },
                                          ]}
                                        >
                                          {listData?.fields?.label}
                                        </Text>

                                        <Text
                                          style={[
                                            styles.Text5597fcb0,
                                            { color: theme.colors.medium },
                                          ]}
                                        >
                                          {listData?.fields?.details}
                                        </Text>
                                      </View>

                                      <View>
                                        <Icon
                                          size={24}
                                          color={theme.colors.success}
                                          name={'Feather/more-vertical'}
                                        />
                                      </View>
                                    </View>
                                  </Touchable>
                                </View>
                              </View>
                            )}
                          </>
                          <>
                            {!listData?.fields
                              ?.support_template_step_id ? null : (
                              <View style={styles.View4c4a4b78}>
                                <View style={styles.Viewa118bcdb}>
                                  <IconButton
                                    onPress={() => {
                                      const handler = async () => {
                                        try {
                                          await publicDELETEStudentSupportActivityStepDELETE.mutateAsync(
                                            {
                                              student_support_activity_id:
                                                props.route?.params
                                                  ?.student_support_activity_id ??
                                                'f50077d0-7dc3-4fba-917b-468df9f7a86a',
                                              student_support_activity_step_id:
                                                listData?.fields
                                                  ?.support_template_step_id,
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
                                          'MainsupportdetailsScreen',
                                          {
                                            support_name:
                                              props.route?.params
                                                ?.support_name ?? 'Test name',
                                            support_label:
                                              props.route?.params
                                                ?.support_label ?? 'Test label',
                                            support_label_id:
                                              props.route?.params
                                                ?.support_label_id ??
                                              'core_practices',
                                            student_support_activity_id:
                                              props.route?.params
                                                ?.student_support_activity_id ??
                                              'f50077d0-7dc3-4fba-917b-468df9f7a86a',
                                            support_template_step_id:
                                              listData?.fields
                                                ?.support_template_step_id,
                                          }
                                        );
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    }}
                                  >
                                    <View style={styles.Viewdebd3207}>
                                      <View style={styles.View2e322f82}>
                                        <Text
                                          style={[
                                            styles.Texte1f3a4f2,
                                            { color: theme.colors.mediumLight },
                                          ]}
                                        >
                                          {listData?.fields?.label}
                                        </Text>

                                        <Text
                                          style={[
                                            styles.Text3b3850d6,
                                            { color: theme.colors.mediumLight },
                                          ]}
                                        >
                                          {listData?.fields?.details}
                                        </Text>
                                      </View>

                                      <View>
                                        <Icon
                                          size={24}
                                          color={theme.colors.mediumLight}
                                          name={'Feather/more-vertical'}
                                        />
                                      </View>
                                    </View>
                                  </Touchable>
                                </View>
                              </View>
                            )}
                          </>
                          <Divider
                            style={styles.Dividerde11d607}
                            color={theme.colors.mediumLight}
                          />
                        </>
                      );
                    }}
                    numColumns={1}
                  />
                );
              }}
            </AirtableSupportToDoListsApi.FetchGETSupportTemplateStepsGET>
          </View>
        </View>

        <View style={styles.Viewd48587bd}>
          <ButtonOutline
            onPress={() => {
              try {
                setModal_mark_as_complete(true);
              } catch (err) {
                console.error(err);
              }
            }}
            style={[
              styles.ButtonOutlinea2a8a85e,
              {
                color: theme.colors.success,
                borderColor: theme.colors.success,
              },
            ]}
            title={'Mark as complete'}
          />
        </View>
      </View>

      <Modal
        visible={!Constants['ONB_SUPPORT_1']}
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
              {'Support'}
            </Text>

            <Text style={[styles.Text1a190857, { color: theme.colors.medium }]}>
              {
                'Some support sessions with StudyBot create a checklist to guide you through common challenges\n\nClick on each item for details'
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
                    key: 'ONB_SUPPORT_1',
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
              title={'Got it!'}
            />
          </View>
        </View>
      </Modal>

      <Modal
        visible={modal_mark_as_complete}
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
            <Text style={[styles.Text05fd8236, { color: theme.colors.strong }]}>
              {'Complete'}
            </Text>

            <Text style={[styles.Textc329822a, { color: theme.colors.medium }]}>
              {
                'Would you like to complete this support list and hide it from the home tab?\n\nNote: This cannot be undone.'
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
                    setModal_mark_as_complete(false);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={[
                  styles.ButtonOutline7b011a3e,
                  {
                    color: theme.colors.mediumLight,
                    borderColor: theme.colors.mediumLight,
                  },
                ]}
                title={'No'}
              />
              <ButtonOutline
                onPress={() => {
                  const handler = async () => {
                    try {
                      await publicPATCHStudentSupportActivityPATCH.mutateAsync({
                        student_support_activity_id:
                          props.route?.params?.student_support_activity_id ??
                          'f50077d0-7dc3-4fba-917b-468df9f7a86a',
                      });
                      setModal_mark_as_complete(false);
                      navigation.goBack();
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
                style={[
                  styles.ButtonOutline17c5c869,
                  {
                    color: theme.colors.success,
                    borderColor: theme.colors.success,
                  },
                ]}
                title={'Yes'}
              />
            </View>
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  ButtonOutline17c5c869: {
    borderRadius: 8,
    borderWidth: 1,
    fontFamily: 'NotoSans_700Bold',
    fontSize: 17,
    marginLeft: 8,
    minWidth: '40%',
    textAlign: 'center',
  },
  ButtonOutline24d4816e: {
    borderRadius: 8,
    borderWidth: 1,
    fontFamily: 'NotoSans_700Bold',
    fontSize: 17,
    marginTop: 32,
    minWidth: '50%',
    textAlign: 'center',
  },
  ButtonOutline7b011a3e: {
    borderRadius: 8,
    borderWidth: 1,
    fontFamily: 'NotoSans_700Bold',
    fontSize: 17,
    marginRight: 8,
    minWidth: '40%',
    textAlign: 'center',
  },
  ButtonOutlinea2a8a85e: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    borderWidth: 1,
    fontFamily: 'NotoSans_700Bold',
    fontSize: 15,
    marginRight: 16,
    paddingLeft: 16,
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
  Text23077a1f: {
    fontFamily: 'NotoSerif_400Regular',
    fontSize: 15,
    textTransform: 'uppercase',
  },
  Text3b3850d6: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 15,
    marginTop: 4,
    textDecorationLine: 'line-through',
  },
  Text414e2683: {
    flexShrink: 1,
    fontFamily: 'NotoSans_400Regular',
    fontSize: 17,
  },
  Text5597fcb0: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 15,
    marginTop: 4,
  },
  Text7d3e9940: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 15,
    textDecorationLine: 'underline',
    textTransform: 'none',
  },
  Text95760f16: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 15,
  },
  Texta9630d5f: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 28,
  },
  Textc329822a: {
    alignSelf: 'center',
    fontFamily: 'NotoSans_400Regular',
    fontSize: 17,
    marginBottom: 32,
    textAlign: 'center',
  },
  Textc9fab72a: {
    alignSelf: 'center',
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 32,
    marginBottom: 24,
    textAlign: 'center',
  },
  Texte1f3a4f2: {
    flexShrink: 1,
    fontFamily: 'NotoSans_400Regular',
    fontSize: 17,
    textDecorationLine: 'line-through',
  },
  View0838316d: {
    alignContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 6,
    paddingTop: 20,
  },
  View257547ec: {
    paddingBottom: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  View2e322f82: {
    alignItems: 'flex-start',
    flex: 1,
    marginRight: 8,
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
  View4baefe14: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
  },
  View4c4a4b78: {
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16,
    paddingTop: 16,
  },
  View88c44c3e: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  View9cdc2c05: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  Viewa118bcdb: {
    alignContent: 'center',
    marginRight: 14,
    maxHeight: 32,
    maxWidth: 32,
    minHeight: 32,
    minWidth: 32,
  },
  Viewc992f941: {
    flex: 1,
  },
  Viewd48587bd: {
    alignItems: 'center',
    marginTop: 32,
  },
  Viewdebd3207: {
    flexDirection: 'row',
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

export default withTheme(MainsupportScreen);
