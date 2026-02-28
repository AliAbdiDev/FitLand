type CredentialsData = {
  email: string;
  password: string;
};

type ApiResult = {
  ok: boolean;
  status: number;
  data: unknown;
};

const postJson = async (url: string, body: Record<string, unknown>): Promise<ApiResult> => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  let data: unknown = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  return {
    ok: response.ok,
    status: response.status,
    data,
  };
};

function useLogin() {
  const loginHandlers = {
    credentialsLogin: async (data: CredentialsData) => {
      return postJson("/api/auth/login", {
        email: data.email,
        password: data.password,
      });
    },

    googleLogin: async () => {
      return postJson("/api/auth/provider/google", {
        email: "mock-google-user@example.com",
        name: "Mock Google User",
      });
    },
  };

  return loginHandlers;
}

export default useLogin;
