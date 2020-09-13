import * as React from 'react';
import { PrimaryButton } from '@fluentui/react';

export interface IProps {
  cost: any;
}


export default class Cost extends React.Component<IProps, {}> {


  public render(): React.ReactElement<IProps> {
    return (
      <>
        <td>{this.props.cost.Title}</td>
        <td>{this.props.cost.Description}</td>
        <td>{`${this.props.cost.Amount} грн`}</td>
        <td>{this.props.cost.category.title}</td>
        <td>{this.props.cost.Pay_x002d_by}</td>
        <td>{this.props.cost.Paid ? "Оплачено" : "Не оплачено"}</td>
      </>
    );
  }
}
