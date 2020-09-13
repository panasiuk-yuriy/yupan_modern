import * as React from 'react';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { PrimaryButton } from 'office-ui-fabric-react';


export default class AddCost extends React.Component {
  state = {
    Title: null,
    Description: null,
    Amount: null,
    Pay_x002d_by: null,
    Paid: false,
    CategoriesId: null,
  }

  changeInput(target) {
    const name = target.name;
    const value = target.value

    this.setState({
      [name]: value
    })
  }

  toggleChange = () => {
    this.setState({
      Paid: !this.state.Paid,
    });
  }

  toggleSubmit = async (e) => {
    const { Title, Description, Amount, Pay_x002d_by, Paid, CategoriesId } = this.state
    const i = await sp.web.lists.getByTitle("Costs").items.add({
      Title,
      Description,
      Amount,
      Pay_x002d_by,
      Paid,
      CategoriesId,
    })

    this.setState({
      Title: '',
      Description: '',
      Amount: null,
      Pay_x002d_by: '',
      Paid: false,
    })
  }

  public render(): React.ReactElement<{}> {
    const { Title, Description, Amount, Pay_x002d_by, Paid, CategoriesId } = this.state;

    return (
      <>
        <h2>Добавити витрату</h2>
        <form onSubmit={(e) => this.toggleSubmit(e)}>
          <label>
            <input type="text" required name="Title" value={Title} onChange={(e) => this.changeInput(e.target)} />
          На що протрачено
          </label>
          <label>
            <input type="text" required name="Description" value={Description} onChange={(e) => this.changeInput(e.target)} />
          Опис трати
          </label>
          <label>
            <input type="number" required name="Amount" value={Amount} onChange={(e) => this.changeInput(e.target)} />
          Вартість
          </label>
          <label>
            <select name="CategoriesId" value={CategoriesId} onChange={(e) => this.changeInput(e.target)}>
              <option selected value={1}>Автомобіль</option>
              <option value={2}>Дім</option>
              <option value={3}>Продукти харчування</option>
              <option value={4}>Розваги та відпочинок</option>
            </select>
          Категорія трат
          </label>
          <label>
            <select name="Pay_x002d_by" value={Pay_x002d_by} onChange={(e) => this.changeInput(e.target)}>
              <option selected value="Картка">Картка</option>
              <option value="Готівка">Готівка</option>
            </select>
          Тип оплати
          </label>
          <label>
            <input type="checkbox"
              checked={Paid}
              onChange={() => this.toggleChange()}
            />
            Оплачено
          </label>
          <PrimaryButton className='submit-btn' type="submit">Добавити</PrimaryButton>
        </form>
      </>
    );
  }
}
