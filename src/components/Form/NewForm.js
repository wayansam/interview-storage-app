import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { Icon, Button, Header, Form, Message } from "semantic-ui-react";
import { FormWrapper, FormBox, Menu } from "./styleComponents";
import DatePicker from "./datePicker/DatePicker";
import { fetchCategory, confirmForm, clearForm } from "./../../actions";

class NewForm extends Component {
  state = {
    itemName: null,
    itemQuantity: null,
    itemPrice: null,
    itemCategory: null,
    itemCondition: null,
    stockedDate: null,

    itemNameError: false,
    itemQuantityError: false,
    itemPriceError: false,
    itemCategoryError: false,
    itemConditionError: false,
    stockedDateError: false,

    firstLoad: true,
  };

  handleDate = (value) => {
    if (value) {
      const yyyy = value.getFullYear().toString();
      const mm = (value.getMonth() + 1).toString().padStart(2, "0");
      const dd = value.getDate().toString().padStart(2, "0");
      this.setState({
        stockedDate: yyyy + "-" + mm + "-" + dd,
        stockedDateError: false,
      });
    } else {
      this.setState({ stockedDate: value, stockedDateError: true });
    }
  };

  onChange = (e, { name, value }) => {
    this.setState({
      [name]: value,
      [name + "Error"]: !(value && value !== ""),
    });
  };

  clickConfirm = () => {
    const {
      itemName,
      itemQuantity,
      itemPrice,
      itemCategory,
      itemCondition,
      stockedDate,
    } = this.state;
    this.props.confirmForm(
      itemName,
      itemQuantity,
      itemPrice,
      itemCategory,
      itemCondition,
      stockedDate
    );
  };

  clickCancel = () => {
    this.props.clearForm();
    this.props.changePage("Landing");
  };

  componentDidMount() {
    const { formData } = this.props;
    if (formData) {
      const { name, quantity, price, category, condition, stockedDate } =
        formData.data;
      this.setState({
        itemName: name,
        itemQuantity: quantity,
        itemPrice: price,
        itemCategory: category,
        itemCondition: condition,
        stockedDate: stockedDate,

        itemNameError: false,
        itemQuantityError: false,
        itemPriceError: false,
        itemCategoryError: false,
        itemConditionError: false,
        stockedDateError: false,

        firstLoad: false,
      });
    }
    this.props.fetchCategory();
  }

  render() {
    const conditionOptions = [
      { key: "1", text: "New", value: "NEW" },
      { key: "2", text: "Second", value: "SECOND" },
      { key: "3", text: "Preorder", value: "PREORDER" },
    ];
    const {
      itemName,
      itemQuantity,
      itemPrice,
      itemCategory,
      itemCondition,
      stockedDate,

      itemNameError,
      itemQuantityError,
      itemPriceError,
      itemCategoryError,
      itemConditionError,
      stockedDateError,
    } = this.state;
    const { login, statusLoad, category } = this.props;

    let flagMsgHidden = true;
    if (statusLoad === "confirmed") {
      this.props.changePage("Confirm");
    } else if (statusLoad === "not complete") {
      flagMsgHidden = false;
    }

    return login && login !== "" ? (
      <FormWrapper>
        <Header as="h2">Add Item</Header>
        <p>Fill the form with the correct data.</p>

        <Message negative hidden={flagMsgHidden}>
          <Message.Header>
            We're sorry we can't confirm your item.
          </Message.Header>
          <p>Please fill all the form.</p>
        </Message>

        <FormBox>
          <Form loading={statusLoad === "loading"}>
            <Form.Input
              label="Item Name"
              placeholder="Item Name"
              name="itemName"
              error={itemNameError}
              onChange={this.onChange}
              value={itemName}
            />
            <Form.Group>
              <Form.Input
                label="Quantity"
                placeholder="quantity"
                width={4}
                type="number"
                min="1"
                name="itemQuantity"
                error={itemQuantityError}
                onChange={this.onChange}
                value={itemQuantity}
              >
                <input />
              </Form.Input>
              <Form.Input
                iconPosition="left"
                label="Price"
                placeholder="Price"
                width={6}
                type="number"
                min="1"
                name="itemPrice"
                error={itemPriceError}
                onChange={this.onChange}
                value={itemPrice}
              >
                <Icon name="dollar" />
                <input />
              </Form.Input>
              <Form.Input
                iconPosition="left"
                label="Total Value"
                placeholder="Value"
                width={6}
                value={itemQuantity * itemPrice}
                readonly
                type="number"
              >
                <Icon name="dollar" />
                <input />
              </Form.Input>
            </Form.Group>

            <Form.Select
              fluid
              label="Category"
              options={category}
              placeholder="Category"
              width={6}
              name="itemCategory"
              error={itemCategoryError}
              onChange={this.onChange}
              value={itemCategory}
            />
            <Form.Select
              fluid
              label="Condition"
              options={conditionOptions}
              placeholder="Condition"
              width={6}
              name="itemCondition"
              error={itemConditionError}
              onChange={this.onChange}
              value={itemCondition}
            />

            <DatePicker
              width={6}
              label="Stocked Date"
              name="stockedDate"
              error={stockedDateError}
              handleDate={(v) => this.handleDate(v)}
              value={stockedDate}
            />
          </Form>
        </FormBox>

        <Menu secondary>
          <Menu.Menu position="right">
            <Button
              icon
              labelPosition="right"
              color="red"
              onClick={() => this.clickCancel()}
            >
              Cancel
              <Icon name="cancel" />
            </Button>

            <Button
              icon
              labelPosition="right"
              color="green"
              onClick={() => this.clickConfirm()}
            >
              Confirm
              <Icon name="check" />
            </Button>
          </Menu.Menu>
        </Menu>
      </FormWrapper>
    ) : (
      <Redirect to={{ pathname: "/login" }} />
    );
  }
}
function mapStateToProps({ login, statusLoad, category, formData }) {
  return { login, statusLoad, category, formData };
}

export default connect(mapStateToProps, {
  fetchCategory,
  confirmForm,
  clearForm,
})(NewForm);
