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

export const gETONELessonSummaryGET = (Constants, { lesson_label_id }) =>
  fetch(
    `https://api.airtable.com/v0/appH2GaVGro9lWZez/lesson_summaries/?filterByFormula=({lesson_label_id}='${
      lesson_label_id ?? ''
    }')`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AIRTABLE_API_KEY'],
        'Content-Type': 'application/json',
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

export const useGETONELessonSummaryGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['summary', args],
    () => gETONELessonSummaryGET(Constants, args),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['summaries']),
    }
  );
};

export const FetchGETONELessonSummaryGET = ({
  children,
  onData = () => {},
  refetchInterval,
  lesson_label_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGETONELessonSummaryGET(
    { lesson_label_id },
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
    refetchGETONELessonSummary: refetch,
  });
};

export const gETLessonDetailsGET = (Constants, { lesson_label_id }) =>
  fetch(
    `https://api.airtable.com/v0/appH2GaVGro9lWZez/lesson_details?filterByFormula=AND({published}='true',{lesson_label_id}='${
      lesson_label_id ?? ''
    }')&sort[0][field]=order`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AIRTABLE_API_KEY'],
        'Content-Type': 'application/json',
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

export const useGETLessonDetailsGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['details', args],
    () => gETLessonDetailsGET(Constants, args),
    {
      refetchInterval,
    }
  );
};

export const FetchGETLessonDetailsGET = ({
  children,
  onData = () => {},
  refetchInterval,
  lesson_label_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGETLessonDetailsGET(
    { lesson_label_id },
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

  return children({ loading, data, error, refetchGETLessonDetails: refetch });
};

export const gETLessonSummariesGET = Constants =>
  fetch(
    `https://api.airtable.com/v0/appH2GaVGro9lWZez/lesson_summaries/?filterByFormula=({published}='true')&sort[0][field]=order`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AIRTABLE_API_KEY'],
        'Content-Type': 'application/json',
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

export const useGETLessonSummariesGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['summaries', args],
    () => gETLessonSummariesGET(Constants, args),
    {
      refetchInterval,
    }
  );
};

export const FetchGETLessonSummariesGET = ({
  children,
  onData = () => {},
  refetchInterval,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGETLessonSummariesGET(
    {},
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

  return children({ loading, data, error, refetchGETLessonSummaries: refetch });
};
