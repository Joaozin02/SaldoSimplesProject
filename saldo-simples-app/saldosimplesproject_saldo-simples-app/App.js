// App.js (raiz)
import * as React from "react";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import RegisterPage from "./src/pages/RegisterPage"; // ← caminho CORRETO

const theme = {
  ...DefaultTheme,
  roundness: 16, // deixa os TextInput arredondados
  colors: { ...DefaultTheme.colors, primary: "#5A00FF" }, // ou "#26C24C"
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <RegisterPage />
    </PaperProvider>
  );
}
