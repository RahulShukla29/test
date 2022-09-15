import React from 'react';
import * as AirtableSupportToDoListsApi from '../apis/AirtableSupportToDoListsApi.js';
import * as PublicApi from '../apis/PublicApi.js';
import * as CustomCode from '../components.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import {
  Divider,
  IconButton,
  ScreenContainer,
  Spacer,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Fetch } from 'react-request';

const MainsupportdetailsScreen = props => {
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
              style={[styles.Text056f72f7, { color: theme.colors.primary }]}
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
        style={[styles.View5da65c00, { backgroundColor: theme.colors.white2 }]}
      >
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
                style={[styles.Text70ac2572, { color: theme.colors.strong }]}
              >
                {'Summary'}
              </Text>
            </View>
            <View />
          </View>

          <Text style={[styles.Textae2b8bde, { color: theme.colors.medium }]}>
            {props.route?.params?.support_step_label ??
              'Keep up with your notes'}
          </Text>

          <Text style={[styles.Text46c5a9e5, { color: theme.colors.medium }]}>
            {props.route?.params?.support_step_details ??
              'Find a note taking system that works for you and stick with it'}
          </Text>
        </View>
        <Spacer top={8} right={8} bottom={8} left={8} />
        <View style={styles.View88c44c3e}>
          <Text style={[styles.Text23077a1f, { color: theme.colors.medium }]}>
            {'Details'}
          </Text>
        </View>

        <View>
          <View>
            <AirtableSupportToDoListsApi.FetchGETSupportTemplateStepDetailsGET
              support_template_step_id={
                props.route?.params?.support_template_step_id ??
                'rec5j9I2g6VoNyWts'
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
                refetchGETSupportTemplateStepDetails,
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
                    data={fetchData?.records}
                    listKey={'mlSYJya9'}
                    keyExtractor={item => item?.id || item?.uuid || item}
                    renderItem={({ item }) => {
                      const listData = item;
                      return (
                        <>
                          <View style={styles.Viewe2836020}>
                            <View style={styles.Viewc992f941}>
                              <View style={styles.Viewdebd3207}>
                                <View style={styles.View2e322f82}>
                                  <Text
                                    style={[
                                      styles.Text414e2683,
                                      { color: theme.colors.strong },
                                    ]}
                                  >
                                    {listData?.fields?.prompt}
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
                              </View>
                            </View>
                          </View>
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
            </AirtableSupportToDoListsApi.FetchGETSupportTemplateStepDetailsGET>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
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
  Text056f72f7: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 28,
  },
  Text23077a1f: {
    fontFamily: 'NotoSerif_400Regular',
    fontSize: 15,
    textTransform: 'uppercase',
  },
  Text414e2683: {
    flexShrink: 1,
    fontFamily: 'NotoSans_400Regular',
    fontSize: 17,
  },
  Text46c5a9e5: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 15,
    textAlign: 'left',
  },
  Text5597fcb0: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 15,
    marginTop: 4,
  },
  Text70ac2572: {
    fontFamily: 'NotoSerif_400Regular',
    fontSize: 15,
    textTransform: 'uppercase',
  },
  Text95760f16: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 15,
  },
  Textae2b8bde: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 17,
    paddingBottom: 8,
    paddingTop: 8,
    textAlign: 'left',
  },
  View0838316d: {
    alignContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 6,
    paddingTop: 20,
  },
  View2e322f82: {
    alignItems: 'flex-start',
    flex: 1,
    marginRight: 8,
  },
  View358df241: {
    borderTopWidth: 2,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
  },
  View5da65c00: {
    paddingBottom: 48,
    paddingLeft: 16,
    paddingRight: 16,
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
  Viewe2836020: {
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
    paddingTop: 16,
  },
});

export default withTheme(MainsupportdetailsScreen);
