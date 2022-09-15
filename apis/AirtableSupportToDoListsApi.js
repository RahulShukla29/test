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

export const gETSupportTemplateStepDetailsGET = (
  Constants,
  { support_template_step_id }
) =>
  fetch(
    `https://api.airtable.com/v0/apphdTcIzL9ge6fEs/support_template_step_details?filterByFormula=({support_template_step_id}='${
      support_template_step_id ?? ''
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

export const useGETSupportTemplateStepDetailsGET = (
  args,
  { refetchInterval } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['support_template_step_details', args],
    () => gETSupportTemplateStepDetailsGET(Constants, args),
    {
      refetchInterval,
    }
  );
};

export const FetchGETSupportTemplateStepDetailsGET = ({
  children,
  onData = () => {},
  refetchInterval,
  support_template_step_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGETSupportTemplateStepDetailsGET(
    { support_template_step_id },
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
    refetchGETSupportTemplateStepDetails: refetch,
  });
};

export const gETSupportTemplateStepsGET = (Constants, { support_label_id }) =>
  fetch(
    `https://api.airtable.com/v0/apphdTcIzL9ge6fEs/support_template_steps?filterByFormula=AND({published}='true',{support_label_id}='${
      support_label_id ?? ''
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

export const useGETSupportTemplateStepsGET = (
  args,
  { refetchInterval } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['support_template_step', args],
    () => gETSupportTemplateStepsGET(Constants, args),
    {
      refetchInterval,
      onSuccess: () =>
        queryClient.invalidateQueries(['support_template_steps']),
    }
  );
};

export const FetchGETSupportTemplateStepsGET = ({
  children,
  onData = () => {},
  refetchInterval,
  support_label_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGETSupportTemplateStepsGET(
    { support_label_id },
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
    refetchGETSupportTemplateSteps: refetch,
  });
};
