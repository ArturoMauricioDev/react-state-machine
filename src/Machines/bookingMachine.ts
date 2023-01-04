import { assign, createMachine } from "xstate";
import { fetchCountries } from "../Utils/api";

export interface ToggleContext {
  countries: [];
  passengers: [];
  selectedCountry: string;
  error: string;
}
export type bookingMachineEvents = {
  type:
    | "START"
    | "CONTINUE"
    | "CANCEL"
    | "DONE"
    | "FINISH"
    | "ADD"
    | "newPassenger";
};

const fillCountries = {
  initial: "loading",
  states: {
    loading: {
      invoke: {
        id: "getCountries",
        src: () => fetchCountries,
        onDone: {
          target: "success",
          actions: assign({
            countries: (context, event) => event.data,
          }),
        },
        onError: {
          target: "failure",
          action: assign({
            error: "Fallo el requiest",
          }),
        },
      },
    },
    success: {},
    failure: {
      on: {
        RETRY: {
          target: "loading",
        },
      },
    },
  },
};

const bookingMachine = createMachine<ToggleContext, bookingMachineEvents>(
  {
    id: "buyPlaneTickets",
    initial: "inicial",
    context: {
      countries: [],
      passengers: [],
      selectedCountry: "",
      error: "",
    },
    states: {
      inicial: {
        entry: "initialContext",
        on: {
          START: {
            target: "search",
          },
        },
      },
      search: {
        on: {
          CONTINUE: {
            target: "passengers",
            actions: assign({
              selectedCountry: (context, event: any) => event.selectedCountry,
            }),
          },
          CANCEL: "inicial",
        },
        ...fillCountries,
      },
      passengers: {
        on: {
          DONE: {
            target: "tickets",
            cond: "moreThanOnePassenger",
          },
          CANCEL: "inicial",
          ADD: {
            target: "passengers",
            actions: assign((context, event: any) =>
              context.passengers.push(event.newPassenger)
            ),
          },
        },
      },
      tickets: {
        after: {
          10000: {
            target: "inicial",
          },
        },
        on: {
          FINISH: "inicial",
        },
      },
    },
  },
  {
    actions: {
      initialContext: (context, evet) => {
        context.countries = [];
        context.passengers = [];
        context.selectedCountry = "";
        context.error = "";
      },
      imprimirInicio: () => console.log("imprimir inicio"),
      imprimirEntrada: () => console.log("imrpimir entrada a search"),
      imprimirSalida: () => console.log("imrpimir salida de search"),
    },
    guards: {
      moreThanOnePassenger: (context) => context.passengers.length > 0,
    },
  }
);

export default bookingMachine;
