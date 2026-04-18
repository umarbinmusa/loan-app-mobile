import { ApolloProvider } from "@apollo/client";
import { Stack } from "expo-router";
import client from "../app/apollo/client"; // adjust path correctly

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <Stack screenOptions={{ headerShown: false }} />
    </ApolloProvider>
  );
}
