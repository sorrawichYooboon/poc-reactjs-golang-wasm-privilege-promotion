import { useState } from "react";
import ReactJson from "react-json-view";
import axios from "axios";
import { Button } from "antd";
import { Input } from "antd";
import "./app.scss";

function App() {
  const { TextArea } = Input;
  const [calculatorValueOne, setCalculatorValueOne] = useState<number>(0);
  const [calculatorValueTwo, setCalculatorValueTwo] = useState<number>(0);
  const [cacheDataV1, setCacheDataV1] = useState<any>(undefined);
  const [cacheDataV2, setCacheDataV2] = useState<any>(undefined);
  const [alreadyClickGetCacheData, setAlreadyClickGetCacheData] =
    useState<boolean>(false);
  const [loadingGetCacheData, setLoadingGetCacheData] =
    useState<boolean>(false);
  const [alreadyClickInitiateWasmDataV1, setAlreadyClickInitiateWasmDataV1] =
    useState<boolean>(false);
  const [loadingInitiateWasmDataV1, setLoadingInitiateWasmDataV1] =
    useState<boolean>(false);
  const [alreadyClickInitiateWasmDataV2, setAlreadyClickInitiateWasmDataV2] =
    useState<boolean>(false);
  const [loadingInitiateWasmDataV2, setLoadingInitiateWasmDataV2] =
    useState<boolean>(false);
  const [executeRequest, setExecuteRequest] = useState<any>(undefined);
  const [
    loadingExecutePrivilegePromotion,
    setLoadingExecutePrivilegePromotion,
  ] = useState<boolean>(false);
  const [executeResponse, setExecuteResponse] = useState<any>(undefined);

  const handleExecutePrivilegePromotion = (executeRequest: any) => {
    setLoadingExecutePrivilegePromotion(true);
    const jsonString = JSON.stringify(executeRequest);
    const response = window.executePrivilegePromotion(jsonString);
    const jsonValue = JSON.parse(response);
    setExecuteResponse(jsonValue);
    setLoadingExecutePrivilegePromotion(false);
  };

  const handleGetCacheData = async () => {
    setLoadingGetCacheData(true);
    await getCacheDataV1();
    await getCacheDataV2();
    setAlreadyClickGetCacheData(true);
    setLoadingGetCacheData(false);
  };

  const getCacheDataV1 = async () => {
    await fetchData(
      `${import.meta.env.VITE_PRIVILEGE_API_STAGING_V1}/config/getCacheData`,
      setCacheDataV1
    );
  };

  const getCacheDataV2 = async () => {
    await fetchData(
      `${import.meta.env.VITE_PRIVILEGE_API_STAGING_V2}/config/getCacheData`,
      setCacheDataV2
    );
  };

  const fetchData = async (url: string, setDataCallback: any) => {
    try {
      const res = await axios.get(url);
      setDataCallback(res.data);
    } catch (error) {}
  };

  const handleInitiatWasmDataV1 = (data: any) => {
    setLoadingInitiateWasmDataV1(true);
    const jsonString = JSON.stringify(data);
    window.initiateWasmDataV1(jsonString);
    setAlreadyClickInitiateWasmDataV1(true);
    setLoadingInitiateWasmDataV1(false);
  };

  const handleInitiatWasmDataV2 = (data: any) => {
    setLoadingInitiateWasmDataV2(true);
    const jsonString = JSON.stringify(data);
    window.initiateWasmDataV2(jsonString);
    setAlreadyClickInitiateWasmDataV2(true);
    setLoadingInitiateWasmDataV2(false);
  };

  return (
    <div className="app-container">
      <div className="app-container__multiple-calculator">
        <h3>Plus Calculator</h3>
        <div className="app-container__multiple-calculator--input">
          <span>VAL 1:</span>
          <Input
            placeholder="Value 1"
            value={calculatorValueOne}
            onChange={(e) => {
              setCalculatorValueOne(Number(e.target.value));
            }}
          />
        </div>
        <div className="app-container__multiple-calculator--input">
          <span>VAL 2:</span>
          <Input
            placeholder="Value 2"
            value={calculatorValueTwo}
            onChange={(e) => {
              setCalculatorValueTwo(Number(e.target.value));
            }}
          />
        </div>
        <div className="app-container__multiple-calculator--output">
          <span>RESULT</span>
          <br />
          <TextArea
            value={window.myGolangFunction(
              calculatorValueOne,
              calculatorValueTwo
            )}
            placeholder="Result"
            style={{ height: 400, resize: "none" }}
          />
        </div>
      </div>
      <div className="app-container__execute-privilege-promotion">
        <h3 className="app-container__execute-privilege-promotion--header">
          Execute Privilege Promotion
        </h3>
        <br />
        <div className="app-container__execute-privilege-promotion--button">
          <Button
            loading={loadingGetCacheData}
            type={!alreadyClickGetCacheData ? "primary" : undefined}
            onClick={() => handleGetCacheData()}
          >
            Get Cache Data
          </Button>
          <Button
            loading={loadingInitiateWasmDataV1}
            type={!alreadyClickInitiateWasmDataV1 ? "primary" : undefined}
            disabled={!alreadyClickGetCacheData}
            onClick={() => handleInitiatWasmDataV1(cacheDataV1)}
          >
            Initiat Wasm Data V1
          </Button>
          <Button
            loading={loadingInitiateWasmDataV2}
            type={!alreadyClickInitiateWasmDataV2 ? "primary" : undefined}
            disabled={
              !alreadyClickGetCacheData || !alreadyClickInitiateWasmDataV1
            }
            onClick={() => handleInitiatWasmDataV2(cacheDataV2)}
          >
            Initiat Wasm Data V2
          </Button>
        </div>
        <div className="app-container__execute-privilege-promotion--execute">
          <span className="app-container__execute-privilege-promotion--execute-header">
            Execute Privilege Promotion
          </span>
          <div className="app-container__execute-privilege-promotion--execute-textarea">
            <div className="app-container__execute-privilege-promotion--execute-textarea-left">
              <div className="app-container__execute-privilege-promotion--execute-textarea-left-header">
                Request:
              </div>
              <TextArea
                onChange={(e) => {
                  try {
                    const jsonValue = JSON.parse(e.target.value);
                    setExecuteRequest(jsonValue);
                  } catch (error: any) {}
                }}
                placeholder="Request"
                style={{ height: 500, resize: "none" }}
              />
            </div>
            <div className="app-container__execute-privilege-promotion--execute-textarea-right">
              <div className="app-container__execute-privilege-promotion--execute-textarea-right-header">
                Response:
              </div>
              <ReactJson src={executeResponse} />
              {/* <TextArea
              value={executeResponse}
              placeholder="Response"
              style={{ height: 500, resize: "none" }}
            /> */}
            </div>
          </div>

          <Button
            loading={loadingExecutePrivilegePromotion}
            type={
              alreadyClickInitiateWasmDataV1 && alreadyClickInitiateWasmDataV2
                ? "primary"
                : undefined
            }
            disabled={
              !alreadyClickInitiateWasmDataV1 || !alreadyClickInitiateWasmDataV2
            }
            onClick={() => handleExecutePrivilegePromotion(executeRequest)}
          >
            Execute Privilege Promotion
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
