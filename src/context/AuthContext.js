"use client";

import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const defaultToken = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJKcGNvM1ZIeFJTMVhrSm1mcVN3WXp4NHZLenFPUUhoTUlmaXJoRFYtVUZVIn0.eyJleHAiOjE3NDcwNTQ2NjMsImlhdCI6MTc0NzAxODY2NiwianRpIjoib25ydGFjOmUyMmU4OTllLTUxMmUtNDQwZC1hYTNiLWI2YTUzNjJlNzRiZCIsImlzcyI6Imh0dHA6Ly81ZWFjLTEyNS0yMzUtMjM5LTE5Ni5uZ3Jvay1mcmVlLmFwcC9yZWFsbXMvZGVtbyIsInR5cCI6IkJlYXJlciIsImF6cCI6ImZyb250ZW5kLWNsaWVudCIsInNpZCI6ImUyOTI5ZTZkLWI1OTktNDk4Zi05NWEzLWQwN2I5YTQ1ZDZkMiIsInNjb3BlIjoib3BlbmlkIHJvbGVzIHBob25lIiwicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJWRU5ET1IiLCJkZWZhdWx0LXJvbGVzLWRlbW8iLCJ1bWFfYXV0aG9yaXphdGlvbiIsIlVTRVIiXSwibGFzdF9uYW1lIjoicGhhbSIsInBob25lX251bWJlciI6IjA5NDQ3MTMwMTUiLCJmaXJzdF9uYW1lIjoibWFuaCIsImVtYWlsIjoicG1hbmhoMTdAZ21haWwuY29tIiwidXNlcm5hbWUiOiJoZWdvcGxheSJ9.3A1gU2TfZ5yrcm4j0QAx8zG6qnL_OI5UjvzGztFbLm4tS9vE0GmTR-UlmC1JYtitQKKh0f-7Z6BKfunrWeJ6VAU6EzZbtDpOa-fr-wZeE30E_lEYgqFYdDsMXvD-AEpiSkF1UWSZ8HjPZe4l5JfQHQxd_jpP6ZFsoUWOOZPPDqpdCV9X8p27F7-ietIly2iLkPr15AdywDggQBur9llfbpqsF8nIvGX4mtAOz_NZliqMecoH9rCuGL9DtD2KhZQAdo3BbYQPIaqLI_bLzTsywr_H3Prhi5p3j558pO-KmoN-4dAZ6j5oNibI31KV0gMN9BWBbeFBMPHpy_QZYijutQ";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("accessToken", defaultToken);
  };

  const logout = () => {
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}