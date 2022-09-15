import * as React from 'react';
import {
  useQuery,
  useMutation,
  useIsFetching,
  useQueryClient,
} from 'react-query';
import useFetch from 'react-fetch-hook';
import { useIsFocused } from '@react-navigation/native';
import usePrevious from '../utils/usePrevious';
import * as GlobalVariables from '../config/GlobalVariableContext';

export const dELETEPostsFollowDELETE = (
  Constants,
  { follower_user_id, session_id }
) =>
  fetch(
    `https://ztxhuiezsnrwnupwzimc.supabase.co/rest/v1/posts_follows?follower_user_id=eq.${
      follower_user_id ?? ''
    }&session_id=eq.${session_id ?? ''}`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTHORIZATION_HEADER'],
        'Content-Type': 'application/json',
        apiKey: Constants['SUPABASE_API_KEY_HEADER'],
      },
      method: 'DELETE',
    }
  )
    .then(res => {
      if (!res.ok) {
        console.error('Fetch error: ' + res.status + ' ' + res.statusText);
      }
      return res;
    })
    .then(res => res.json())
    .catch(() => {});

export const useDELETEPostsFollowDELETE = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => dELETEPostsFollowDELETE(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('posts_follow', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('posts_follow');
        queryClient.invalidateQueries('posts_follows');
      },
    }
  );
};

export const dELETEStudentHabitEventDELETE = (
  Constants,
  { habit_completed_date, student_lesson_habit }
) =>
  fetch(
    `https://ztxhuiezsnrwnupwzimc.supabase.co/rest/v1/student_habit_events?habit_completed_date=eq.${
      habit_completed_date ?? ''
    }&student_lesson_habit=eq.${student_lesson_habit ?? ''}`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTHORIZATION_HEADER'],
        'Content-Type': 'application/json',
        apiKey: Constants['SUPABASE_API_KEY_HEADER'],
      },
      method: 'DELETE',
    }
  )
    .then(res => {
      if (!res.ok) {
        console.error('Fetch error: ' + res.status + ' ' + res.statusText);
      }
      return res;
    })
    .then(res => res.json())
    .catch(() => {});

export const useDELETEStudentHabitEventDELETE = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args =>
      dELETEStudentHabitEventDELETE(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('student_habit_event', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('student_habit_event');
        queryClient.invalidateQueries('student_habit_events');
      },
    }
  );
};

export const dELETEStudentSupportActivityStepDELETE = (
  Constants,
  { student_support_activity_id, student_support_activity_step_id }
) =>
  fetch(
    `https://ztxhuiezsnrwnupwzimc.supabase.co/rest/v1/student_support_activity_steps?student_support_activity=eq.${
      student_support_activity_id ?? ''
    }&student_support_activity_step_id=eq.${
      student_support_activity_step_id ?? ''
    }`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTHORIZATION_HEADER'],
        'Content-Type': 'application/json',
        apiKey: Constants['SUPABASE_API_KEY_HEADER'],
      },
      method: 'DELETE',
    }
  )
    .then(res => {
      if (!res.ok) {
        console.error('Fetch error: ' + res.status + ' ' + res.statusText);
      }
      return res;
    })
    .then(res => res.json())
    .catch(() => {});

export const useDELETEStudentSupportActivityStepDELETE = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args =>
      dELETEStudentSupportActivityStepDELETE(Constants, {
        ...initialArgs,
        ...args,
      }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData(
            'student_support_activity_step',
            previousValue
          );
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('student_support_activity_step');
        queryClient.invalidateQueries('student_support_activity_steps');
      },
    }
  );
};

export const eDITStudentLessonHabitPATCH = (
  Constants,
  { action_detail, habit_active, student_lesson_habit_id }
) =>
  fetch(
    `https://ztxhuiezsnrwnupwzimc.supabase.co/rest/v1/student_lesson_habits?id=eq.${
      student_lesson_habit_id ?? ''
    }`,
    {
      body: JSON.stringify({
        action_detail: action_detail,
        habit_active: habit_active,
      }),
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTHORIZATION_HEADER'],
        'Content-Type': 'application/json',
        apiKey: Constants['SUPABASE_API_KEY_HEADER'],
      },
      method: 'PATCH',
    }
  )
    .then(res => {
      if (!res.ok) {
        console.error('Fetch error: ' + res.status + ' ' + res.statusText);
      }
      return res;
    })
    .then(res => res.json())
    .catch(() => {});

export const useEDITStudentLessonHabitPATCH = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => eDITStudentLessonHabitPATCH(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData(
            'student_lesson_habit',
            previousValue
          );
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('student_lesson_habit');
        queryClient.invalidateQueries('student_lesson_habits');
      },
    }
  );
};

export const fUNCGetStudentSessionPostsFollowsGET = (
  Constants,
  { return_all, type, user_id }
) =>
  fetch(
    `https://ztxhuiezsnrwnupwzimc.supabase.co/rest/v1/rpc/get_student_session_posts_follows?follow_type=${
      type ?? ''
    }&follower_user_id_input=${user_id ?? ''}&return_all_non_user_posts=${
      return_all ?? ''
    }`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTHORIZATION_HEADER'],
        'Content-Type': 'application/json',
        apiKey: Constants['SUPABASE_API_KEY_HEADER'],
      },
    }
  )
    .then(res => {
      if (!res.ok) {
        console.error('Fetch error: ' + res.status + ' ' + res.statusText);
      }
      return res;
    })
    .then(res => res.json())
    .catch(() => {});

export const useFUNCGetStudentSessionPostsFollowsGET = (
  args,
  { refetchInterval } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['student_session_posts', args],
    () => fUNCGetStudentSessionPostsFollowsGET(Constants, args),
    {
      refetchInterval,
    }
  );
};

export const FetchFUNCGetStudentSessionPostsFollowsGET = ({
  children,
  onData = () => {},
  refetchInterval,
  return_all,
  type,
  user_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } =
    useFUNCGetStudentSessionPostsFollowsGET(
      { return_all, type, user_id },
      { refetchInterval }
    );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({
    loading,
    data,
    error,
    refetchFUNCGetStudentSessionPostsFollows: refetch,
  });
};

export const fUNCRpc$checkClearSessionStreakPOST = (
  Constants,
  { local_date, user_id }
) =>
  fetch(
    `https://ztxhuiezsnrwnupwzimc.supabase.co/rest/v1/rpc/check_clear_session_streak`,
    {
      body: JSON.stringify({ user_id: user_id, local_date: local_date }),
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTHORIZATION_HEADER'],
        'Content-Type': 'application/json',
        apiKey: Constants['SUPABASE_API_KEY_HEADER'],
      },
      method: 'POST',
    }
  )
    .then(res => {
      if (!res.ok) {
        console.error('Fetch error: ' + res.status + ' ' + res.statusText);
      }
      return res;
    })
    .then(res => res.json())
    .catch(() => {});

export const useFUNCRpc$checkClearSessionStreakPOST = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args =>
      fUNCRpc$checkClearSessionStreakPOST(Constants, {
        ...initialArgs,
        ...args,
      }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData(
            'check_clear_session_streak',
            previousValue
          );
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('check_clear_session_streak');
        queryClient.invalidateQueries('check_clear_session_streaks');
      },
    }
  );
};

export const FetchFUNCRpc$checkClearSessionStreakPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  local_date,
  user_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } =
    useFUNCRpc$checkClearSessionStreakPOST(
      { local_date, user_id },
      { refetchInterval }
    );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({
    loading,
    data,
    error,
    refetchFUNCRpc$checkClearSessionStreak: refetch,
  });
};

export const gETStudentLessonHabitGET = (Constants, { filterToday, user_id }) =>
  fetch(
    `https://ztxhuiezsnrwnupwzimc.supabase.co/rest/v1/student_lesson_habits?habit_active=eq.true&habit_completed_latest_date=${
      filterToday ?? ''
    }&order=created_at.desc&user=eq.${user_id ?? ''}`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTHORIZATION_HEADER'],
        'Content-Type': 'application/json',
        apiKey: Constants['SUPABASE_API_KEY_HEADER'],
      },
    }
  )
    .then(res => {
      if (!res.ok) {
        console.error('Fetch error: ' + res.status + ' ' + res.statusText);
      }
      return res;
    })
    .then(res => res.json())
    .catch(() => {});

export const useGETStudentLessonHabitGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['student_lesson_habits', args],
    () => gETStudentLessonHabitGET(Constants, args),
    {
      refetchInterval,
    }
  );
};

export const FetchGETStudentLessonHabitGET = ({
  children,
  onData = () => {},
  refetchInterval,
  filterToday,
  user_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGETStudentLessonHabitGET(
    { filterToday, user_id },
    { refetchInterval }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({
    loading,
    data,
    error,
    refetchGETStudentLessonHabit: refetch,
  });
};

export const gETStudentSessionsHistoryViewGET = (Constants, { user_id }) =>
  fetch(
    `https://ztxhuiezsnrwnupwzimc.supabase.co/rest/v1/student_sessions_history_view?user=eq.${
      user_id ?? ''
    }`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTHORIZATION_HEADER'],
        'Content-Type': 'application/json',
        apiKey: Constants['SUPABASE_API_KEY_HEADER'],
      },
    }
  )
    .then(res => {
      if (!res.ok) {
        console.error('Fetch error: ' + res.status + ' ' + res.statusText);
      }
      return res;
    })
    .then(res => res.json())
    .catch(() => {});

export const useGETStudentSessionsHistoryViewGET = (
  args,
  { refetchInterval } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['student_sessions_history_views', args],
    () => gETStudentSessionsHistoryViewGET(Constants, args),
    {
      refetchInterval,
    }
  );
};

export const FetchGETStudentSessionsHistoryViewGET = ({
  children,
  onData = () => {},
  refetchInterval,
  user_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGETStudentSessionsHistoryViewGET(
    { user_id },
    { refetchInterval }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({
    loading,
    data,
    error,
    refetchGETStudentSessionsHistoryView: refetch,
  });
};

export const gETStudentSupportActivitiesGET = (Constants, { user_id }) =>
  fetch(
    `https://ztxhuiezsnrwnupwzimc.supabase.co/rest/v1/student_support_activities?active=eq.true&user=eq.${
      user_id ?? ''
    }`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTHORIZATION_HEADER'],
        'Content-Type': 'application/json',
        apiKey: Constants['SUPABASE_API_KEY_HEADER'],
      },
    }
  )
    .then(res => {
      if (!res.ok) {
        console.error('Fetch error: ' + res.status + ' ' + res.statusText);
      }
      return res;
    })
    .then(res => res.json())
    .catch(() => {});

export const useGETStudentSupportActivitiesGET = (
  args,
  { refetchInterval } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['student_support_activities', args],
    () => gETStudentSupportActivitiesGET(Constants, args),
    {
      refetchInterval,
    }
  );
};

export const FetchGETStudentSupportActivitiesGET = ({
  children,
  onData = () => {},
  refetchInterval,
  user_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGETStudentSupportActivitiesGET(
    { user_id },
    { refetchInterval }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({
    loading,
    data,
    error,
    refetchGETStudentSupportActivities: refetch,
  });
};

export const gETStudentSupportActivityStepsGET = (
  Constants,
  { student_support_activity_id }
) =>
  fetch(
    `https://ztxhuiezsnrwnupwzimc.supabase.co/rest/v1/student_support_activity_steps?student_support_activity=eq.${
      student_support_activity_id ?? ''
    }`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTHORIZATION_HEADER'],
        'Content-Type': 'application/json',
        apiKey: Constants['SUPABASE_API_KEY_HEADER'],
      },
    }
  )
    .then(res => {
      if (!res.ok) {
        console.error('Fetch error: ' + res.status + ' ' + res.statusText);
      }
      return res;
    })
    .then(res => res.json())
    .catch(() => {});

export const useGETStudentSupportActivityStepsGET = (
  args,
  { refetchInterval } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['student_support_activity_steps', args],
    () => gETStudentSupportActivityStepsGET(Constants, args),
    {
      refetchInterval,
    }
  );
};

export const FetchGETStudentSupportActivityStepsGET = ({
  children,
  onData = () => {},
  refetchInterval,
  student_support_activity_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } =
    useGETStudentSupportActivityStepsGET(
      { student_support_activity_id },
      { refetchInterval }
    );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({
    loading,
    data,
    error,
    refetchGETStudentSupportActivitySteps: refetch,
  });
};

export const gETUserGET = (Constants, { user_id }) =>
  fetch(
    `https://ztxhuiezsnrwnupwzimc.supabase.co/rest/v1/users?id=eq.${
      user_id ?? ''
    }`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTHORIZATION_HEADER'],
        'Content-Type': 'application/json',
        apiKey: Constants['SUPABASE_API_KEY_HEADER'],
      },
    }
  )
    .then(res => {
      if (!res.ok) {
        console.error('Fetch error: ' + res.status + ' ' + res.statusText);
      }
      return res;
    })
    .then(res => res.json())
    .catch(() => {});

export const useGETUserGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(['users', args], () => gETUserGET(Constants, args), {
    refetchInterval,
  });
};

export const FetchGETUserGET = ({
  children,
  onData = () => {},
  refetchInterval,
  user_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGETUserGET(
    { user_id },
    { refetchInterval }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({ loading, data, error, refetchGETUser: refetch });
};

export const pATCHStudentLessonHabitPATCH = (
  Constants,
  {
    habit_completed_latest_date,
    habit_completed_previous_date,
    habit_step_count,
    habit_total_count,
    student_lesson_habit_id,
  }
) =>
  fetch(
    `https://ztxhuiezsnrwnupwzimc.supabase.co/rest/v1/student_lesson_habits?id=eq.${
      student_lesson_habit_id ?? ''
    }`,
    {
      body: JSON.stringify({
        habit_completed_latest_date: habit_completed_latest_date,
        habit_completed_previous_date: habit_completed_previous_date,
        habit_step_count: habit_step_count,
        habit_total_count: habit_total_count,
      }),
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTHORIZATION_HEADER'],
        'Content-Type': 'application/json',
        apiKey: Constants['SUPABASE_API_KEY_HEADER'],
      },
      method: 'PATCH',
    }
  )
    .then(res => {
      if (!res.ok) {
        console.error('Fetch error: ' + res.status + ' ' + res.statusText);
      }
      return res;
    })
    .then(res => res.json())
    .catch(() => {});

export const usePATCHStudentLessonHabitPATCH = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args =>
      pATCHStudentLessonHabitPATCH(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData(
            'student_lesson_habit',
            previousValue
          );
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('student_lesson_habit');
        queryClient.invalidateQueries('student_lesson_habits');
      },
    }
  );
};

export const pATCHStudentSessionPostPATCH = (
  Constants,
  { post_flag_count, post_likes_count, session_id }
) =>
  fetch(
    `https://ztxhuiezsnrwnupwzimc.supabase.co/rest/v1/student_session_posts_view?id=eq.${
      session_id ?? ''
    }`,
    {
      body: JSON.stringify({
        post_likes_count: post_likes_count,
        post_flag_count: post_flag_count,
      }),
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTHORIZATION_HEADER'],
        'Content-Type': 'application/json',
        apiKey: Constants['SUPABASE_API_KEY_HEADER'],
      },
      method: 'PATCH',
    }
  )
    .then(res => {
      if (!res.ok) {
        console.error('Fetch error: ' + res.status + ' ' + res.statusText);
      }
      return res;
    })
    .then(res => res.json())
    .catch(() => {});

export const usePATCHStudentSessionPostPATCH = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args =>
      pATCHStudentSessionPostPATCH(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData(
            'student_session_post',
            previousValue
          );
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('student_session_post');
        queryClient.invalidateQueries('student_session_posts');
      },
    }
  );
};

export const pATCHStudentSupportActivityPATCH = (
  Constants,
  { student_support_activity_id }
) =>
  fetch(
    `https://ztxhuiezsnrwnupwzimc.supabase.co/rest/v1/student_support_activities?id=eq.${
      student_support_activity_id ?? ''
    }`,
    {
      body: JSON.stringify({ active: false }),
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTHORIZATION_HEADER'],
        'Content-Type': 'application/json',
        apiKey: Constants['SUPABASE_API_KEY_HEADER'],
      },
      method: 'PATCH',
    }
  )
    .then(res => {
      if (!res.ok) {
        console.error('Fetch error: ' + res.status + ' ' + res.statusText);
      }
      return res;
    })
    .then(res => res.json())
    .catch(() => {});

export const usePATCHStudentSupportActivityPATCH = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args =>
      pATCHStudentSupportActivityPATCH(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData(
            'student_support_activity',
            previousValue
          );
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('student_support_activity');
        queryClient.invalidateQueries('student_support_activities');
      },
    }
  );
};

export const pATCHUserSessionTypeSelectedPATCH = (
  Constants,
  { session_type_selected, user_id }
) =>
  fetch(
    `https://ztxhuiezsnrwnupwzimc.supabase.co/rest/v1/users?id=eq.${
      user_id ?? ''
    }`,
    {
      body: JSON.stringify({ session_type_selected: session_type_selected }),
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTHORIZATION_HEADER'],
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
        apiKey: Constants['SUPABASE_API_KEY_HEADER'],
      },
      method: 'PATCH',
    }
  )
    .then(res => {
      if (!res.ok) {
        console.error('Fetch error: ' + res.status + ' ' + res.statusText);
      }
      return res;
    })
    .then(res => res.json())
    .catch(() => {});

export const usePATCHUserSessionTypeSelectedPATCH = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args =>
      pATCHUserSessionTypeSelectedPATCH(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('user', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('user');
        queryClient.invalidateQueries('users');
      },
    }
  );
};

export const pOSTPostsFollowPOST = (
  Constants,
  { follow_type, session_id, user_id }
) =>
  fetch(`https://ztxhuiezsnrwnupwzimc.supabase.co/rest/v1/posts_follows`, {
    body: JSON.stringify({
      session_id: session_id,
      follower_user_id: user_id,
      type: follow_type,
    }),
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      apiKey: Constants['SUPABASE_API_KEY_HEADER'],
    },
    method: 'POST',
  })
    .then(res => {
      if (!res.ok) {
        console.error('Fetch error: ' + res.status + ' ' + res.statusText);
      }
      return res;
    })
    .then(res => res.json())
    .catch(() => {});

export const usePOSTPostsFollowPOST = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => pOSTPostsFollowPOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('posts_follow', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('posts_follow');
        queryClient.invalidateQueries('posts_follows');
      },
    }
  );
};

export const FetchPOSTPostsFollowPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  follow_type,
  session_id,
  user_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = usePOSTPostsFollowPOST(
    { follow_type, session_id, user_id },
    { refetchInterval }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({ loading, data, error, refetchPOSTPostsFollow: refetch });
};

export const pOSTStudentHabitEventPOST = (
  Constants,
  { action, habit_note, habit_step, name, student_lesson_habit_id, user_id }
) =>
  fetch(
    `https://ztxhuiezsnrwnupwzimc.supabase.co/rest/v1/student_habit_events`,
    {
      body: JSON.stringify({
        user: user_id,
        action: action,
        name: name,
        student_lesson_habit: student_lesson_habit_id,
        habit_step: habit_step,
        habit_complete: true,
        habit_note: habit_note,
      }),
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTHORIZATION_HEADER'],
        'Content-Type': 'application/json',
        apiKey: Constants['SUPABASE_API_KEY_HEADER'],
      },
      method: 'POST',
    }
  )
    .then(res => {
      if (!res.ok) {
        console.error('Fetch error: ' + res.status + ' ' + res.statusText);
      }
      return res;
    })
    .then(res => res.json())
    .catch(() => {});

export const usePOSTStudentHabitEventPOST = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => pOSTStudentHabitEventPOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('student_habit_event', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('student_habit_event');
        queryClient.invalidateQueries('student_habit_events');
      },
    }
  );
};

export const FetchPOSTStudentHabitEventPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  action,
  habit_note,
  habit_step,
  name,
  student_lesson_habit_id,
  user_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = usePOSTStudentHabitEventPOST(
    { action, habit_note, habit_step, name, student_lesson_habit_id, user_id },
    { refetchInterval }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({
    loading,
    data,
    error,
    refetchPOSTStudentHabitEvent: refetch,
  });
};

export const pOSTStudentSupportActivityStepPOST = (
  Constants,
  {
    details,
    label,
    order,
    student_support_activity,
    student_support_activity_step_id,
    user_id,
  }
) =>
  fetch(
    `https://ztxhuiezsnrwnupwzimc.supabase.co/rest/v1/student_support_activity_steps`,
    {
      body: JSON.stringify({
        label: label,
        details: details,
        order: order,
        student_support_activity_step_id: student_support_activity_step_id,
        student_support_activity: student_support_activity,
        user: user_id,
      }),
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTHORIZATION_HEADER'],
        'Content-Type': 'application/json',
        apiKey: Constants['SUPABASE_API_KEY_HEADER'],
      },
      method: 'POST',
    }
  )
    .then(res => {
      if (!res.ok) {
        console.error('Fetch error: ' + res.status + ' ' + res.statusText);
      }
      return res;
    })
    .then(res => res.json())
    .catch(() => {});

export const usePOSTStudentSupportActivityStepPOST = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args =>
      pOSTStudentSupportActivityStepPOST(Constants, {
        ...initialArgs,
        ...args,
      }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData(
            'student_support_activity_step',
            previousValue
          );
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('student_support_activity_step');
        queryClient.invalidateQueries('student_support_activity_steps');
      },
    }
  );
};

export const FetchPOSTStudentSupportActivityStepPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  details,
  label,
  order,
  student_support_activity,
  student_support_activity_step_id,
  user_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } =
    usePOSTStudentSupportActivityStepPOST(
      {
        details,
        label,
        order,
        student_support_activity,
        student_support_activity_step_id,
        user_id,
      },
      { refetchInterval }
    );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({
    loading,
    data,
    error,
    refetchPOSTStudentSupportActivityStep: refetch,
  });
};
