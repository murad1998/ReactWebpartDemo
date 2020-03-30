import { SPHttpClient } from "@microsoft/sp-http";


export interface IReactWebpartDemoProps {
  description: string;
  textbox:string;
  spHttpClient:SPHttpClient;
  currentSiteUrl:string;
}
