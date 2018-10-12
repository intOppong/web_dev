import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/General/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Loading from '../../components/General/Loading/Loading';
import axiosInstance from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {

  constructor(props) {
    super(props)
    this.state = {
      ingredients: {
        salad: 0,
        meat: 0,
        bacon: 0,
        cheese: 0
      },
      totalPrice: 4,
      purchasable: false,
      purchasing: false,
      loading: false
    }
  }

// ACTIONS
  updatePurchasable(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((total, ele) => {
        return total + ele
      }, 0)

    this.setState({
      purchasable: sum > 0
    })
  }

  addIngredientHandler = (type) => {
    // always copy state
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount + 1;
    const newIngredients = {...this.state.ingredients};
    newIngredients[type] = newCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({
      ingredients: newIngredients,
      totalPrice: newPrice
    })
    this.updatePurchasable(newIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];

    if (oldCount <= 0) {
      return;
    }
    const newCount = oldCount -1;
    const newIngredients = {...this.state.ingredients};
    newIngredients[type] = newCount;

    const priceSubtraction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceSubtraction;

    this.setState({
      ingredients: newIngredients,
      totalPrice: newPrice
    })
    this.updatePurchasable(newIngredients);
  }

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    })
  }

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    })
  }

  purchaseContinueHandler = () => {

    this.setState({
      loading: true
    })

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Lord Oppong',
        address: {
          street: 'Teststreet 1',
          zipCode: '4332',
          country: 'Ghana'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    }

    axiosInstance.post('/orders.json', order)
      .then( response => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch( errors => {
        this.setState({ loading: false, purchasing: false });
      })
  }


  render() {

    const disabled = {};
    for (let key in this.state.ingredients) {
      disabled[key] = this.state.ingredients[key] <= 0
    }

    let orderSummary = <OrderSummary
      ingredients={this.state.ingredients}
      cancelPurchase={this.purchaseCancelHandler}
      continuePurchase={this.purchaseContinueHandler}
      price={this.state.totalPrice} />

    if (this.state.loading) {
      orderSummary = <Loading />
    }

    return (
      <Aux>

        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>

        <Burger ingredients={this.state.ingredients} />

        <BuildControls
          addIngredient={this.addIngredientHandler}
          subtractIngredient={this.removeIngredientHandler}
          disabled={disabled}
          purchasable={this.state.purchasable}
          price={this.state.totalPrice}
          ordered={this.purchaseHandler} />

      </Aux>
    )
  }
}

export default withErrorHandler(BurgerBuilder);