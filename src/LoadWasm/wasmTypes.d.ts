type executePrivilegePromotion = {
  conditions: Array<condition>;
  orders: Array<order>;
};

type condition = {
  APP_OWNER: string;
  COMPANY_CODE: string;
};

type order = {
  code: string;
  name: string;
  unitId: number;
  unitName: string;
  amount: number;
};

declare global {
  export interface Window {
    Go: any;
    myGolangFunction: (num1: number, num2: number) => number;
    executePrivilegePromotion: (privilegePromotion: string) => string;
    initiateWasmDataV1: (data: string) => void;
    initiateWasmDataV2: (data: string) => void;
  }
}

export {};
