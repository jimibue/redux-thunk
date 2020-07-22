import React from "react";
import { Card, Header, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { getProducts, deleteProduct, editProduct } from "../reducers/products";

class Products extends React.Component {
  componentDidMount() {
    if (this.props.products.length == 0) this.props.getProducts();
  }

  renderProducts = () => {
    const { products, deleteProduct, editProduct } = this.props;

    if (products.length <= 0) return <h2>No Products</h2>;
    return products.map((product) => (
      <Card key={product.id}>
        <Card.Content>
          <Card.Header>{product.name}</Card.Header>
          <Card.Meta>{product.department}</Card.Meta>
          <Card.Description>{product.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button as={Link} to={`/products/${product.id}`} color="blue">
            View
          </Button>
          <Button onClick={() => deleteProduct(product.id)} color="red">
            Delete
          </Button>
          <Button onClick={() => editProduct(product.id)} color="blue">
            Edit
          </Button>
        </Card.Content>
      </Card>
    ));
  };

  render() {
    return (
      <div>
        <Header as="h1">Products</Header>
        <br />
        <Button as={Link} color="blue" to="/products/new">
          Add Product
        </Button>
        <br />
        <br />
        <Card.Group>{this.renderProducts()}</Card.Group>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
});

const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(getProducts()),
  deleteProduct: (id) => dispatch(deleteProduct(id)),
  editProduct: (id) => dispatch(editProduct(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
