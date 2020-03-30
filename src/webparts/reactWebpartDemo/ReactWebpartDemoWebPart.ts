import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ReactWebpartDemoWebPartStrings';
import ReactWebpartDemo from './components/ReactWebpartDemo';
import { IReactWebpartDemoProps } from './components/IReactWebpartDemoProps';

export interface IReactWebpartDemoWebPartProps {
  description: string;
  textbox:string;
}

export default class ReactWebpartDemoWebPart extends BaseClientSideWebPart <IReactWebpartDemoWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IReactWebpartDemoProps> = React.createElement(
      ReactWebpartDemo,
      {
        description: this.properties.description,
        textbox:this.properties.textbox,
        spHttpClient:this.context.spHttpClient,
        currentSiteUrl:this.context.pageContext.web.absoluteUrl
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
