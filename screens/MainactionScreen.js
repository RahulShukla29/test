import React from 'react';
import * as PublicApi from '../apis/PublicApi.js';
import * as CustomCode from '../components.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import {
  ButtonOutline,
  ButtonSolid,
  Divider,
  IconButton,
  ScreenContainer,
  Spacer,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { Modal, StyleSheet, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const MainactionScreen = props => {
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

  const publicEDITStudentLessonHabitPATCH =
    PublicApi.useEDITStudentLessonHabitPATCH();

  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      setTextAreaValue(
        props.route?.params?.action_detail ??
          'After seeing a successful professional person, I will think about all the work it took them to get there'
      );
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  const [modal_archive, setModal_archive] = React.useState(false);
  const [textAreaValue, setTextAreaValue] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');

  return (
    <ScreenContainer
      style={{ backgroundColor: theme.colors.background }}
      scrollable={true}
      hasSafeArea={false}
      hasTopSafeArea={false}
    >
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps={'never'}
        viewIsInsideTabBar={true}
        enableAutomaticScroll={true}
        enableOnAndroid={true}
        extraScrollHeight={36}
      >
        {/* Header */}
        <View
          style={[
            styles.Viewa246d622,
            { backgroundColor: theme.colors.white1 },
          ]}
        >
          <View style={styles.View0838316d}>
            <View>
              {/* Tab name */}
              <Text
                style={[styles.Text056f72f7, { color: theme.colors.primary }]}
              >
                {'Action'}
              </Text>
              {/* Tab details */}
              <Text
                style={[styles.Texte04d2cdd, { color: theme.colors.medium }]}
              >
                {props.route?.params?.action_lesson_label ?? 'Growth mindset'}
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
          style={[
            styles.View16fb8fa1,
            { backgroundColor: theme.colors.white2 },
          ]}
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
                  style={[styles.Text785bf791, { color: theme.colors.strong }]}
                >
                  {'Suggestions'}
                </Text>
              </View>
              <View />
            </View>

            <Text style={[styles.Text4804839b, { color: theme.colors.medium }]}>
              {'Feel free to modify your action to make it more helpful'}
            </Text>

            <Text style={[styles.Text9ce5bf68, { color: theme.colors.medium }]}>
              {
                'Too difficult?\nTake a smaller step\n\nToo vague?\nBe more specific\n\nToo hard to remember?\nPlan to do it after an existing habit'
              }
            </Text>
          </View>
          <Spacer right={8} left={8} top={4} bottom={4} />
          <View>
            <TextInput
              onChangeText={newTextInputValue => {
                try {
                  setTextAreaValue(newTextInputValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              style={[
                styles.TextInputbeadf348,
                {
                  backgroundColor: theme.colors.white1,
                  borderColor: theme.colors.divider,
                  color: theme.colors.medium,
                },
              ]}
              placeholder={
                props.route?.params?.action_detail ??
                'After seeing a successful professional person, I will think about all the work it took them to get there'
              }
              value={textAreaValue}
              multiline={true}
              numberOfLines={6}
              scrollEnabled={true}
              editable={true}
              autoFocus={false}
            />
          </View>

          <View style={styles.Viewbc0ec2b8}>
            <ButtonOutline
              onPress={() => {
                try {
                  navigation.goBack();
                } catch (err) {
                  console.error(err);
                }
              }}
              style={[
                styles.ButtonOutline1f6ce564,
                {
                  backgroundColor: theme.colors.white1,
                  color: theme.colors.mediumLight,
                  borderColor: theme.colors.mediumLight,
                },
              ]}
              title={'Cancel'}
            />
            <ButtonSolid
              onPress={() => {
                const handler = async () => {
                  try {
                    await publicEDITStudentLessonHabitPATCH.mutateAsync({
                      action_detail: textAreaValue,
                      habit_active: true,
                      student_lesson_habit_id:
                        props.route?.params?.action_id ??
                        '9efe6535-c3d4-4742-9191-8bbd3d6a390c',
                    });
                    navigation.goBack();
                  } catch (err) {
                    console.error(err);
                  }
                };
                handler();
              }}
              style={[
                styles.ButtonSolid13b3d2c0,
                { backgroundColor: theme.colors.success },
              ]}
              title={'Save edits'}
            />
          </View>

          <View style={styles.Viewd4d21069}>
            <>
              {props.route?.params?.action_lesson_active ?? false ? null : (
                <ButtonOutline
                  onPress={() => {
                    try {
                      setModal_archive(true);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={[
                    styles.ButtonOutline4a79eca2,
                    {
                      backgroundColor: theme.colors.white1,
                      color: theme.colors.success,
                      borderColor: theme.colors.success,
                    },
                  ]}
                  title={'Archive action and remove from list'}
                />
              )}
            </>
          </View>
        </View>

        <Modal
          visible={modal_archive}
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
              <Text
                style={[styles.Textc9fab72a, { color: theme.colors.strong }]}
              >
                {'Archine'}
              </Text>

              <Text
                style={[styles.Text1aabb2e1, { color: theme.colors.medium }]}
              >
                {
                  'Would you like to archive this action and hide it from the home tab?\n\nNote: This cannot be undone.'
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
                      setModal_archive(false);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={[
                    styles.ButtonOutline8139d673,
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
                        await publicEDITStudentLessonHabitPATCH.mutateAsync({
                          action_detail: textAreaValue,
                          habit_active: false,
                          student_lesson_habit_id:
                            props.route?.params?.action_id ??
                            '9efe6535-c3d4-4742-9191-8bbd3d6a390c',
                        });
                        setModal_archive(false);
                        navigation.goBack();
                      } catch (err) {
                        console.error(err);
                      }
                    };
                    handler();
                  }}
                  style={[
                    styles.ButtonOutline7fdb24d5,
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
      </KeyboardAwareScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  ButtonOutline1f6ce564: {
    borderRadius: 8,
    borderWidth: 1,
    fontFamily: 'NotoSans_400Regular',
    fontSize: 15,
    marginRight: 8,
    minWidth: '45%',
    textAlign: 'center',
  },
  ButtonOutline4a79eca2: {
    borderRadius: 8,
    borderWidth: 1,
    fontFamily: 'NotoSans_700Bold',
    fontSize: 15,
    textAlign: 'center',
  },
  ButtonOutline7fdb24d5: {
    borderRadius: 8,
    borderWidth: 1,
    fontFamily: 'NotoSans_700Bold',
    fontSize: 17,
    marginLeft: 8,
    minWidth: '40%',
    textAlign: 'center',
  },
  ButtonOutline8139d673: {
    borderRadius: 8,
    borderWidth: 1,
    fontFamily: 'NotoSans_700Bold',
    fontSize: 17,
    marginRight: 8,
    minWidth: '40%',
    textAlign: 'center',
  },
  ButtonSolid13b3d2c0: {
    borderRadius: 8,
    fontFamily: 'NotoSans_700Bold',
    fontSize: 15,
    marginLeft: 8,
    minWidth: '45%',
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
  Text056f72f7: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 28,
  },
  Text1aabb2e1: {
    alignSelf: 'center',
    fontFamily: 'NotoSans_400Regular',
    fontSize: 17,
    marginBottom: 32,
    textAlign: 'center',
  },
  Text4804839b: {
    fontFamily: 'NotoSans_400Regular_Italic',
    fontSize: 15,
    paddingBottom: 8,
    paddingTop: 8,
    textAlign: 'left',
  },
  Text785bf791: {
    fontFamily: 'NotoSerif_400Regular',
    fontSize: 15,
    textTransform: 'uppercase',
  },
  Text9ce5bf68: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 15,
    lineHeight: 20,
    textAlign: 'left',
  },
  TextInputbeadf348: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRadius: 8,
    borderRightWidth: 1,
    borderTopWidth: 1,
    fontFamily: 'NotoSans_400Regular',
    fontSize: 15,
    marginBottom: 16,
    marginTop: 8,
    minHeight: 100,
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
  },
  Textc9fab72a: {
    alignSelf: 'center',
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 32,
    marginBottom: 24,
    textAlign: 'center',
  },
  Texte04d2cdd: {
    fontFamily: 'NotoSans_400Regular',
    fontSize: 15,
  },
  View0838316d: {
    alignContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 6,
    paddingTop: 20,
  },
  View16fb8fa1: {
    paddingBottom: 48,
    paddingLeft: 16,
    paddingRight: 16,
  },
  View2fc75708: {
    flex: 1,
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'center',
    marginTop: 32,
    minWidth: '80%',
  },
  View358df241: {
    borderTopWidth: 2,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
  },
  View368a790a: {
    flex: 1,
    justifyContent: 'center',
    marginTop: '50%',
  },
  Viewa246d622: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  Viewbc0ec2b8: {
    bottom: 8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 8,
  },
  Viewd08718c1: {
    flexDirection: 'row',
    paddingBottom: 2,
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 2,
  },
  Viewd4d21069: {
    marginTop: 8,
    paddingBottom: 8,
    paddingTop: 8,
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

export default withTheme(MainactionScreen);
