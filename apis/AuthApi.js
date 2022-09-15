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

export const authMeGET = Constants =>
  fetch(`https://ztxhuiezsnrwnupwzimc.supabase.co/auth/v1/user`, {
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      apikey: Constants['SUPABASE_API_KEY_HEADER'],
    },
  })
    .then(res => {
      if (!res.ok) {
        console.error('Fetch error: ' + res.status + ' ' + res.statusText);
      }
      return res;
    })
    .then(res => res.json())
    .catch(() => {});

export const useAuthMeGET = () => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(`https://ztxhuiezsnrwnupwzimc.supabase.co/auth/v1/user`, {
    depends: [isFocused],
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      apikey: Constants['SUPABASE_API_KEY_HEADER'],
    },
  });
};

export const FetchAuthMeGET = ({
  children,
  onData = () => {},
  refetchInterval,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(`https://ztxhuiezsnrwnupwzimc.supabase.co/auth/v1/user`, {
    depends: [isFocused],
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      apikey: Constants['SUPABASE_API_KEY_HEADER'],
    },
  });

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

  return children({ loading, data, error, refetchAuthMe: refetch });
};

export const forgotPasswordPOST = (Constants, { email }) =>
  fetch(`https://ztxhuiezsnrwnupwzimc.supabase.co/auth/v1/recover`, {
    body: JSON.stringify({ email: email }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      apikey: Constants['SUPABASE_API_KEY_HEADER'],
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

export const useForgotPasswordPOST = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => forgotPasswordPOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('forgot password', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('forgot password');
        queryClient.invalidateQueries('forgot passwords');
      },
    }
  );
};

export const FetchForgotPasswordPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  email,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useForgotPasswordPOST(
    { email },
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

  return children({ loading, data, error, refetchForgotPassword: refetch });
};

export const loginPOST = (Constants, { loginEmail, loginPassword }) =>
  fetch(
    `https://ztxhuiezsnrwnupwzimc.supabase.co/auth/v1/token?grant_type=password`,
    {
      body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        apikey: Constants['SUPABASE_API_KEY_HEADER'],
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

export const useLoginPOST = ({ loginEmail, loginPassword }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `https://ztxhuiezsnrwnupwzimc.supabase.co/auth/v1/token?grant_type=password`,
    {
      body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        apikey: Constants['SUPABASE_API_KEY_HEADER'],
      },
      method: 'POST',
    }
  );
};

export const FetchLoginPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  loginEmail,
  loginPassword,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `https://ztxhuiezsnrwnupwzimc.supabase.co/auth/v1/token?grant_type=password`,
    {
      body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        apikey: Constants['SUPABASE_API_KEY_HEADER'],
      },
      method: 'POST',
    }
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

  return children({ loading, data, error, refetchLogin: refetch });
};

export const logoutPOST = Constants =>
  fetch(`https://ztxhuiezsnrwnupwzimc.supabase.co/auth/v1/logout`, {
    body: JSON.stringify({}),
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      apikey: Constants['SUPABASE_API_KEY_HEADER'],
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

export const useLogoutPOST = () => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(`https://ztxhuiezsnrwnupwzimc.supabase.co/auth/v1/logout`, {
    body: JSON.stringify({}),
    depends: [isFocused],
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      apikey: Constants['SUPABASE_API_KEY_HEADER'],
    },
    method: 'POST',
  });
};

export const FetchLogoutPOST = ({
  children,
  onData = () => {},
  refetchInterval,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(`https://ztxhuiezsnrwnupwzimc.supabase.co/auth/v1/logout`, {
    body: JSON.stringify({}),
    depends: [isFocused],
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      apikey: Constants['SUPABASE_API_KEY_HEADER'],
    },
    method: 'POST',
  });

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

  return children({ loading, data, error, refetchLogout: refetch });
};

export const passwordResetPUT = (Constants, { new_password }) =>
  fetch(`https://ztxhuiezsnrwnupwzimc.supabase.co/auth/v1/user`, {
    body: JSON.stringify({ password: new_password }),
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      apikey: Constants['SUPABASE_API_KEY_HEADER'],
    },
    method: 'PUT',
  })
    .then(res => {
      if (!res.ok) {
        console.error('Fetch error: ' + res.status + ' ' + res.statusText);
      }
      return res;
    })
    .then(res => res.json())
    .catch(() => {});

export const usePasswordResetPUT = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => passwordResetPUT(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('user password', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('user password');
        queryClient.invalidateQueries('user passwords');
      },
    }
  );
};

export const refreshTokenPOST = (Constants, { refresh_token }) =>
  fetch(
    `https://ztxhuiezsnrwnupwzimc.supabase.co/auth/v1/token?grant_type=refresh_token`,
    {
      body: JSON.stringify({ refresh_token: refresh_token }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        apikey: Constants['SUPABASE_API_KEY_HEADER'],
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

export const useRefreshTokenPOST = ({ refresh_token }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `https://ztxhuiezsnrwnupwzimc.supabase.co/auth/v1/token?grant_type=refresh_token`,
    {
      body: JSON.stringify({ refresh_token: refresh_token }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        apikey: Constants['SUPABASE_API_KEY_HEADER'],
      },
      method: 'POST',
    }
  );
};

export const FetchRefreshTokenPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  refresh_token,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `https://ztxhuiezsnrwnupwzimc.supabase.co/auth/v1/token?grant_type=refresh_token`,
    {
      body: JSON.stringify({ refresh_token: refresh_token }),
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        apikey: Constants['SUPABASE_API_KEY_HEADER'],
      },
      method: 'POST',
    }
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

  return children({ loading, data, error, refetchRefreshToken: refetch });
};

export const signupPOST = (
  Constants,
  { emailDomain, firstName, signupEmail, signupPassword }
) =>
  fetch(`https://ztxhuiezsnrwnupwzimc.supabase.co/auth/v1/signup`, {
    body: JSON.stringify({
      email: signupEmail,
      password: signupPassword,
      data: { first_name: firstName, email_domain: emailDomain },
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      apikey: Constants['SUPABASE_API_KEY_HEADER'],
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

export const useSignupPOST = ({
  emailDomain,
  firstName,
  signupEmail,
  signupPassword,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(`https://ztxhuiezsnrwnupwzimc.supabase.co/auth/v1/signup`, {
    body: JSON.stringify({
      email: signupEmail,
      password: signupPassword,
      data: { first_name: firstName, email_domain: emailDomain },
    }),
    depends: [isFocused],
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      apikey: Constants['SUPABASE_API_KEY_HEADER'],
    },
    method: 'POST',
  });
};

export const FetchSignupPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  emailDomain,
  firstName,
  signupEmail,
  signupPassword,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(`https://ztxhuiezsnrwnupwzimc.supabase.co/auth/v1/signup`, {
    body: JSON.stringify({
      email: signupEmail,
      password: signupPassword,
      data: { first_name: firstName, email_domain: emailDomain },
    }),
    depends: [isFocused],
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      apikey: Constants['SUPABASE_API_KEY_HEADER'],
    },
    method: 'POST',
  });

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

  return children({ loading, data, error, refetchSignup: refetch });
};
