import * as React from 'react';
import styles from './YupanWebpart.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import CostList from './CostsList/CostsList';
import AddCost from './AddCost/AddCost';

export interface IProps {
  description: string;
  context: WebPartContext;
}

export interface ICost {
  Title: string;
  Description: string;
  Amount: number;
  Pay_x002d_by: string;
  Paid: boolean;
  CategoriesId: number
}

export interface ICategoty {
  Title: string;
  Id: number;
}

interface IState {
  costs: any[];
}

export default class YupanWebpart extends React.Component<IProps, IState> {

  state = {
    costs: [],
    isModalOpen: false,
  }

  public async componentDidMount() {
    sp.setup({
      spfxContext: this.props.context,
    });

    const responceCostsList: any = await sp.web.lists.getByTitle("Costs").items.select("Title", "Description", "Id", "Amount", "CategoriesId", "Paid", "Pay_x002d_by").get();
    const responceCategoriesList: any = await sp.web.lists.getByTitle("Categories").items.select("Title", "Id").get() || [];

    const preparedCostList = responceCostsList.map((cost: ICost) => {
      const category = responceCategoriesList.find((category: ICategoty) => category.Id === cost.CategoriesId)

      return {
        ...cost,
        category: {
          id: category.Id,
          title: category.Title,
        },
      };
    });

    this.setState({
      costs: preparedCostList,
    });
  };


  public render(): React.ReactElement<IProps> {
    return (
      <div className={styles.yupanWebpart}>
        <div className="app">
          <CostList costsList={this.state.costs} />
          <AddCost />
        </div>
      </div>
    );
  }
}
