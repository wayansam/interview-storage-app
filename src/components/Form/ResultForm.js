import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon, Button, Header, Card, Divider } from "semantic-ui-react";
import { FormWrapper, Menu } from "./styleComponents";
import { clearForm } from "./../../actions";

class ResultForm extends Component {
  state = {};

  clickDashboard = () => {
    this.props.clearForm();
    this.props.changePage("Landing");
  };

  clickAddNew = () => {
    this.props.clearForm();
    this.props.changePage("Add");
  };

  render() {
    const { statusLoad, formData } = this.props;
    const { name, quantity, price, category, condition, stockedDate } =
      formData.data;

    return (
      <FormWrapper>
        <Header as="h2">Result</Header>
        {statusLoad.code === "success" && (
          <p>{statusLoad.status}. Data has been added to the list.</p>
        )}
        {statusLoad.code === "failed" && (
          <p>
            {statusLoad.status}. There are some problem while adding data to the
            list.
          </p>
        )}

        <Card fluid>
          <Card.Content>
            <Card.Header content="Item Details" />
            <Divider />
            <Card.Meta content="Name" />
            <Card.Description content={name} />
            <Divider />
            <Card.Meta content="Quantity" />
            <Card.Description content={quantity} />
            <Divider />
            <Card.Meta content="Price" />
            <Card.Description content={price} />
            <Divider />
            <Card.Meta content="Category" />
            <Card.Description content={category} />
            <Divider />
            <Card.Meta content="Condition" />
            <Card.Description content={condition} />
            <Divider />
            <Card.Meta content="Stocked Date" />
            <Card.Description content={stockedDate} />
          </Card.Content>
        </Card>

        <Menu secondary>
          <Menu.Menu position="right">
            <Button
              icon
              labelPosition="Right"
              color="blue"
              onClick={() => this.clickDashboard()}
            >
              See Dashboard
              <Icon name="arrow left" />
            </Button>
            <Button
              icon
              labelPosition="right"
              color="green"
              onClick={() => this.clickAddNew()}
            >
              Add Another Item
              <Icon name="add" />
            </Button>
          </Menu.Menu>
        </Menu>
      </FormWrapper>
    );
  }
}

function mapStateToProps({ login, statusLoad, formData }) {
  return { login, statusLoad, formData };
}

export default connect(mapStateToProps, { clearForm })(ResultForm);
