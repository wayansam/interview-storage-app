import React, { Component } from "react";
import {
  Icon,
  Button,
  Header,
  Card,
  Divider,
  Message,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { FormWrapper, Menu } from "./styleComponents";
import { submitForm, backToAdd } from "./../../actions";

class ConfirmForm extends Component {
  state = {};

  clickSubmit() {
    const { formData } = this.props;
    this.props.submitForm(formData.data);
  }

  clickBack() {
    this.props.backToAdd();
    this.props.changePage("Add");
  }

  componentDidMount() {}

  render() {
    const { statusLoad } = this.props;
    const { name, quantity, price, category, condition, stockedDate } =
      this.props.formData.data;

    let flagMsgHidden = true;
    if (statusLoad.code === "success") {
      this.props.changePage("Result");
    } else if (statusLoad.code === "failed") {
      flagMsgHidden = false;
    }

    return (
      <FormWrapper>
        <Header as="h2">Confirm</Header>
        <p>Review the data.</p>

        <Message negative hidden={flagMsgHidden}>
          <Message.Header>
            We're sorry we can't submit your item.
          </Message.Header>
          <p>Please try to re-submit by clicking the submit button.</p>
        </Message>

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
              labelPosition="right"
              color="red"
              onClick={() => this.clickBack()}
            >
              Back
              <Icon name="arrow left" />
            </Button>
            <Button
              icon
              labelPosition="right"
              color="green"
              onClick={() => this.clickSubmit()}
            >
              Submit
              <Icon name="send" />
            </Button>
          </Menu.Menu>
        </Menu>

        <Dimmer active={statusLoad === "loading"} inverted>
          <Loader />
        </Dimmer>
      </FormWrapper>
    );
  }
}

function mapStateToProps({ login, formData, statusLoad }) {
  return { login, formData, statusLoad };
}

export default connect(mapStateToProps, { submitForm, backToAdd })(ConfirmForm);
