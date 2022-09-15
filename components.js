// Place any imports required by your custom components at the top of
// this file. Make sure to add those imports (besides "react"
// and "react-native") to the Packages section. The first import from
// 'react' is required.
import React from 'react';
import { Calendar } from 'react-native-calendars';
import { WebView } from '@draftbit/ui';
import { createClient } from '@supabase/supabase-js';

import * as GlobalVariables from './config/GlobalVariableContext';
const API_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0eGh1aWV6c25yd251cHd6aW1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDYwMDYyMjUsImV4cCI6MTk2MTU4MjIyNX0.m3JpiNt9kizwo94s0YTqtWjha_anHJULu4Db08APnOw';

const supabase = createClient(
  'https://ztxhuiezsnrwnupwzimc.supabase.co',
  API_KEY
);

export { supabase, GlobalVariables };

export const CalendarComponent = ({ sessions }) => {
  const [markedDates, setMarkedDates] = React.useState({});

  const getMarkedDates = () => {
    let markedDates = {};
    sessions.forEach(
      day =>
        (markedDates[day.session_date] = {
          selected: true,
          selectedColor: '#05A87F',
        })
    );
    return markedDates;
  };

  React.useEffect(() => {
    setMarkedDates(getMarkedDates());
  }, [sessions]);

  return (
    <Calendar
      onDayPress={day => {
        // console.log('selected day', day);
      }}
      onDayLongPress={day => {
        // console.log('selected day', day);
      }}
      onMonthChange={month => {
        // console.log('month changed', month);
      }}
      //initialDate={initial_date}
      hideExtraDays={true}
      firstDay={0}
      onPressArrowLeft={subtractMonth => subtractMonth()}
      onPressArrowRight={addMonth => addMonth()}
      markedDates={markedDates}
      hideArrows={false}
      theme={{
        backgroundColor: '#ffffff',
        // calendarBackground: '#ffffff',
        // textSectionTitleColor: '#b6c1cd',
        // textSectionTitleDisabledColor: '#d9e1e8',
        // selectedDayBackgroundColor: '#00adf5',
        // selectedDayTextColor: '#ffffff',
        todayTextColor: '#05A87F',
        dayTextColor: '#9E9E9E',
        // textDisabledColor: '#d9e1e8',
        // dotColor: '#00adf5',
        // selectedDotColor: '#ffffff',
        arrowColor: '#025476',
        // disabledArrowColor: '#d9e1e8',
        // monthTextColor: 'blue',
        // indicatorColor: 'red',
        // textDayFontFamily: 'monospace',
        // textMonthFontFamily: 'monospace',
        // textDayHeaderFontFamily: 'monospace',
        textDayFontWeight: '400',
        // textMonthFontWeight: 'bold',
        // textDayHeaderFontWeight: '300',
        // textDayFontSize: 16,
        // textMonthFontSize: 16,
        // textDayHeaderFontSize: 16
      }}
    />
  );
};

export const ChatWebViewView = () => {
  const variables = GlobalVariables.useValues();
  var chatbot_url =
    variables.CHATBOT_URL_MAIN +
    '?url_app_check=' +
    variables.CHATBOT_APP_CHECK_MAIN +
    '&url_user_uuid=' +
    variables.USER_ID +
    '&url_user_uuid_val=' +
    variables.USER_UUID_VAL;

  return (
    <WebView
      //originWhitelist={['https://chats.landbot.io/*']} - This causes the website to load in browser rather then being embedded
      source={{ uri: chatbot_url }}
      style={{ flex: 1 }}
      allowsFullscreenVideo={true}
      allowsInlineMediaPlayback={true}
      mediaPlaybackRequiresUserAction={false}
      onContentProcessDidTerminate={syntheticEvent => {
        const { nativeEvent } = syntheticEvent;
        this.refs.webview.reload();
      }}
    />
  );
};
