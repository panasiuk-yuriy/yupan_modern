import * as React from 'react';
import Cost from '../Cost/Cost';

export interface IProps {
  costsList: any;
}


export default class CostList extends React.Component<IProps, {}> {


  public render(): React.ReactElement<IProps> {
    if (this.props.costsList.length === 0) {
      return <h1>Loading...</h1>
    } else {
      return (
        <>
          <table>
            <tr>
              <th>На що протрачено</th>
              <th>Опис трати</th>
              <th>Вартість</th>
              <th>Категорія трат</th>
              <th>Тип оплати</th>
              <th>Статус оплати</th>
            </tr>
            {this.props.costsList.map((item: any) => {
              return (
                <tr>
                  <Cost cost={item} />
                </tr>
              )
            })}
          </table>
        </>
      );
    }

  }
}
