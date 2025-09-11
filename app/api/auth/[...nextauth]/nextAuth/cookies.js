
export const cookies = {
  sessionToken: {
    name: 'next-auth.session-token',
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    },
  },
};