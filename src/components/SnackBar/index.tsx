import React, { useReducer, createContext, useContext } from "react";
import { Snackbar } from "@material-ui/core";

/*
  Este componente deve ser adicionado como pai do projeto. Ele sempre estará disponível,
  e será visível enquanto `message` não estiver vazia. Para permitir a outros componentes
  que alterem `message`, o hook useAlert retorna, através do contexto, a função de dispatch
  que permite alterar o valor da variável. O restante do projeto deve ser passado como 
  `children` para ter acesso ao context.
*/

const reducer = (_prevState: string, message: string) => {
  return message;
};

const Context = createContext((message: string) => {});

export default function useSnackBar() {
  return useContext(Context);
}

export function SnackBar({ children }: any) {
  const [message, dispatch] = useReducer(reducer, "");
  return (
    <Context.Provider value={dispatch}>
      <Snackbar open={message !== ""} onClose={() => dispatch("")} message={message} autoHideDuration={6000} />
      {children}
    </Context.Provider>
  );
}
