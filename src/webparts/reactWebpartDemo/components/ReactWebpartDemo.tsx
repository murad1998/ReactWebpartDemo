import * as React from 'react';
import styles from './ReactWebpartDemo.module.scss';

import { escape } from '@microsoft/sp-lodash-subset';
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { IColor } from "../Icolor";
import { ColorList, IColorListProps } from "./ColorList";
import { IReactWebpartDemoProps } from "./IReactWebpartDemoProps";

import { IReactWebPartDemoState } from './IReactWebPartDemoState';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { IReactWebpartDemoWebPartProps } from '../ReactWebpartDemoWebPart';

export default class ReactWebPartDemo extends React.Component<IReactWebpartDemoProps, IReactWebPartDemoState> {

  constructor(props: IReactWebpartDemoProps) {
    super(props);
    this.state = { colors: [] };
  }
  
  public render(): React.ReactElement<IReactWebpartDemoProps> {
    return (
      <div className={ styles.reactWebpartDemo }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint + React!</span>
              <ColorList colors={ this.state.colors } onRemoveColor={ this._removeColor }/>
              <TextField label="Disabled" disabled defaultValue="I am disabled" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  private getColorsFromSpList(): Promise<IColor[]> {
    return new Promise<IColor[]>((resolve, reject) => {
      const endpoint: string = `${this.props.currentSiteUrl}/_api/lists/getbytitle('Colors')/items?$select=Id,Title`;
      this.props.spHttpClient.get(endpoint, SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse) => {
          return response.json();
        })
        .then((jsonResponse: any) => {
          let spListItemColors: IColor[] = [];
          for (let index = 0; index < jsonResponse.value.length; index++) {
            spListItemColors.push({
              id: jsonResponse.value[index].Id,
              title: jsonResponse.value[index].Title
            });
  
            resolve(spListItemColors);
          }
        });
    });
  }

  public componentDidMount(): void {
    this.getColorsFromSpList()
      .then((spListItemColors: IColor[]) => {
        this.setState({ colors: spListItemColors });
      });
  }

  private _removeColor = (colorToRemove: IColor): void => {
    const newColors = this.state.colors.filter(color => color != colorToRemove);
    this.setState({ colors: newColors });
  }
}