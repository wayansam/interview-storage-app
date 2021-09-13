import React, { Component } from "react";
import { connect } from "react-redux";
import { FormWrapper } from "./styleComponents";
import {
  Icon,
  Menu,
  Table,
  Button,
  Dimmer,
  Loader,
  Pagination,
  Dropdown,
} from "semantic-ui-react";
import { fetchItem } from "./../../actions";

class LandingPageForm extends Component {
  state = {
    tableSize: 5,
    activePage: 1,
  };

  handlePaginationChange = (e, { activePage }) => {
    const { tableSize } = this.state;
    this.setState({ activePage: activePage });
    this.props.fetchItem(activePage, tableSize);
  };

  handlePageSizeChange = (e, { value }) => {
    this.setState({ tableSize: value });
    this.props.fetchItem(1, value);
  };

  componentDidMount() {
    const { tableSize, activePage } = this.state;
    this.props.fetchItem(activePage, tableSize);
  }
  render() {
    const tableHeader = [
      { key: "1", text: "Name", value: "name" },
      { key: "2", text: "Quantity", value: "quantity" },
      { key: "3", text: "Price", value: "price" },
      { key: "4", text: "Stocked Date", value: "stockedDate" },
      { key: "5", text: "Condition", value: "condition" },
      { key: "6", text: "Category", value: "category" },
    ];
    const paginationOptions = [
      { key: 1, text: "2", value: 2 },
      { key: 2, text: "5", value: 5 },
      { key: 3, text: "10", value: 10 },
    ];

    const { tableSize, activePage } = this.state;
    const { itemsData, statusLoad } = this.props;

    let tableData = <p>Failed to load data.</p>;
    if (itemsData) {
      const { data, page, size, total } = itemsData;
      const totalPagination = Math.ceil(total / size);

      tableData = data ? (
        <Table celled>
          <Table.Header>
            <Table.Row>
              {tableHeader.map((header) => (
                <Table.HeaderCell key={header.key}>
                  {header.text}
                </Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.map((item) => (
              <Table.Row>
                {tableHeader.map((header) => (
                  <Table.Cell>{item[header.value]}</Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan={tableHeader.length}>
                <Menu compact>
                  <Dropdown
                    text={tableSize}
                    options={paginationOptions}
                    simple
                    item
                    onChange={this.handlePageSizeChange}
                  />
                </Menu>
                <Pagination
                  floated="right"
                  activePage={page}
                  onPageChange={this.handlePaginationChange}
                  totalPages={totalPagination}
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      ) : (
        <p>no data</p>
      );
    }
    return (
      <FormWrapper>
        <Menu secondary>
          <Menu.Item name="Inventory" />
          <Menu.Item>
            <Button
              icon
              color="blue"
              onClick={() => this.props.fetchItem(activePage, tableSize)}
            >
              <Icon name="refresh" />
            </Button>
          </Menu.Item>
          <Menu.Menu position="right">
            {/* <Link to="/new-item"> */}
            <Button
              icon
              labelPosition="right"
              color="green"
              onClick={() => this.props.changePage("Add")}
            >
              Add
              <Icon name="add" />
            </Button>
            {/* </Link> */}
          </Menu.Menu>
        </Menu>

        {tableData}
        <Dimmer active={statusLoad === "loading"} inverted>
          <Loader />
        </Dimmer>
      </FormWrapper>
    );
  }
}

function mapStateToProps({ itemsData, statusLoad }) {
  return { itemsData, statusLoad };
}

export default connect(mapStateToProps, { fetchItem })(LandingPageForm);
