import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import { Table, FormControl, Form, Button, Modal } from "react-bootstrap";
import "../ManagerScreen/ManagerScreen.css";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ProductsRequest } from "../../actions/ProductAction";

const ManagerScreen = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.productReducer.products);

  const updateProduct = (products) => {
    Axios.put("/api/updateproduct", { products }).then((res) =>
      console.log(res)
    );
    // dispatch(ProductsRequest());
  };

  const removeProduct = (_id) => {
    Axios.delete(`/api/removeproduct/${_id}`).then(async (res) => {
      console.log(res);
      await dispatch({ type: "PRODUCT_REMOVED", payload: res.data });
    });
    // dispatch(ProductsRequest());
  };

  const newProduct = (newProduct) => {
    Axios.post("/api/newProduct", { newProduct }).then((res) => {
      console.log(res);
      dispatch({ type: "PRODUCT_ADDED", payload: res.data });
    });

    // dispatch(ProductsRequest());
  };

  const [editable, seteditable] = useState(true);
  const [productsState, setproductsState] = useState(products);
  const [lgShow, setLgShow] = useState(false);
  const [search, setsearch] = useState([]);

  useEffect(() => {
    console.log(search);
  }, [search]);

  return (
    <div>
      <Navbar />

      <h1 style={{ padding: "5rem 0" }} className='mx-3'>
        manager screen{" "}
      </h1>
      <Form inline className='mb-3 px-3'>
        <FormControl
          type='text'
          placeholder='Search'
          className='mr-sm-2 '
          onChange={(e) =>
            setsearch(
              products.filter((product) =>
                product.name.includes(e.target.value)
              )
            )
          }
        />

        <Button
          style={{ margin: "0 0.7rem " }}
          onClick={() => setLgShow(true)}
          variant='outline-info'
        >
          Add Product
        </Button>
        <Button
          variant='outline-info'
          onClick={() => {
            seteditable(!editable);
            editable === false && updateProduct(products);
          }}
        >
          {editable ? "Edit" : "Update"}
        </Button>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>name</th>
            <th>category</th>
            <th>price</th>
            <th>count in stock</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {search.length <= 0
            ? products.map((product, index) => (
                <tr>
                  <td>
                    <FormControl
                      type='text'
                      defaultValue={product.name}
                      readOnly={editable}
                      className='mr-sm-2 '
                      id={`name${index}`}
                      onChange={(e) => {
                        dispatch({
                          type: "PRODUCTS_UPDATED",

                          payload: {
                            index,
                            product: {
                              ...product,
                              name: e.target.value,
                            },
                          },
                        });
                      }}
                    />
                  </td>
                  <td>
                    <Form>
                      <Form.Group>
                        <Form.Control
                          as='select'
                          defaultValue={product.category}
                          readOnly={editable}
                          className='mr-sm-2 '
                          onChange={(e) => {
                            dispatch({
                              type: "PRODUCTS_UPDATED",

                              payload: {
                                index,
                                product: {
                                  ...product,
                                  category: e.target.value,
                                },
                              },
                            });
                          }}
                        >
                          <option>living_room</option>
                          <option>kitchen</option>
                          <option>bedroom</option>
                        </Form.Control>
                      </Form.Group>
                    </Form>
                  </td>
                  <td>
                    <FormControl
                      type='text'
                      Value={product.price}
                      readOnly={editable}
                      className='mr-sm-2 '
                      id={`price${index}`}
                      onChange={(e) => {
                        dispatch({
                          type: "PRODUCTS_UPDATED",

                          payload: {
                            index,
                            product: {
                              ...product,
                              price: e.target.value,
                            },
                          },
                        });
                      }}
                    />
                  </td>
                  <td>
                    <FormControl
                      type='text'
                      Value={product.countInStock}
                      readOnly={editable}
                      className='mr-sm-2 '
                      id={`countinstock${index}`}
                      onChange={(e) => {
                        dispatch({
                          type: "PRODUCTS_UPDATED",

                          payload: {
                            index,
                            product: {
                              ...product,
                              countInStock: e.target.value,
                            },
                          },
                        });
                      }}
                    />
                  </td>
                  <td>
                    <Button
                      onClick={() => {
                        removeProduct(product._id);
                      }}
                      variant='light'
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </td>
                </tr>
              ))
            : search.map((product, index) => (
                <tr>
                  <td>
                    <FormControl
                      type='text'
                      Value={product.name}
                      readOnly={editable}
                      className='mr-sm-2 '
                      onChange={(e) => {
                        dispatch({
                          type: "PRODUCTS_UPDATED",

                          payload: {
                            index,
                            product: {
                              ...product,
                              name: e.target.value,
                            },
                          },
                        });
                      }}
                    />
                  </td>
                  <td>
                    <Form>
                      <Form.Group>
                        <Form.Control
                          as='select'
                          defaultValue={product.category}
                          readOnly={editable}
                          className='mr-sm-2 '
                          onChange={(e) => {
                            dispatch({
                              type: "PRODUCTS_UPDATED",

                              payload: {
                                index,
                                product: {
                                  ...product,
                                  category: e.target.value,
                                },
                              },
                            });
                          }}
                        >
                          <option>living_room</option>
                          <option>kitchen</option>
                          <option>bedroom</option>
                        </Form.Control>
                      </Form.Group>
                    </Form>
                  </td>
                  <td>
                    <FormControl
                      type='text'
                      Value={product.price}
                      readOnly={editable}
                      className='mr-sm-2 '
                      onChange={(e) => {
                        dispatch({
                          type: "PRODUCTS_UPDATED",

                          payload: {
                            index,
                            product: {
                              ...product,
                              price: e.target.value,
                            },
                          },
                        });
                      }}
                    />
                  </td>
                  <td>
                    <FormControl
                      type='text'
                      defaultValue={product.countInStock}
                      readOnly={editable}
                      className='mr-sm-2 '
                      onChange={(e) => {
                        dispatch({
                          type: "PRODUCTS_UPDATED",

                          payload: {
                            index,
                            product: {
                              ...product,
                              countInStock: e.target.value,
                            },
                          },
                        });
                      }}
                    />
                  </td>
                  <td>
                    <Button
                      onClick={() => {
                        removeProduct(product._id);
                      }}
                      variant='light'
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </td>
                </tr>
                // <h1>{product.name}</h1>
              ))}
        </tbody>
      </Table>

      <Modal
        size='lg'
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby='example-modal-sizes-title-lg'
      >
        <Modal.Header closeButton>
          <Modal.Title id='example-modal-sizes-title-lg'>
            Add Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <FormControl
                width='50%'
                type='text'
                className='mr-sm-2 '
                id='name'
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>category</Form.Label>
              <Form.Control as='select' size='lg' id='category'>
                <option>living_room</option>
                <option>kitchen</option>
                <option>bedroom</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>price</Form.Label>
              <FormControl
                width='50%'
                type='number'
                className='mr-sm-2 '
                id='price'
              />
            </Form.Group>
            <Form.Group>
              {/* <Form.File id='image' label='image' /> */}
              <Form.Label>image</Form.Label>
              <FormControl
                width='50%'
                type='text'
                className='mr-sm-2 '
                id='image'
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>count in stock</Form.Label>
              <FormControl
                width='50%'
                type='text'
                className='mr-sm-2 '
                id='countinstock'
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={(e) => {
              console.log({
                name: document.querySelector("#name").value,
                category: document.querySelector("#category").value,
                price: +document.querySelector("#price").value,
                image: document.querySelector("#image").value,
                countInStock: +document.querySelector("#countinstock").value,
              });
              newProduct({
                name: document.querySelector("#name").value,
                category: document.querySelector("#category").value,
                price: +document.querySelector("#price").value,
                image: document.querySelector("#image").value,
                countInStock: +document.querySelector("#countinstock").value,
              });
            }}
          >
            Add product
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManagerScreen;
